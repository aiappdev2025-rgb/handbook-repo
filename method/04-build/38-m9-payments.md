---
chapter: 38
title: "Milestone 9 — Payments"
slug: "m9-payments"
phase: 4
phase_name: "Build"
milestone: "M9"
checkpoint: null
tool: "claude-code"
session: null
estimated_time: null
prompts:
  - "9.1"
  - "9.2"
  - "9.3"
  - "9.4"
deliverables: "Stripe integration, webhooks, checkout flow, billing UI, subscription management"
prerequisites: []
when_to_use:
  - "After M8 (Supporting Features). Your app is feature-complete and ready to monetize."
gate: null
source_html: "archive/html-v3/handbook/phase4/chapter-38-m9-payments.html"
---

# Chapter 38: Milestone 9 — Payments

> **TL;DR** — Implement billing with Stripe: subscription plans, checkout flow, webhooks, and customer billing management.

> **When to use:** After M8 (Supporting Features). Your app is feature-complete and ready to monetize.

In this chapter, you'll integrate Stripe for subscription billing. By the end, you'll have a complete payment system with checkout, webhooks, and billing management.

> **Workflow tip:** **Workflow Tip:** Payment code requires extra security attention. See [Context Management](../00-operating/12-when-and-how-to-use-clear.md) for focused security review.

## 38.1 Overview

Payment integration is where your SaaS becomes a business. Stripe handles the complexity of payment processing, but proper webhook handling and subscription state management are critical for reliable billing.

## 38.2 Implementation Prompts

### Prompt 9.1: Stripe Configuration

### Prompt 9.1 — Stripe Configuration

> Prompt file: [`prompts/B-9.1-stripe-configuration.md`](../../prompts/B-9.1-stripe-configuration.md)

```text
ROLE
Full-Stack Developer setting up Stripe integration.

CONTEXT
Project: {{productName}}
Core features complete (Milestone 6).
Setting up Stripe for subscription billing.

OBJECTIVE
Configure Stripe SDK and database tables for payments.

REQUIREMENTS

1. Install Stripe packages:
   - stripe (server SDK)
   - @stripe/stripe-js (client SDK)

2. Configure environment variables:
   - STRIPE_SECRET_KEY (server only)
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - STRIPE_WEBHOOK_SECRET

3. Create Stripe client (src/lib/stripe.ts):
   - Server-side Stripe instance
   - Client-side loadStripe helper

4. Create database tables (migration):
   - subscriptions: user_id, stripe_customer_id, stripe_subscription_id,
     status, plan, current_period_end
   - prices: id, product_id, active, unit_amount, currency, interval
   - Enable RLS on both tables

5. Create Stripe helper functions:
   - getOrCreateCustomer(userId, email)
   - getSubscription(userId)
   - syncSubscriptionFromStripe(subscriptionId)

VERIFICATION
Stripe SDK connects successfully (test mode)
Database tables created with RLS
```

### Prompt 9.2: Webhook Handler

### Prompt 9.2 — Webhook Handler

> Prompt file: [`prompts/B-9.2-webhook-handler.md`](../../prompts/B-9.2-webhook-handler.md)

```text
ROLE
Backend Developer implementing Stripe webhooks.

CONTEXT
Project: {{productName}}
Stripe configured (Prompt 9.1).
Need webhook handler for subscription events.

OBJECTIVE
Create secure webhook endpoint for Stripe events.

REQUIREMENTS

1. Create webhook route (src/app/api/webhooks/stripe/route.ts):
   - POST handler only
   - Verify webhook signature (CRITICAL for security)
   - Parse event from request body

2. Handle subscription events:
   - customer.subscription.created: Create subscription record
   - customer.subscription.updated: Update status, plan, period
   - customer.subscription.deleted: Mark as canceled
   - invoice.payment_succeeded: Update current_period_end
   - invoice.payment_failed: Mark status as past_due

3. Handle checkout events:
   - checkout.session.completed: Link customer to user

4. Error handling:
   - Log errors with context for debugging
   - Return 200 even on errors (Stripe will retry)
   - Idempotent handlers (safe to process same event twice)

SECURITY
ALWAYS verify webhook signature before processing
NEVER trust event data without signature verification

VERIFICATION
Use Stripe CLI: stripe listen --forward-to localhost:3000/api/webhooks/stripe
Trigger test events and verify database updates
```

