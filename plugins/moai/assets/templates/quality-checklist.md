# Quality Gate Checklists

> **Purpose**: These checklists ensure consistent quality at key transition points in the development process. Use them as go/no-go gates—don't proceed until all items are checked.

---

## SPEC Ready Checklist

> Use this before starting implementation. A SPEC that doesn't pass this gate will lead to unclear requirements and rework.

### Content Completeness
- [ ] **Overview section complete**: Both Problem and Solution are clearly stated
- [ ] **Build Contract references included**: At least one section referenced with version number
- [ ] **At least one requirement defined**: Using EARS format (The/While/When/Where + shall)
- [ ] **Each requirement has at least one test case**: Using GIVEN-WHEN-THEN format
- [ ] **Acceptance criteria defined**: Functional, Quality, Security, Documentation sections filled

### Quality of Requirements
- [ ] **Requirements are testable**: Each can be verified with a pass/fail outcome
- [ ] **Requirements are unambiguous**: No vague words like "fast", "user-friendly", "appropriate"
- [ ] **Requirements use canonical vocabulary**: Terms match Build Contract Section 1
- [ ] **No implementation details in requirements**: Focus on WHAT, not HOW

### Test Case Quality
- [ ] **GIVEN establishes clear preconditions**: Reader knows exactly what state to set up
- [ ] **WHEN describes a single action**: One trigger per test case
- [ ] **THEN describes observable outcomes**: Can be verified without looking at code internals
- [ ] **Edge cases covered**: At least one "unhappy path" test case

---

## Implementation Done Checklist

> Use this after completing implementation, before marking SPEC as "Review". Code that doesn't pass this gate needs more work.

### All Tests Pass
- [ ] **Unit tests passing**: `npm test` or `npm run test:unit` shows all green
- [ ] **Integration tests passing**: API route tests pass
- [ ] **No skipped tests**: All tests are active (no `.skip()` or `xit()`)
- [ ] **Coverage threshold met**: ≥80% for new/modified files

### Code Structure Standards
- [ ] **Functions ≤30 lines**: No function exceeds 30 lines (excluding imports/types)
- [ ] **Files ≤200 lines**: No file exceeds 200 lines
- [ ] **Nesting ≤3 levels**: No code nested more than 3 levels deep
- [ ] **Single responsibility**: Each function/component does one thing

### Code Quality
- [ ] **No TypeScript errors**: `npm run type-check` passes
- [ ] **Linting passes**: `npm run lint` shows no errors
- [ ] **No console.log statements**: Remove debugging logs (use proper logging if needed)
- [ ] **No commented-out code**: Delete unused code, don't comment it

### Naming Conventions
- [ ] **Variables/functions use camelCase**: `getUserListings`, `isLoading`
- [ ] **Components/types use PascalCase**: `PhotoUpload`, `ListingResponse`
- [ ] **Constants use SCREAMING_SNAKE_CASE**: `MAX_FILE_SIZE`, `API_TIMEOUT`
- [ ] **Names reveal intent**: No single-letter variables (except loop counters)

### Security
- [ ] **Input validation present**: Zod schema validates all user input
- [ ] **No hardcoded secrets**: All secrets come from environment variables
- [ ] **RLS policies cover new patterns**: Database access properly restricted
- [ ] **Error messages don't leak internals**: User sees friendly messages, not stack traces

---

## Checkpoint A: Foundation Audit (After M3)

> Use this after completing Authentication milestone, before starting Core Feature. This is a major gate—the foundation must be solid.

### Automated Checks
- [ ] **All tests passing**: Full test suite green
- [ ] **Test coverage ≥80%**: Overall project coverage
- [ ] **No TypeScript errors**: Clean type checking
- [ ] **Linting clean**: No warnings or errors
- [ ] **No security vulnerabilities**: `npm audit` shows no high/critical issues
- [ ] **Bundle size reasonable**: Initial JS bundle <200KB

