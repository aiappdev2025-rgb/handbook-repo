---
chapter: 44
title: "Competitive Analysis"
slug: "44-competitive-analysis"
phase: 1
phase_name: "Validate"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "continue"
estimated_time: "20 min read"
description: "Analyze competitors systematically to find differentiation angles and inform your pricing strategy"
prerequisites:
  - "Business One-Pager complete"
  - "Target customer defined"
when_to_use:
  - "You know your market but not your competitors in depth"
  - "You need to find differentiation angles"
  - "Your pricing strategy is undefined"
skip_if: "You're operating in a brand new market with no competitors (rare)"
source_mdx: "archive/docusaurus/docs/phase-1-validate/competitive-analysis.mdx"
---

# Chapter 44: Competitive Analysis

> **TL;DR**
> Deep-dive into 5-10 competitors to understand their positioning, pricing, strengths, weaknesses, and gaps you can exploit.
>
> **Why:** You can't differentiate if you don't know what you're differentiating from—competitive analysis reveals your strategic opportunities.
>
> **Outcome:** A competitive analysis document with positioning map, feature comparison, and clear differentiation strategy.

> **When to use**
>
> - You know your market but not your competitors in depth
> - You need to find differentiation angles
> - Your pricing strategy is undefined
>
> **Skip if:** You're operating in a brand new market with no competitors (rare)

**Prerequisites**

- [ ] Business One-Pager complete
- [ ] Target customer defined

## Why Deep Competitive Analysis?

Your market research identified competitors. Now you need to understand them deeply enough to:
- Find gaps they're not serving
- Position yourself differently
- Price competitively
- Learn from their mistakes

## The Analysis Framework

### 1. Competitor Identification

List all competitors in three tiers:

| Tier | Description | Examples |
|------|-------------|----------|
| **Direct** | Same solution, same customer | Your closest competitors |
| **Indirect** | Different solution, same problem | Alternative approaches |
| **Potential** | Could enter market easily | Adjacent products, big players |

### 2. Per-Competitor Deep Dive

For each direct competitor (5-10 total), document:

#### Basic Information
- Company name and URL
- Founded date
- Funding (if known)
- Team size (if known)

#### Product Analysis
- Core features
- Pricing model and tiers
- Target customer segment
- Unique selling proposition

#### Strengths & Weaknesses
- What do they do well?
- Where do they fall short?
- What do customers complain about? (Check reviews, forums, social media)

#### Market Position
- Premium vs budget
- Enterprise vs SMB
- Generalist vs specialist

### 3. Feature Comparison Matrix

Create a comparison of key features:

| Feature | Your Product | Competitor A | Competitor B | Competitor C |
|---------|--------------|--------------|--------------|--------------|
| Feature 1 | ✅ | ✅ | ❌ | ✅ |
| Feature 2 | ✅ | ❌ | ✅ | ❌ |
| Feature 3 | ✅ | ✅ | ✅ | ✅ |
| Price | $X/mo | $Y/mo | $Z/mo | $W/mo |

### 4. Positioning Map

Plot competitors on two dimensions that matter to your customers:

```
High Price
    │
    │    ○ Enterprise Player
    │
    │         ○ Premium Tool
    │
────┼──────────────────────────
    │    ★ YOUR POSITION
    │
    │  ○ Budget Option
    │
Low Price

    Simple ←────────────→ Complex
```

## Competitive Analysis Prompt

### Competitive Analysis Prompt

> Prompt file: [`prompts/S-competitive-analysis.md`](../../prompts/S-competitive-analysis.md)

```text
Analyze competitors for [PRODUCT_NAME].

**Our Product**: [PRODUCT_CONCEPT]
**Target Customer**: [TARGET_CUSTOMER]
**Known Competitors**: [COMPETITORS]

For each competitor, analyze:
1. **Basic Info**: Company name, URL, founding date, funding
2. **Product**: Core features, pricing model and tiers
3. **Strengths**: What do they do well?
4. **Weaknesses**: Where do they fall short? (Check G2, Capterra, Reddit reviews)
5. **Target Audience**: Who are they serving?
6. **Key Differentiators**: What makes them unique?

Then provide:
- **Feature Comparison Matrix**: Key features vs each competitor
- **Positioning Map**: Price vs complexity grid
- **Gap Analysis**: Opportunities competitors aren't serving
- **Our Differentiation Strategy**: How we should position against them

Output in markdown format as docs/competitive-analysis.md.
```

## Finding Competitor Weaknesses

The best differentiation comes from competitor weaknesses. Look for:

| Weakness Type | What to Look For |
|---------------|------------------|
| **Feature gaps** | "I wish it could..." reviews |
| **Price complaints** | "Too expensive for what you get" |
| **Complexity issues** | "Hard to set up", "Steep learning curve" |
| **Support problems** | "Never responds to tickets" |
| **Performance issues** | "Slow", "Crashes", "Unreliable" |
| **Integration gaps** | "Doesn't work with [tool I use]" |

:::tip Review Mining
G2, Capterra, Product Hunt, and Reddit are goldmines for competitor weaknesses. Search "[Competitor] complaints" or "[Competitor] alternative" to find pain points.
:::

## Differentiation Strategies

Choose one primary differentiation:

| Strategy | Description | Example |
|----------|-------------|---------|
| **Price** | Significantly cheaper | "Same features, half the price" |
| **Simplicity** | Easier to use | "Set up in 5 minutes, not 5 hours" |
| **Niche** | Serve a specific segment better | "Built specifically for [role]" |
| **Feature** | Unique capability | "The only tool that does X" |
| **Integration** | Better ecosystem fit | "Native integration with [popular tool]" |
| **Service** | Superior support | "White-glove onboarding included" |
