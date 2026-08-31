---
id: "CA-10"
title: "Check UI Shell"
tool: "claude-code"
chapter: 31
variant: "canonical"
source: "archive/html-v3/handbook"
---

```text
Check UI shell:

1. Check root layout (app/layout.tsx):
   - Verify it exists
   - Check for providers: ThemeProvider, Toaster, or similar
   - Check for proper html/body structure

2. Check for required UI components:
   - Toast/notification system
   - Theme support (if using dark mode)

3. Check responsive setup:
   - Look for Tailwind responsive classes (sm:, md:, lg:)
   - Check for mobile navigation component

4. Create manual test checklist:
   - [ ] App loads without console errors
   - [ ] Navigation works at 320px width (mobile)
   - [ ] Navigation works at 768px width (tablet)
   - [ ] Navigation works at 1024px+ width (desktop)
   - [ ] Mobile menu opens and closes (if applicable)
   - [ ] Dark mode toggles (if applicable)

5. Architecture-specific:
   - If has auth: [ ] Protected routes redirect to login
   - If local-only: Skip auth redirect check
   - If has marketing pages: [ ] Marketing layout has header/footer
   - If no marketing pages: Skip marketing layout check

6. Report:
   | Check              | Status | Notes |
   |--------------------|--------|-------|
   | Root layout exists | ✅/❌  | ...   |
   | Providers setup    | ✅/⚠️  | ...   |
   | Responsive classes | ✅/⚠️  | ...   |
```