### Authentication Verification
- [ ] **Sign up flow works**: New user can create account
- [ ] **Sign in flow works**: Existing user can log in
- [ ] **Sign out flow works**: User can log out, session cleared
- [ ] **Password reset works**: User can reset via email
- [ ] **Protected routes redirect**: Unauthenticated users sent to login
- [ ] **Session persists**: User stays logged in across page refreshes

### Database Verification
- [ ] **Schema matches Build Contract**: Tables, columns, types all correct
- [ ] **RLS policies tested**: Verified user can only access own data
- [ ] **Migrations repeatable**: Can run migrations on fresh database
- [ ] **Seed data works**: Development data loads correctly

### Error Handling Verification
- [ ] **Network errors handled**: App doesn't crash on failed requests
- [ ] **Invalid input handled**: Forms show validation errors
- [ ] **Loading states present**: User sees feedback during async operations
- [ ] **Empty states handled**: App looks good with no data

---

## Checkpoint B: Feature Complete (After M6)

> Use this after Core Feature milestone, before Admin features. The main value proposition must work flawlessly.

### Automated Checks
- [ ] **All tests passing**: Including new core feature tests
- [ ] **Test coverage ≥80%**: Core feature well-tested
- [ ] **Performance benchmarks met**: No obvious performance issues
- [ ] **Accessibility scan clean**: No critical a11y issues

### Core Feature Verification
- [ ] **Primary flow works end-to-end**: User can complete main task
- [ ] **All states handled**: Loading, success, error, empty
- [ ] **Edge cases covered**: Unusual inputs don't break the feature
- [ ] **Data persists correctly**: Changes save and reload properly

### User Experience Verification
- [ ] **All UX flows from package functional**: Every documented flow works
- [ ] **Error messages helpful**: User knows what went wrong and how to fix
- [ ] **Loading states smooth**: No jarring transitions or layout shifts
- [ ] **Mobile responsive**: Feature works on small screens

### External Testing
- [ ] **Someone else tested it**: At least one person besides developer
- [ ] **Feedback documented**: Notes on what worked, what confused
- [ ] **Critical issues fixed**: Blocking problems resolved
- [ ] **Nice-to-haves triaged**: Non-critical feedback logged for later

---

## Pre-Launch Checklist (After M11)

> The final gate before going live. Every item must be verified.

### Code Quality
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Bundle size optimized
- [ ] No console errors in production build

### Security
- [ ] Environment variables not exposed to client
- [ ] RLS policies tested with different user roles
- [ ] Rate limiting configured
- [ ] Input validation on all forms
- [ ] HTTPS enforced
- [ ] Security headers configured

### Performance
- [ ] Lighthouse Performance score ≥90
- [ ] Core Web Vitals passing (LCP, FID, CLS)
- [ ] Images optimized (WebP, proper sizing)
- [ ] API responses <500ms (p95)
- [ ] Database queries optimized (no N+1)

### User Experience
- [ ] All user flows tested manually
- [ ] Mobile responsive verified (test on real device)
- [ ] Error messages user-friendly
- [ ] Loading states smooth
- [ ] Empty states informative
- [ ] Keyboard navigation works

### Operations
- [ ] Error monitoring configured (Sentry, etc.)
- [ ] Analytics configured
- [ ] Database backups enabled
- [ ] Domain and DNS configured
- [ ] SSL certificate valid
- [ ] Monitoring/alerting set up

### Legal/Compliance
- [ ] Privacy policy in place
- [ ] Terms of service in place
- [ ] Cookie consent (if applicable)
- [ ] GDPR compliance (if applicable)

### Launch Readiness
- [ ] Production environment variables set
- [ ] Stripe webhook configured for production
- [ ] Email sending configured (transactional emails work)
- [ ] Support contact method available
- [ ] Rollback plan documented

---

## How to Use These Checklists

1. **Copy the relevant checklist** into your SPEC or project tracking tool
2. **Check items as you complete them**—don't check until genuinely done
3. **If an item can't be checked, stop**—fix the issue before proceeding
4. **Document any exceptions**—if you skip something, note why
5. **Use peer review**—have someone else verify the checklist before major gates
