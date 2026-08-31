---
chapter: 42
title: "QA & Deployment"
slug: "qa-deployment"
phase: 5
phase_name: "Launch"
milestone: null
checkpoint: null
tool: "claude-code"
session: null
estimated_time: null
prompts: []
deliverables: "Staging environment deployed, all tests passing, monitoring configured, rollback plan documented"
prerequisites: []
when_to_use:
  - "All milestones complete, ready for final testing before launch."
gate: null
source_html: "archive/html-v3/handbook/phase5/chapter-42-qa-deployment.html"
---

# Chapter 42: QA & Deployment

> **TL;DR** — Comprehensive QA process and deployment pipeline setup. Validate your application through systematic testing, deploy to staging, configure monitoring, and prepare rollback procedures.

> **When to use:** All milestones complete, ready for final testing before launch.

In this chapter, you'll establish your QA workflow and deployment pipeline. By the end, you'll have a staging environment running, all tests passing, and monitoring in place.

> **Workflow tip:** **Workflow Tip:** This is a GATE chapter. Do not proceed to Launch until all verification items pass.

## 42.1 Overview

QA & Deployment bridges development and launch. It ensures your application works correctly in a production-like environment before real users see it.

## 42.2 QA Strategy

Systematic QA catches issues before users do. Work through each testing category methodically.

### Manual Testing Checklist

### VERIFY: Core User Flows

- [ ] **Sign up** — Create account with new email, verify email confirmation works
- [ ] **Log in** — Sign in with credentials, confirm redirect to dashboard
- [ ] **Core feature** — Complete the main user journey end-to-end
- [ ] **Settings** — Update profile, change password, manage preferences
- [ ] **Logout** — Session cleared, redirect to home or login

### VERIFY: Edge Cases

- [ ] **Error states** — Wrong password, invalid input, network offline
- [ ] **Empty states** — New user with no data
- [ ] **Loading states** — Slow network simulation (DevTools Network throttling)
- [ ] **Mobile** — Test on actual device or Chrome DevTools mobile view
- [ ] **Cross-browser** — Chrome, Firefox, Safari (at minimum)

### Automated Test Verification

> **DO: Run Full Test Suite**
>
> # Run all tests npm test # Run with coverage npm test -- --coverage # Run E2E tests npm run test:e2e # Verify TypeScript npx tsc --noEmit # Verify lint npm run lint # Verify build npm run build

### VERIFY: Test Metrics

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All E2E tests pass
- [ ] Coverage >= 80% for business logic
- [ ] No TypeScript errors
- [ ] No lint warnings
- [ ] Build completes without errors

## 42.3 Staging Environment

A staging environment mirrors production. It catches environment-specific issues before they reach users.

### Staging Setup

> **DO: Configure Staging Environment**
>
> 1. **Create staging branch** — `git checkout -b staging`
> 2. **Configure Vercel** — Set up staging subdomain (e.g., staging.yourapp.com)
> 3. **Supabase staging project** — Create separate project for staging data
> 4. **Set environment variables** — Configure staging-specific keys in Vercel
> 5. **Deploy to staging** — Push staging branch, verify deployment

### Data Seeding

> **DO: Seed Staging Data**
>
> # Create seed script (src/lib/seed.ts or scripts/seed.ts) # Include realistic test data: # - Test users with various roles # - Sample content/items # - Edge case data (long strings, special characters) # Run seed npm run seed:staging

### Smoke Tests

### VERIFY: Staging Works

