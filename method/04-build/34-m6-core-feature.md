---
chapter: 34
title: "Milestone 6 — Core Feature"
slug: "m6-core-feature"
phase: 4
phase_name: "Build"
milestone: "M6"
checkpoint: null
tool: "claude-code"
session: null
estimated_time: null
prompts:
  - "6.1"
  - "6.2"
  - "6.3"
  - "6.4"
deliverables: "Core feature complete, tests passing, user journey functional"
prerequisites: []
when_to_use:
  - "After M5 (Authentication) is working. Your users can now log in, so you can build the authenticated features they came for."
gate: "You must complete Checkpoint B (next chapter) before proceeding to Milestone 7."
source_html: "archive/html-v3/handbook/phase4/chapter-34-m6-core-feature.html"
---

# Chapter 34: Milestone 6 — Core Feature

> **TL;DR** — Build your product's main functionality using the four-prompt pattern: Data Layer → Server Actions → UI Components → Page Assembly.

> **When to use:** After M5 (Authentication) is working. Your users can now log in, so you can build the authenticated features they came for.

In this chapter, you'll build your primary feature using the four-prompt pattern. By the end, you'll have a complete user journey with data persistence, validation, and UI components.

> **Workflow tip:** **Workflow Tip:** This is the largest milestone. Use [Task Decomposition](../00-operating/08-breaking-large-projects-into-subtasks.md) to break it into focused sessions.

## 34.1 Overview

Your core feature is the primary value your application delivers. The four-prompt pattern (Data Layer → Server Actions → UI Components → Page Assembly) ensures clean architecture and separation of concerns that will scale with your application.

## 34.2 The Four-Prompt Pattern

Build your feature in layers, each building on the previous:

```text
1. Data Layer    → Queries and mutations (src/lib/queries/, src/lib/mutations/)
2. Server Actions → Business logic and validation (src/app/.../actions.ts)
3. UI Components  → Reusable display components (src/components/{{feature}}/)
4. Page Assembly  → Wire everything together (src/app/(app)/{{feature}}/)
```

## 34.3 Implementation Prompts

### Prompt 6.1: Data Layer

### Prompt 6.1 — Data Layer

> Prompt file: [`prompts/B-6.1-data-layer.md`](../../prompts/B-6.1-data-layer.md)

```text
ROLE
Backend Developer creating the data access layer.

CONTEXT
Project: {{productName}}
Feature: {{describe your core feature}}
Database schema exists (Milestone 3).
Auth working (Milestone 5).

OBJECTIVE
Create typed query and mutation functions for the core feature.

REQUIREMENTS

1. Create queries file (src/lib/queries/{{feature}}.ts):
   - get{{Entity}}ById(id): Fetch single item
   - get{{Entity}}List(options): Paginated list with filters
   - search{{Entity}}(query): Search functionality
   - get{{Entity}}Stats(): Aggregate data for dashboards

2. Create mutations file (src/lib/mutations/{{feature}}.ts):
   - create{{Entity}}(data): Insert new record
   - update{{Entity}}(id, data): Update existing record
   - delete{{Entity}}(id): Remove record

3. TypeScript types (src/types/{{feature}}.ts):
   - {{Entity}} type matching database schema
   - Create{{Entity}}Input for creation
   - Update{{Entity}}Input for updates
   - {{Entity}}ListOptions for query params

4. Query patterns:
   - Use Supabase server client
   - Return typed responses
   - Handle errors with meaningful messages
   - Include created_by/updated_by where appropriate

VERIFICATION
All functions compile without TypeScript errors
Test each query/mutation manually with Supabase dashboard
```

### Prompt 6.2: Server Actions

### Prompt 6.2 — Server Actions

> Prompt file: [`prompts/B-6.2-server-actions.md`](../../prompts/B-6.2-server-actions.md)

```text
ROLE
Full-Stack Developer implementing business logic.

CONTEXT
Project: {{productName}}
Feature: {{describe your core feature}}
Data layer exists (Prompt 6.1).

OBJECTIVE
Create server actions with validation and business logic.

REQUIREMENTS

1. Create actions file (src/app/(app)/{{feature}}/actions.ts):
   - 'use server' directive at top
   - create{{Entity}}Action(formData)
   - update{{Entity}}Action(id, formData)
   - delete{{Entity}}Action(id)

2. Input validation with Zod:
   - Define schemas for each action input
   - Parse and validate formData
   - Return structured validation errors

3. Authorization checks:
   - Verify user is authenticated
   - Verify user owns the resource (for updates/deletes)
   - Check any feature-specific permissions

4. Business logic:
   - Apply any business rules before data operations
   - Handle related data updates if needed
   - Maintain data consistency

5. Response handling:
   - Return { success: true, data } on success
   - Return { success: false, error } on failure
   - revalidatePath after mutations

VERIFICATION
Actions reject invalid input with clear errors
Unauthorized access attempts are blocked
Successful operations update the UI (via revalidation)
```

