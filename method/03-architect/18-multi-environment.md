---
chapter: 18
title: "Multi-Environment Configuration"
slug: "multi-environment"
phase: 3
phase_name: "Architect"
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
source_html: "archive/html-v3/handbook/phase3/chapter-18-multi-environment.html"
---

# Chapter 18: Multi-Environment Configuration

This chapter provides a comprehensive guide to configuring your development and deployment environments. You'll learn how to structure your environments for data isolation, configure services correctly, and establish workflows for testing and deployment. By the end of this chapter, you'll have a complete, professional environment setup.

> **Choose Your Environment Setup**
>
> This handbook supports two configurations based on your Supabase plan:
>
> - **2-Environment Setup** (Supabase Free tier): Development + Production — uses 2 Supabase projects
> - **3-Environment Setup** (Supabase Pro or multiple orgs): Development + Staging + Production — uses 3 Supabase projects
>
> If you completed Chapters 16-17 and already created your Supabase projects, continue with the setup you chose. This chapter provides detailed guidance for both paths.

## 18.1 Environment Strategy Overview

A proper multi-environment strategy isolates your development work from production users. This section explains both environment configurations, helps you choose the right one, and outlines the architecture for each.

### Choosing Your Configuration

| Factor | 2-Environment | 3-Environment |
| --- | --- | --- |
| **Supabase projects needed** | 2 (Dev + Prod) | 3 (Dev + Staging + Prod) |
| **Free tier compatible** | Yes | No (requires Pro or 2nd org) |
| **Preview deployment data** | Shares Dev database | Isolated Staging database |
| **Best for** | Solo developers, early stage | Teams, external testers, pre-launch |
| **Can upgrade later** | Yes → 3-env | N/A |

### 2-Environment Architecture

```text

Developer Machine                              Vercel Production
      |                                              |
      v                                              v
[Next.js Dev Server]                         [Production Deploy]
      |                                              |
      +--- Vercel Preview Deploys ---+               |
      |                              |               |
      v                              v               v
[Supabase DEV] <---- shared -----> [Supabase DEV]  [Supabase PROD]
      |                                              |
      v                                              v
[Stripe TEST mode]                           [Stripe LIVE mode]
```

*In this setup, local development and Vercel preview deployments share the Dev Supabase project. Production is fully isolated.*

### 3-Environment Architecture

```text

Developer Machine          Vercel Preview           Vercel Production
      |                         |                         |
      v                         v                         v
[Next.js Dev Server]    [Preview Deploy]          [Production Deploy]
      |                         |                         |
      v                         v                         v
[Supabase DEV]          [Supabase STAGING]        [Supabase PROD]
      |                         |                         |
      v                         v                         v
[Stripe TEST mode]      [Stripe TEST mode]        [Stripe LIVE mode]
```

*In this setup, each environment has its own isolated Supabase project. Preview testers don't affect development data.*

### Cost Comparison

| Service | 2-Environment Cost | 3-Environment Cost |
| --- | --- | --- |
| **Supabase** | $0 (2 free projects) + $25/mo Prod at launch | $25/mo (need Pro for 3rd project) or $0 with 2nd org |
| **Vercel** | $0 Hobby tier | $0-20/mo (Pro for password-protected previews) |
| **Stripe** | 2.9% + 30¢ per transaction | 2.9% + 30¢ per transaction |

> **Expected Outcome**
>
> **What you should have:** A clear understanding of which environment configuration fits your needs.
>
> **Decision made:** You've chosen either 2-environment or 3-environment setup based on your Supabase plan and collaboration needs.
>
> **Next:** Review your Supabase project configuration (if already created in Ch 16) or set up projects following the appropriate path below.

## 18.2 Supabase Project Configuration Reference

This section provides detailed reference for Supabase project configuration. If you already created projects in Chapter 16, use this to verify your setup. If you skipped Chapter 16 or need to reconfigure, follow the steps for your chosen environment setup.

### Project Structure by Setup

#### 2-Environment Setup

| Project | Purpose | Used By |
| --- | --- | --- |
| `[project]-dev` | Development + Preview testing | localhost:3000, Vercel previews |
| `[project]-prod` | Production users | Vercel production only |

#### 3-Environment Setup

| Project | Purpose | Used By |
| --- | --- | --- |
| `[project]-dev` | Local development only | localhost:3000 |
| `[project]-staging` | Preview/PR testing | Vercel preview deploys |
| `[project]-prod` | Production users | Vercel production only |

### Row Level Security (Required)

> **⚠ Warning:** Critical Security Requirement RLS must be enabled on ALL tables in ALL environments. This is your primary data access control layer. Never disable RLS in production.

```text
-- Enable RLS on every table you create
ALTER TABLE your_table_name ENABLE ROW LEVEL SECURITY;

-- Example: Enable RLS on user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
```

## 18.3 Local Development Setup

