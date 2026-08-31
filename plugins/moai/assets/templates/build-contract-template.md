# Build Contract: [Product Name]

> **Purpose**: This document compresses design artifacts (Design Brief, UX Package, UI System, Architecture) into a structured reference optimized for implementation. SPECs reference this document rather than hunting through multiple design documents.

**Version**: 1.0  
**Generated**: [Date]  
**Source Documents**: Design Brief v[X], UX Package v[X], UI System v[X], Architecture v[X]

---

## 1. Vocabulary

> Canonical terms used throughout the product. Use these terms EXACTLY in code (variable names, function names, comments, UI text).

| Term | Definition | Usage Context |
|------|------------|---------------|
| [Term 1] | [What it means] | [Where/how it's used] |
| [Term 2] | [What it means] | [Where/how it's used] |
| [Term 3] | [What it means] | [Where/how it's used] |

**Example**:
| Term | Definition | Usage Context |
|------|------------|---------------|
| Listing | A property description document created by the user | Core entity, database table, API responses |
| Generation | AI-created description content | Action verb, status state |
| User | Authenticated account holder | Auth context, RLS policies |

---

## 2. User Model

### 2.1 User Types

| Type | Description | Permissions |
|------|-------------|-------------|
| [Type 1] | [Who they are] | [What they can do] |
| [Type 2] | [Who they are] | [What they can do] |

**Example**:
| Type | Description | Permissions |
|------|-------------|-------------|
| User | Standard authenticated user | CRUD own listings, view own usage |
| Admin | System administrator | View all data, manage users, access analytics |

### 2.2 Authentication

- **Method**: [e.g., Supabase Auth with email/password]
- **Session Duration**: [e.g., 7 days]
- **Password Requirements**: [e.g., Minimum 8 characters]
- **Additional Auth**: [e.g., Magic link optional, OAuth providers]

### 2.3 Core User Flows

**Flow 1: [Name - e.g., New User Onboarding]**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Flow 2: [Name - e.g., Primary Value Delivery]**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Flow 3: [Name - e.g., Return User Session]**
1. [Step 1]
2. [Step 2]
3. [Step 3]

---

## 3. Screen Inventory

### 3.1 Public Screens (No Auth Required)

| Screen | Route | Purpose | Key Components |
|--------|-------|---------|----------------|
| [Screen 1] | [/route] | [What user accomplishes] | [Main UI elements] |

### 3.2 Authenticated Screens

| Screen | Route | Purpose | Key Components |
|--------|-------|---------|----------------|
| [Screen 1] | [/route] | [What user accomplishes] | [Main UI elements] |

**Example**:
| Screen | Route | Purpose | Key Components |
|--------|-------|---------|----------------|
| Landing | / | Marketing, conversion | Hero, Features, Pricing, CTA |
| Dashboard | /dashboard | User home, listing management | ListingGrid, CreateButton, UsageWidget |
| Create | /create | New listing creation | PhotoUpload, GenerateButton, PreviewPane |
| Edit | /listing/[id] | Modify existing listing | DescriptionEditor, RegenerateButton |

---

## 4. Component Specifications

> Key interactive components with their behaviors, states, and validation rules.

### 4.1 [Component Name]

- **Purpose**: [What this component does]
- **Location**: [Where it appears]

**States**:
| State | Visual | Behavior |
|-------|--------|----------|
| [state 1] | [how it looks] | [what happens] |

**Validation**:
- [Rule 1]
- [Rule 2]

**Example - PhotoUpload Component**:

- **Purpose**: Allow users to upload property photos
- **Location**: Create listing page, Edit listing page

**States**:
| State | Visual | Behavior |
|-------|--------|----------|
| empty | Dashed border, upload icon, "Drop photos here" | Accepts drag-drop or click |
| uploading | Progress bar, thumbnail preview | Shows upload percentage |
| complete | Thumbnail grid | Allows reorder, delete |
| error | Red border, error message | Shows retry option |

**Validation**:
- Accepted formats: JPEG, PNG, HEIC
- Max file size: 10MB per image
- Max count: 20 images
- Min count: 1 image (for generation)

---

## 5. Data Model

### 5.1 Entities

| Table | Key Columns | Types | Constraints |
|-------|-------------|-------|-------------|
| [table] | [columns] | [data types] | [PK, FK, NOT NULL, etc.] |

**Example**:
| Table | Key Columns | Types | Constraints |
|-------|-------------|-------|-------------|
| users | id, email, created_at, subscription_tier | uuid, text, timestamptz, text | PK: id, UNIQUE: email |
| listings | id, user_id, title, content, status, created_at | uuid, uuid, text, text, text, timestamptz | PK: id, FK: user_id |
| photos | id, listing_id, url, order, created_at | uuid, uuid, text, int, timestamptz | PK: id, FK: listing_id |

### 5.2 Relationships

```
users (1) ──────< (many) listings
listings (1) ──────< (many) photos
```

### 5.3 Row Level Security Policies

| Table | Policy Name | Rule |
|-------|-------------|------|
| [table] | [name] | [SQL-like rule description] |

**Example**:
| Table | Policy Name | Rule |
|-------|-------------|------|
| listings | users_own_listings | user_id = auth.uid() |
| photos | via_listing_ownership | listing.user_id = auth.uid() |

---

## 6. API Surface

| Route | Method | Purpose | Auth | Request Body | Response |
|-------|--------|---------|------|--------------|----------|
| [/api/...] | [GET/POST/etc.] | [What it does] | [Yes/No] | [Schema summary] | [Schema summary] |

**Example**:
| Route | Method | Purpose | Auth | Request Body | Response |
|-------|--------|---------|------|--------------|----------|
| /api/listings | GET | List user's listings | Yes | - | { listings: Listing[] } |
| /api/listings | POST | Create new listing | Yes | { title, photos[] } | { listing: Listing } |
| /api/listings/[id] | GET | Get single listing | Yes | - | { listing: Listing } |
| /api/listings/[id] | PATCH | Update listing | Yes | { title?, content? } | { listing: Listing } |
| /api/listings/[id] | DELETE | Delete listing | Yes | - | { success: boolean } |
| /api/generate | POST | AI generation | Yes | { listingId, style } | { content: string } |

---

## 7. Quality Standards

### 7.1 Code Structure

- **Function length**: Maximum 30 lines
- **File length**: Maximum 200 lines
- **Nesting depth**: Maximum 3 levels
- **Naming**: camelCase for variables/functions, PascalCase for components/types

### 7.2 Security Requirements

- All user input validated with Zod schemas
- RLS policies on ALL database tables
- No sensitive data in client-side code or logs
- Environment variables for all secrets
- HTTPS enforced in production

### 7.3 Testing Requirements

- Unit test coverage: ≥80% for business logic
- Integration tests: All API routes
- E2E tests: Core user flows (happy path + critical errors)
- Test naming: `describe('[Component/Function]')` → `it('should [behavior]')`

### 7.4 Performance Targets

- Time to First Byte: <200ms
- Largest Contentful Paint: <2.5s
- API response time: <500ms (p95)
- Bundle size: <200KB initial load

---

## Appendix: SPEC Reference Format

When writing SPECs, reference this Build Contract using:

```
## Source References
- Build Contract 1.0, Section 2.1: User Types
- Build Contract 1.0, Section 4.1: PhotoUpload Component
- Build Contract 1.0, Section 5.1: listings table
```

This ensures SPECs are traceable back to design decisions.
