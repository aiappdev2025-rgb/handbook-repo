# Checkpoint Debt Audit Templates

AI SaaS Handbook v3.0 - Technical Debt Management

Use these templates at each checkpoint to assess and track technical debt. Copy the relevant section into your TECH-DEBT.md file when performing checkpoint audits.

---

## Checkpoint A: Foundation Complete

**When:** After authentication, database schema, and core infrastructure are in place.

### Debt Audit Checklist

#### 1. Database Schema Debt

- [ ] No redundant columns or tables
- [ ] All foreign keys properly defined
- [ ] Indexes exist for frequent query patterns
- [ ] No overly permissive RLS policies
- [ ] Migration files are clean (no commented-out code)

**Violations Found:**
```
List any schema issues here...
```

#### 2. Authentication Debt

- [ ] No hardcoded credentials or tokens
- [ ] Session management follows security best practices
- [ ] Password policies are appropriate
- [ ] OAuth flows are complete (no TODO stubs)
- [ ] Error messages don't leak sensitive information

**Violations Found:**
```
List any auth issues here...
```

#### 3. Infrastructure Debt

- [ ] Environment variables properly organized
- [ ] No secrets in code or config files
- [ ] Docker/deployment configs are complete
- [ ] CI/CD pipeline is functional
- [ ] No localhost URLs in production config

**Violations Found:**
```
List any infrastructure issues here...
```

#### 4. Code Organization Debt

- [ ] Folder structure follows project conventions
- [ ] No duplicate utility functions
- [ ] Shared types are centralized
- [ ] No circular dependencies
- [ ] Import paths are consistent

**Violations Found:**
```
List any organization issues here...
```

### Checkpoint A Score Calculation

| Category | Score (1-10) | Weight | Weighted Score |
|----------|--------------|--------|----------------|
| Database Schema | ___ | 30% | ___ |
| Authentication | ___ | 30% | ___ |
| Infrastructure | ___ | 25% | ___ |
| Code Organization | ___ | 15% | ___ |
| **TOTAL** | | | **___** |

**Gate Decision:**
- [ ] Score >= 6.0: **PASS** - Proceed to Milestone 2
- [ ] Score < 6.0: **BLOCK** - Address critical debt before proceeding

---

## Checkpoint B: Core Features Complete

**When:** After main user-facing features are implemented.

### Debt Audit Checklist

#### 1. Complexity Debt

Run: `npm run lint -- --format json | jq '[.[].messages[] | select(.ruleId | test("complexity|max-"))] | length'`

- [ ] No functions exceed 30 lines
- [ ] No files exceed 200 lines
- [ ] Maximum nesting depth is 3
- [ ] Cyclomatic complexity under 10
- [ ] No functions with more than 4 parameters

**Violations Found:**
```
Complexity violations: ___
Files over limit: ___
Functions over limit: ___
```

#### 2. Error Handling Debt

- [ ] All API calls have error handling
- [ ] No empty catch blocks
- [ ] User-facing errors are meaningful
- [ ] Errors are logged appropriately
- [ ] No swallowed promises

**Violations Found:**
```
Missing error handlers: ___
Empty catch blocks: ___
```

#### 3. Type Safety Debt (TypeScript)

Run: `npm run lint -- --format json | jq '[.[].messages[] | select(.ruleId | test("any|unsafe"))] | length'`

- [ ] No `any` types in production code
- [ ] All function parameters are typed
- [ ] Return types are explicit for public functions
- [ ] No type assertions without comments
- [ ] Zod/validation schemas match TypeScript types

**Violations Found:**
```
'any' types found: ___
Missing type annotations: ___
```

#### 4. Test Coverage Debt

Run: `npm run test:coverage`

- [ ] Line coverage >= 60%
- [ ] Branch coverage >= 50%
- [ ] Critical paths have integration tests
- [ ] No skipped tests without tracking
- [ ] Test files follow naming conventions

**Coverage Report:**
```
Lines: ___%
Branches: ___%
Functions: ___%
Statements: ___%
```

#### 5. Documentation Sync Debt

- [ ] CLAUDE.md reflects current architecture
- [ ] API documentation matches implementation
- [ ] README setup instructions work
- [ ] SPEC documents match implemented features
- [ ] No stale comments in code

**Violations Found:**
```
Outdated docs: ___
Stale comments: ___
```

### Checkpoint B Score Calculation

| Category | Score (1-10) | Weight | Weighted Score |
|----------|--------------|--------|----------------|
| Complexity | ___ | 25% | ___ |
| Error Handling | ___ | 20% | ___ |
| Type Safety | ___ | 20% | ___ |
| Test Coverage | ___ | 20% | ___ |
| Documentation Sync | ___ | 15% | ___ |
| **TOTAL** | | | **___** |

