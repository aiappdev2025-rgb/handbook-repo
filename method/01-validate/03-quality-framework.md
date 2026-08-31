---
chapter: 3
title: "The Quality Framework — Five Pillars"
slug: "quality-framework"
phase: 1
phase_name: "Validate"
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
source_html: "archive/html-v3/handbook/phase1/chapter-03-quality-framework.html"
---

# Chapter 3: The Quality Framework — Five Pillars

In this chapter, you'll learn the Five Pillars quality framework—concrete standards for evaluating every piece of code. These pillars (Structure, Simplicity, Safety, Speed, Stability) provide specific criteria that prevent the vibe coding patterns from Chapter 2. By the end of this chapter, you'll have a checklist for evaluating code quality.

## 3.1 Structure

Structure is about organizing code so that each piece has a clear purpose and location. Good structure makes code navigable and maintainable.

### Key Principles

- **Single Responsibility:** Every function, component, and module should do one thing.
- **Appropriate Abstraction:** Code at the same level should operate at the same abstraction level.
- **Explicit Dependencies:** No reaching into global state. Dependencies come through parameters, props, or imports.
- **Cohesive Modules:** Group related functionality. Separate unrelated functionality.

## 3.2 Simplicity

Simplicity is about minimizing cognitive load. Simple code is easier to understand, test, and modify.

### Key Principles

- **Function Length:** Functions should rarely exceed 20-30 lines.
- **Nesting Depth:** Maximum 3 levels. Use early returns to reduce nesting.
- **Naming Clarity:** Names should reveal intent. "userSubscriptionStatus" beats "data".
- **No Magic Values:** Named constants for all numbers and strings in logic.

## 3.3 Safety

Safety encompasses security and correctness. Security is not an afterthought—it must be built into every layer from the start. This pillar has the most detailed requirements because security failures are the most damaging.

### Key Principles

- **Input Validation at Boundaries:** All external data validated once, at entry. Use Zod schemas for type-safe validation.
- **Defense in Depth:** Multiple layers of security checks. API routes validate AND RLS enforces. Never rely on a single layer.
- **Fail Securely:** Errors should not expose sensitive information. Log details server-side, show generic messages client-side.
- **Explicit Error Handling:** Every operation that can fail should have explicit handling. No silent failures.

### Security Requirements (OWASP-Aligned)

- **Authentication:** Use Supabase Auth. Never roll custom auth. Enforce password policies.
- **Authorization:** RLS on every table. Check permissions in API routes AND database. Test with different user roles.
- **Injection Prevention:** Use parameterized queries (Supabase client does this). Never concatenate user input into queries.
- **XSS Prevention:** React escapes by default. Never use `dangerouslySetInnerHTML` with user content. Sanitize if you must render HTML.
- **CSRF Protection:** Use Server Actions (built-in protection) or validate Origin headers on API routes.
- **Secrets Management:** Environment variables only. Never commit secrets. Never expose server keys to client.
- **Security Headers:** Configure HSTS, X-Frame-Options, CSP in next.config.js.
- **Dependency Security:** Run `npm audit` before every release. No high/critical vulnerabilities in production.

### Security Checklist for Every Feature

- [ ] Does this feature accept user input? → Validate with Zod
- [ ] Does this feature display user content? → Ensure proper escaping
- [ ] Does this feature access data? → RLS policy in place and tested
- [ ] Does this feature have admin-only actions? → Role check in code AND RLS
- [ ] Does this feature handle sensitive data? → Never log, never expose in errors

## 3.4 Speed

Speed is about performance and efficiency. Fast applications feel professional and respect users' time.

### Key Principles

- **Avoid Unnecessary Work:** Do not compute, fetch, or render what is not needed.
- **Appropriate Data Structures:** Choose structures that match access patterns.
- **Database Efficiency:** No N+1 queries. Select only needed columns. Use indexes.
- **Measure Before Optimizing:** Profile real performance. Optimize actual bottlenecks.

## 3.5 Stability

Stability is about reliability and maintainability. Stable code works consistently and can be safely modified.

### Key Principles

- **Test Coverage:** Critical paths have automated tests.
- **Consistent Patterns:** Similar problems solved similarly throughout.
- **Documentation at Decision Points:** Comments explain "why" for non-obvious choices.
- **Observable Behavior:** Sufficient logging and metrics for production debugging.

## 3.6 Quality Gate Definitions

Quality gates are checkpoints that code must pass before proceeding. These gates enforce the Five Pillars by making quality requirements explicit and measurable.

### SPEC Quality Gate (Before Implementation)

- [ ] At least one requirement defined
- [ ] Each requirement has at least one test case
- [ ] Requirements use EARS format
- [ ] Test cases use GIVEN-WHEN-THEN format
- [ ] Build Contract sections referenced
- [ ] Acceptance criteria defined

### Implementation Quality Gate (After Implementation)

- [ ] All test cases pass
- [ ] Code meets structure standards (functions <30 lines, files <200 lines)
- [ ] Security checks present
- [ ] No TypeScript errors
- [ ] Linting passes
- [ ] Coverage >= 80%

> **Expected Outcome**
>
> **What you should understand:** The Five Pillars (Structure, Simplicity, Safety, Speed, Stability) and how to evaluate code against each pillar's criteria.
>
> **What you should have:** A mental checklist for reviewing any piece of code for quality issues.
>
> **Next:** Chapter 4 — Learn when to use Claude Chat vs Claude Code.

## 3.7 Chapter Summary

You've learned the Five Pillars quality framework. Key takeaways:

- **Structure:** Single responsibility, explicit dependencies, cohesive modules
- **Simplicity:** Short functions, minimal nesting, clear naming
- **Safety:** Input validation, defense in depth, fail securely, OWASP-aligned security
- **Speed:** Avoid unnecessary work, efficient data access, measure before optimizing
- **Stability:** Test coverage, consistent patterns, observable behavior
- **Quality Gates:** Explicit checkpoints before and after implementation

In the next chapter, you'll learn about the two Claude tools and when to use each one.
