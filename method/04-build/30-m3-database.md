---
chapter: 30
title: "Milestone 3 — Database"
slug: "m3-database"
phase: 4
phase_name: "Build"
milestone: "M3"
checkpoint: null
tool: "claude-code"
session: null
estimated_time: null
prompts:
  - "3.1"
  - "3.2"
deliverables: "Database schema, RLS policies, indexes, migration files."
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase4/chapter-30-m3-database.html"
---

# Chapter 30: Milestone 3 — Database

In this chapter, you'll create your database schema with Row Level Security (RLS) policies. By the end, you'll have a secure data layer that protects user data even if application-level checks fail.

> **Workflow tip:** **Workflow Tip:** Database work requires careful review. See [Task Decomposition](../00-operating/08-breaking-large-projects-into-subtasks.md) for breaking this milestone into reviewable chunks.

## 30.1 Overview

Your database schema is the foundation of your application's data integrity. Row Level Security (RLS) policies are non-negotiable - they're your last line of defense against unauthorized data access, even if application-level checks fail.

## 30.2 Implementation Prompts

### Prompt 3.1: Core Database Schema

Create core schema with profiles table and main entities. Add indexes for query patterns.

### Prompt 3.1 — Core Database Schema

> Prompt file: [`prompts/B-3.1-core-database-schema.md`](../../prompts/B-3.1-core-database-schema.md)

```text
ROLE
Database Engineer designing the application schema.

CONTEXT
Project: {{productName}}
Database: Supabase (PostgreSQL)
Core feature: {{describe your main feature and data it needs}}

OBJECTIVE
Create the database schema with proper security.

REQUIREMENTS

1. Create profiles table (extends auth.users):
   - id: uuid references auth.users(id) on delete cascade
   - email: text not null
   - full_name: text
   - avatar_url: text
   - created_at: timestamptz default now()
   - updated_at: timestamptz default now()

2. Create core entity tables for your feature:
   - Define tables based on your product's data model
   - Include user_id foreign key on user-owned data
   - Add created_at, updated_at timestamps
   - Use appropriate data types (uuid, text, jsonb, etc.)

3. Create trigger for profile creation:
   - Function: handle_new_user()
   - Trigger: on auth.users insert, create profile

4. Create updated_at trigger:
   - Function: update_updated_at_column()
   - Apply to all tables with updated_at

5. Add indexes for common queries:
   - Index on user_id for user-owned tables
   - Index on commonly filtered/sorted columns
   - Index on foreign keys

OUTPUT
Create migration file in supabase/migrations/
Use descriptive filename: YYYYMMDDHHMMSS_create_core_schema.sql
```

### Prompt 3.2: Row Level Security Policies

Enable RLS on every table with appropriate policies.

### Prompt 3.2 — Row Level Security Policies

> Prompt file: [`prompts/B-3.2-row-level-security-policies.md`](../../prompts/B-3.2-row-level-security-policies.md)

```text
ROLE
Security Engineer implementing database access control.

CONTEXT
Project: {{productName}}
Schema created in Prompt 3.1.
Need RLS policies for all tables.

OBJECTIVE
Implement Row Level Security on all tables.

REQUIREMENTS

1. Enable RLS on EVERY table:
   - ALTER TABLE tablename ENABLE ROW LEVEL SECURITY;
   - No exceptions — every table must have RLS enabled

2. Profiles table policies:
   - SELECT: Users can read their own profile
   - UPDATE: Users can update their own profile
   - INSERT: Handled by trigger (service role only)

3. User-owned data policies:
   - SELECT: WHERE user_id = auth.uid()
   - INSERT: WITH CHECK user_id = auth.uid()
   - UPDATE: WHERE user_id = auth.uid()
   - DELETE: WHERE user_id = auth.uid()

4. Shared/public data policies (if applicable):
   - SELECT: Allow authenticated users to read
   - INSERT/UPDATE/DELETE: Restrict to owners

5. Create helper functions:
   - is_admin(): Check if current user has admin role
   - Use in admin policies created in M7

SECURITY RULES
NEVER use policies that allow anon access to sensitive data
ALWAYS check auth.uid() in policies
TEST policies by attempting unauthorized access

OUTPUT
Create migration file: YYYYMMDDHHMMSS_add_rls_policies.sql
```

## 30.3 Verification

> **Expected Outcome**
>
> **What you should have:** Complete database schema with profiles table, core entity tables, RLS enabled on all tables, security policies for each table, helper functions like is_admin(), and proper indexes.
>
> **How to validate:**
>
> - Run migrations successfully
> - Test RLS by attempting unauthorized access (should fail)
> - Verify `SET LOCAL ROLE anon; SELECT * FROM profiles;` returns nothing

> **⚠ Warning:** Security Critical After completing this milestone, you MUST complete **Checkpoint A** (next chapter) before proceeding to Milestone 4.

## 30.4 Chapter Summary

You've completed Milestone 3. Your project now has:

- Profiles table extending auth.users
- Core entity tables for your feature
- Automatic profile creation trigger
- Updated_at triggers on all tables
- RLS enabled on ALL tables
- Security policies for each access pattern
- is_admin() helper function
- Indexes for query optimization

**Next:** Chapter 31 (Checkpoint A) - Foundation security audit before proceeding.
