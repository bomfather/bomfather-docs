
# Animation Playbook – Adapting Ideas from [LiveStore.dev](https://livestore.dev)

LiveStore’s site feels alive because every animation reinforces the message **(local-first data that syncs in real-time)** yet stays fast (no scroll-jank).  
Below is a curated list of effects we can port to **Bomfather** along with a “how-to‐build” cheat-sheet.

| # | Animation idea (where to place it) | Why it works on LiveStore | Adapted use-case for Bomfather | Implementation notes |
|---|-----------------------------------|---------------------------|--------------------------------|----------------------|
| 1 | **Reactive particle / “glow-dot” field in the hero** (already have basic dots) | Communicates “live, distributed signals” | Upgrade existing glow dots to a flowing, data-stream feel that subtly follows cursor & drifts | • Keep dots in `<canvas>` to avoid 100s of DOM nodes<br>• Library-free vanilla Canvas / TS (~80 LoC)<br>• For pointer attraction: use Perlin-noise + simple velocity steering |
| 2 | **Gradient shimmer sweeping across headline** | Makes the “build the next |” tagline sparkle | Run a soft iridescent sweep over “Runtime eBPF shield …” line | • Pure CSS `@keyframes` mask or GSAP `fromTo()`<br>• 7-10 s loop, linear blend-mode mask for battery-safe animation |
| 3 | **Scroll-triggered, staggered reveal** for each “Problem — Cost — Solution” card | Creates rhythmic storytelling | Trigger each card in “Story in Three Swipes” section to slide-up & fade one after another on viewport entry | • Use [Framer Motion](https://www.framer.com/motion/) hook inside Astro/React islands<br>• Fallback to `@keyframes` + `IntersectionObserver` if we want zero deps |
| 4 | **3-D tilt / “magnetic” hover** on CTA button | Adds delight, hints interactivity | Apply to “Schedule 10-min Kernel Demo” button | • Tiny lib: `vanilla-tilt` (2 kB) or custom `mousemove` transform<br>• Limit to ≤ 8° tilt, spring back on mouseleave |
| 5 | **Hand-drawn arrow scribble** that animates “drawing” on load | Signals “try this!” on LiveStore forms | We already show static arrow; animate its stroke for extra pop | • Export path to SVG, add `stroke-dasharray` / `stroke-dashoffset` CSS animation (3 s, ease-out) |
| 6 | **Live terminal “typewriter feed”** for Kernel Trace demo | Conveys real-time logs | Instead of static `<pre>`, stream lines in with slight delay & caret blink | • Small React island: iterate `lines` array, append via `setInterval`<br>• For realism: random ±100 ms jitter per line |
| 7 | **Feature cards flip to code snippet** on hover (LiveStore shows SQL under event) | Highlights dual view (events → SQL) | Flip card to show `ebpf` byte-code or syscall rule when hovered | • CSS 3-D flip (`transform-style: preserve-3d`) with 0.6 s ease<br>• Ensure prefers-reduced-motion honors no-flip |
| 8 | **Subtle parallax background shapes** behind feature grid | Adds depth without distraction | Add blurred “shield” motif that moves slower than scroll | • Use `background-position` manipulation in `scroll` handler OR CSS `background-attachment: fixed` (mobile fallback to static) |
| 9 | **Path-following bubbles** that illustrate data-flow | LiveStore shows events propagating | Draw curved SVG path from GPU icon → Shield icon; animate small circles along path | • SVG `<animateMotion>` (no JS) works in all evergreen browsers<br>• Keep path in design system for reuse |
|10 | **Auto-expanding accordion FAQ with spring physics** | Keeps docs compact yet lively | Replace current static bullet list in “Why Now?” with accordion | • With Framer Motion’s `AnimatePresence` + `layout="position"`; only ships to page where used (tree-shaken) |

---

## Quick Start Recipes

1. **Install minimal bundle of animation helpers**

```bash
pnpm add framer-motion@^11 vanilla-tilt@^2
```

2. **Set up a shared Motion component wrapper**

```tsx
// frontend/src/components/Motion.tsx
import { motion } from 'framer-motion';
export const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}>
    {children}
  </motion.div>
);
```

3. **Respect user preferences**

```css
@media (prefers-reduced-motion: reduce) {
  .animated,
  [data-motion] {
    animation: none !important;
    transition: none !important;
  }
}
```

4. **Performance budget**

• Keep JS animation payload < 35 kB gzipped (Framer Motion tree-shakes to ~18 kB per page)  
• Prefer CSS GPU-accelerated transforms (`translate`, `opacity`)  
• Throttle scroll events (`requestAnimationFrame`) or lean on `IntersectionObserver`

---

## Roll-out Plan

1. **Phase 1 (2 days)** – Swap hero dots → Canvas particle field; add stroke-draw arrow.  
2. **Phase 2 (3 days)** – Integrate Framer Motion island; wire fade-ups + CTA tilt.  
3. **Phase 3 (4 days)** – Implement live typewriter feed & card flips.  
4. **Phase 4 (1 day)** – QA on mobile / reduced-motion; Lighthouse perf audit.

Total effort: **~10 dev-days**

---

### Sources / Inspiration
* LiveStore hero & dev-tools demo studied at: [LiveStore.dev](https://livestore.dev)  
* Framer Motion Docs – https://www.framer.com/motion  
* CSS “stroke-dasharray” technique – MDN: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray

---

By layering these focused, purposeful animations we convey **“always-on kernel protection”** without sacrificing performance—or overwhelming users.
