// content/homepage.ts
// Bomfather homepage content
// AI security platform with kernel-level protection

export interface HomepageContent {
  hero: HeroContent;
  socialProof: SocialProofContent;
  attackVectors: AttackVectorsContent;
  comparison: ComparisonContent;
  howItWorks: HowItWorksContent;
  features: FeaturesContent;
  developerExperience: DeveloperExperienceContent;
  community: CommunityContent;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA: { text: string; href: string };
  metrics: Array<{ value: string; label: string }>;
  heroImage?: string;
}

export interface SocialProofContent {
  title: string;
  stats: Array<{ value: string; label: string }>;
  logos: Array<{ name: string; src: string; alt: string }>;
}

export interface AttackVectorsContent {
  title: string;
  subtitle?: string;
  ai: {
    header: string;
    headerDescription: string;
    traditional: {
      title: string;
      description: string;
      problems: string[];
    };
    bomfather: {
      title: string;
      benefits: string[];
      tagline: string;
    };
  };
  builds: {
    header: string;
    headerDescription: string;
    traditional: {
      title: string;
      description: string;
      problems: string[];
    };
    bomfather: {
      title: string;
      benefits: string[];
      tagline: string;
    };
  };
}

export interface ComparisonContent {
  title: string;
  subtitle?: string;
  traditional: {
    title: string;
    items: string[];
    tagline: string;
  };
  bomfather: {
    title: string;
    items: string[];
    tagline: string;
  };
}

export interface HowItWorksContent {
  title: string;
  subtitle: string;
  steps: Array<{
    step: number;
    title: string;
    description: string;
    code?: string;
    language?: string;
  }>;
}

export interface FeaturesContent {
  title: string;
  subtitle: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
    benefits: string[];
  }>;
}

export interface DeveloperExperienceContent {
  title: string;
  subtitle: string;
  sections: Array<{
    title: string;
    description: string;
    code: string;
    language: string;
  }>;
  frameworks: Array<{
    name: string;
    logo: string;
    supported: boolean;
  }>;
}

export interface CommunityContent {
  title: string;
  subtitle?: string;
  githubStats: Array<{ label: string; value: string }>;
  integrations: Array<{ name: string; logo: string; description: string }>;
}



