---
id: "S-user-flows"
title: "UX Flows Critique Prompt"
tool: "claude-chat"
variant: "canonical"
source: "archive/docusaurus/docs"
---

```text
Review the UX flows for [PRODUCT_NAME] as a UX expert.

**User Personas**: [USER_PERSONAS]
**Core Features**: [CORE_FEATURES]
**Key User Flows**: [USER_FLOWS]

Identify issues in these categories:

1. **Usability Issues**: Friction points, confusing flows, cognitive overload
2. **Missing States**: Empty states, error states, loading states not defined
3. **Edge Cases**: Scenarios not covered (first-time user, power user, edge data)
4. **Accessibility Gaps**: Issues for users with disabilities (keyboard nav, screen readers)
5. **Mobile Considerations**: Touch targets, thumb zones, scrolling, gestures

For each issue found:
- Describe the problem
- Rate severity (High/Medium/Low)
- Suggest a specific improvement

Output in markdown format as a structured critique document, ready to save as docs/user-flows-critique.md
```
