# Bomfather Static Frontend: Introduction

## Purpose

This document provides an overview for creating a static frontend website for the Bomfather project. The frontend will serve as the project's public face, providing information about its features, capabilities, and documentation to potential users and contributors.

## Understanding Bomfather

Bomfather is an eBPF-based kernel-level monitoring framework that provides accurate identification of dependencies in software supply chains. It addresses critical shortcomings in traditional SBOM (Software Bill of Materials) generation methods by:

1. **Kernel-Level Monitoring**: Using eBPF to intercept system calls during build processes, providing visibility into every file access operation
2. **Real-Time Hash Computation**: Computing cryptographic hashes (SHA-256) of all accessed files to create unique identifiers
3. **Merkle Tree Construction**: Organizing file hashes into a tamper-evident Merkle tree structure
4. **Comprehensive SBOM Generation**: Creating SBOMs that include dynamically loaded dependencies, conditional compilation artifacts, and ephemeral build-time components

The key innovation of Bomfather is its ability to capture the *actual* dependencies used during compilation rather than just the *declared* dependencies. This approach solves several critical problems:

- Identifies unknown dependencies that traditional tools might miss
- Verifies which parts of declared dependencies are actually used
- Captures runtime-loaded libraries and plugins
- Documents build-time dependencies in containerized environments
- Creates cryptographic evidence of build provenance

## Frontend Goals

The Bomfather static frontend aims to:

1. **Educate**: Clearly explain the complex concepts behind Bomfather in an accessible way
2. **Demonstrate**: Showcase how Bomfather works through interactive visualizations and diagrams
3. **Guide**: Provide comprehensive documentation for users to get started and advanced usage
4. **Establish Trust**: Convey professionalism and technical excellence through design and content
5. **Build Community**: Encourage contributions and community engagement

## Overall Approach

Our approach to building the frontend prioritizes:

1. **Performance**: Fast loading times and minimal JavaScript overhead
2. **Accessibility**: Ensuring the site is accessible to all users
3. **Visual Communication**: Using diagrams and visualizations to explain complex concepts
4. **Documentation Quality**: Providing clear, well-structured documentation
5. **Extensibility**: Making it easy to update and expand the site as the project evolves

The following documents in this series provide detailed guidance on implementing this approach:

- [Technology Selection](part2-technology.md): Evaluating and selecting the right tools
- [Design System](part3-design-system.md): Visual identity, colors, typography, and components
- [Site Structure](part4-site-structure.md): Organization of pages and content
- [Content Strategy](part5-content-strategy.md): Target audiences, content types, and messaging
- [Implementation Guide](part6-implementation-guide.md): Step-by-step technical instructions
- [Deployment Guide](part7-deployment.md): How to deploy and maintain the website 