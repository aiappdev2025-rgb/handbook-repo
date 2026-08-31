---
chapter: 14
title: "Database Schema Design"
slug: "database-schema"
phase: 3
phase_name: "Architect"
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
source_html: "archive/html-v3/handbook/phase3/chapter-14-database-schema.html"
---

# Chapter 14: Database Schema Design

In this chapter, you'll generate the detailed, SQL-ready database schema from your architecture document. The output will be a complete migration file you can run directly in Supabase, including tables, relationships, indexes, and Row Level Security policies. By the end of this chapter, you'll have production-ready SQL that enforces your data model and security requirements.

## 14.1 Purpose

The architecture document outlines your data model conceptually. Now you need concrete SQL that Supabase can execute. This step translates table descriptions into CREATE TABLE statements, defines relationships through foreign keys, and implements security through RLS policies. Generating this schema before setting up infrastructure ensures your database design is complete and reviewed before any data is created.

**What you'll accomplish:** Generate a complete SQL migration file with tables, constraints, indexes, RLS policies, and triggers.

## 14.2 Database Schema Prompt

Continue in the same Claude Chat session where you created the architecture. This gives Claude full context of your data model and relationships. The output will be a single SQL file you can run in Supabase's SQL Editor.

> **Run in:** Claude Chat · **Session:** Same Chat · continues from Architecture

> Prompt file: [`prompts/X-14-1-database-schema-design.md`](../../prompts/X-14-1-database-schema-design.md)

```text
Based on the Architecture document we just created, generate a complete database schema for Supabase.

For each table, provide:
1. **CREATE TABLE statement** with all columns, types, and constraints
2. **RLS policies** for SELECT, INSERT, UPDATE, DELETE
3. **Indexes** for frequently queried columns
4. **Triggers** for updated_at timestamps

Required tables based on our architecture:
- user_profiles (extends auth.users)
- [LIST YOUR DOMAIN TABLES FROM ARCHITECTURE]
- subscriptions (Stripe sync)
- usage_logs (if applicable)

For each RLS policy, explain the security rationale.

Output as a single SQL migration file that can be run in Supabase SQL Editor.
```

> **Customize the Table List**
>
> Replace `[LIST YOUR DOMAIN TABLES FROM ARCHITECTURE]` with the specific tables from your architecture document. For example: projects, documents, comments, or whatever domain entities your application needs.

> **Expected Outcome**
>
> **What you should have:** A complete SQL migration file (typically 200-500 lines) with CREATE TABLE statements, RLS policies, indexes, and triggers.
>
> **How to validate:** The SQL should include: RLS enabled on every table, policies for all CRUD operations, foreign key constraints with ON DELETE behavior, and updated_at triggers.
>
> **Next:** Validate the schema and save it.

## 14.3 Schema Validation

Before saving your schema, validate it against this checklist. These standards ensure your database is secure, maintainable, and follows Supabase best practices. Missing any of these items can lead to security vulnerabilities or application errors.

### Schema Validation Checklist

- [ ] All tables have `id` (UUID), `created_at`, `updated_at`
- [ ] Foreign keys reference correct tables with ON DELETE behavior
- [ ] RLS is enabled on ALL tables (no exceptions)
- [ ] RLS policies cover all CRUD operations (SELECT, INSERT, UPDATE, DELETE)
- [ ] Indexes exist for foreign keys and frequently filtered columns
- [ ] No sensitive data exposed without proper policy checks
- [ ] `user_profiles` table links to `auth.users(id)` with ON DELETE CASCADE

If any items are missing, ask Claude to add them before proceeding.

## 14.4 Save the Schema File

Save the generated SQL so it can be used during Supabase setup (Chapter 17) and tracked in version control. This file becomes your initial migration.

### Instructions

1. Create `supabase/migrations/` folder in your project (if it doesn't exist)
2. Copy the complete SQL output from Claude Chat
3. Save as `supabase/migrations/00001_initial_schema.sql`

> **Migration Naming Convention**
>
> Supabase migrations use timestamp or sequential prefixes. Using `00001_` ensures this runs first. Later migrations will use `00002_`, `00003_`, etc.

> **Expected Outcome**
>
> **What you should have:** A SQL file at `supabase/migrations/00001_initial_schema.sql` containing your complete schema.
>
> **How to validate:** Open the file and verify it contains CREATE TABLE statements for all your domain tables, RLS policies, and indexes.
>
> **Next:** Chapter 15 — Set up your GitHub repository and initialize the project.

## 14.5 Chapter Summary

You've completed the Database Schema Design phase. Here's what you accomplished:

- Generated SQL-ready schema from your architecture document
- Defined tables with proper columns, types, and constraints
- Implemented Row Level Security policies for all tables
- Created indexes for query performance
- Saved the migration file for version control

Your database design is complete and ready to apply. In the next chapter, you'll create your GitHub repository and initialize the project structure.
