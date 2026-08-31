---
chapter: 17
title: "Vercel Project Setup"
slug: "vercel-setup"
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
source_html: "archive/html-v3/handbook/phase3/chapter-17-vercel-setup.html"
---

# Chapter 17: Vercel Project Setup

In this chapter, you'll connect your Next.js application to Vercel for deployment. Vercel handles building, hosting, and serving your application with automatic deployments triggered by Git pushes. By the end of this chapter, your application will be deployed and connected to Supabase.

## 17.1 Purpose

Vercel provides three deployment environments that map to your Git workflow: Development (for local work), Preview (for pull request testing), and Production (for live users). Each environment can have its own set of environment variables, allowing you to connect different Supabase projects to different deployment contexts.

**What you'll accomplish:** Import your repository to Vercel, configure environment variables for each deployment scope, and verify your application deploys correctly.

## 17.2 Import Project

Vercel automatically detects Next.js projects and configures the build settings. The initial import creates the project and sets up the Git integration—any future pushes to your repository will trigger automatic deployments.

> **Note:** Tool:
>
> Manual (Vercel Dashboard) - Initial setup requires the dashboard.

### Instructions

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import" next to your GitHub repository
3. Verify the settings:
  - Framework Preset: **Next.js** (auto-detected)
  - Root Directory: `./`
4. Click "Deploy"

> **Expected: Initial Deploy Will Fail**
>
> The first deployment will fail because environment variables aren't configured yet. This is normal—you'll add them in the next section and redeploy.

> **Expected Outcome**
>
> **What you should have:** A Vercel project created, visible in your Vercel dashboard, linked to your GitHub repository.
>
> **How to validate:** You should see your project in the Vercel dashboard with a failed deployment (red status). The Git integration should show your repository name.
>
> **Next:** Configure environment variables for each deployment scope.

## 17.3 Environment Variables

Vercel environment variables have three scopes: Development (used with `vercel dev`), Preview (for branch/PR deployments), and Production (for your main branch). You'll configure each scope to connect to the appropriate Supabase project from Chapter 16.

### Instructions

Go to **Project Settings → Environment Variables** and add the following variables. For each variable, select the appropriate checkboxes for which environments it applies to.

#### For 2-Environment Setup

In this setup, both Development and Preview scopes use the Dev Supabase project:

| Variable | Development | Preview | Production |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Dev URL | Dev URL | Prod URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dev key | Dev key | Prod key |
| `SUPABASE_SERVICE_ROLE_KEY` | Dev service key | Dev service key | Prod service key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Test key | Test key | Live key |
| `STRIPE_SECRET_KEY` | Test secret | Test secret | Live secret |

*Note: Preview deployments share the Dev database, so test data created during PR reviews will appear in your development environment.*

#### For 3-Environment Setup

In this setup, each scope connects to its dedicated Supabase project:

| Variable | Development | Preview | Production |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Dev URL | Staging URL | Prod URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dev key | Staging key | Prod key |
| `SUPABASE_SERVICE_ROLE_KEY` | Dev service key | Staging service key | Prod service key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Test key | Test key | Live key |
| `STRIPE_SECRET_KEY` | Test secret | Test secret | Live secret |

> **Adding Variables by Scope**
>
> When adding a variable in Vercel, you can either: (1) add the same value for all environments by checking all three boxes, or (2) add the variable multiple times with different values and different scope checkboxes. For Supabase variables that differ per environment, use approach (2).

> **Expected Outcome**
>
> **What you should have:** 5 environment variables configured, each with values for Development, Preview, and Production scopes.
>
> **How to validate:** In Project Settings → Environment Variables, you should see all variables listed. Click on each to verify the values per environment are correct.
>
> **Next:** Verify the deployment works with your new configuration.

## 17.4 Verify Deployment

With environment variables configured, you need to trigger a new deployment and verify everything connects correctly. You'll also set up your local environment to use the same variables.

> **Run in:** Claude Code · **Session:** Same Session

> Prompt file: [`prompts/X-17-1-vercel-project-setup.md`](../../prompts/X-17-1-vercel-project-setup.md)

```text
Verify the Vercel deployment is working correctly.

1. Trigger a redeployment in Vercel Dashboard:
   - Go to Deployments tab
   - Click the three dots on the failed deployment
   - Select "Redeploy"

2. While that deploys, pull environment variables for local development:
   vercel link
   vercel env pull .env.local

3. Start the development server:
   npm run dev

4. Verify locally:
   - App loads at localhost:3000
   - No console errors about missing env vars
   - Open browser DevTools → Network tab
   - Look for requests to your Supabase URL (should return 200)

5. Verify the Vercel deployment:
   - Check the deployment completed successfully (green status)
   - Click the deployment URL to open the preview
   - Verify the app loads without errors
```

> **Expected Outcome**
>
> **What you should have:** A successful Vercel deployment (green status) and a working local development environment.
>
> **How to validate:**
>
> - Vercel dashboard shows green "Ready" status on the latest deployment
> - Clicking the deployment URL loads your application
> - Local `npm run dev` runs without environment variable errors
> - `.env.local` file exists in your project root with Supabase variables
>
> **Next:** Configure your custom domain (optional until launch).

## 17.5 Domain Configuration (Production)

Your production deployment is initially available at a `.vercel.app` subdomain. When you're ready to launch, you'll add your custom domain. This step is optional during development—you can complete it later before going live.

### Instructions (When Ready for Launch)

1. Go to **Project Settings → Domains**
2. Enter your custom domain (e.g., `myapp.com`)
3. Vercel will display DNS configuration instructions:
  - For apex domains: Add an A record pointing to Vercel's IP
  - For subdomains: Add a CNAME record pointing to `cname.vercel-dns.com`
4. Update your domain's DNS settings at your registrar
5. Wait for DNS propagation (usually minutes, sometimes up to 48 hours)
6. Vercel automatically provisions an SSL certificate

> **Remember to Update Supabase**
>
> When you add a custom domain, go back to your Production Supabase project and update the Site URL and Redirect URLs in Authentication → URL Configuration to use your new domain.

> **Expected Outcome**
>
> **What you should have:** Your custom domain resolving to your Vercel deployment with HTTPS enabled.
>
> **How to validate:** Visit `https://yourdomain.com` in a browser. The page should load with a valid SSL certificate (padlock icon).
>
> **Next:** Chapter 18 covers advanced multi-environment configuration and workflows.

## 17.6 Chapter Summary

You've completed the Vercel deployment setup. Here's what you accomplished:

- Imported your GitHub repository to Vercel with automatic deployments
- Configured environment variables for Development, Preview, and Production scopes
- Verified both local development and cloud deployment work correctly
- Learned how to add a custom domain when ready for launch

Your application is now deployed and connected to Supabase. Chapter 18 provides detailed guidance on managing multiple environments, including database migrations, preview deployment workflows, and troubleshooting common issues.
