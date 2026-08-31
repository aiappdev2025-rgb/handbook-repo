---
chapter: 50
title: "Architecture Decision Records"
slug: "50-adr-templates"
phase: 3
phase_name: "Architect"
milestone: null
checkpoint: null
tool: "claude-code"
session: "project"
estimated_time: "15 min read"
description: "Document your technical decisions with Architecture Decision Records (ADRs)"
prerequisites:
  - "Solution Architecture in progress or complete"
  - "Tech stack decisions being made"
when_to_use:
  - "Making significant technical decisions (database, framework, auth)"
  - "Choosing between multiple valid approaches"
  - "Making decisions you might question later"
skip_if: "Working on a short prototype where documentation isn't needed"
source_mdx: "archive/docusaurus/docs/phase-3-architect/adr-templates.mdx"
---

# Chapter 50: Architecture Decision Records

> **TL;DR**
> Document significant technical decisions using Architecture Decision Records—capturing the context, options considered, and reasoning behind each choice.
>
> **Why:** Future you (and teammates) will forget why decisions were made. ADRs preserve the 'why' for later reference and prevent revisiting already-decided questions.
>
> **Outcome:** A set of ADR documents (001, 002, etc.) in your `docs/adrs/` folder documenting your key architectural choices.

> **When to use**
>
> - Making significant technical decisions (database, framework, auth)
> - Choosing between multiple valid approaches
> - Making decisions you might question later
>
> **Skip if:** Working on a short prototype where documentation isn't needed

**Prerequisites**

- [ ] Solution Architecture in progress or complete
- [ ] Tech stack decisions being made

## What is an ADR?

An Architecture Decision Record is a short document that captures **one** architectural decision. Each ADR answers four questions:

| Section | Question | Example |
|---------|----------|---------|
| **Context** | Why was this decision needed? | "We need authentication for our SaaS..." |
| **Decision** | What did you choose? | "We will use Supabase Auth" |
| **Alternatives** | What else was considered? | "NextAuth.js, Clerk, custom auth" |
| **Consequences** | What are the trade-offs? | "Pros: integrated with DB. Cons: vendor lock-in" |

## Why ADRs Matter for Solo Founders

Even working solo, ADRs provide critical value:

1. **Memory preservation** — 6 months from now, you'll forget why you chose X over Y
2. **Faster onboarding** — When you hire or partner, they understand the codebase immediately
3. **Change evaluation** — When considering pivots, you can revisit past decisions with full context
4. **Avoid repeated debates** — Document once, reference forever

## Which Decisions Need ADRs?

Create an ADR for decisions that are:

| Create ADR | Skip ADR |
|------------|----------|
| Hard to reverse (database, auth provider, hosting) | Trivial choices (icon library) |
| Significantly impact architecture (state management, API patterns) | Easily reversible decisions |
| Have multiple valid options you considered | Standard conventions (file naming) |

## Step 1: Understand the Target Structure

After running the prompt, your project will have:

```
your-project/
├── docs/
│   └── adrs/
│       ├── template.md
│       ├── 001-frontend-framework.md
│       ├── 002-database-backend.md
│       ├── 003-authentication.md
│       ├── 004-hosting.md
│       └── 005-payments.md (if applicable)
```

## Step 2: Generate Your ADRs with Claude Code

Use the prompt below to generate ADRs for your key technical decisions. Claude Code will create the folder structure and save all files automatically.

### Generate ADRs Prompt

> Prompt file: [`prompts/S-adr-templates.md`](../../prompts/S-adr-templates.md)