Your local development environment runs Next.js on your machine while connecting to the cloud Development Supabase project. This section walks through setting up your local environment from scratch or joining an existing project.

### Prerequisites

Before proceeding, ensure you have these tools installed:

- **Node.js 20+** — Check with `node --version`
- **npm or pnpm** — Package manager
- **Supabase CLI** — Install: `npm install -g supabase`
- **Vercel CLI** — Install: `npm install -g vercel`
- **Git** — Configured with your credentials

### Instructions

#### Step 1: Clone and Install Dependencies

```text
git clone [your-repo-url]
cd [project-name]
npm install
```

#### Step 2: Link to Your Vercel Project

```text
vercel link
# Follow prompts to connect to your Vercel project
# Select your team/account and project when prompted
```

#### Step 3: Pull Environment Variables

```text
vercel env pull .env.local
# This creates .env.local with Development-scoped environment variables
```

#### Step 4: Verify the Application Runs

```text
npm run dev
# Open http://localhost:3000
# Verify the app loads without errors
```

#### Step 5: Link Supabase CLI (for Migrations)

```text
supabase login
supabase link --project-ref [your-dev-project-ref]
# Find your project ref in Supabase Dashboard URL:
# supabase.com/dashboard/project/[ref]
```

> **Expected Outcome**
>
> **What you should have:** A working local development environment connected to your Dev Supabase project.
>
> **How to validate:**
>
> - `npm run dev` starts without errors
> - App loads at localhost:3000
> - Can sign up / sign in (creates user in Dev Supabase)
> - Database queries work (check browser console for errors)
> - Stripe checkout opens in test mode
>
> **Next:** Review Vercel environment configuration.

## 18.4 Vercel Environment Configuration Reference

This section provides detailed reference for Vercel environment variable configuration. If you completed Chapter 17, verify your setup matches the tables below. Vercel's three scopes (Development, Preview, Production) must map correctly to your Supabase projects.

### Environment Scope Mapping

#### For 2-Environment Setup

Both Development and Preview scopes use the Dev Supabase project:

| Vercel Scope | When Used | Supabase Project | Stripe Mode |
| --- | --- | --- | --- |
| **Development** | `vercel dev`, `vercel env pull` | Dev | Test |
| **Preview** | All preview deployments (PRs, branches) | Dev (shared) | Test |
| **Production** | Production deployment only | Prod | Live |

#### For 3-Environment Setup

Each scope connects to its own dedicated Supabase project:

| Vercel Scope | When Used | Supabase Project | Stripe Mode |
| --- | --- | --- | --- |
| **Development** | `vercel dev`, `vercel env pull` | Dev | Test |
| **Preview** | All preview deployments (PRs, branches) | Staging | Test |
| **Production** | Production deployment only | Prod | Live |

## 18.5 Preview Deployments

Vercel automatically creates preview deployments for every push to a non-production branch. These are useful for PR review, testing features before merge, and sharing with stakeholders. This section explains how preview deployments work and how they differ between 2-env and 3-env setups.

### How Preview Deployments Work

1. Push a branch or open a pull request
2. Vercel automatically creates a preview deployment
3. URL format: `[project]-[branch]-[username].vercel.app`
4. Preview uses environment variables scoped to "Preview"
5. Each subsequent push updates the same preview URL

### Preview Data Behavior by Setup

#### 2-Environment Setup

> **⚠ Warning:** Preview Shares Dev Database In 2-environment setup, preview deployments connect to your Dev Supabase project. This means: Test data created in previews appears in your local development Changes you make locally are visible in previews You cannot give external testers isolated test environments This is fine for solo development but limits external testing capabilities.

#### 3-Environment Setup

> **Preview Has Isolated Staging Database**
>
> In 3-environment setup, preview deployments connect to the Staging Supabase project:
>
> - External testers get isolated data that doesn't affect your development
> - You can share previews with stakeholders safely
> - Periodically reset Staging data when it becomes cluttered

## 18.6 Stripe Environment Configuration

Stripe provides separate Test and Live modes for payment processing. This section covers configuring Stripe across your environments, setting up webhooks, and preparing for production launch. Test mode allows you to simulate payments without real charges.

### Understanding Stripe Modes

| Mode | API Keys | When to Use | Real Charges? |
| --- | --- | --- | --- |
| **Test** | `pk_test_*`, `sk_test_*` | Local development, Preview/Staging | No (use test cards) |
| **Live** | `pk_live_*`, `sk_live_*` | Production only | Yes (real money) |

### Local Webhook Testing with Stripe CLI

```text
# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# This outputs a webhook signing secret (whsec_...)
# Use this value for STRIPE_WEBHOOK_SECRET in .env.local
```

## 18.7 Database Migration Workflow

Migrations are version-controlled SQL files that evolve your database schema. This section covers creating migrations, applying them across environments, and best practices for safe schema changes. Following this workflow ensures your database changes are reproducible and coordinated.

