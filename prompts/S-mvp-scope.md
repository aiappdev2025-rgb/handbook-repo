---
id: "S-mvp-scope"
title: "MVP Scoping Prompt"
tool: "claude-chat"
variant: "canonical"
source: "archive/docusaurus/docs"
---

```text
Define MVP scope for [PRODUCT_NAME].

**Product Concept**: [PRODUCT_CONCEPT]
**Target Customer**: [TARGET_CUSTOMER]
**Problem**: [PROBLEM_STATEMENT]

Current feature ideas: [MVP_FEATURES]

Help me scope using the MoSCoW method:

For each feature, categorize as:
- **Must Have**: Required for launch (max 3-5)
- **Should Have**: Important but can wait for v1.1
- **Could Have**: Nice but defer to v2
- **Won't Have**: Explicitly out of scope

Also identify:
1. The "one thing" this MVP does exceptionally well
2. What's explicitly OUT of scope for v1
3. Estimated build complexity for each Must Have feature
4. Technical risks to watch for
5. Launch criteria (what defines "done"?)

Output as MVP Scope document in markdown format.
```
