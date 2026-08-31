---
chapter: 48
title: "API Specification"
slug: "48-api-specification"
phase: 3
phase_name: "Architect"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "continue"
estimated_time: "20 min read"
description: "Define API routes, request/response schemas, and authentication requirements"
prerequisites:
  - "Data Model Design complete"
  - "User flows documented in UX Package"
when_to_use:
  - "Database schema is designed"
  - "Ready to define API endpoints"
  - "Need to document contracts between frontend and backend"
skip_if: "Using a generated API (Supabase client, tRPC with inference)"
source_mdx: "archive/docusaurus/docs/phase-3-architect/api-specification.mdx"
---

# Chapter 48: API Specification

> **TL;DR**
> Document all API routes with methods, request/response schemas, authentication requirements, and error responses.
>
> **Why:** A complete API spec ensures frontend and backend development can proceed in parallel with clear contracts.
>
> **Outcome:** An API specification section in your architecture document or a standalone `docs/api-spec.md`.

> **When to use**
>
> - Database schema is designed
> - Ready to define API endpoints
> - Need to document contracts between frontend and backend
>
> **Skip if:** Using a generated API (Supabase client, tRPC with inference)

**Prerequisites**

- [ ] Data Model Design complete
- [ ] User flows documented in UX Package

## API Design Principles

Your API should follow these principles:

| Principle | Implementation |
|-----------|---------------|
| **RESTful** | Use HTTP methods correctly (GET, POST, PUT, DELETE) |
| **Consistent** | Same patterns across all endpoints |
| **Documented** | Every route has clear request/response schema |
| **Secure** | Authentication required for sensitive operations |
| **Validated** | All input validated before processing |

## Route Documentation Template

For each API route, document:

````markdown
### POST /api/items

**Purpose**: Create a new item

**Authentication**: Required (Bearer token)

**Request Body**:
```json
{
  "title": "string (required, max 200 chars)",
  "description": "string (optional, max 2000 chars)",
  "category_id": "uuid (required)"
}
```

**Success Response** (201):
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "category_id": "uuid",
  "created_at": "ISO timestamp",
  "updated_at": "ISO timestamp"
}
```

**Error Responses**:
- 400: Validation error (missing/invalid fields)
- 401: Unauthorized (no/invalid token)
- 403: Forbidden (not allowed to create in this category)
- 500: Server error
````

## API Specification Prompt

### API Specification Prompt

> Prompt file: [`prompts/S-api-spec.md`](../../prompts/S-api-spec.md)

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

## Example: Complete Resource API

````markdown
## Items API

### GET /api/items

**Purpose**: List items for authenticated user
**Auth**: Required

**Query Params**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page (max 100) |
| sort | string | created_at | Sort field |
| order | asc/desc | desc | Sort order |

**Response** (200):
```json
{
  "items": [...],
  "total": 150,
  "page": 1,
  "limit": 20,
  "hasMore": true
}
```

### GET /api/items/:id

**Purpose**: Get single item by ID
**Auth**: Required

**Response** (200): Single item object
**Errors**: 404 if not found or not owned by user

### POST /api/items

**Purpose**: Create new item
**Auth**: Required
**Body**: `{ title, description?, category_id }`
**Response** (201): Created item

### PUT /api/items/:id

**Purpose**: Update item
**Auth**: Required (must own item)
**Body**: `{ title?, description?, category_id? }`
**Response** (200): Updated item

### DELETE /api/items/:id

**Purpose**: Delete item
**Auth**: Required (must own item)
**Response** (204): No content
````

## Next.js App Router Pattern

With Next.js App Router, API routes live in `app/api/`:

```
app/
├── api/
│   ├── auth/
│   │   └── [...nextauth]/route.ts
│   ├── items/
│   │   ├── route.ts         # GET (list), POST (create)
│   │   └── [id]/route.ts    # GET, PUT, DELETE
│   └── ai/
│       └── generate/route.ts
```