**Gate Decision:**
- [ ] Score >= 6.0: **PASS** - Proceed to Milestone 3
- [ ] Score < 6.0: **BLOCK** - Address critical debt before proceeding

---

## Checkpoint C: Production Ready

**When:** Before launch, after all features complete.

### Debt Audit Checklist

#### 1. Security Debt

- [ ] npm audit shows 0 high/critical vulnerabilities
- [ ] No hardcoded secrets in codebase
- [ ] All inputs are validated/sanitized
- [ ] Security headers are configured
- [ ] Rate limiting is in place
- [ ] CSRF protection enabled
- [ ] XSS prevention verified

**Security Scan Results:**
```
npm audit output:
Critical: ___
High: ___
Moderate: ___
Low: ___
```

#### 2. Performance Debt

- [ ] No N+1 query patterns
- [ ] Images are optimized
- [ ] Bundle size is reasonable
- [ ] No blocking operations on main thread
- [ ] Lazy loading implemented where appropriate
- [ ] Database queries are optimized

**Performance Metrics:**
```
Lighthouse Score: ___
Bundle Size: ___KB
Largest Contentful Paint: ___s
Time to Interactive: ___s
```

#### 3. Dependency Debt

Run: `npm outdated`

- [ ] No dependencies more than 2 major versions behind
- [ ] No deprecated packages in use
- [ ] License compatibility verified
- [ ] No unnecessary dependencies
- [ ] Lock file is committed and up to date

**Dependency Report:**
```
Outdated packages: ___
Deprecated: ___
Unnecessary: ___
```

#### 4. Monitoring & Observability Debt

- [ ] Error tracking configured (Sentry, etc.)
- [ ] Key metrics are logged
- [ ] Health check endpoints exist
- [ ] Alerts are configured for critical paths
- [ ] Log levels are appropriate

**Monitoring Status:**
```
Error tracking: [ ] Configured / [ ] Missing
Metrics: [ ] Configured / [ ] Missing
Health checks: [ ] Configured / [ ] Missing
```

#### 5. Final Code Quality Review

- [ ] No TODO/FIXME comments without tickets
- [ ] Console.log statements removed
- [ ] Debug code removed
- [ ] Feature flags cleaned up
- [ ] Dead code removed

**Code Quality:**
```
TODOs remaining: ___
Console statements: ___
Dead code files: ___
```

### Checkpoint C Score Calculation

| Category | Score (1-10) | Weight | Weighted Score |
|----------|--------------|--------|----------------|
| Security | ___ | 30% | ___ |
| Performance | ___ | 20% | ___ |
| Dependencies | ___ | 15% | ___ |
| Monitoring | ___ | 15% | ___ |
| Code Quality | ___ | 20% | ___ |
| **TOTAL** | | | **___** |

**Gate Decision:**
- [ ] Score >= 7.0: **PASS** - Ready for production launch
- [ ] Score 6.0-6.9: **CONDITIONAL** - Launch with debt remediation plan
- [ ] Score < 6.0: **BLOCK** - Not production ready

---

## Score Reference Guide

### How to Score Each Category

| Score | Meaning | Criteria |
|-------|---------|----------|
| 10 | Perfect | Zero violations |
| 8-9 | Excellent | 1-3 minor violations |
| 6-7 | Good | 4-10 minor violations, no critical |
| 4-5 | Concerning | 10+ violations or 1-2 critical |
| 2-3 | Poor | Multiple critical violations |
| 1 | Critical | Systemic issues |

### Violation Severity

| Severity | Examples |
|----------|----------|
| **Critical** | Security vulnerabilities, data loss risk, blocking bugs |
| **High** | Missing error handling, no tests for critical paths |
| **Medium** | Complexity violations, missing types |
| **Low** | Style issues, minor documentation gaps |

---

## Using These Templates

1. **Copy** the relevant checkpoint section to your TECH-DEBT.md
2. **Run** the suggested commands to gather metrics
3. **Check** each item and document violations
4. **Calculate** the weighted score
5. **Decide** whether to proceed or address debt first

### Example Entry in TECH-DEBT.md

```markdown
## Checkpoint B Audit - 2024-01-15

### Summary
- **Overall Score:** 7.2/10 (Good)
- **Decision:** PASS - Proceed to Milestone 3
- **Debt to Address:** 3 complexity violations, 5 missing error handlers

### Detailed Scores
| Category | Score |
|----------|-------|
| Complexity | 6/10 |
| Error Handling | 7/10 |
| Type Safety | 9/10 |
| Test Coverage | 7/10 |
| Documentation | 8/10 |

### Action Items
1. Refactor `processPayment()` - too complex (tracked in #123)
2. Add error handling to webhook endpoints (tracked in #124)
```

---

*AI SaaS Handbook v3.0 - Technical Debt Management*
