---
id: "X-16-1"
title: "Supabase Project Setup"
tool: "claude-code"
chapter: 16
variant: "canonical"
source: "archive/html-v3/handbook"
---

```text
Set up Supabase CLI and apply the initial schema migration.

1. Initialize Supabase in the project:
   supabase init

2. Link to the development project:
   supabase link --project-ref [DEV_PROJECT_REF]

   (Find your project ref in Supabase Dashboard → Project Settings → General)

3. Create a migration file from the schema we designed in Chapter 14:
   supabase migration new initial_schema

4. Apply the migration:
   supabase db push

5. Verify the tables were created correctly.
```
