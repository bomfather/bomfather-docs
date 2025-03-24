// Blog post data
export const blogPosts = [
  {
    title: "Introducing Bomfather: Kernel-level Truth in Software Supply Chains",
    slug: "introducing-bomfather",
    description: "Learn how Bomfather provides unprecedented visibility into your software dependencies by monitoring at the kernel level using eBPF technology.",
    publishedDate: "2024-03-21",
    author: "Alice Chen",
    excerpt: "Software supply chain security has never been more important. With the rise of sophisticated attacks targeting the software supply chain, organizations need better tools to understand what's really happening in their applications...",
    content: `
      <h1>Introducing Bomfather: Kernel-level Truth in Software Supply Chains</h1>
      
      <p>Software supply chain security has never been more important. With the rise of sophisticated attacks targeting the software supply chain, organizations need better tools to understand what's really happening in their applications.</p>
      
      <p>Today, we're excited to introduce Bomfather, an eBPF-based kernel-level monitoring framework designed to provide unprecedented visibility into your software dependencies.</p>
      
      <h2>The Problem with Current Approaches</h2>
      
      <p>Traditional methods of tracking dependencies, such as package manager lockfiles and Software Bills of Materials (SBOMs), have significant limitations:</p>
      
      <ul>
        <li>They don't account for dependencies loaded dynamically at runtime</li>
        <li>They can't identify which dependencies are actually used versus just installed</li>
        <li>They miss dependencies that aren't declared in manifests</li>
        <li>They rely on self-reporting from applications rather than observing actual behavior</li>
      </ul>
      
      <p>These limitations create dangerous blind spots in the software supply chain, leaving organizations vulnerable to attacks that exploit unknown or unused dependencies.</p>
      
      <h2>How Bomfather Works</h2>
      
      <p>Bomfather takes a fundamentally different approach by leveraging eBPF (extended Berkeley Packet Filter) technology to monitor file access events at the kernel level. This allows Bomfather to:</p>
      
      <ol>
        <li>See every file that an application accesses, including dynamically loaded libraries</li>
        <li>Monitor in real-time without requiring code changes or application restarts</li>
        <li>Generate accurate and comprehensive dependency graphs based on actual usage</li>
        <li>Identify dependencies that are installed but never used</li>
        <li>Detect undeclared dependencies that aren't in your manifest files</li>
      </ol>
      
      <h2>Getting Started</h2>
      
      <p>Bomfather is designed to be easy to set up and integrate into your existing workflows. In its simplest form, you can install the Bomfather agent and start monitoring your applications with just a few commands.</p>
      
      <pre><code>
      # Install Bomfather
      curl -sSL https://get.bomfather.org | sudo bash
      
      # Configure monitoring
      bomfather configure
      
      # Start monitoring
      sudo systemctl start bomfather
      </code></pre>
      
      <p>For more detailed instructions, check out our <a href="/docs/getting-started">Getting Started Guide</a>.</p>
      
      <h2>The Road Ahead</h2>
      
      <p>This is just the beginning of our journey. In the coming months, we'll be adding more features to Bomfather, including:</p>
      
      <ul>
        <li>Integration with CI/CD pipelines</li>
        <li>Vulnerability correlation with real-time usage data</li>
        <li>Automatic SBOM generation based on actual dependencies</li>
        <li>Advanced risk scoring based on dependency usage patterns</li>
      </ul>
      
      <p>We invite you to join us on this journey by trying out Bomfather, providing feedback, and contributing to our open-source project.</p>
      
      <p>Together, we can build a more secure software supply chain for everyone.</p>
    `,
    image: "/blog/introducing-bomfather.jpg"
  },
  {
    title: "Understanding Dynamic Dependencies: The Hidden Risks in Your Software",
    slug: "understanding-dynamic-dependencies",
    description: "Explore how dynamically loaded dependencies create blind spots in traditional software supply chain security and how Bomfather addresses these challenges.",
    publishedDate: "2024-03-22",
    author: "Bob Smith",
    excerpt: "When an application loads a library at runtime rather than linking to it statically, it creates a scenario that most dependency scanners and SBOMs miss completely. This practice, known as dynamic loading, is common in modern applications...",
    content: `
      <h1>Understanding Dynamic Dependencies: The Hidden Risks in Your Software</h1>
      
      <p>When an application loads a library at runtime rather than linking to it statically, it creates a scenario that most dependency scanners and SBOMs miss completely. This practice, known as dynamic loading, is common in modern applications...</p>
      
      <p>Most of this blog post will be written once we have more details about the specific implementation of Bomfather.</p>
    `,
    image: "/blog/dynamic-dependencies.jpg"
  },
  {
    title: "eBPF for Software Security: A New Frontier",
    slug: "ebpf-for-software-security",
    description: "An in-depth look at how eBPF technology is transforming software security by providing deeper insights without performance penalties.",
    publishedDate: "2024-03-23",
    author: "Charlie Wong",
    excerpt: "Extended Berkeley Packet Filter (eBPF) has revolutionized Linux kernel observability, networking, and security. Originally designed for network packet filtering, eBPF has evolved into a powerful technology that allows programs to run safely inside the kernel space...",
    content: `
      <h1>eBPF for Software Security: A New Frontier</h1>
      
      <p>Extended Berkeley Packet Filter (eBPF) has revolutionized Linux kernel observability, networking, and security. Originally designed for network packet filtering, eBPF has evolved into a powerful technology that allows programs to run safely inside the kernel space...</p>
      
      <p>Most of this blog post will be written once we have more details about the specific implementation of Bomfather.</p>
    `,
    image: "/blog/ebpf-security.jpg"
  }
]; 