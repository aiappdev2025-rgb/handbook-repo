---
chapter: 36
title: "Milestone 7 — Admin Console"
slug: "m7-admin-console"
phase: 4
phase_name: "Build"
milestone: "M7"
checkpoint: null
tool: "claude-code"
session: null
estimated_time: null
prompts:
  - "7.1"
  - "7.2"
  - "7.3"
  - "7.4"
deliverables: "Admin role system, user management, subscription viewing, error logs"
prerequisites: []
when_to_use:
  - "After M6 (Core Feature) and Checkpoint B. You now have real data to manage and need operational visibility."
gate: null
source_html: "archive/html-v3/handbook/phase4/chapter-36-m7-admin-console.html"
---

# Chapter 36: Milestone 7 — Admin Console

> **TL;DR** — Build an administrative interface for managing your SaaS: user management, subscription viewing, error logs, and audit logging.

> **When to use:** After M6 (Core Feature) and Checkpoint B. You now have real data to manage and need operational visibility.

In this chapter, you'll build an operational admin console for managing your SaaS. By the end, you'll have user management, subscription viewing, and error log access.

> **Workflow tip:** **Workflow Tip:** Admin features require careful access control. Review [Context Management](../00-operating/12-when-and-how-to-use-clear.md) for maintaining security focus.

## 36.1 Overview

Building the admin console as Milestone 7 (after core feature, before additional features) is intentional. By this point, you have real data structures to manage and real functionality to monitor. Building it now means you have operational visibility while you're still actively developing.

> **Note:** Phase 1 Admin Features (This Milestone):
>
> These are the essential features you need from day one. User management (list, search, view), subscription viewing, and error log integration. Everything else can wait until after launch.

## 36.2 Admin Database Setup

First, add admin-specific tables to your database. Create this migration:

### Prompt 7.1 — Admin Schema

> Prompt file: [`prompts/B-7.1-admin-schema.md`](../../prompts/B-7.1-admin-schema.md)

```text
ROLE
Database Engineer adding admin functionality.

CONTEXT
Project: {{productName}}
Core schema exists (Milestone 3).
Need admin role system and audit logging.

OBJECTIVE
Create database tables and functions for admin features.

REQUIREMENTS

1. Add role column to profiles table:
   - role: text default 'user' check (role in ('user', 'admin', 'super_admin'))

2. Create admin_audit_logs table:
   - id, admin_user_id, action, target_type, target_id
   - metadata (jsonb), created_at
   - Enable RLS

3. Create error_logs table:
   - id, user_id (nullable), error_type, message
   - stack_trace, url, user_agent, created_at
   - Enable RLS

4. Update is_admin() function:
   - Check if current user has admin or super_admin role

5. Create RLS policies:
   - Admin audit logs: admins can read all, insert own
   - Error logs: admins can read all, service role can insert

OUTPUT
Migration file: YYYYMMDDHHMMSS_add_admin_tables.sql
```

## 36.3 Implementation Prompts

### Prompt 7.2: Admin Layout and Access

### Prompt 7.2 — Admin Layout and Access

> Prompt file: [`prompts/B-7.2-admin-layout-and-access.md`](../../prompts/B-7.2-admin-layout-and-access.md)

```text
ROLE
Full-Stack Developer implementing admin access control.

CONTEXT
Project: {{productName}}
Admin schema created (Prompt 7.1).
Need protected admin area.

OBJECTIVE
Create admin layout with role-based access.

REQUIREMENTS

1. Admin layout (src/app/(admin)/layout.tsx):
   - Check user role before rendering
   - Redirect non-admins to dashboard
   - Admin navigation sidebar
   - Different styling from main app

2. Admin middleware update:
   - Protect /admin/* routes
   - Verify admin role from database
   - Log admin page access

3. Admin navigation:
   - Dashboard (overview stats)
   - Users (list, search, view)
   - Subscriptions (view only)
   - Error Logs (recent errors)
   - Audit Log (admin actions)

VERIFICATION
Non-admin users redirected from /admin
Admin sidebar shows all sections
Role check happens server-side
```

### Prompt 7.3: User Management

### Prompt 7.3 — User Management

> Prompt file: [`prompts/B-7.3-user-management.md`](../../prompts/B-7.3-user-management.md)

```text
ROLE
Full-Stack Developer building user management.

CONTEXT
Project: {{productName}}
Admin layout ready (Prompt 7.2).
Need user list and detail views.

OBJECTIVE
Create user management interface for admins.

REQUIREMENTS

1. Users list page (src/app/(admin)/admin/users/page.tsx):
   - Paginated user list
   - Search by email, name
   - Filter by role, status
   - Sort by created_at, email

2. User detail page (src/app/(admin)/admin/users/[id]/page.tsx):
   - Profile information
   - Subscription status
   - Activity summary
   - Related data overview

3. User actions (admin only):
   - View user details
   - Change user role (with audit log)
   - NOTE: No edit/delete of user data for privacy

4. Audit logging:
   - Log all admin views of user data
   - Log role changes with before/after

VERIFICATION
User list loads with pagination
Search and filters work
User detail shows correct data
Actions are logged
```

### Prompt 7.4: Error Logs

### Prompt 7.4 — Error Logs

> Prompt file: [`prompts/B-7.4-error-logs.md`](../../prompts/B-7.4-error-logs.md)

```text
ROLE
Full-Stack Developer implementing error logging.

CONTEXT
Project: {{productName}}
Admin layout ready.
Need error visibility for debugging.

OBJECTIVE
Create error logging and viewing system.

REQUIREMENTS

1. Error logging utility (src/lib/error-logger.ts):
   - logError(error, context): Log to database
   - Include: message, stack, url, user_id, user_agent
   - Works in server components and API routes

2. Global error handler:
   - Catch unhandled errors
   - Log to database automatically
   - Show user-friendly error page

3. Error logs page (src/app/(admin)/admin/errors/page.tsx):
   - Recent errors list
   - Filter by type, date range
   - Error detail view with stack trace
   - Mark as resolved

4. Error alert (optional):
   - Notification for critical errors
   - Daily digest email

VERIFICATION
Errors logged to database
Admin can view error list
Stack traces visible in detail view
```

## 36.4 Verification

> **Expected Output**
>
> After completing this milestone, you should have:
>
> - Protected admin area with role-based access
> - User management with search and filtering
> - Subscription status viewing
> - Error log viewing and management
> - Audit logging of all admin actions

### Verification Checklist

- [ ] Non-admin users redirected from /admin
- [ ] User list with search and pagination works
- [ ] Admin actions are logged to audit log
- [ ] Error logs show recent errors with details
- [ ] `npm run build` passes without errors

## 36.5 Chapter Summary

You've completed Milestone 7. Your project now has:

- Admin role system in database
- Protected admin area with layout
- User management interface
- Subscription viewing
- Error logging and viewing
- Audit logging of admin actions

**Next:** Chapter 37 (Milestone 8) - Build supporting features using the four-prompt pattern.
