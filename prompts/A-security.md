---
id: "A-security"
title: "Security Audit Request"
tool: "claude-code"
milestone: null
variant: "canonical"
source: "archive/html-v3/archive/build-guide-v3.html"
---

```text

  
  ROLE
Security Engineer conducting an OWASP-aligned security audit.

CONTEXT
Project: {{productName}}
Stack: Next.js 14+, Supabase, TypeScript
Audit scope: Full application security review

OBJECTIVE
Identify security vulnerabilities, misconfigurations, and deviations from security best practices. Prioritize findings by severity.

AUDIT CHECKLIST

1. AUTHENTICATION (Critical)
- Using Supabase Auth (not custom auth)?
- Password policies enforced?
- Session tokens handled securely (HttpOnly, Secure, SameSite)?
- Token refresh implemented correctly?
- Logout clears all session data?

2. AUTHORIZATION (Critical)
- RLS enabled on ALL tables?
- RLS policies test both authenticated and anon roles?
- No SELECT * without WHERE user_id = auth.uid()?
- Admin routes protected in middleware AND RLS?
- API routes verify user permissions before actions?

3. INJECTION PREVENTION (Critical)
- All database queries use Supabase client (parameterized)?
- No string concatenation in queries?
- User input never used in raw SQL?
- No eval() or Function() with user input?

4. XSS PREVENTION (High)
- No dangerouslySetInnerHTML with user content?
- User-generated content properly escaped?
- URLs validated before rendering as links?
- No inline event handlers with user data?

5. INPUT VALIDATION (High)
- Zod schemas on ALL API routes?
- Zod schemas on ALL Server Actions?
- File uploads validate type, size, content?
- Email/URL formats validated before use?

6. SECRETS MANAGEMENT (Critical)
- No hardcoded secrets in code?
- SUPABASE_SERVICE_ROLE never in client code?
- .env files in .gitignore?
- API keys not exposed in client bundles?

7. SECURITY HEADERS (Medium)
- Strict-Transport-Security configured?
- X-Frame-Options set to DENY or SAMEORIGIN?
- X-Content-Type-Options set to nosniff?
- Content-Security-Policy defined?

8. ERROR HANDLING (Medium)
- Errors don't expose stack traces to users?
- Errors don't reveal database structure?
- Generic error messages for auth failures?
- Sensitive data not logged?

9. RATE LIMITING (Medium)
- Login/signup endpoints rate limited?
- Password reset rate limited?
- Expensive operations (AI, email) rate limited?

10. DEPENDENCY SECURITY (Medium)
- npm audit shows no high/critical vulnerabilities?
- Dependencies up to date?
- No abandoned packages with known issues?

OUTPUT FORMAT

EXECUTIVE SUMMARY
Overall security posture (Critical/High/Medium/Low risk)
Key findings count by severity

CRITICAL FINDINGS (Fix immediately)
- Finding description
- Location (file:line)
- Attack vector
- Remediation with code example

HIGH FINDINGS (Fix before launch)
[Same format as Critical]

MEDIUM FINDINGS (Fix soon after launch)
[Same format]

LOW FINDINGS (Address when convenient)
[Same format]

PASSED CHECKS
List security controls that are correctly implemented

FILES TO AUDIT
{{paste files here - prioritize: middleware.ts, API routes, auth code, RLS policies}}
```
