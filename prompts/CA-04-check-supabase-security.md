---
id: "CA-04"
title: "Check Supabase Security"
tool: "claude-code"
chapter: 31
variant: "canonical"
source: "archive/html-v3/handbook"
---

```text
Check Supabase security setup:

1. Verify I have Supabase client configured:
   - Check for @supabase/supabase-js in package.json
   - Look for supabase client initialization in lib/ or utils/

2. Generate the RLS verification queries I need to run manually:

   Query 1 - Check RLS enabled:
   SELECT schemaname, tablename, rowsecurity
   FROM pg_tables
   WHERE schemaname = 'public';

   Query 2 - List policies:
   SELECT tablename, policyname, cmd
   FROM pg_policies
   WHERE schemaname = 'public';

3. Create a checklist for me to verify in Supabase dashboard:
   - [ ] RLS enabled on ALL tables (rowsecurity = true)
   - [ ] Each table has SELECT policy for authenticated users
   - [ ] Each table has INSERT/UPDATE/DELETE policies with auth.uid() check
   - [ ] No policies allow anon access to sensitive data
   - [ ] is_admin() function exists (if using admin features)

4. Note: These must be verified manually in Supabase SQL Editor
```
