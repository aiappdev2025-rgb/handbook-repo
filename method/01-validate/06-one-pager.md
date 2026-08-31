---
chapter: 6
title: "Stage 1.0 — Business One-Pager"
slug: "one-pager"
phase: 1
phase_name: "Validate"
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
source_html: "archive/html-v3/handbook/phase1/chapter-06-one-pager.html"
---

# Chapter 6: Stage 1.0 — Business One-Pager

In this chapter, you'll create your Business One-Pager—a concise document that forces clarity on your business model before design begins. This document synthesizes your research into actionable business decisions: pricing, positioning, target customer, and go-to-market strategy. By the end of this chapter, you'll have a single page that anyone can read to understand what you're building and why it will succeed.

## 6.1 Purpose

The Business One-Pager forces clarity on the business model before design begins. Many products fail because founders skip this step and jump straight into building. They end up with a product nobody wants to pay for, or one that's priced wrong, or one that reaches the wrong audience.

**What you'll accomplish:** Create a comprehensive business summary covering problem, solution, target customer, value proposition, pricing, go-to-market strategy, success metrics, and key risks.

## 6.2 One-Pager Prompt

Continue in the same Claude Chat session where you conducted research. This gives Claude full context of your market findings, which it will use to inform realistic business decisions. The output should be a standalone document that makes sense without needing to read the research.

> **Run in:** Claude Chat · **Session:** Same Chat · continues from Research

> Prompt file: [`prompts/V-06-1-stage-1-0-business-one-pager.md`](../../prompts/V-06-1-stage-1-0-business-one-pager.md)

```text
Create a Business One-Pager for my SaaS product.

**Product Concept**: [DESCRIBE YOUR PRODUCT]
**Target Customer**: [WHO IS THIS FOR]
**Research Findings**: [ATTACH OR SUMMARIZE RESEARCH]

The one-pager should cover:

1. **Problem Statement**: What specific problem are we solving?
2. **Solution Overview**: How does our product solve it?
3. **Target Customer Profile**: Demographics, psychographics, buying behavior
4. **Value Proposition**: Why choose us over alternatives?
5. **Pricing Strategy**: Price point, model (subscription, usage, tiered), justification
6. **Go-to-Market**: Initial acquisition channels, launch strategy
7. **Success Metrics**: What does success look like in 6 months? 12 months?
8. **Key Risks**: What could make this fail? How do we mitigate?

Output in markdown format, ready to save as docs/one-pager.md.
```

> **Expected Outcome**
>
> **What you should have:** A Business One-Pager document (typically 500-1,000 words) covering all eight sections: problem, solution, target customer, value proposition, pricing, go-to-market, success metrics, and key risks.
>
> **How to validate:** Each section should be specific and actionable. Pricing should include actual numbers. Go-to-market should name specific channels. Success metrics should be measurable.
>
> **Next:** Save the One-Pager to your project.

## 6.3 Save the One-Pager

The One-Pager must be saved as a file so it can be referenced by all subsequent stages. This document becomes the business foundation that design, architecture, and implementation all trace back to.

### Instructions

1. Create a `docs/` folder in your project directory (if it doesn't exist)
2. Copy the complete One-Pager output from Claude Chat
3. Save as `docs/one-pager.md`

> **Expected Outcome**
>
> **What you should have:** A file at `docs/one-pager.md` containing your complete Business One-Pager.
>
> **How to validate:** Open the file and verify all eight sections are present. The file should be readable in 2-3 minutes by someone unfamiliar with your project.
>
> **Next:** Chapter 7 — Create the Shared Design Brief that will guide all design decisions.

## 6.4 Chapter Summary

You've completed the Business One-Pager phase. Here's what you accomplished:

- Synthesized research findings into business decisions
- Defined your target customer and value proposition
- Established pricing strategy and go-to-market approach
- Identified success metrics and key risks
- Saved the document for reference in subsequent stages

Your business foundation is ready. In the next chapter, you'll create the Shared Design Brief—the single source of truth that establishes vocabulary and requirements for your product.