### Prompt 6.3: UI Components

### Prompt 6.3 — UI Components

> Prompt file: [`prompts/B-6.3-ui-components.md`](../../prompts/B-6.3-ui-components.md)

```text
ROLE
Frontend Developer building feature components.

CONTEXT
Project: {{productName}}
Feature: {{describe your core feature}}
Design system available (Milestone 2).
Server actions ready (Prompt 6.2).

OBJECTIVE
Create reusable UI components for the feature.

REQUIREMENTS

1. List component (src/components/{{feature}}/{{entity}}-list.tsx):
   - Display items in cards or table format
   - Pagination controls
   - Empty state when no items
   - Loading skeleton

2. Card component (src/components/{{feature}}/{{entity}}-card.tsx):
   - Display single item summary
   - Action buttons (edit, delete)
   - Link to detail view

3. Form component (src/components/{{feature}}/{{entity}}-form.tsx):
   - Works for both create and edit modes
   - Uses react-hook-form with zod validation
   - Loading state during submission
   - Error display for validation/server errors
   - Success feedback (toast or redirect)

4. Detail component (src/components/{{feature}}/{{entity}}-detail.tsx):
   - Full item information display
   - Related data if applicable
   - Actions (edit, delete, other)

5. Delete confirmation:
   - Modal or alert dialog for confirmation
   - Loading state during deletion
   - Error handling

VERIFICATION
Components render correctly with sample data
Forms validate and submit properly
Loading and error states display correctly
```

### Prompt 6.4: Page Assembly

### Prompt 6.4 — Page Assembly

> Prompt file: [`prompts/B-6.4-page-assembly.md`](../../prompts/B-6.4-page-assembly.md)

```text
ROLE
Full-Stack Developer assembling the feature pages.

CONTEXT
Project: {{productName}}
Feature: {{describe your core feature}}
Components ready (Prompt 6.3).

OBJECTIVE
Wire components together into complete pages.

REQUIREMENTS

1. List page (src/app/(app)/{{feature}}/page.tsx):
   - Server Component fetching data
   - Render list component with data
   - "Create new" button linking to create page
   - Search/filter controls if needed

2. Create page (src/app/(app)/{{feature}}/new/page.tsx):
   - Render form in create mode
   - Pass create action to form
   - Redirect to list or detail after success

3. Detail page (src/app/(app)/{{feature}}/[id]/page.tsx):
   - Server Component fetching single item
   - Handle not found (notFound())
   - Render detail component
   - Edit and delete actions

4. Edit page (src/app/(app)/{{feature}}/[id]/edit/page.tsx):
   - Fetch existing data
   - Render form in edit mode with data
   - Pass update action to form
   - Redirect after success

5. Navigation integration:
   - Add feature to sidebar navigation
   - Breadcrumbs for nested pages
   - Page titles and meta

VERIFICATION
Complete user journey works: Create → View → Edit → Delete
Navigation flows are intuitive
Run: npm run build — no errors
Test with real data in development
```

## 34.4 Verification

> **Expected Output**
>
> After completing this milestone, you should have:
>
> - Complete data layer with typed queries and mutations
> - Server actions with validation and authorization
> - Reusable UI components (list, card, form, detail)
> - Fully assembled pages for list, create, detail, and edit views

### Verification Checklist

- [ ] Complete user journey works: Create → View → Edit → Delete
- [ ] All operations persist to database
- [ ] Navigation flows are intuitive
- [ ] `npm run build` passes without errors
- [ ] Test with real data in development

> **⛔ GATE:** You must complete Checkpoint B (next chapter) before proceeding to Milestone 7.

## 34.5 Chapter Summary

You've completed Milestone 6. Your project now has:

- Data layer with typed queries and mutations
- Server actions with validation and authorization
- Reusable UI components (list, card, form, detail)
- Complete pages for CRUD operations
- Working user journey end-to-end

**Next:** Chapter 35 (Checkpoint B) - Feature complete audit before proceeding.
