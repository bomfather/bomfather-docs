---
title: "How We Secured Our eBPF from eBPF"
description: "This blog post is one in a series about how we secure our eBPF agent from malicious users who try to overwrite or destroy it."
publishedAt: 2025-10-07T00:00:00Z
author: "Nathan Naveen"
draft: false
---

This blog post is one in a series about how we secure our eBPF agent from malicious users who try to overwrite or destroy it.

# The Problem

We utilize extended Berkeley Packet Filter (eBPF) Linux Security Module (LSM) hooks to secure builds and the GPU (We know that there are a lot of acronyms, but these are important since we will be using these two throughout the blog post).

The issue is that even though we utilize LSM hooks, a malicious actor could write their own LSM hooks to overwrite ours. 

# What Would an Attacker Do?

We will go over a couple of attacks that an attacker could use to access data in the GPU. 

Note that in Unix, returning `0` signifies an OK. Keep that in mind when reading the following code snippets.

## Always allow ptrace

A malicious user could attempt to hook `lsm/ptrace_access_check` and allow all ptrace.

They would use this to enable ptrace on protected processes to dump memory, inject code, etc.

```cpp
#include "vmlinux.h"
#include <bpf/bpf_helpers.h>
#include <bpf/bpf_tracing.h>

SEC("lsm/ptrace_access_check")
int BPF_PROG(malicious_ptrace, struct task_struct *child, unsigned int mode) {
    return 0;
}

char LICENSE[] SEC("license") = "GPL";
```

## Always Allow Signals

An attacker could also try to hook `lsm/task_kill` and allow the killing of protected processes. For example, they could try to kill the Bomfather agent or protected executables via `SIGTERM`/`SIGKILL`.

```cpp
#include "vmlinux.h"
#include <bpf/bpf_helpers.h>
#include <bpf/bpf_tracing.h>

SEC("lsm/task_kill")
int BPF_PROG(malicious_kill, struct task_struct *p, struct kernel_siginfo *info, int sig, const struct cred *cred) {
    return 0;
}

char LICENSE[] SEC("license") = "GPL";
```

<div style="text-align: center; margin: 2em 0;">
  <img src="/images/blog/hideThePainHarold.jpg" alt="hideThePainHarold" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
  
</div>

# Beating Up the Bullies on the Playground

Our solution to these two attacks are based on a single idea that we leverage.

The kernel's LSM caller stops on the first non zero return code. So, if any LSM hooks return a negative error, the kernel immediately denies the operation even if an earlier hook allowed it. You can see this in the Linux Kernel code: https://elixir.bootlin.com/linux/v6.17.1/source/security/security.c#L3722-L3738.

We have our own `lsm/ptrace_access_check` and `lsm/task_kill`, which will deny based on a policy provided to Bomfather. 

So, if a malicious user were to try using these LSM hooks to inject code or kill the Bomfather process, they wouldn't be allowed to, since denials take priority over allows in Linux. 

This would also happen even if the malicious process was started before Bomfather started running. So, suppose a malicious process allowed all access via `lsm/ptrace_access_check` and `lsm/task_kill` before starting Bomfather. In that case, once Bomfather starts, it will deny access because of how Linux is designed.

# Conclusion

In this example by placing Bomfather's LSM hooks that return explicit denies for `lsm/ptrace_access_check` and `lsm/task_kill`, we force the kernel to respect our policy even if a malicious LSM came first.