### Setting Up Supabase CLI for Migrations

```text
# Initialize Supabase in your project (if not done)
supabase init

# Link to your Development project
supabase link --project-ref [your-dev-project-ref]
# Project ref is found in: supabase.com/dashboard/project/[ref]
```

### Creating a New Migration

```text
# Create a new migration file
supabase migration new add_user_profiles_table

# This creates: supabase/migrations/[timestamp]_add_user_profiles_table.sql
```

### Applying Migrations

#### To Development (remote)

```text
supabase db push
# Applies all pending migrations to your linked (Dev) project
```

### Migration Best Practices

### Migration Checklist

- [ ] Each migration should be atomic (one logical change)
- [ ] Consider rollback strategy for each migration
- [ ] Always enable RLS on new tables
- [ ] Test migration on Dev before Staging
- [ ] Test migration on Staging before Production
- [ ] Create production backup before applying
- [ ] Commit migration files to version control

## 18.8 Troubleshooting Common Issues

This section covers common problems you may encounter with your multi-environment setup and how to resolve them. Keep this as a reference when debugging connection or configuration issues.

### Issue: "Invalid API key" errors

- **Cause:** Wrong Supabase environment variables
- **Fix:** Verify you're using the correct project's keys for each environment
- **Check:** Ensure `NEXT_PUBLIC_SUPABASE_URL` matches the expected project

### Issue: Auth redirects to wrong URL

- **Cause:** Site URL not configured in Supabase Auth settings
- **Fix:** Add the deployment URL to Supabase → Authentication → URL Configuration → Redirect URLs
- **For Preview:** Add wildcard pattern `https://*-[your-vercel-username].vercel.app/**`

### Issue: RLS blocking all queries

- **Cause:** Missing or incorrect RLS policies
- **Fix:** Check policies in Supabase → Authentication → Policies
- **Debug:** Temporarily use service role key (server-side only) to verify data exists

### Issue: Stripe webhooks failing

- **Cause:** Wrong webhook secret or URL
- **Fix:** Verify `STRIPE_WEBHOOK_SECRET` matches the endpoint's signing secret
- **Debug:** Check Stripe Dashboard → Webhooks → Recent events for error details

### Issue: Environment variables not updating

- **Cause:** Vercel caches environment variables per deployment
- **Fix:** Trigger a new deployment after changing env vars
- **Quick fix:** Vercel Dashboard → Deployments → Redeploy

## 18.9 Environment Setup Checklist

Use these checklists to verify your environment setup is complete. Choose the checklist that matches your chosen configuration (2-environment or 3-environment).

### For 2-Environment Setup

### Supabase Setup (2-Environment)

- [ ] Development project created (`[project]-dev`)
- [ ] Production project created (`[project]-prod`)
- [ ] Auth URL Configuration set for each project (Dev includes preview URLs)
- [ ] Auth providers enabled for each project
- [ ] RLS enabled on all tables in all projects
- [ ] All credentials recorded securely (6 values total)

### Vercel Setup (2-Environment)

- [ ] Project imported from GitHub
- [ ] Development env vars added (pointing to Dev Supabase)
- [ ] Preview env vars added (pointing to Dev Supabase — shared)
- [ ] Production env vars added (pointing to Prod Supabase)
- [ ] Custom domain configured (optional until launch)

### Common to Both Setups

### Local Development

- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Vercel CLI linked (`vercel link`)
- [ ] Environment variables pulled (`vercel env pull .env.local`)
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] Can authenticate via the app (sign up/sign in works)
- [ ] Can read/write to database
- [ ] Stripe checkout works in test mode

## 18.10 Automating Setup with Claude Code

Many of the local setup tasks in this chapter can be automated using Claude Code. This section describes a two-stage workflow: use Claude Chat to generate your configuration, then Claude Code to execute the setup.

## 18.11 Upgrading from 2-Environment to 3-Environment

If you started with a 2-environment setup (Dev + Prod) and later decide you need a dedicated Staging environment for isolated preview testing, this section guides you through the upgrade process. This is typically done when you need to share previews with external testers without affecting your development database.

### When to Upgrade

Consider upgrading to 3-environment when:

- You're sharing preview URLs with external stakeholders or clients
- Preview test data is polluting your development database
- You want isolated environments for QA testing
- You've upgraded to Supabase Pro or can use a second organization

## 18.12 Chapter Summary

You've completed the multi-environment configuration. Here's what you accomplished:

- Chose between 2-environment and 3-environment setups based on your needs
- Configured Supabase projects with proper auth URLs and RLS
- Set up local development connected to cloud infrastructure
- Configured Vercel environment variables for each deployment scope
- Learned how preview deployments work in your chosen setup
- Configured Stripe for test and production modes
- Established database migration workflows
- Have troubleshooting knowledge for common issues

Your development and deployment infrastructure is now professional-grade. You can develop locally, test via preview deployments, and deploy to production with confidence.