// Bomfather content data
export const homepageContent: HomepageContent = {
  hero: {
    title: "Effortlessly Protect Your GPUs",
    subtitle: "Same file. Different parent. Different outcome.\nThat's intelligence. That's Bomfather.",
    primaryCTA: { text: "Protect Your AI", href: "/protect-ai" },
    secondaryCTA: { text: "Secure Your Builds", href: "/protect-builds" },
    metrics: []
  },

  socialProof: {
    title: "Trusted by security teams worldwide",
    stats: [],
    logos: []
  },

  attackVectors: {
    title: "Two Attack Vectors. One Real Solution.",
    ai: {
      header: "Protect AI",
      headerDescription: "You Spent Millions training your AI models. And it can all be stolen in 30 seconds.",
      traditional: {
        title: "Traditional \"AI Security\"",
        description: "Your GPU memory is wide open. Any process with the same UID can steal your models through file descriptors. Training data worth millions? Gone in seconds.",
        problems: [
          "Can't see GPU memory access",
          "No control over IPC exploitation", 
          "Alerts after models are stolen",
          "Breaks complex ML pipelines"
        ]
      },
      bomfather: {
        title: "Bomfather AI Protection",
        benefits: [
          "Blocks GPU theft at kernel level",
          "Unauthorized programs can't use IPCs to access the GPU",
          "SHA256 verification of all data",
          "Zero workflow changes needed"
        ],
        tagline: "Same augment.py file: runs for legitimate training, blocked for attackers. That's real security."
      }
    },
    builds: {
      header: "Protect Builds",
      headerDescription: "The supply chain lie. Your SBOM shows dependencies but can't see post-install scripts stealing secrets or compilers injecting backdoors.",
      traditional: {
        title: "Traditional \"Build Security\"",
        description: "Your SBOM shows package.json dependencies. But it can't see the post-install script stealing your AWS keys or the hijacked compiler injecting backdoors.",
        problems: [
          "Scans static manifest files",
          "Blind to runtime behavior",
          "Can't stop execution attacks", 
          "Discovers breaches too late"
        ]
      },
      bomfather: {
        title: "Bomfather Build Protection",
        benefits: [
          "Default-deny all file access",
          "Control what reads your code",
          "Block secret exfiltration",
          "Real SBOMs from kernel truth"
        ],
        tagline: "We don't document attacks. We prevent them. The SBOM is just proof."
      }
    }
  },

  comparison: {
    title: "The Uncomfortable Truth About \"Modern Security\"",
    traditional: {
      title: "What Everyone Else Does 📋",
      items: [
        "Scan your manifest files",
        "Check for known CVEs",
        "Generate compliance reports",
        "Alert after attacks succeed",
        "Document the damage"
      ],
      tagline: "\"Here's what happened to you\""
    },
    bomfather: {
      title: "What Bomfather Does 🛡️",
      items: [
        "Block attacks in real-time",
        "Enforce access at the kernel",
        "Prevent unauthorized actions",
        "Stop breaches before damage",
        "Prove what we prevented"
      ],
      tagline: "\"Here's what didn't happen to you\""
    }
  },

  howItWorks: {
    title: "Our Fundamentals",
    subtitle: "",
    steps: [
      {
        step: 1,
        title: "Default Deny, Not Default Pray",
        description: "Block everything except what you explicitly allow using a human readable YAML policy file.",
        code: `default: DENY_ALL
allow:
  - process: "go"
    can_read: "/src"
    children_inherit: true`,
        language: "yaml"
      },
      {
        step: 2,
        title: "Parent-Aware Enforcement",
        description: "Trust individual files or entire folders, it's your choice. When you trust a directory, all files within it and its subdirectories automatically inherit that trust. This means you can specify single programs when needed, or trust whole folder structures to avoid listing every file individually.",
        code: `python train.py            ✓ (trusted)
  └── dataloader.py       ✓ (inherits)
       └── augment.py     ✓ (inherits)

malicious.sh              ✗ (unknown)
  └── augment.py         ✗ (blocked - wrong parent!)`,
        language: "bash"
      }

    ]
  },

  features: {
    title: "Two Attack Vectors. One Real Solution.",
    subtitle: "AI theft & supply-chain attacks blocked at the same kernel layer.",
    features: [
      {
        title: "Protect AI",
        description: "Blocks GPU model theft others can't even see.",
        icon: "shield",
        benefits: [
          "Blocks GPU theft at kernel level",
          "Unauthorized programs can't use IPCs to access the GPU",
          "SHA256 verification of all data",
          "Zero workflow changes"
        ]
      },
      {
        title: "Protect Builds",
        description: "Stops supply-chain backdoors before they hit production.",
        icon: "lock",
        benefits: [
          "Default-deny all file access",
          "Control what reads your code",
          "Block secret exfiltration",
          "Real SBOMs from kernel truth"
        ]
      }
    ]
  },

  developerExperience: {
    title: "Built for Security Teams",
    subtitle: "Deploy kernel-level AI security with minimal overhead and maximum protection",
    sections: [
      {
        title: "Zero-Trust Configuration",
        description: "Define trusted resources and automatically block all unauthorized access attempts",
        code: `// Configure trust policies for AI models
const trustPolicy = {
  models: ['/models/production/*.pkl'],
  data: ['/data/secure/*.json'],
  executables: ['/bin/python', '/usr/bin/nvidia-smi']
};

// Enable GPU monitoring
bomfather.enableGPUMonitoring({
  trackCudaActivities: true,
  monitorMemoryTransfers: true,
  alertOnAnomalies: true
});`,
        language: "typescript"
      },
      {
        title: "Real-Time Threat Detection",
        description: "Monitor and respond to security threats as they happen with kernel-level visibility",
        code: `// Real-time security event monitoring
bomfather.onSecurityEvent((event) => {
  if (event.type === 'UNAUTHORIZED_ACCESS') {
    // Automatically block the threat
    bomfather.blockAccess(event.process);
    
    // Generate audit log with Merkle proof
    bomfather.audit.createTamperEvidenceRecord(event);
  }
});`,
        language: "typescript"
      }
    ],
    frameworks: [
      { name: "Linux Kernel", logo: "/frameworks/linux.svg", supported: true },
      { name: "eBPF", logo: "/frameworks/ebpf.svg", supported: true },
      { name: "CUDA", logo: "/frameworks/cuda.svg", supported: true },
      { name: "Docker", logo: "/frameworks/docker.svg", supported: true },
      { name: "Kubernetes", logo: "/frameworks/k8s.svg", supported: true },
      { name: "Cloud Native", logo: "/frameworks/cncf.svg", supported: true }
    ]
  },

  community: {
    title: "Kernel → Sky Security Briefing",
    githubStats: [
      { label: "Security Events Blocked", value: "1M+" },
      { label: "AI Models Protected", value: "10K+" },
      { label: "Zero-Day Stops", value: "100%" },
      { label: "Uptime", value: "99.99%" }
    ],
    integrations: [
      {
        name: "Kubernetes",
        logo: "/integrations/k8s.svg",
        description: "Deploy Bomfather security across your Kubernetes clusters with DaemonSets"
      },
      {
        name: "Docker",
        logo: "/integrations/docker.svg",
        description: "Container-level protection with kernel visibility into containerized AI workloads"
      },
      {
        name: "NVIDIA",
        logo: "/integrations/nvidia.svg",
        description: "Deep integration with CUDA runtime for comprehensive GPU security monitoring"
      },
      {
        name: "Cloud Providers",
        logo: "/integrations/cloud.svg",
        description: "Native support for AWS, GCP, Azure with cloud-specific security policies"
      }
    ]
  }
}; 