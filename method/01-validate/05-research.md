---
chapter: 5
title: "Stage 0.1 — Research and Opportunity Assessment"
slug: "research"
phase: 1
phase_name: "Validate"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "new-chat"
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase1/chapter-05-research.html"
---

# Chapter 5: Stage 0.1 — Research and Opportunity Assessment

In this chapter, you'll conduct market research to validate your product opportunity before investing time in design and development. Research is the foundation of every successful SaaS product—it ensures you're building something people actually need and will pay for. By the end of this chapter, you'll have documented evidence of market demand, competitive positioning, and customer pain points.

## 5.1 Purpose

Research validates that a real market opportunity exists. Many products fail not because they're poorly built, but because they solve problems nobody has or compete in markets too crowded to enter. This stage forces you to gather evidence before committing resources.

**What you'll accomplish:** Generate comprehensive market research covering market size, competitive landscape, customer pain points, trends, and barriers to entry.

## 5.2 Research Prompt

This prompt uses Claude Chat's web search capabilities to gather current market data. Start a fresh chat to give Claude full context for exploring your market opportunity. Be specific about your angle or differentiator to get targeted insights.

> **Run in:** Claude Chat · **Session:** New Chat · start of your project

> Prompt file: [`prompts/V-05-1-stage-0-1-research-and-opportunity-assessment.md`](../../prompts/V-05-1-stage-0-1-research-and-opportunity-assessment.md)

```text
I'm evaluating an opportunity in [MARKET/INDUSTRY]. I need comprehensive research covering:

1. **Market Size**: TAM, SAM, SOM with data sources
2. **Competitive Landscape**: Major players, their strengths/weaknesses, pricing
3. **Customer Pain Points**: What problems remain unsolved or poorly solved
4. **Trends**: Where is this market heading in 2-3 years
5. **Barriers to Entry**: What makes this market hard to enter

Please search for recent data (within the last 2 years) and cite sources.

My specific angle is: [YOUR DIFFERENTIATOR OR APPROACH]
```

> **Expected Outcome**
>
> **What you should have:** A comprehensive research document (typically 1,000-2,000 words) covering all five areas: market size, competitive landscape, customer pain points, trends, and barriers to entry.
>
> **How to validate:** The research should include specific numbers (TAM/SAM/SOM), at least 5 named competitors with analysis, and customer quotes or review excerpts showing real pain points.
>
> **Next:** Validate your research against the criteria below.

## 5.3 Validation Criteria

Before proceeding to the Business One-Pager, validate your research against this checklist. Each criterion ensures you have sufficient evidence to make informed product decisions. If any item is missing, ask Claude for additional research on that specific area.

### Research Complete Checklist

- [ ] Market size quantified with credible sources
- [ ] At least 5 competitors identified with positioning analysis
- [ ] Customer pain points validated by real user feedback (reviews, forums, surveys)
- [ ] Clear differentiator identified that is not easily copied
- [ ] No fatal barriers to entry discovered

> **Expected Outcome**
>
> **What you should have:** All checklist items verified, giving you confidence that a real market opportunity exists.
>
> **How to validate:** You can articulate in one sentence: the market size, your top 3 competitors, your key differentiator, and the primary customer pain point you're solving.
>
> **Next:** Chapter 6 — Create your Business One-Pager based on this research.

## 5.4 Chapter Summary

You've completed the Research and Opportunity Assessment phase. Here's what you accomplished:

- Gathered market size data with credible sources
- Analyzed competitive landscape and identified gaps
- Documented customer pain points with real evidence
- Validated your differentiator and entry strategy

Your research foundation is ready. In the next chapter, you'll synthesize these findings into a Business One-Pager that clarifies your business model and go-to-market strategy.
