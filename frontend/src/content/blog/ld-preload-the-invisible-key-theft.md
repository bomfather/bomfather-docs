---
title: "LD_PRELOAD, The Invisible Key Theft"
description: "How LD_PRELOAD can be used to steal keys without you knowing..."
publishedAt: 2025-10-14T00:00:00Z
author: "Neil Naveen"
draft: false
---

Imagine you are running a Solana validator. You have your [EDR](https://en.wikipedia.org/wiki/Endpoint_detection_and_response) agent running, and you have everything set up and think you are safe. But you realize your wallet is drained and you don't know why. You start to investigate and see that the validator only accessed your private keys and nothing else. You check the directory's permissions, logs from EDR, and everything seems to be in order.

## The Threat

[`LD_PRELOAD`](https://man7.org/linux/man-pages/man8/ld.so.8.html) is an environment variable that allows you to load a shared library before the program starts. This is a powerful feature that can be used to hook system calls and intercept file operations. There are other similar variables like `LD_LIBRARY_PATH`.

This is not ENV variables alone. There are things like `/etc/ld.so.preload` that can be used to load a shared library before the program starts.

Linux built this feature to allow developers to load shared libraries before the program starts so that they can debug and test their code.

Our implementation of this exploitation code is in our [Github Repo](https://github.com/bomfather/tools/tree/main/ld-preload).

## Why Solana?

This is not just a Solana problem. This is a problem for any application that loads credentials from a file. The insider threat is real and a problem for any organization. This is another way to steal private keys. There is too much at stake not to be careful.

## The Vulnerability

Now, most of us write userspace applications, and use libraries like `glibc` to handle the file operations, so we never really think about this issue. `glibc` does the heavy lifting for us, but what if we hook into the file operations and intercept them before `glibc` does its thing? This is what `LD_PRELOAD` allows us to do. It is a way to hook into a library call.

In our case, we did this by hooking into the file operations and intercepting them before `glibc` did its thing. When the validator read its keypair files from disk, we intercepted the `close()` call and made a copy before the file descriptor closed. 

We wrote a malicious shared library that hooks into the file operations. We also call the real `close()` function, so the validator continues normally, the user has no idea that this is happening.

<div style="text-align: center; margin: 2em 0;">
  <img src="/images/blog/ldPreloadGrandma.jpg" alt="ldPreloadGrandma" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
  
</div>

## How the Attack Works

Our malicious library does something clever, it hooks the `close()` system call. 

Why `close()` and not `open()` or `read()`? Because when a file is closed, we know the application is done with it. We can check what file was just accessed by looking at `/proc/self/fd/{fd}` before the file descriptor is closed.

The hook is surprisingly simple - about 30 lines of C. Here's the core concept:

```c
int close(int fd) {
    // 1. Get pointer to real close() using dlsym(RTLD_NEXT, "close")
    // 2. Read /proc/self/fd/{fd} to see what file this is
    // 3. If path contains "solana-run", copy the file to /tmp/stolen-validator-data
    // 4. Call real close() so the validator continues normally
}

```

That's it. No privilege escalation, kernel exploits, or complex techniques. Just intercepting a standard library call that every program uses.

The key trick is using `/proc/self/fd/{fd}`, a Linux feature that lets you see what file a file descriptor points to. Before the file descriptor closes, we check if it's one of the Solana keypair files. If it is, we make a copy.

## A More In-Depth View

Both of the following are based on our attack code https://github.com/bomfather/tools/tree/main/ld-preload.

### Method 1: Environment Variable (LD_PRELOAD)

1. Compile `malicious.so` and inject it into the validator container
2. Set `LD_PRELOAD=/tmp/malicious.so` when starting the validator
3. When the validator opens keypair files, our library is already loaded
4. Every time `close()` is called, we intercept it
5. Check if the file path contains "solana-run" (the ledger directory)
6. If yes, copy the file to our exfiltration directory
7. Call the real `close()` so the validator continues normally

### Method 2: Persistent (/etc/ld.so.preload)

1. Compile `malicious.so` inside the container
2. Write `/tmp/malicious.so` to `/etc/ld.so.preload`
3. Start the validator (library loads automatically)
4. Same interception and exfiltration process
5. Affects ALL processes in the container, not just the validator

## Deploying the Attack

**Environment variable method:**

```
LD_PRELOAD=/path/to/malicious.so ./program
```

**Persistent method:**

```bash
echo "/path/to/malicious.so" > /etc/ld.so.preload
./program  # Library loads automatically
```

It is as simple as that.

## Why This Matters: Scope and Implications

### Can containers be exploited?

Yes. Containers don't protect against `LD_PRELOAD` attacks because:

- The environment variable is set within the container's namespace
- `/etc/ld.so.preload` is a file inside the container
- The process inside the container runs the library inside the container

Container isolation doesn't help when the attack comes from inside the container.

### Do I need to be root?

It depends on the method:

**`LD_PRELOAD` environment variable:**

- No root needed for your own processes
- Can be set by any user for processes they start
- That is the scary part

**`/etc/ld.so.preload` file:**

- Requires root/privileged access to modify the file
- But once set, it affects ALL processes system-wide
- More dangerous, but requires privilege escalation first

## Conclusion

Remember the scenario at the beginning? The drained validator with everything "in order"? This is how it happens, with a single environment variable, no root access needed, and no alerts triggered. Just silent exfiltration of private keys while the validator runs normally.

The scary part isn't the complexity of the attack but the simplicity. `LD_PRELOAD` is a legitimate debugging feature. File access by the validator process is expected behavior.

Check if your EDR agent is handling things like this.

Complete source code and demo available at https://github.com/bomfather/tools/tree/main/ld-preload. The steps to run it are in the `README.md`.

---

**Disclaimer**: This tool is for educational and authorized security testing only. Unauthorized access to computer systems is illegal. See LICENSE for complete terms.