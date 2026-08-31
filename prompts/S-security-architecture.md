---
id: "S-security-architecture"
title: "Security Architecture Prompt"
tool: "claude-chat"
variant: "canonical"
source: "archive/docusaurus/docs"
---

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
