---
title: "Bomfather Research Published on arXiv: Kernel-Level Monitoring Framework for Software Supply Chains"
publishedAt: 2025-08-03T00:00:00Z
category: "Research"
author: "Naveen Srinivasan, Nathan Naveen, Neil Naveen"
externalLink: "https://arxiv.org/abs/2503.02097"
draft: false
---

<a href="https://arxiv.org/abs/2503.02097" target="_blank" rel="noopener noreferrer">
  <img src="/images/arxiv.jpg" alt="arXiv" class="news-float-image" />
  
</a>

We're excited to announce the publication of our research paper *"Bomfather: An eBPF-based Kernel-level Monitoring Framework for Accurate Identification of Unknown, Unused, and Dynamically Loaded Dependencies in Modern Software Supply Chains"* on arXiv.

The paper, authored by **Nathan Naveen**, **Neil Naveen**, and **Naveen Srinivasan** introduces our revolutionary approach to software supply chain security, which addresses critical gaps in conventional dependency-tracking methods.

## Key Research Takeaways

Our research demonstrates how kernel-level monitoring can provide **tamper-evident** build time dependencies by computing cryptographic hashes of files accessed during compilation and constructing Merkle trees based on observed file content.

Unlike traditional static analysis approaches, our methodology accounts for:

- Unused dependencies that don't affect the final artifact
- Partial library dependencies and dynamic linking
- Libraries loaded at runtime and short-lived build files

This results in significantly more precise Software Bills of Materials (SBOMs) and enhancing trustworthiness in software artifacts through kernel-level evidence of build provenance.

