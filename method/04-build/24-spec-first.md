---
chapter: 24
title: "SPEC-First Development"
slug: "spec-first"
phase: 4
phase_name: "Build"
milestone: null
checkpoint: null
tool: null
session: null
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase4/chapter-24-spec-first.html"
---

# Chapter 24: SPEC-First Development

In this chapter, you'll learn the SPEC-First Development approach—writing requirements and test cases before any code. You'll master the EARS requirements format and GIVEN-WHEN-THEN test case structure. By the end of this chapter, you'll be able to write clear, testable specifications.

> **Note:** Read for Understanding
>
> — Learn the EARS requirements format and test case structure. You'll write SPECs using these patterns for each feature before coding.

## 24.1 EARS Requirements Format

EARS (Easy Approach to Requirements Syntax) provides five patterns for writing unambiguous requirements. Using these patterns ensures your requirements are testable and clear.

| Type | Pattern | Example |
| --- | --- | --- |
| Ubiquitous | The [system] shall [action] | The upload zone shall accept JPEG, PNG, and HEIC formats. |
| State-Driven | While [state], the [system] shall [action] | While uploading, the system shall display progress. |
| Event-Driven | When [event], the [system] shall [action] | When user clicks generate, the system shall call the AI API. |
| Optional | Where [condition], the [system] shall [action] | Where user is Pro tier, the system shall enable all styles. |
| Unwanted | The [system] shall not [action] | The system shall not store raw API keys. |

## 24.2 Test Case Format

Test cases use the GIVEN-WHEN-THEN format, which clearly separates preconditions, actions, and expected outcomes. This format maps directly to test code structure.

```text
### TC-PHOTO-001: Valid image upload

**GIVEN** a user is on the create listing page
  AND the user has selected a valid JPEG image
**WHEN** the user drops the image on the upload zone
**THEN** the system displays an upload progress indicator
  AND the image appears in the preview grid after upload completes
```

> **What You Need to Do**
>
> 1. **Write SPECs before coding** — For each feature, create a SPEC document in `docs/specs/` using the template in Appendix A
> 2. **Use EARS format for requirements** — Every requirement must follow one of the five EARS patterns above
> 3. **Create test cases for each requirement** — At minimum, one test case per requirement; complex requirements may need multiple
> 4. **Reference Build Contract sections** — Each SPEC must cite the relevant Build Contract sections it implements
>
> **Manual Steps:**
>
> # Create a new SPEC file touch docs/specs/SPEC-AUTH-001.md # Copy the template from Appendix A and customize # Ensure all [PLACEHOLDER] values are replaced
>
> **With Claude Code:**
>
> claude "Create SPEC-AUTH-001 for user login using the template in docs/specs/ Reference Build Contract section 2.3 for authentication requirements"

> **Expected Outcome**
>
> **What you should understand:** The five EARS requirement patterns and how to write GIVEN-WHEN-THEN test cases that map to each requirement.
>
> **What you should be able to do:** Write a SPEC document with properly formatted requirements and test cases for any feature.
>
> **Next:** Chapter 25 — Learn the TDD workflow that implements your SPECs.

## 24.3 Chapter Summary

You've learned SPEC-First Development. Key takeaways:

- Write SPECs before any code—requirements and test cases first
- Use EARS format for unambiguous, testable requirements
- Use GIVEN-WHEN-THEN format for clear test cases
- Every SPEC references relevant Build Contract sections
- At minimum, one test case per requirement

In the next chapter, you'll learn the TDD workflow that transforms your SPECs into tested, working code.