### Prompt 9.3: Checkout Flow

### Prompt 9.3 — Checkout Flow

> Prompt file: [`prompts/B-9.3-checkout-flow.md`](../../prompts/B-9.3-checkout-flow.md)

```text
ROLE
Full-Stack Developer implementing the checkout flow.

CONTEXT
Project: {{productName}}
Webhooks ready (Prompt 9.2).
Plans: {{list your pricing plans}}

OBJECTIVE
Create pricing page and Stripe Checkout integration.

REQUIREMENTS

1. Pricing page (src/app/(marketing)/pricing/page.tsx):
   - Display all available plans
   - Feature comparison table
   - Monthly/annual toggle if applicable
   - CTA buttons for each plan

2. Checkout API route (src/app/api/checkout/route.ts):
   - POST: Create Stripe Checkout session
   - Get or create Stripe customer
   - Set success_url and cancel_url
   - Return session URL for redirect

3. Checkout action (src/lib/actions/checkout.ts):
   - createCheckoutSession(priceId): Server action
   - Verify user is authenticated
   - Redirect to Stripe Checkout

4. Success and cancel pages:
   - /checkout/success: Thank you, redirect to dashboard
   - /checkout/cancel: Return to pricing with message

VERIFICATION
Complete checkout in Stripe test mode
Verify subscription created in database
User redirected properly after checkout
```

### Prompt 9.4: Billing Management

### Prompt 9.4 — Billing Management

> Prompt file: [`prompts/B-9.4-billing-management.md`](../../prompts/B-9.4-billing-management.md)

```text
ROLE
Full-Stack Developer building billing management UI.

CONTEXT
Project: {{productName}}
Checkout working (Prompt 9.3).
Users need to manage their subscriptions.

OBJECTIVE
Create billing settings page for subscription management.

REQUIREMENTS

1. Billing page (src/app/(app)/settings/billing/page.tsx):
   - Current plan display
   - Next billing date
   - Usage statistics if applicable
   - Manage subscription button

2. Customer portal integration:
   - Create portal session API route
   - Link to Stripe Customer Portal
   - Portal handles: update payment, cancel, view invoices

3. Subscription status handling:
   - Active: Full access
   - Past due: Show warning, allow limited access
   - Canceled: Show reactivation option
   - Trialing: Show trial end date

4. Access control middleware:
   - Check subscription status for premium features
   - Graceful degradation for expired subscriptions
   - Clear upgrade prompts

VERIFICATION
Billing page shows correct subscription status
Customer portal opens and works
Canceled users see appropriate messaging
```

## 38.3 Verification

> **Expected Output**
>
> After completing this milestone, you should have:
>
> - Stripe SDK configured with test mode
> - Webhook handler processing subscription events
> - Checkout flow creating subscriptions
> - Billing management page showing subscription status
> - Customer Portal integration for self-service

### Verification Checklist

- [ ] Complete checkout in Stripe test mode
- [ ] Verify subscription created in database
- [ ] Billing page shows correct subscription status
- [ ] Customer Portal opens and allows management
- [ ] Webhook events logged correctly
- [ ] `npm run build` passes without errors

## 38.4 Chapter Summary

You've completed Milestone 9. Your project now has:

- Stripe SDK configured
- Webhook handler for subscription events
- Pricing page with checkout
- Billing management page
- Customer Portal integration
- Subscription access control

**Next:** Chapter 39 (Milestone 10) - Polish the application with error handling and accessibility.
