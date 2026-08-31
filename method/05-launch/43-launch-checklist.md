---
chapter: 43
title: "Launch Checklist"
slug: "launch-checklist"
phase: 5
phase_name: "Launch"
milestone: null
checkpoint: null
tool: "claude-chat"
session: null
estimated_time: null
prompts: []
deliverables: "Live production application accessible to users"
prerequisites: []
when_to_use:
  - "QA passed, staging verified, ready to launch to production."
gate: null
source_html: "archive/html-v3/handbook/phase5/chapter-43-launch-checklist.html"
---

# Chapter 43: Launch Checklist

> **TL;DR** — Final verification before going live. A comprehensive checklist covering technical, security, legal, business, and marketing requirements for a successful launch.

> **When to use:** QA passed, staging verified, ready to launch to production.

In this chapter, you'll work through the final launch checklist. By the end, you'll have a live production application ready for real users.

> **Workflow tip:** **Workflow Tip:** This is a GATE chapter. Every checkbox must be verified before announcing to users.

## 43.1 Overview

The launch checklist ensures nothing critical is missed. Work through each section systematically—a single overlooked item can derail your launch.

## 43.2 Technical Checklist

### Technical Requirements

- [ ] **SSL Certificate** — HTTPS active, padlock visible in browser
- [ ] **DNS Configured** — Domain points to Vercel, propagation complete
- [ ] **Environment Variables** — All production values set in Vercel
- [ ] **Database Backups** — Supabase automatic backups enabled
- [ ] **Error Tracking** — Sentry configured and receiving test errors
- [ ] **Uptime Monitoring** — Monitoring service active, alerts configured
- [ ] **Build Passing** — Latest commit deploys successfully
- [ ] **Performance** — Lighthouse score >= 90

> **DO: Verify DNS and SSL**
>
> # Check DNS propagation dig yourdomain.com # Check SSL certificate curl -vI https://yourdomain.com 2>&1 | grep -A 10 "Server certificate" # Or simply visit in browser and check: # - URL shows https:// # - Padlock icon appears # - Certificate shows your domain

## 43.3 Security Checklist

### Security Requirements

- [ ] **Authentication Tested** — Login, logout, password reset all work
- [ ] **RLS Policies Verified** — Users can only access their own data
- [ ] **API Rate Limiting** — Vercel or custom rate limiting active
- [ ] **Security Headers** — X-Frame-Options, HSTS, CSP configured
- [ ] **Secrets Secure** — No secrets in client-side code or git history
- [ ] **Input Validation** — Forms reject malicious input (XSS, SQL injection)
- [ ] **Admin Routes Protected** — Admin pages require proper authorization
- [ ] **Sensitive Data Encrypted** — PII handled according to policy

> **⚠ Warning:** **Security is Non-Negotiable:** A single security vulnerability can compromise all user data. Do not skip any item in this section.

## 43.4 Legal Checklist

### Legal Requirements

- [ ] **Privacy Policy** — Published and linked in footer
- [ ] **Terms of Service** — Published and linked in footer
- [ ] **Cookie Consent** — Banner shown (if required in your jurisdiction)
- [ ] **GDPR Compliance** — Data deletion request process documented (if applicable)
- [ ] **Accessibility** — Basic WCAG 2.1 AA compliance verified
- [ ] **Copyright Notice** — Footer shows current year

> **Note:** Legal Disclaimer:
>
> This checklist provides general guidance. Consult a lawyer for specific legal requirements in your jurisdiction.

## 43.5 Business Checklist

### Business Requirements

- [ ] **Stripe Live Mode** — Switched from test to live keys
- [ ] **Stripe Webhooks** — Production webhook URL configured
- [ ] **Payment Test** — Real (small) transaction completed and refunded
- [ ] **Email Templates** — Welcome, password reset, receipt emails work
- [ ] **Transactional Email** — Email provider configured (Resend, SendGrid, etc.)
- [ ] **Support Channel** — Contact email, chat, or help center ready
- [ ] **Billing Portal** — Users can manage subscription and billing

> **DO: Test Stripe Live Mode**
>
> 1. Switch to live Stripe keys in Vercel environment variables
> 2. Update webhook URL to production domain in Stripe Dashboard
> 3. Make a real purchase (lowest tier)
> 4. Verify webhook received (Stripe Dashboard → Webhooks → Logs)
> 5. Issue refund to confirm refund flow works
> 6. Check user has correct subscription status in your app

## 43.6 Marketing Checklist

### Marketing Requirements

- [ ] **Analytics Installed** — Google Analytics, Plausible, or similar
- [ ] **OG Images** — Social sharing previews look good (test with opengraph.xyz)
- [ ] **Meta Tags** — Title, description, favicon on all pages
- [ ] **Landing Page Live** — Clear value proposition, CTA works
- [ ] **Sitemap** — sitemap.xml accessible
- [ ] **Robots.txt** — Configured correctly (not blocking important pages)
- [ ] **Social Links** — Twitter, LinkedIn, etc. (if applicable)

