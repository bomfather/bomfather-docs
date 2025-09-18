---
title: "We're Replacing Our Kubernetes Ingress Stack with Cloudflare Tunnels, Here's Why"
description: "Why we're moving from NGINX/Ingress + Load Balancers to Cloudflare Tunnels: simpler ops, better security, global performance, and lower cost."
publishedAt: 2025-09-18T00:00:00Z
author: "The Bomfather Team"
# featuredImage: "/images/blog/cloudflare-tunnels-vs-ingress.jpg"
draft: false
---

As a startup, we hit a breaking point with Kubernetes networking before we launched. We were spending too much time debugging our ingress controllers.

Would the ingress controller restart cleanly? Would the cert manager remember to renew our certificates? Would our LoadBalancer IP suddenly change and take everything down?
We weren't engineering anymore. We were becoming YAML janitors.

Even after moving to Pulumi and writing our infrastructure in Go, we were still wrestling with the complexity of the underlying networking stack.

So we tried something radical. We ripped out our entire ingress stack and replaced it with Cloudflare Tunnels. No more LoadBalancers, no more ingress controllers, no more cert manager. And somehow, our infrastructure is already more reliable.

Here's why we made this decision.

## The Breaking Point

Our setup looked like every other small engineering team's Kubernetes cluster. We had a LoadBalancer that cost us fifteen bucks a month, pointing to an Nginx ingress controller. Behind that sat the cert-manager, which had one job, keeping our SSL certificates valid, and it failed at this very often. Also, the CRDs are a nightmare.

The architecture was textbook:

<div class="mermaid">
flowchart TB
    Internet["Internet"] --> LB["Load Balancer 15 USD per month"]
    LB --> Ingress["Nginx Ingress Controller"]
    Ingress --> CertManager["cert-manager"]
    CertManager --> API["API Service"]
    CertManager --> WS["WebSocket Service"]
    CertManager --> UI["Frontend Service"]

    style LB fill:#ffcccb
    style Ingress fill:#ffcccb
    style CertManager fill:#ffcccb
</div>

Every component in red was a potential failure point. And they failed. Often.

## The Radical Simplification

Here's the thing about Kubernetes networking, we treat it like it's necessary complexity. But what if it isn't?

What if, instead of exposing our services to the internet and managing all the security and routing ourselves, we just didn't expose them at all?

That's the core insight behind Cloudflare Tunnels. Your services stay completely private. No public IPs. No open ports. Instead, you create an encrypted tunnel from your cluster to Cloudflare's edge network:

<div class="mermaid">
flowchart TB
    Internet["Internet"] --> Cloudflare["Cloudflare Edge Network"]
    Cloudflare -->|encrypted tunnel| K8s["Kubernetes Services (private)"]

    style Cloudflare fill:#e1f5fe
    style K8s fill:#fff3e0
</div>

Traffic comes in through Cloudflare's massive global network, gets routed through your tunnel, and reaches your services. But from the internet's perspective, your services don't exist. They don't allow scanning, resist direct DDoS attacks, and remain reachable only through Cloudflare.

So, in the end, Cloudflare tunnels made our infrastructure simpler and it significantly increased our security posture.

## The Implementation

I was skeptical it could really be this simple. It was.

The irony here is that we actually use Pulumi and write our infrastructure in Go, not YAML. Part of escaping YAML hell was adopting real code for infrastructure. So our tunnel configuration looks very similar to:

``` go
tunnel, err := cloudflare.NewTunnel(ctx, "api-tunnel", &cloudflare.TunnelArgs{
    AccountId: pulumi.String(accountId),
    Name:      pulumi.String("production-tunnel"),
    Secret:    pulumi.String(base64.StdEncoding.EncodeToString(tunnelSecret)),
})

_, err = cloudflare.NewTunnelConfig(ctx, "tunnel-config", &cloudflare.TunnelConfigArgs{
    TunnelId:  tunnel.ID(),
    Config: &cloudflare.TunnelConfigConfigArgs{
        Ingress: Cloudflare.TunnelConfigIngressArray{
            &cloudflare.TunnelConfigIngressArgs{
                Hostname: pulumi.String("api.yourcompany.com"),
                Path:     pulumi.String("/api/*"),
                Service:  pulumi.String("<http://your-api-service.default.svc.cluster.local:8080>"),
            },
            // ... other routes
        },
    },
})

```

The concept is simple. You create a tunnel, configure routing, and deploy the daemon. The daemon creates an outbound connection to Cloudflare, and suddenly your services are available globally with HTTPS, DDoS protection, and a CDN.

No LoadBalancer to provision. No ingress controller. No cert manager to babysit.

## The Human Cost of Complexity

Look, saving $25 a month on infrastructure wasn't the point. That's coffee money.

The real cost is human attention. As an ultra small team, we can't afford to lose half a day to networking nonsense. Every hour spent debugging why the ingress controller is returning 502s is an hour not spent talking to users or shipping features.

We did the math, If each of us loses just four hours a month to networking issues, that's 144 hours a year. That's almost a month of engineering time, just gone.

With Cloudflare tunnels, those problems vanish. New services just work. Certificates renew themselves (or rather, Cloudflare handles it). Kubernetes upgrades don't break our networking.

We're getting that month back. We're spending it on shipping features.

## What We're Expecting

Based on our testing and research, here's what we're anticipating:

- Better uptime (Cloudflare's infrastructure is probably more reliable than our single-node ingress controller)
- Zero certificate renewal headaches
- Faster deployments (no waiting for LoadBalancer provisioning)
- Built-in DDoS protection and global CDN

Most importantly, we expect to stop thinking about networking. It should become invisible infrastructure, the way it's meant to be. When we need a new service exposed, we add three lines to a config file. When we need to change routing, we update that same file. Everything else just happens.

## The Gotchas

This isn't a silver bullet. There are a few things to watch out for:

WebSockets need some attention. Cloudflare supports them, but there are connection limits on the free tier, and some features require paid plans. We made sure to understand these limits before migrating, and we recommend you do the same.

The per request pricing might add up if you're pushing serious traffic and hundreds of millions of requests.

You're coupling yourself to Cloudflare. If they have an outage, you have an outage. Honestly, though, their uptime is probably better than our Kubernetes cluster's.

Some enterprise features, like SAML authentication or complex traffic policies, might require their higher-tier plans. Again, do your research.

## Should You Do This?

If you're a small to medium team drowning in Kubernetes networking complexity, you should definitely try this. Set up a tunnel for a non-critical service. Spend an hour with it. See how it feels to deploy something without thinking about ingress controllers.

If you're at a massive scale or have unique networking requirements, you probably need the control that traditional infrastructure provides. But even then, consider it for your development environments.

The question isn't whether this approach is perfect. It's whether it's better than what you're doing now.

## A Note on Transparency

Full disclosure, Cloudflare provides us with credits for its services through its startup program. But we made this architectural decision before any partnership existed, and we'd make the same choice if we didn't have credits. The time saved not debugging ingress controllers is worth far more than what we'd spend on tunnels.

## The Bottom Line

We're replacing our entire Kubernetes ingress stack with a few lines of Go code in Pulumi. Our infrastructure is getting simpler, faster, more reliable, and more secure. We're spending our time building features instead of debugging networking.

Sometimes the best solution isn't to manage complexity better. It's to eliminate it entirely.