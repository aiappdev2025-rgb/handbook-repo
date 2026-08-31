---
chapter: 12
title: "Visual Direction Options"
slug: "visual-direction"
phase: 2
phase_name: "Design"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "same-chat"
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase2/chapter-12-visual-direction.html"
---

# Chapter 12: Visual Direction Options

In this optional chapter, you'll explore multiple visual directions before committing to a final design. This step is recommended for products where visual appeal is a key differentiator. By the end of this chapter, you'll have confidence that you've chosen the right aesthetic for your audience.

## 12.1 Visual Direction Options (Optional)

For important projects, exploring multiple visual directions before committing helps ensure you choose the right aesthetic for your audience. This step is optional but recommended for products where visual appeal is a key differentiator.

> **Run in:** Claude Chat · **Session:** Same Chat · optional exploration

> Prompt file: [`prompts/D-12-1-visual-direction-options.md`](../../prompts/D-12-1-visual-direction-options.md)

```text
Present 3 distinct visual directions for [PRODUCT NAME]:

**Direction A**: [Description - e.g., "Minimal and Professional"]
**Direction B**: [Description - e.g., "Bold and Modern"]
**Direction C**: [Description - e.g., "Warm and Approachable"]

For each direction, provide:
- Color palette (with hex codes)
- Typography choices
- Sample component (button, card)
- Mood/feeling conveyed
- Best suited for which audience
```

> **Expected Outcome**
>
> **What you should have:** Three distinct visual direction options, each with color palettes, typography, and sample components.
>
> **How to validate:** Each direction should feel noticeably different. If they all look similar, ask Claude to make the differences more pronounced.
>
> **Next:** Choose a direction and regenerate your UI System, or keep the original if you're satisfied.

## 12.2 Choosing and Applying a Direction

If you explore multiple directions and choose one, ask Claude to regenerate the UI System with the chosen direction. Then update `docs/ui-system.md` with the new version.

### When to Explore Alternatives

- **Do explore:** Consumer products, brand-driven products, products competing on design
- **Skip:** Internal tools, B2B utilities, time-constrained MVPs

### Making the Choice

Consider these factors when choosing a visual direction:

- **Target audience:** What resonates with them?
- **Competitive positioning:** How do competitors look? Differentiate or align?
- **Brand values:** What does your brand stand for?
- **Implementation effort:** Some directions require more custom work

## 12.3 Part I Complete

You've now completed Part I: Strategy & Design. Here's what you've created:

- **Research:** Market validation and competitive analysis
- **Business One-Pager:** Business model and go-to-market strategy
- **Design Brief:** Product vision and canonical vocabulary
- **UX Package:** Complete screen and flow specifications
- **UI System:** Visual design language and component specifications

These design artifacts form the foundation for technical implementation. In Part 2, you'll use these documents to create the technical architecture, set up infrastructure, and generate the Build Contract that bridges design to code.

> **Expected Outcome**
>
> **What you should have:** All design artifacts saved in your `docs/` folder: one-pager.md, design-brief.md, ux-package.md, ui-system.md.
>
> **What's next:** Part 2 — Architecture & Setup. Create the technical architecture and configure your development infrastructure.

## 12.4 Chapter Summary

You've completed the UI System phase. Here's what you accomplished:

- Defined design tokens for colors, typography, spacing, and shadows
- Created a component library with specifications for all UI elements
- Established a layout system with grid and breakpoints
- Set visual direction for the overall aesthetic
- Optionally explored alternative visual directions

Your design system is complete. You now have all the design artifacts needed to move into technical implementation: Research, Business One-Pager, Design Brief, UX Package, and UI System. In Part 2, you'll use these documents to create the technical architecture and set up your development infrastructure.