- [ ] Staging URL accessible (https://staging.yourapp.com)
- [ ] Login works with seeded test user
- [ ] Database connection working (data loads)
- [ ] API routes respond correctly
- [ ] Static assets load (images, fonts, CSS)
- [ ] Environment variables correctly set (no "undefined" errors)

## 42.4 Deployment Pipeline

A reliable deployment pipeline reduces launch risk. Configure CI/CD to catch issues automatically.

### Vercel Configuration

> **DO: Configure Vercel Project**
>
> 1. **Connect repository** — Link GitHub repo to Vercel project
> 2. **Set build command** — `npm run build`
> 3. **Set output directory** — `.next`
> 4. **Configure environment variables**:
>   - `NEXT_PUBLIC_SUPABASE_URL`
>   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
>   - `SUPABASE_SERVICE_ROLE_KEY`
>   - `STRIPE_SECRET_KEY` (if using payments)
>   - `STRIPE_WEBHOOK_SECRET`
> 5. **Set up preview deployments** — Enable for PRs

### CI/CD Pipeline

> **DO: GitHub Actions Workflow**
>
> Create `.github/workflows/ci.yml`:
>
> name: CI on: push: branches: [main, staging] pull_request: branches: [main] jobs: test: runs-on: ubuntu-latest steps: - uses: actions/checkout@v4 - uses: actions/setup-node@v4 with: node-version: '20' cache: 'npm' - run: npm ci - run: npm run lint - run: npm run build - run: npm test

## 42.5 Rollback Plan

Know how to revert before you deploy. A clear rollback plan reduces stress during incidents.

> **⚠ Warning:** **Critical:** Document your rollback plan BEFORE going live. In an incident, you won't have time to figure it out.

> **DO: Document Rollback Procedures**
>
> Create `docs/runbooks/rollback.md`:
>
> # Rollback Procedures ## Code Rollback (Vercel) 1. Go to Vercel Dashboard → Deployments 2. Find last known good deployment 3. Click "..." → "Promote to Production" 4. Verify site works ## Database Rollback (Supabase) 1. Go to Supabase Dashboard → Database → Backups 2. Select backup from before the issue 3. Click "Restore" (creates new project) 4. Update environment variables to point to restored DB ## Stripe Rollback - Stripe transactions cannot be rolled back - For pricing changes: revert in Stripe Dashboard → Products - For webhook issues: check Stripe Dashboard → Webhooks → Logs ## Emergency Contacts - Primary: [Your name] - [phone] - Backup: [Team member] - [phone]

## 42.6 Monitoring Setup

Monitoring tells you about problems before users complain. Set up error tracking and uptime monitoring before launch.

### Error Tracking (Sentry)

> **DO: Configure Sentry**
>
> # Install Sentry npm install @sentry/nextjs # Run setup wizard npx @sentry/wizard@latest -i nextjs # Verify in sentry.client.config.ts and sentry.server.config.ts # Test error reporting: # throw new Error("Test Sentry integration");

### Uptime Monitoring

> **DO: Set Up Uptime Monitoring**
>
> Options (choose one):
>
> - **Vercel Analytics** — Built-in, enable in Vercel Dashboard
> - **BetterStack (formerly BetterUptime)** — Free tier, SMS alerts
> - **UptimeRobot** — Free tier, 5-minute checks
>
> Configure to check:
>
> - Homepage (GET /)
> - API health endpoint (GET /api/health)
> - Login page (GET /login)

### Alerting

### VERIFY: Alerting Configured

- [ ] Error alerts go to Slack/email/SMS
- [ ] Uptime alerts configured
- [ ] Alert thresholds set (e.g., error rate > 1%)
- [ ] Test alert received (trigger test error)

## 42.7 Verification

> **Expected Outcome**
>
> **What you should have:**
>
> - All automated tests passing (unit, integration, E2E)
> - Staging environment deployed and accessible
> - Manual QA complete on staging
> - CI/CD pipeline running on push
> - Rollback procedures documented
> - Error tracking (Sentry) configured
> - Uptime monitoring active
>
> **How to validate:**
>
> - `npm test` — All tests green
> - Staging URL accessible in browser
> - Trigger test error, verify appears in Sentry
> - Check uptime monitor shows "Up"

> **Note:** GATE Check:
>
> Do not proceed to Chapter 43 (Launch Checklist) until all verification items pass. This is your last quality gate before real users see your product.

## 42.8 Chapter Summary

You've established QA and deployment infrastructure. Key takeaways:

- Systematic QA catches issues before users do
- Staging mirrors production for realistic testing
- CI/CD automates quality checks on every push
- Rollback procedures reduce incident stress
- Monitoring provides visibility into production health

**Next:** Chapter 43 — Final Launch Checklist before going live.
