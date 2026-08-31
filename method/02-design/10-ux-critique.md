---
chapter: 10
title: "UX Critique and Validation"
slug: "ux-critique"
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
source_html: "archive/html-v3/handbook/phase2/chapter-10-ux-critique.html"
---

# Chapter 10: UX Critique and Validation

In this chapter, you'll validate your UX Package through a structured critique process to catch usability issues before building. A 10-minute critique now saves hours of rework later. By the end of this chapter, you'll have a refined UX Package that's ready for UI design and implementation.

## 10.1 UX Critique

Before proceeding to UI design, the UX Package should be critiqued for usability issues, missing states, and flow problems. This step catches design flaws that are expensive to fix during implementation.

> **Run in:** Claude Chat · **Session:** Same Chat · critique in same chat

> Prompt file: [`prompts/D-10-1-ux-critique-and-validation.md`](../../prompts/D-10-1-ux-critique-and-validation.md)

```text
Review this UX Package as a UX expert. Identify:

1. **Usability Issues**: Friction points, confusing flows, cognitive overload
2. **Missing States**: Empty states, error states, loading states not defined
3. **Edge Cases**: Scenarios not covered
4. **Accessibility Gaps**: Issues for users with disabilities
5. **Mobile Considerations**: Touch targets, thumb zones, scrolling

For each issue, suggest a specific improvement.

[ATTACH UX PACKAGE]
```

> **Expected Outcome**
>
> **What you should have:** A critique report identifying specific issues across the five categories: usability, missing states, edge cases, accessibility, and mobile considerations.
>
> **How to validate:** The critique should identify at least 5-10 issues with specific, actionable improvement suggestions for each.
>
> **Next:** Incorporate the feedback into your UX Package.

## 10.2 Decision Framework

Not every critique item needs immediate action. Use this framework to systematically evaluate each finding and decide whether to fix now, defer to a future version, or reject as not applicable.

### Decision Matrix

| Fix Now | Defer | Rationale |
| --- | --- | --- |
| Blocks core user flow | Nice-to-have enhancement | Core flows must work for MVP |
| Creates confusion in money path | Affects edge case only | Money path (signup → payment → value) is critical |
| Violates accessibility baseline | Requires significant rework | Accessibility is non-negotiable |
| Simple fix (< 1 hour impact) | Complex fix (multi-day impact) | Time-box MVP scope |
| Affects >50% of users | Affects <10% of users | Prioritize by impact |

### Decision Questions

For each critique item, ask yourself:

1. **Does this block the core user journey?** → Fix now
2. **Does this affect the money path** (signup → payment → value delivery)? → Fix now
3. **Is this an accessibility violation?** → Fix now
4. **Can I fix this in under an hour of design work?** → Probably fix now
5. **Is this a "would be nice" enhancement?** → Likely defer to v1.1

> **Note:** Why This Matters:
>
> The UX Package feeds directly into the UI System and Build Contract. Unresolved UX issues become implementation problems. Deferred items need documentation so they're not forgotten.

## 10.3 Critique Review Template

Before generating the revised UX Package, work through each critique item manually. This ensures you've made deliberate decisions rather than blindly accepting or rejecting feedback.

```text
## UX Critique Review - [Product Name]

### Items to Fix (incorporate into revised UX Package)

| # | Issue | Section Affected | How to Fix |
|---|-------|------------------|------------|
| 1 | [Issue from critique] | [e.g., User Flow 2.3] | [Brief fix approach] |
| 2 | | | |
| 3 | | | |

### Items to Defer (document for future)

| # | Issue | Why Deferred | Revisit When |
|---|-------|--------------|--------------|
| 1 | [Issue from critique] | [Rationale] | [e.g., v1.1, post-launch] |
| 2 | | | |

### Items to Reject (not actual issues)

| # | Issue | Why Rejected |
|---|-------|--------------|
| 1 | [Issue from critique] | [e.g., Critic misunderstood context] |
```

> **⚠ Warning:** **Don't Skip This Step:** It's tempting to jump straight to the revision prompt. But without this review, you risk either accepting bad suggestions or missing legitimate issues. Take 10-15 minutes to complete the template.

## 10.4 UX Package Revision Prompt

After completing the review template, use this prompt to generate a revised UX Package that incorporates all your fixes while maintaining the original structure.

> **Run in:** Claude Chat · **Session:** Same Chat · continues UX work

> Prompt file: [`prompts/D-10-2-ux-critique-and-validation.md`](../../prompts/D-10-2-ux-critique-and-validation.md)

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

> **Expected Outcome**
>
> **What you should have:** A complete revised UX Package that incorporates all fixes, documents deferred items, and includes revision notes explaining what changed.
>
> **How to validate:** Compare the revision notes against your "Items to Fix" table. Every fix item should appear in the revision notes with a corresponding section change.

## 10.5 Verification Checklist

After generating the revised UX Package, verify the revision is complete and correct:

### Revision Verification

- [ ] All "Fix" items have been incorporated
- [ ] No sections were accidentally removed from original
- [ ] User flows still make logical sense after changes
- [ ] State diagrams updated if flows changed
- [ ] Edge cases section updated if new cases identified
- [ ] "Known Limitations" section includes all deferred items
- [ ] Revision notes clearly document what changed

## 10.6 When to Re-run the Critic

After significant revisions, consider running the UX Critique prompt (Section 10.1) again on the revised package. This catches any new issues introduced by your changes.

### Re-run the critic if:

- You made changes to the core user flow
- You restructured the information architecture
- You added new screens or states
- The original critique had 5+ "critical" severity items

### Skip re-running if:

- Changes were limited to copy/microcopy improvements
- You only addressed minor flow tweaks
- The original critique found no critical issues

> **Note:** Iterate as Needed:
>
> Some products require 2-3 critique cycles before the UX Package is solid. This is normal for complex flows. Always update the same file rather than creating separate versions.

## 10.7 Save the Revised Package

Save the revised UX Package to your project. You can either replace the original or keep both versions for reference.

### Options

- **Replace original:** Save as `docs/ux-package.md` (recommended for active projects)
- **Keep history:** Save as `docs/ux-package-v1.1.md` and keep the original

> **Expected Outcome**
>
> **What you should have:** An updated `docs/ux-package.md` that addresses all identified issues and documents deferred improvements.
>
> **How to validate:** Open the file and verify it includes the "Revision Notes" and "Known Limitations" sections at the end.
>
> **Next:** Chapter 11 — Create the UI System that defines visual design.

## 10.8 Chapter Summary

You've completed the UX validation and revision phase. Here's what you accomplished:

- Critiqued UX Package for usability, accessibility, and completeness issues
- Applied decision framework to evaluate each critique finding
- Documented fix/defer/reject decisions in review template
- Generated revised UX Package with improvements incorporated
- Documented known limitations for future versions
- Verified the revision is complete and correct

Your user experience is now fully specified, validated, and refined. The revised UX Package is ready to feed into the UI System in the next chapter.