```text
Create Architecture Decision Records for [PRODUCT_NAME].

**Tech Stack**: [TECH_STACK]
**Auth Strategy**: [AUTH_STRATEGY]

TASK: Create ADR files directly in the project.

First, create the folder structure:
- Create docs/adrs/ if it doesn't exist

Then create these ADR files:

1. **docs/adrs/001-frontend-framework.md** - Why we chose [TECH_STACK] frontend
2. **docs/adrs/002-database-backend.md** - Why we chose [TECH_STACK] database
3. **docs/adrs/003-authentication.md** - Why we chose [AUTH_STRATEGY]
4. **docs/adrs/004-hosting.md** - Why we chose [TECH_STACK] hosting
5. **docs/adrs/005-payments.md** - Why we chose [TECH_STACK] payments (if applicable)

Also create **docs/adrs/template.md** with the blank ADR template for future use.

For each ADR file, use this format:

# ADR-00X: [Decision Title]

## Status
Accepted

## Context
[2-3 sentences on why this decision was needed]

## Decision
[1-2 sentences stating the choice clearly]

## Alternatives Considered

### Option A: [Name]
- **Pros:** [benefits]
- **Cons:** [drawbacks]

### Option B: [Name]
- **Pros:** [benefits]
- **Cons:** [drawbacks]

### Option C: [Chosen] ✓
- **Pros:** [benefits]
- **Cons:** [drawbacks]

## Consequences

### Positive
- [Benefits gained]

### Negative
- [Trade-offs accepted]

### Risks
- [What could go wrong and mitigations]

## References
- [Relevant documentation links]

---

Create all files directly. After creating, list the files created for confirmation.
```

## Step 3: Verify Your ADRs

After running the prompt, verify the files were created:

```bash
ls docs/adrs/
```

You should see:
```
template.md
001-frontend-framework.md
002-database-backend.md
003-authentication.md
004-hosting.md
005-payments.md
```

Review each file to ensure the content accurately reflects your decisions.

## ADR Template Reference

The prompt above creates `docs/adrs/template.md` automatically. Here's what it contains for reference:

```markdown
# ADR-XXX: [Short Title]

## Status

[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

## Context

[What is the issue that we're seeing that motivates this decision?]

## Decision

[What is the change that we're proposing and/or doing?]

## Alternatives Considered

### Option A: [Name]
- **Pros:** ...
- **Cons:** ...

### Option B: [Name]
- **Pros:** ...
- **Cons:** ...

## Consequences

### Positive
- What becomes easier?

### Negative
- What becomes harder?

### Risks
- What could go wrong?

## References

- Links to relevant documentation, discussions, or research
```

## Example ADR

Here's a complete example of a well-written ADR:

```markdown
# ADR-001: Use Next.js App Router for Frontend

## Status

Accepted

## Context

We need a React framework for building our SaaS application. The app requires
server-side rendering for SEO, API routes for backend logic, and a modern
developer experience. We're targeting Vercel for deployment.

## Decision

We will use Next.js 14 with the App Router for our frontend framework.

## Alternatives Considered

### Option A: Next.js Pages Router
- **Pros:** Mature, well-documented, familiar patterns
- **Cons:** Being phased out, no React Server Components

### Option B: Remix
- **Pros:** Great data loading patterns, web standards focused
- **Cons:** Smaller ecosystem, fewer deployment options

### Option C: Next.js App Router ✓
- **Pros:** Server Components, streaming, Vercel-optimized, future-proof
- **Cons:** Newer patterns, some libraries not yet compatible

## Consequences

### Positive
- React Server Components reduce client bundle size
- Built-in API routes eliminate need for separate backend
- Excellent Vercel integration for deployment
- Strong TypeScript support out of the box

### Negative
- Learning curve for App Router patterns
- Some third-party libraries still catching up

### Risks
- Breaking changes in future Next.js versions
- Mitigation: Pin Next.js version, test before upgrading

## References

- https://nextjs.org/docs/app
- https://vercel.com/docs
```

## Step 4: Reference ADRs in Code

Add comments in your code pointing to relevant ADRs:

```typescript
// Auth configuration
// See ADR-003: Use Supabase for authentication
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

This creates a traceable connection between code and architectural decisions.

## Updating ADRs

When a decision changes:

1. **Don't delete** — Mark the old ADR as "Superseded by ADR-XXX"
2. **Create new ADR** — Document the new decision with updated context
3. **Link both** — Reference the old ADR in the new one

```markdown
## Status

Superseded by ADR-007

*This decision was revisited after 6 months due to scaling requirements.*
```
