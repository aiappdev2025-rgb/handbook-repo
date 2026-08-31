---
id: "S-competitive-analysis"
title: "Competitive Analysis Prompt"
tool: "claude-chat"
variant: "canonical"
source: "archive/docusaurus/docs"
---

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
