---
chapter: 16
title: "Supabase Project Setup"
slug: "supabase-setup"
phase: 3
phase_name: "Architect"
milestone: null
checkpoint: null
tool: "claude-code"
session: "same-session"
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase3/chapter-16-supabase-setup.html"
---

# Chapter 16: Supabase Project Setup

In this chapter, you'll create and configure your Supabase cloud projects. Supabase provides your database, authentication, and backend services. By the end of this chapter, you'll have your Supabase infrastructure ready to connect to your Next.js application.

> **⚠ Warning:** Supabase Free Tier Limitation The Supabase Free tier allows only **2 active projects** per organization. This handbook supports two environment configurations: **2-Environment Setup** (Free tier compatible): Development + Production **3-Environment Setup** (requires Pro or additional org): Development + Staging + Production Chapter 18 covers both configurations in detail. For now, create the projects based on your chosen setup.

## 16.1 Purpose

Before writing any code, you need cloud infrastructure to store data and handle authentication. Supabase projects are created through their web dashboard—this cannot be automated. Each environment (local development, staging, production) connects to its own isolated Supabase project to prevent test data from mixing with real user data.

**What you'll accomplish:** Create 2 or 3 Supabase projects (depending on your environment setup) and configure basic settings for each.

## 16.2 Create Projects

Each Supabase project is a complete backend instance with its own database, authentication, and API endpoints. Creating separate projects per environment ensures complete data isolation—your development experiments won't affect production users.

> **Note:** Tool:
>
> Manual (Supabase Dashboard) - These steps cannot be automated.

### Instructions

Go to [supabase.com/dashboard](https://supabase.com/dashboard) and create your projects:

#### For 2-Environment Setup (Free Tier)

| Project Name | Purpose | Region |
| --- | --- | --- |
| `[project]-dev` | Local development + Preview deployments | Closest to you |
| `[project]-prod` | Production users | Closest to your target users |

#### For 3-Environment Setup

| Project Name | Purpose | Region |
| --- | --- | --- |
| `[project]-dev` | Local development | Closest to you |
| `[project]-staging` | Preview deployments | Same as production |
| `[project]-prod` | Production users | Closest to your target users |

For each project:

1. Click "New Project"
2. Enter the project name following the naming convention above
3. Generate a strong database password and **save it in your password manager**
4. Select the appropriate region
5. Click "Create new project" and wait ~2 minutes for provisioning

> **Expected Outcome**
>
> **What you should have:** 2 or 3 projects visible in your Supabase dashboard, each showing a green "Active" status.
>
> **How to validate:** Click into each project—you should see the Project Dashboard with the Table Editor, Authentication, and other sections available in the sidebar.
>
> **Next:** Configure authentication URLs for each project.

## 16.3 Configure Authentication

Supabase authentication requires knowing which URLs are legitimate for your application. Without proper URL configuration, login redirects will fail and users won't be able to sign in. Each project needs URLs matching the environment it serves.

### Instructions

For each project, navigate to **Authentication → URL Configuration** in the sidebar and configure:

#### For 2-Environment Setup

| Project | Site URL | Redirect URLs |
| --- | --- | --- |
| **Dev** | `http://localhost:3000` | `http://localhost:3000/**` `https://*-[username].vercel.app/**` |
| **Prod** | `https://[your-domain].com` | `https://[your-domain].com/**` |

*Note: In the 2-environment setup, the Dev project handles both local development and Vercel preview deployments.*

#### For 3-Environment Setup

| Project | Site URL | Redirect URLs |
| --- | --- | --- |
| **Dev** | `http://localhost:3000` | `http://localhost:3000/**` |
| **Staging** | `https://*-[username].vercel.app` | `https://*-[username].vercel.app/**` |
| **Prod** | `https://[your-domain].com` | `https://[your-domain].com/**` |

> **About Redirect URLs**
>
> The `/**` wildcard allows any path on your domain to receive auth callbacks. Replace `[username]` with your Vercel username and `[your-domain].com` with your actual production domain (you can update this later before launch).

> **Expected Outcome**
>
> **What you should have:** Each project's URL Configuration page showing your Site URL and Redirect URLs saved.
>
> **How to validate:** After saving, refresh the page and confirm the values persisted correctly.
>
> **Next:** Apply your database schema to the development project.

## 16.4 Apply Schema Migration

Your database schema (designed in Chapter 14) needs to be applied to your Supabase projects. You'll use the Supabase CLI to manage migrations—this ensures your schema is version-controlled and can be consistently applied across all environments.

Start by applying the schema to your development project. You'll migrate staging and production later when you're ready to deploy.

> **Run in:** Claude Code · **Session:** Same Session

> Prompt file: [`prompts/X-16-1-supabase-project-setup.md`](../../prompts/X-16-1-supabase-project-setup.md)

```text
Set up Supabase CLI and apply the initial schema migration.

1. Initialize Supabase in the project:
   supabase init

2. Link to the development project:
   supabase link --project-ref [DEV_PROJECT_REF]

   (Find your project ref in Supabase Dashboard → Project Settings → General)

3. Create a migration file from the schema we designed in Chapter 14:
   supabase migration new initial_schema

4. Apply the migration:
   supabase db push

5. Verify the tables were created correctly.
```

> **Expected Outcome**
>
> **What you should have:** Your database tables created in the Dev project, visible in the Supabase Table Editor.
>
> **How to validate:** In Supabase Dashboard, go to **Table Editor**. You should see all the tables defined in your schema. Click on a table to verify it has the expected columns.
>
> **Next:** Record your project credentials for use in your application.

## 16.5 Record Credentials

Your Next.js application needs credentials to connect to Supabase. Each project has unique credentials that you'll configure as environment variables. Record these now—you'll need them in Chapter 17 when setting up Vercel.

### Instructions

For each project, go to **Settings → API** and record:

- **Project URL** — The base URL for API requests (e.g., `https://xxxxx.supabase.co`)
- **Anon (public) key** — Safe to expose in browser, used for client-side operations
- **Service role key** — Full database access, server-side only, **keep secret!**

Create a secure note in your password manager with this structure:

```text

SUPABASE CREDENTIALS

[project]-dev:
  URL: https://xxxxx.supabase.co
  ANON_KEY: eyJhbGc...
  SERVICE_ROLE_KEY: eyJhbGc...

[project]-prod:
  URL: https://yyyyy.supabase.co
  ANON_KEY: eyJhbGc...
  SERVICE_ROLE_KEY: eyJhbGc...

(Add staging section if using 3-environment setup)
```

> **⚠ Warning:** Security The **service role key** bypasses Row Level Security and has full database access. Never expose it in client-side code or commit it to your repository. Treat it like a database password.

> **Expected Outcome**
>
> **What you should have:** 6 credential values (for 2-env) or 9 values (for 3-env) saved securely in your password manager.
>
> **How to validate:** Open your password manager and confirm you have URL, anon key, and service role key for each project.
>
> **Next:** Chapter 17 — Connect your Vercel deployment to these Supabase projects.

## 16.6 Chapter Summary

You've completed the Supabase infrastructure setup. Here's what you accomplished:

- Created isolated Supabase projects for each environment
- Configured authentication URLs to allow sign-in from your application
- Applied your database schema to the development project
- Securely recorded credentials for application configuration

Your Supabase backend is now ready. In the next chapter, you'll connect it to Vercel so your deployed application can access these services.
