---
id: "CA-07"
title: "Generate Schema Integrity Checklist"
tool: "claude-code"
chapter: 31
variant: "canonical"
source: "archive/html-v3/handbook"
---

```text
Generate schema integrity checklist:

1. Create SQL query to check foreign keys:
   SELECT
     tc.table_name,
     kcu.column_name,
     ccu.table_name AS foreign_table,
     rc.delete_rule
   FROM information_schema.table_constraints tc
   JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
   JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
   JOIN information_schema.referential_constraints rc ON tc.constraint_name = rc.constraint_name
   WHERE tc.constraint_type = 'FOREIGN KEY';

2. Create checklist for manual verification:
   - [ ] profiles table references auth.users with ON DELETE CASCADE
   - [ ] All user-owned tables have user_id foreign key
   - [ ] created_at exists on all tables
   - [ ] updated_at exists on all tables
   - [ ] updated_at trigger applied to relevant tables
   - [ ] Indexes exist on foreign keys
   - [ ] Indexes exist on commonly queried columns

3. Note: Run query in Supabase SQL Editor and verify
```
