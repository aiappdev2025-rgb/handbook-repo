---
id: "X-14-1"
title: "Database Schema Design"
tool: "claude-chat"
chapter: 14
variant: "canonical"
source: "archive/html-v3/handbook"
---

```text
Based on the Architecture document we just created, generate a complete database schema for Supabase.

For each table, provide:
1. **CREATE TABLE statement** with all columns, types, and constraints
2. **RLS policies** for SELECT, INSERT, UPDATE, DELETE
3. **Indexes** for frequently queried columns
4. **Triggers** for updated_at timestamps

Required tables based on our architecture:
- user_profiles (extends auth.users)
- [LIST YOUR DOMAIN TABLES FROM ARCHITECTURE]
- subscriptions (Stripe sync)
- usage_logs (if applicable)

For each RLS policy, explain the security rationale.

Output as a single SQL migration file that can be run in Supabase SQL Editor.
```
