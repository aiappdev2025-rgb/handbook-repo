---
chapter: 49
title: "Security Architecture"
slug: "49-security"
phase: 3
phase_name: "Architect"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "continue"
estimated_time: "20 min read"
description: "Design defense-in-depth security covering authentication, authorization, data protection, and common vulnerabilities"
prerequisites:
  - "API Specification complete"
  - "User roles defined in UX Package"
when_to_use:
  - "API specification is designed"
  - "Ready to formalize security controls"
  - "Need to document auth/authz approach"
skip_if: "Extending existing system with established security model"
source_mdx: "archive/docusaurus/docs/phase-3-architect/security.mdx"
---

# Chapter 49: Security Architecture

> **TL;DR**
> Design a defense-in-depth security approach covering authentication, authorization, data protection, and vulnerability prevention.
>
> **Why:** Security must be designed in, not bolted on. Retrofitting security is expensive and often incomplete.
>
> **Outcome:** A security section in your architecture document with specific controls for each layer.

> **When to use**
>
> - API specification is designed
> - Ready to formalize security controls
> - Need to document auth/authz approach
>
> **Skip if:** Extending existing system with established security model

**Prerequisites**

- [ ] API Specification complete
- [ ] User roles defined in UX Package

## Defense-in-Depth Layers

Security should exist at multiple layers so that if one layer fails, others still protect your system:

```
┌─────────────────────────────────────────────┐
│  Layer 1: Network (HTTPS, CORS, Rate Limiting) │
├─────────────────────────────────────────────┤
│  Layer 2: Authentication (Supabase Auth)      │
├─────────────────────────────────────────────┤
│  Layer 3: Authorization (RLS Policies)        │
├─────────────────────────────────────────────┤
│  Layer 4: Input Validation (Zod Schemas)      │
├─────────────────────────────────────────────┤
│  Layer 5: Data Protection (Encryption)        │
└─────────────────────────────────────────────┘
```

## Layer 1: Network Security

| Control | Implementation |
|---------|---------------|
| **HTTPS** | Enforced by Vercel (automatic) |
| **CORS** | Restrict to your domain only |
| **Rate Limiting** | 100 req/min per IP for API routes |
| **Headers** | CSP, X-Frame-Options, X-Content-Type-Options |

## Layer 2: Authentication

```typescript
// middleware.ts - Protect routes
export function middleware(request: NextRequest) {
  const session = await getSession(request);

  if (!session && request.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect('/login');
  }
}
```

## Layer 3: Authorization (RLS)

Every database table should have Row Level Security:

```sql
-- Users can only read their own data
CREATE POLICY "Users read own data"
  ON items FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only modify their own data
CREATE POLICY "Users modify own data"
  ON items FOR ALL
  USING (auth.uid() = user_id);
```

## Layer 4: Input Validation

Validate ALL user input with Zod:

```typescript

const createItemSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  category_id: z.string().uuid(),
});

// In API route
const result = createItemSchema.safeParse(body);
if (!result.success) {
  return Response.json({ error: result.error }, { status: 400 });
}
```

## Layer 5: Data Protection

| Data Type | Protection |
|-----------|------------|
| Passwords | Never stored (use Supabase Auth) |
| API Keys | Encrypted at rest, never in client code |
| PII | Encrypted columns where required |
| Sessions | HTTP-only, secure, same-site cookies |

## OWASP Top 10 Prevention

| Vulnerability | Prevention |
|--------------|------------|
| **Injection** | Parameterized queries (Supabase client handles this) |
| **Broken Auth** | Supabase Auth + session validation |
| **Sensitive Data** | HTTPS, encrypted storage |
| **XXE** | Not applicable (JSON only) |
| **Broken Access** | RLS policies on all tables |
| **Misconfig** | Environment-based config, no secrets in code |
| **XSS** | React auto-escaping, CSP headers |
| **Insecure Deserialization** | JSON schema validation |
| **Vulnerable Components** | Dependabot, npm audit |
| **Logging** | Structured logging without PII |

## Security Architecture Prompt

### Security Architecture Prompt

> Prompt file: [`prompts/S-security-architecture.md`](../../prompts/S-security-architecture.md)

```text
Define security architecture for [PRODUCT_NAME].

**Auth Strategy**: [AUTH_STRATEGY]
**Tech Stack**: [TECH_STACK]
**Entities**: [ENTITIES]

Cover these security layers:

**Layer 1: Network Security**
- HTTPS enforcement
- CORS configuration
- Rate limiting strategy
- Security headers (CSP, X-Frame-Options)

**Layer 2: Authentication**
- Auth provider integration
- Session management
- Token handling
- Protected routes

**Layer 3: Authorization**
- Row Level Security (RLS) policies for each table
- Role-based access control
- Resource ownership validation

**Layer 4: Input Validation**
- Validation library (Zod recommended)
- Schema definitions for all API inputs
- Error handling for invalid input

**Layer 5: Data Protection**
- Encryption at rest
- Secrets management (environment variables)
- PII handling
- Audit logging

**OWASP Top 10 Mitigations**
- Address each vulnerability with specific controls

Output as security-architecture.md
```

## Security Checklist

Before proceeding to implementation:

| Category | Requirement |
|----------|-------------|
| **Auth** | Authentication required for all /app routes |
| **RLS** | Every table has RLS enabled |
| **Validation** | All API inputs validated with Zod |
| **Secrets** | No secrets in code (use env vars) |
| **Headers** | Security headers configured |
| **CORS** | Restricted to your domain |
| **Rate Limiting** | Implemented on API routes |
