# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

[Brief description of what this project does - 1-2 sentences]

**Tech Stack:**
- Frontend: [e.g., Next.js 14, React, TypeScript]
- Backend: [e.g., Node.js, tRPC, Prisma]
- Database: [e.g., PostgreSQL via Supabase]
- Styling: [e.g., Tailwind CSS, shadcn/ui]

## Repository Structure

```
project-root/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── features/    # Feature-specific components
│   ├── lib/             # Utility functions
│   ├── server/          # Server-side code (tRPC, etc.)
│   └── types/           # TypeScript type definitions
├── prisma/              # Database schema and migrations
├── public/              # Static assets
└── tests/               # Test files
```

## Development Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run test      # Run tests
npm run lint      # Run linting
npm run db:push   # Push schema changes to database
```

## Code Conventions

### File Naming
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: SCREAMING_SNAKE_CASE in files

### Component Structure
- One component per file
- Co-locate styles and tests with components
- Use named exports for components

### Import Order
1. External packages
2. Internal aliases (@/)
3. Relative imports
4. Types

## Git Workflow

### Commit Messages
```
[type]: Brief description

Types: feat, fix, docs, style, refactor, test, chore
```

### Branch Naming
- feature/[description]
- fix/[description]
- chore/[description]

## Key Files

- `src/lib/db.ts` - Database client configuration
- `src/server/trpc.ts` - tRPC router setup
- `src/components/ui/` - Shared UI components
- `.env.local` - Environment variables (not committed)

## Testing Approach

- Unit tests: `*.test.ts` files co-located with source
- Integration tests: `tests/integration/` directory
- E2E tests: `tests/e2e/` with Playwright

## Important Notes

[Add any project-specific notes, gotchas, or special instructions here]
