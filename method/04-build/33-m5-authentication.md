---
chapter: 33
title: "Milestone 5 — Authentication"
slug: "m5-authentication"
phase: 4
phase_name: "Build"
milestone: "M5"
checkpoint: null
tool: "claude-code"
session: null
estimated_time: null
prompts:
  - "5.1"
  - "5.2"
deliverables: "Auth flows working, protected routes, user session management"
prerequisites: []
when_to_use:
  - "After M4 (Layouts) is complete. Your app should have working layouts and navigation before adding authentication."
gate: null
source_html: "archive/html-v3/handbook/phase4/chapter-33-m5-authentication.html"
---

# Chapter 33: Milestone 5 — Authentication

> **TL;DR** — Implement secure authentication with Supabase Auth: login, signup, protected routes, and session management using 2 prompts.

> **When to use:** After M4 (Layouts) is complete. Your app should have working layouts and navigation before adding authentication.

In this chapter, you'll implement authentication with Supabase Auth. By the end, you'll have secure login, signup, protected routes, and user session management.

> **Workflow tip:** **Workflow Tip:** Auth involves both client and server code. Review [Agentic Patterns](../00-operating/16-understanding-sub-agents.md) for handling multi-file changes.

## 33.1 Overview

Authentication is the gateway to your application. Proper implementation with Supabase Auth gives you secure sessions, token refresh, and protected routes - without building auth from scratch.

## 33.2 Implementation Prompts

### Prompt 5.1: Supabase Auth Configuration

### Prompt 5.1 — Supabase Auth Configuration

> Prompt file: [`prompts/B-5.1-supabase-auth-configuration.md`](../../prompts/B-5.1-supabase-auth-configuration.md)

```text
ROLE
Full-Stack Developer implementing authentication.

CONTEXT
Project: {{productName}}
Layouts complete (Milestone 4).
Using Supabase Auth with email/password.

OBJECTIVE
Set up Supabase auth clients and middleware.

REQUIREMENTS

1. Install Supabase packages:
   - @supabase/supabase-js
   - @supabase/ssr

2. Create Supabase clients (src/lib/supabase/):
   - client.ts: Browser client for client components
   - server.ts: Server client for server components/actions
   - middleware.ts: Client for middleware (token refresh)

3. Create middleware (src/middleware.ts):
   - Refresh auth tokens on each request
   - Protect /dashboard/* and /app/* routes
   - Redirect unauthenticated users to /login
   - Redirect authenticated users away from /login, /signup

4. Create auth context provider (src/components/providers/):
   - UserProvider: Wraps app with user context
   - useUser hook: Access current user
   - Subscribe to auth state changes

5. Create auth utility functions (src/lib/auth.ts):
   - getCurrentUser(): Get user from server
   - requireUser(): Throw if not authenticated
   - signOut(): Server action for logout

VERIFICATION
Protected routes redirect to login when not authenticated
Auth routes redirect to dashboard when authenticated
```

### Prompt 5.2: Login and Signup Pages

### Prompt 5.2 — Login and Signup Pages

> Prompt file: [`prompts/B-5.2-login-and-signup-pages.md`](../../prompts/B-5.2-login-and-signup-pages.md)

```text
ROLE
Frontend Developer creating authentication UI.

CONTEXT
Project: {{productName}}
Supabase auth configured (Prompt 5.1).
Design system available.

OBJECTIVE
Create login and signup pages with proper validation.

REQUIREMENTS

1. Login page (src/app/(auth)/login/page.tsx):
   - Email and password fields
   - "Remember me" checkbox (optional)
   - "Forgot password" link
   - Link to signup page
   - Loading state during submission
   - Error display for invalid credentials

2. Signup page (src/app/(auth)/signup/page.tsx):
   - Email, password, confirm password fields
   - Full name field (optional)
   - Terms acceptance checkbox
   - Link to login page
   - Loading state during submission
   - Success message (check email for verification)

3. Form validation (using react-hook-form + zod):
   - Email: Valid email format
   - Password: Minimum 8 characters
   - Confirm password: Must match password
   - Show validation errors inline

4. Server actions (src/app/(auth)/actions.ts):
   - signInAction: Handle login form submission
   - signUpAction: Handle signup form submission
   - Return proper error messages

5. Password reset flow (optional for MVP):
   - Forgot password page with email input
   - Reset password page (from email link)

VERIFICATION
Can create new account and receive verification email
Can log in with valid credentials
Validation errors display correctly
Redirects to dashboard after successful login
```

## 33.3 Verification

> **Expected Output**
>
> After completing this milestone, you should have:
>
> - Supabase auth clients configured for browser and server
> - Login and signup pages with form validation
> - Middleware protecting authenticated routes
> - User context provider and useUser hook

### Verification Checklist

- [ ] Create new account (receive verification email)
- [ ] Log in with valid credentials
- [ ] Protected routes redirect to login when unauthenticated
- [ ] Auth routes redirect to dashboard when logged in
- [ ] `npm run build` passes without errors

## 33.4 Chapter Summary

You've completed Milestone 5. Your project now has:

- Supabase auth clients (browser, server, middleware)
- Middleware for route protection and token refresh
- Login page with validation
- Signup page with validation
- User context provider and useUser hook
- Auth utility functions

**Next:** Chapter 34 (Milestone 6) - Build your core feature using the four-prompt pattern.
