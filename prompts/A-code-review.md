---
id: "A-code-review"
title: "Code Review Request"
tool: "claude-code"
milestone: null
variant: "canonical"
source: "archive/html-v3/archive/build-guide-v3.html"
---

```text

  
  ROLE
Senior Developer conducting a thorough code review.

CONTEXT
Project: {{productName}}
Milestone: {{milestone name}}
Files to review are pasted below.

OBJECTIVE
Review the code for quality, security, and best practices.

REVIEW CRITERIA

STRUCTURE (score 1-5)
- Functions appropriately sized?
- Files appropriately sized?
- Clear separation of concerns?
- Dependencies explicit?

SIMPLICITY (score 1-5)
- Code readable without explanation?
- Names reveal intent?
- No unnecessary complexity?
- Comments explain "why" where needed?

SAFETY (score 1-5)
- Inputs validated at boundaries?
- Errors handled explicitly?
- Auth/authz checks in place?
- No sensitive data exposure?

PERFORMANCE (score 1-5)
- No obvious inefficiencies?
- No N+1 queries?
- Appropriate data fetching?

STABILITY (score 1-5)
- Edge cases handled?
- States handled (loading, error, empty)?
- Code maintainable long-term?

OUTPUT FORMAT

SUMMARY
Overall assessment and scores

ISSUES (grouped by severity)
Critical: Must fix before merging
Warning: Should fix soon
Suggestion: Nice to have

For each issue:
- File and location
- Problem description
- Suggested fix with code

PRAISE
What's done well (important for learning)

CODE TO REVIEW
{{paste code files here}}
```
