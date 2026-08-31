---
id: "S-api-spec"
title: "API Specification Prompt"
tool: "claude-chat"
variant: "canonical"
source: "archive/docusaurus/docs"
---

```text
Specify API for [PRODUCT_NAME].

**Entities**: [ENTITIES]
**Core Features**: [CORE_FEATURES]
**Auth Strategy**: [AUTH_STRATEGY]

For each endpoint, document:
1. **HTTP Method + Path** (GET /api/items)
2. **Purpose**: What the endpoint does
3. **Authentication**: Required/Optional/Public
4. **Request Body/Params**: Schema with validation rules
5. **Response Shape**: Success response schema
6. **Error Codes**: 400, 401, 403, 404, 500 with messages

Group endpoints by resource:
- /api/auth/* (authentication)
- /api/users/* (user profile management)
- /api/[domain]/* (domain-specific CRUD)
- /api/ai/* (AI-powered features)
- /api/billing/* (Stripe webhooks, subscription management)

For each request field, include:
- Type (string, number, uuid, etc.)
- Required or optional
- Validation rules (min/max length, pattern)

Output as api-spec.md
```