> **DO: Verify Social Sharing**
>
> # Test OG tags with these tools: # - https://opengraph.xyz (preview) # - https://cards-dev.twitter.com/validator (Twitter) # - https://developers.facebook.com/tools/debug/ (Facebook) # Check that: # - Title appears correctly # - Description is compelling # - Image renders at proper size (1200x630 recommended) # - URL is clean (no query params)

## 43.7 Launch Day Protocol

Launch day has its own workflow. Follow these steps in order.

### Launch Day Steps

- [ ] **1. Final Smoke Test** — Run through core flow on production one more time
- [ ] **2. Team Standby** — All team members available for quick response
- [ ] **3. Monitoring Dashboard Open** — Sentry, uptime, analytics visible
- [ ] **4. Support Channel Ready** — Email/chat monitored
- [ ] **5. Deploy to Production** — Merge to main, verify deployment
- [ ] **6. Post-Deploy Smoke Test** — Quick verification after deploy
- [ ] **7. Announce** — Social media, email list, communities
- [ ] **8. Monitor** — Watch for errors and user feedback for 24-48 hours

> **⚠ Warning:** **DNS Propagation:** If you just set up DNS, wait up to 48 hours for global propagation. Test from multiple networks (mobile data, different ISPs) before announcing.

## 43.8 Post-Launch (First 48 Hours)

The first 48 hours after launch are critical. Stay vigilant.

### MONITOR: Post-Launch

- [ ] **Error rates** — Check Sentry for new errors every few hours
- [ ] **Performance** — Watch response times in Vercel Analytics
- [ ] **User feedback** — Respond quickly to support requests
- [ ] **Conversion funnel** — Are users completing signup and core actions?
- [ ] **Payment flow** — Are purchases completing successfully?

> **DO: Quick Response Protocol**
>
> If critical issues arise:
>
> 1. **Assess severity** — Is the app unusable? Is data at risk?
> 2. **Communicate** — If widespread, post status update (Twitter, status page)
> 3. **Fix or rollback** — Quick fix if simple, otherwise rollback to last good deploy
> 4. **Postmortem** — Document what happened and how to prevent it

## 43.9 Verification

> **Expected Outcome**
>
> **What you should have:**
>
> - Live production application at your domain
> - All checklist items verified
> - Real users able to sign up and use the product
> - Payments processing successfully
> - Monitoring active and alerting configured
>
> **How to validate:**
>
> - Visit production URL — loads correctly
> - Create test account — signup flow works
> - Complete core feature — functionality works
> - Make test purchase — payment completes
> - Check monitoring — no critical errors

## 43.10 Complete Launch Checklist (Printable)

Use this comprehensive checklist for launch day. Click "Print Checklist" to save or print.

### Complete Launch Checklist

- [ ] SSL Certificate active
- [ ] DNS configured and propagated
- [ ] Environment variables set
- [ ] Database backups enabled
- [ ] Error tracking configured
- [ ] Uptime monitoring active
- [ ] Build passing
- [ ] Performance >= 90
- [ ] Authentication tested
- [ ] RLS policies verified
- [ ] Rate limiting active
- [ ] Security headers set
- [ ] Secrets secure
- [ ] Input validation working
- [ ] Admin routes protected
- [ ] Privacy Policy published
- [ ] Terms of Service published
- [ ] Cookie consent (if needed)
- [ ] Accessibility basics met
- [ ] Stripe live mode
- [ ] Webhooks configured
- [ ] Payment tested
- [ ] Email templates working
- [ ] Support channel ready
- [ ] Analytics installed
- [ ] OG images set
- [ ] Meta tags complete
- [ ] Landing page live
- [ ] Sitemap accessible
- [ ] Final smoke test
- [ ] Team standby
- [ ] Monitoring dashboard open
- [ ] Deploy to production
- [ ] Post-deploy verification
- [ ] Announce

## 43.11 Chapter Summary

You've completed the final launch checklist. Key takeaways:

- Systematic verification prevents launch-day disasters
- Security and legal requirements are non-negotiable
- Business setup (payments, email) must be tested with real transactions
- Marketing basics (analytics, OG images) maximize launch impact
- Post-launch monitoring catches issues before users report them

**Congratulations!** You've completed the AI SaaS Handbook. Your application is now live and ready for users.

> **You Did It!**
>
> From idea validation through launch, you've built a production-quality SaaS application using AI-assisted development. The MOAI framework has guided you through every phase.
>
> **What's next:**
>
> - Monitor and iterate based on user feedback
> - Continue using MOAI principles for new features
> - Scale your application as usage grows
