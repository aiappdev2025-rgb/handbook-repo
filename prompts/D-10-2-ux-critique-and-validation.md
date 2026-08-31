---
id: "D-10-2"
title: "UX Critique and Validation"
tool: "claude-chat"
chapter: 10
variant: "canonical"
source: "archive/html-v3/handbook"
---

```text
[ROLE: UX DESIGNER — Revise the UX Package based on critique findings]

CONTEXT: I have completed a UX Package for [PRODUCT NAME] and run it through a UX Critic review. I've decided which issues to fix now vs. defer. I need you to generate a revised UX Package that incorporates all the fixes while maintaining the original structure.

ORIGINAL UX PACKAGE:
<<<
[Paste your complete UX Package from Stage 3.0]
>>>

UX CRITIQUE FINDINGS:
<<<
[Paste the full output from Stage 3.1 UX Critic]
>>>

MY DECISIONS ON EACH ISSUE:

Items to FIX (incorporate these improvements):
<<<
[Paste your "Items to Fix" table from the review template]
>>>

Items DEFERRED (note these for future):
<<<
[Paste your "Items to Defer" table from the review template]
>>>

Items REJECTED (ignore these):
<<<
[Paste your "Items to Reject" table, or "None"]
>>>

INSTRUCTIONS:
1. Generate a COMPLETE revised UX Package (not just the changes)
2. For each "Fix" item, update the relevant section with the improvement
3. Maintain the exact same structure as the original UX Package
4. Add a new section at the end: "Known Limitations & Future Improvements" listing all deferred items
5. Add a "Revision Notes" section documenting what changed from the original

OUTPUT FORMAT:

# UX Package - [Product Name]
## Revision 1.1 (Post-Critique)

[Complete revised UX Package with same structure as original]

---

## Revision Notes

### Changes from v1.0
| Section | Change | Rationale |
|---------|--------|-----------|
| [Section #] | [What changed] | [Why, referencing critique item] |

### Known Limitations & Future Improvements
| Item | Description | Target Version |
|------|-------------|----------------|
| [Deferred item] | [Brief description] | [v1.1 / Post-launch / etc.] |
```
