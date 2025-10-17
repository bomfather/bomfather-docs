---
title: "GitHub’s ubuntu-latest Runners Have 1,681 Packages and 9 HIGH-Severity Vulnerabilities"
description: "GitHub runners are packed with vulnerabilities. Should we really be using them?"
publishedAt: 2025-10-09T00:00:00Z
author: "Nathan Naveen"
draft: false
---

We build our platform in `Go` and `C`. Our production containers are stripped down to exactly what we need. Removing unnecessary packages and minimizing the attack surface. We vendor our packages.

Then we run our builds on GitHub's `ubuntu-latest` runners which have 1,681 packages.

That's absurd. We won't run production with all this cruft, so why would we build with it? Supply chain attacks targeting build environments are increasingly common and devastating, compromising one dependency can silently infect every artifact we produce. Our build environment has access to our source code, secrets, and signing keys. If anything, it should be more locked down than production, not less.

Last week we inventoried what actually ships on `ubuntu-latest`. The results convinced us to move away from GitHub runners entirely.

## The numbers

We ran an inventory script on a fresh `ubuntu-latest` runner, and the total package count is 1,681.

Breaking it down, 214 `APT` system packages, 162 `Python` packages, 173 `Ruby` `gems`, 119 `Conda` packages, and 13 `NPM` packages.

We build `Go` and `C` code. We need the `Go` and `C` compiler, `git`, and maybe 15 other tools. About 20 packages total.

The runner gives us 1,681 packages. That includes entire language ecosystems we never touch (`Python`, `Ruby`, `Node`, `Conda`). All sitting there, increasing our attack surface.

## The vulnerabilities

We scanned 348 of those packages using `OSV.dev`. We could only scan the `Ruby`, `Python`, and `NPM` packages because `APT` and `Conda` aren't supported by the scanner yet.

Of the 348 packages scanned, 16 packages have known vulnerabilities, with a total of 63 vulnerabilities across those 16 packages. 9 vulnerabilities were rated high, 38 moderate, 6 low, and 10 unknown.

The `Python` `cryptography` package version `41.0.7` has 6 high severity vulnerabilities.

The `setuptools` package version `68.1.2` has 3 high severity vulnerabilities. `CVE-2024-6345` is a path traversal bug where an attacker can write arbitrary files anywhere on the filesystem. That means someone can inject malicious code directly into your build artifacts.

We don't use `Python`, and we definitely don't import `cryptography` or `setuptools`. But they're there in our build environment.

Would we run production with known high severity vulnerabilities? No.

Would we ship a container with `cryptography` `41.0.7` knowing it has 6 high CVEs? Never.

So why is it okay in our build environment?

## The full list

For transparency, here are all 16 vulnerable packages we found:

`Jinja2` has 10 vulnerabilities. The `cryptography` package has 10 with 6 being high. `Twisted` has 6. `Setuptools` has 6 with 3 being high. Then `certifi`, `idna`, `requests`, `urllib3`, and `python-apt` each have 4. `Configobj`, `cgi`, `webrick`, and `net-imap` each have 2. Finally `rdoc`, `resolv`, and `uri` each have 1.

These are just the packages we could scan. We couldn't scan the 1,214 `APT` packages or the 119 `Conda` packages. The actual vulnerability count is almost certainly higher.

The code for getting the vulnerabilities is here, **[bomfather/tools](https://github.com/bomfather/tools)**.

## Attack surface

Every package is a potential attack vector. We know this, it's why we minimize our production containers.

A production `Go` service might have 15 to 25 packages. The `Go` runtime, some system libraries, a few utilities.

The `ubuntu-latest` runner has 1,681 packages. That's somewhere between 50 and 100 times more than our production containers. Each one has the potential to have vulnerabilities.

The math is brutal. If 4.6% of scanned packages have CVEs, and we extrapolate that to all 1,681 packages, we're looking at roughly 77 vulnerable packages in the full environment. Even if the real number is half that, it's still 38 packages with known exploits.

In production, one CVE gets immediate attention. We patch, test, deploy. Having 38 or 77 known vulnerabilities would be a critical incident.

<div style="text-align: center; margin: 2em 0;">
  <img src="/images/blog/grusPlan.jpg" alt="grusPlan" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
  
</div>

## The big problem

We treat production extremely delicately with tightly audited layers, and a fast reflex for patching a critical CVE. Our builds have access to source, secrets, and signing keys, so they should deserve equal or stricter treatment.

Here's what really bothers us. Those 9 high severity vulnerabilities are known, they're in a public CVE database (published by security researchers).

Yet, they're still there on the runner.

Maybe GitHub will update the image next week. Maybe next month. Maybe they already did and we tested an older image. The point is, we don't control the timing, we can't force an update, we can't even see what changed without diffing the entire environment ourselves.

In production, we'd be on those vulnerabilities immediately, patch, test, deploy same day if possible. But for builds? We just accept it, we run our CI on whatever GitHub gives us and hope the vulnerabilities don't matter.

## How we collected this data

We ran this inventory on an actual `ubuntu-latest` runner using GitHub Actions. Package counts came from the native package managers. `APT` packages from `dpkg`, `Python` from `pip`, `Ruby` from `gem`, and so on.

Vulnerability scanning used the OSV.dev API (Google's Open Source Vulnerability database). The scan covered `Python`, `Ruby`, and `NPM` packages, but couldn't handle `APT` or `Conda` packages due to scanner limitations.

Total scan time was about 4 seconds. Out of 348 packages scanned, 16 had CVEs. Totally, we found 63 vulnerabilities.

We only scanned 348 of the 1,681 packages. The remaining 1,333 packages might be perfectly clean, or they might have dozens more vulnerabilities. We can't tell because the scanner doesn't support them, and we're too lazy to write our own scanner for `APT` packages.

## We want control

Currently we run our builds with GitHub runners since we initially created our product with them, but moving away from them is a priority.

We aren’t moving away because they're bad, but because they're wrong for us. We're security focused and we want a minimum footprint. We want to know exactly what's in our environment. We want control over updates and we want to keep the same standards for builds that we have for production.

GitHub runners optimize for convenience. They give you everything so you don't have to think about what you need. That's great for getting started quickly but terrible for security.

You can build your own images, it takes more work, but the security benefits are massive.

If you wouldn't run 1,681 packages in production, don't build on it.

Our build environment is production. We're treating it that way.