---
title: "Introducing Bomfather: Kernel-level Truth in Software Supply Chains"
description: "Learn how Bomfather provides unprecedented visibility into your software dependencies by monitoring at the kernel level using eBPF technology."
publishedDate: "2025-03-24"
author: "Neil Naveen"
excerpt: "Software supply chain security has never been more important. With the rise of sophisticated attacks targeting the software supply chain, organizations need better tools to understand what's really happening in their applications..."
image: "/images/logos/bitbom-long-logo.png"
---

# Introducing Bomfather: Kernel-level Truth in Software Supply Chains

Software supply chain security has never been more important. With the rise of sophisticated attacks targeting the software supply chain, organizations need better tools to understand what's really happening in their applications.

Today, we're excited to introduce Bomfather, an eBPF-based kernel-level monitoring framework designed to provide unprecedented visibility into your software dependencies.

## The Problem with Current Approaches

Traditional methods of tracking dependencies, such as package manager lockfiles and Software Bills of Materials (SBOMs), have significant limitations:

- They don't account for dependencies loaded dynamically at runtime
- They can't identify which dependencies are actually used versus just installed
- They miss dependencies that aren't declared in manifests
- They rely on self-reporting from applications rather than observing actual behavior

These limitations create dangerous blind spots in the software supply chain, leaving organizations vulnerable to attacks that exploit unknown or unused dependencies.

## How Bomfather Works

Bomfather takes a fundamentally different approach by leveraging eBPF (extended Berkeley Packet Filter) technology to monitor file access events at the kernel level. This allows Bomfather to:

- See every file that an application accesses, including dynamically loaded libraries
- Monitor in real-time without requiring code changes or application restarts
- Generate accurate and comprehensive dependency graphs based on actual usage
- Identify dependencies that are installed but never used
- Detect undeclared dependencies that aren't in your manifest files

## Getting Started

Bomfather is designed to be easy to set up and integrate into your existing workflows. In its simplest form, you can install the Bomfather agent and start monitoring your applications with just a few commands.

```bash
# Install Bomfather
curl -sSL https://get.bomfather.org | sudo bash

# Configure monitoring
bomfather configure

# Start monitoring
sudo systemctl start bomfather
```

For more detailed instructions, check out our GitHub repository at [github.com/bitbomdev/bomfather](https://github.com/bitbomdev/bomfather).

## The Road Ahead

This is just the beginning of our journey. In the coming months, we'll be adding more features to Bomfather, including:

- Integration with CI/CD pipelines
- Vulnerability correlation with real-time usage data
- Automatic SBOM generation based on actual dependencies
- Advanced risk scoring based on dependency usage patterns

We invite you to join us on this journey by trying out Bomfather, providing feedback, and contributing to our open-source project.

Together, we can build a more secure software supply chain for everyone. 