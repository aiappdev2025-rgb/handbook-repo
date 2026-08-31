import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, Copy, Save, Trash2, FileText, Settings, Home, AlertCircle, CheckCircle2 } from 'lucide-react';

// Prompt templates with placeholders
const PROMPT_TEMPLATES = {
  '0.1': {
    name: 'Repository Setup',
    tool: 'Claude Code CLI',
    time: '15 minutes',
    description: 'Initialize project with documentation structure and CI gates',
    requiresArtifacts: [],
    template: `[ROLE: REPO STEWARD — Initialize project with documentation structure and CI gates]

CONTEXT: This is the first prompt for {{productName}}. It creates the repository structure, documentation folders, and CI pipeline that all other work will build upon.

First ask me:
1) What is the local project folder path? (will be created if it doesn't exist)
2) What is the GitHub repo URL? (create an empty private repo first)
3) Confirm npm + Node 20? (default: yes)

Then execute these tasks IN ORDER, confirming each:

1. INITIALIZE
   - Create project folder if needed
   - Initialize git repository
   - Create package.json with name "{{productNameSlug}}" and basic scripts

2. CONNECT
   - Set remote origin to GitHub URL
   - Verify connection

3. PROTECT
   - Create .gitignore with:
     .env*
     *.pem
     *.key
     node_modules/
     .next/
     dist/
     .vercel/
     .DS_Store

4. STRUCTURE
   - Create folders:
     docs/
     docs/adr/
     docs/security/
     docs/api/
     docs/ops/
     docs/release/
     .github/
     .github/workflows/

5. INDEX
   - Create docs/README.md with links to all expected artifacts

6. TEMPLATE
   - Create .github/pull_request_template.md with:
     ## What changed
     ## Why
     ## Security checklist
     - [ ] No secrets committed
     - [ ] AuthZ enforced server-side
     - [ ] RLS updated if DB changed
     ## Tests
     - [ ] Tests added/updated
     - [ ] All tests pass

7. CI PIPELINE
   - Create .github/workflows/ci.yml with jobs:
     - lint_typecheck (npm run lint, npm run typecheck)
     - test (npm test)
     - secret_scan (gitleaks)

8. PLACEHOLDERS
   - Create empty .md files for all handbook artifacts

9. COMMIT & PUSH
   - Create initial commit: "chore: initialize {{productName}} project structure"
   - Push to main branch

10. VERIFY & REPORT
    - List all created folders and files
    - Show git status
    - Confirm push succeeded

RULES:
- Never commit secrets or API keys
- All documentation goes in docs/
- CI must block merges on failure`
  },
  
  '1.0': {
    name: 'Business One-Pager',
    tool: 'Claude Chat',
    time: '1-2 hours',
    description: 'Transform research into build-ready business foundation',
    requiresArtifacts: [],
    template: `[ROLE: PRODUCT STRATEGIST — Transform research into build-ready business one-pager for {{productName}}]

CONTEXT: This is the first substantive prompt for {{productName}}. Everything downstream depends on clarity achieved here. I will provide research notes, business plan, and/or competitive analysis.

PRODUCT CONTEXT:
- Product Name: {{productName}}
- Initial Description: {{productDescription}}
- Target Customer: {{targetCustomer}}

RULES:
- Ask maximum 10 clarifying questions, grouped logically
- Make assumptions explicit with [ASSUMPTION] label
- Keep output to one page (300-600 words plus bullets)
- Use evidence from inputs; highlight where evidence is weak
- Be direct about risks

INPUTS:
<<<
{{researchNotes}}
>>>

OUTPUT FORMAT (use exact headings):

## 1) PROBLEM & URGENCY
What specific problem exists? What evidence shows it's painful enough to pay for? Why now?

## 2) IDEAL CUSTOMER PROFILE (ICP)
Who specifically has this problem? Company size, role, industry? Where do they congregate? Why buy now vs later?

## 3) SOLUTION
What does {{productName}} do? What does it NOT do? Core value proposition in one sentence?

## 4) DIFFERENTIATION
Why choose {{productName}} over alternatives? Unfair advantage? What's hard for competitors to copy?

## 5) REVENUE MODEL + PRICING
How will this make money? Pricing structure? Evidence supporting this pricing?

## 6) #1 MONEY ACTION
Single user action that generates revenue. Must be measurable.

## 7) MVP SCOPE
Must-have for v1 to deliver core value.
Explicit exclusions: what you're NOT building.

## 8) KEY RISKS & UNKNOWNS
What could kill this? Untested assumptions? Validation plan for each risk?

## 9) SUCCESS METRICS
Activation metric + target. Retention metric + target. Conversion metric + target.

Start with clarifying questions, then produce the One-Pager.`
  },

  '2.0': {
    name: 'Shared Design Brief',
    tool: 'Claude Chat',
    time: '1-2 hours',
    description: 'Create single source of truth for all subsequent work',
    requiresArtifacts: ['businessOnePager'],
    template: `[ROLE: PRODUCT DESIGN LEAD — Create single source of truth for {{productName}}]

CONTEXT: The Design Brief is the most important document in the workflow. It feeds into every subsequent prompt verbatim. Vocabulary defined here becomes canonical for {{productName}}.

RULES:
- Ask maximum 8 clarifying questions
- Keep brief to ONE PAGE (250-500 words plus bullets)
- Make assumptions explicit with [ASSUMPTION] label
- Every checkpoint question must have explicit answer
- Vocabulary defined here is canonical for all future work

INPUTS — BUSINESS ONE-PAGER:
<<<
{{businessOnePager}}
>>>

ADDITIONAL CONTEXT (if any):
<<<
{{additionalContext}}
>>>

OUTPUT FORMAT (exact headings):

## 1) SAAS ONE-LINER
"{{productName}} helps [ICP] to [outcome] by [mechanism]."

## 2) TARGET USERS
- Primary persona: role, company size, characteristics
- Context: when/where they use product
- Current pain: what they do today and why it's painful

## 3) #1 MONEY ACTION
"[User] [verbs] [object]" — single measurable event

## 4) TOP 3 JOBS TO BE DONE
Format: "When I [situation], I want to [action], so I can [outcome]."
- JTBD 1:
- JTBD 2:
- JTBD 3:

## 5) MVP SCREENS/PAGES
List every screen: "Screen Name — Purpose"
Include: marketing, auth, onboarding, core app, settings, billing

## 6) CORE USER JOURNEY (6-10 steps)
1. [First touchpoint]
...
N. [Completes money action]

## 7) CONSTRAINTS & NON-NEGOTIABLES
- Stack: [confirmed]
- Deadline: [if exists]
- Must-keep: [existing elements]
- Brand: [voice, colors, style]

## 8) COMPETITORS/INSPIRATIONS (3-5)
- Name: Copy this [pattern]. Avoid this [anti-pattern].

## 9) SUCCESS METRICS
- Activation: [event] → Target: X%
- Retention: [metric] → Target: X%
- Conversion: [metric] → Target: X%

## 10) CHECKPOINT ANSWERS
Answer each explicitly:
- Tenancy: [single-user | single-workspace | multi-workspace]
- Roles: [owner-only | owner+member | owner+admin+member+viewer]
- Billing: [seat-based | usage-based | flat-rate] + [trial | freemium | paid]
- Activation moment: [what happens in first 5 min]
- Core entities: [top 3 data objects]
- Integrations: [required for MVP]
- Day-1 emails: magic-link[y/n], welcome[y/n], invite[y/n], receipt[y/n]
- File uploads: [y/n, types, max size]
- Background jobs: [y/n, what kind]
- Audit trail: [y/n]
- Data export: [y/n, format]
- Support: [contact-form | chat | email]
- Compliance: [none | GDPR | SOC2-later]

PASS A: Ask clarifying questions.
PASS B: Produce complete brief.`
  },

  'R2': {
    name: 'ADR Generator',
    tool: 'Claude Chat',
    time: '1-2 hours',
    description: 'Generate Architecture Decision Records',
    requiresArtifacts: ['designBrief'],
    template: `[ROLE: SOLUTION ARCHITECT — Generate Architecture Decision Records for {{productName}}]

CONTEXT: Lock key architectural decisions early. ADRs prevent forgetting why decisions were made.

INPUT — DESIGN BRIEF:
<<<
{{designBrief}}
>>>

KNOWN CONSTRAINTS:
- Stack: Next.js App Router + TypeScript + Tailwind + shadcn/ui
- Backend: Supabase (Postgres + Auth + RLS + Storage)
- Billing: Stripe
- Deploy: Vercel

OUTPUT: Generate 5 ADRs using this structure:

### ADR-001: Tenancy + Roles + RLS Strategy
**Context:** [situation requiring decision]
**Decision:** [what was decided]
**Alternatives Considered:**
- Option A: [description] — Rejected because: [reason]
- Option B: [description] — Rejected because: [reason]
**Consequences:**
- Positive: [benefits]
- Negative: [tradeoffs]
**Implementation Notes:** [how to implement]
**Acceptance Criteria:** [how to verify correct]

### ADR-002: Public API + Auth + Rate Limiting
[same structure]

### ADR-003: Webhooks (events, signing, retries)
[same structure]

### ADR-004: File Uploads + Storage + Processing
[same structure]

### ADR-005: Background Jobs + Processing Pipeline
[same structure]

Keep each ADR to 0.5-1 page. Focus on decisions specific to {{productName}}.`
  },

  'R1': {
    name: 'Security Validator',
    tool: 'Claude Chat',
    time: '1 hour',
    description: 'Security review for current stage',
    requiresArtifacts: ['designBrief'],
    template: `[ROLE: SECURITY VALIDATOR — Practical AppSec review for {{productName}}]

CONTEXT: Validate security continuously, not just at the end. Produce actionable requirements that become Definition of Done.

CURRENT STAGE: {{currentStage}}

INPUT — DESIGN BRIEF:
<<<
{{designBrief}}
>>>

ADDITIONAL CONTEXT FOR THIS STAGE:
<<<
{{stageContext}}
>>>

RULES:
- Ask maximum 10 questions if info missing
- Prioritize by risk
- Produce specific, actionable fixes
- Security requirements become acceptance criteria

OUTPUT:

## 1) THREAT MODEL LIGHT
- Assets: [what must be protected in {{productName}}]
- Actors: [users, admins, attackers]
- Trust boundaries: [browser, server, DB, third-party]

## 2) TOP 10 ABUSE CASES
For each:
- Abuse: [what attacker does]
- Impact: [damage caused]
- Mitigation: [specific control]

## 3) SECURITY REQUIREMENTS (this stage)
Checklist items that must be true before stage complete:
- [ ] Requirement 1
- [ ] Requirement 2
...

## 4) HIGH-RISK AREAS
- Area: [what]
- Why risky: [reason]
- Review focus: [what to check]

## 5) TEST PLAN
### Manual Tests
- Test: [description] → Expected: [result]
### Automated Tests
- Test: [what to automate]

## 6) OPEN DECISIONS
- Decision needed: [what]
- Options: [choices]
- Recommendation: [which and why]`
  },

  '3.0': {
    name: 'UX Package',
    tool: 'Claude Chat',
    time: '3-6 hours',
    description: 'Create implementation-ready wireframes and flows',
    requiresArtifacts: ['designBrief'],
    template: `[ROLE: UX DESIGNER — Principal SaaS UX creating implementation-ready wireframes for {{productName}}]

CONTEXT: This produces the UX foundation that UI and engineering build upon. Output is detailed. Every screen needs all five states.

RULES:
- Ask maximum 8 clarifying questions only if critical info missing
- Use screen names from Design Brief exactly
- Every screen must include: default, loading, empty, error, validation states
- Happy path: 8-12 steps maximum
- Include rescue paths for failure scenarios
- Microcopy must be real text, not placeholders

INPUT — DESIGN BRIEF:
<<<
{{designBrief}}
>>>

OUTPUT FORMAT:

## 1) ASSUMPTIONS
[ASSUMPTION]: <what> — <why assumed>

## 2) INFORMATION ARCHITECTURE
### Public Pages
- Page → Purpose → Key elements
### App Pages  
- Page → Purpose → Key elements
### Settings/Admin
- Page → Purpose → Key elements

## 3) USER JOURNEYS
### Money Path (8-12 steps)
1. [Screen] — Sees: <what> — Does: <action> — Result: <what happens>
...

### Onboarding Journey
Steps from signup to "aha moment" + rescue paths

### Returning User Journey
Steps for core repeated task

## 4) SCREEN WIREFRAMES
For EACH screen in {{productName}}:

### [Screen Name]
**Purpose:** One sentence
**Entry Points:** How users arrive
**Layout:**
[Header]
[Main Content]
[Sidebar if any]
[Footer]

**Components:** List with purposes
**Primary CTA:** Text → Action → Destination

**States:**
- DEFAULT: [description]
- LOADING: [description]
- EMPTY: [description + empty state message]
- ERROR: [description + error message text]
- VALIDATION: [description + validation messages]

**Interactions:** Hover, click, keyboard, mobile

## 5) MICROCOPY PACK
### CTAs: [Screen] — [Button]: "Text" → Result
### Labels: [Screen] — [Field]: Label | Placeholder | Helper
### Empty States: [Screen]: "Headline" + "Body" + [CTA]
### Errors: [Type]: "Message" + "Recovery action"
### Success: [Action]: "Confirmation"

## 6) INSTRUMENTATION
- Event name → Trigger → Properties → Why it matters

## 7) RISKS & QUESTIONS
- Decisions needing validation
- Assumptions to test`
  },

  '3.1': {
    name: 'UX Critic',
    tool: 'Claude Chat',
    time: '1-2 hours',
    description: 'Ruthless usability and accessibility review',
    requiresArtifacts: ['designBrief', 'uxPackage'],
    template: `[ROLE: UX CRITIC — Ruthless usability and accessibility review for {{productName}}]

CONTEXT: Find friction and gaps before moving to visual design. Be critical. Better to find problems now.

RULES:
- Focus on highest-impact fixes
- For each issue: problem, why it matters, where it happens, exact fix
- Prioritize by effort (S/M/L) and impact (High/Med/Low)

INPUT — DESIGN BRIEF:
<<<
{{designBrief}}
>>>

INPUT — UX PACKAGE:
<<<
{{uxPackage}}
>>>

OUTPUT:

## 1) TOP 10 ISSUES (ranked by impact)
For each:
- Issue: [description]
- Impact: [High/Med/Low]
- Effort: [S/M/L]
- Location: [where in {{productName}} UX]
- Fix: [specific solution]

## 2) FLOW OPTIMIZATIONS
- Steps that can be combined or removed
- Missing rescue paths
- Dead ends identified

## 3) STATES AUDIT
- Screens missing states
- Edge cases not covered
- Error scenarios without recovery

## 4) COPY IMPROVEMENTS
Before → After for unclear labels/CTAs

## 5) ACCESSIBILITY CHECKS
- Focus order issues
- Missing labels
- Contrast concerns
- Keyboard navigation gaps

## 6) VALIDATION TESTS
5 quick user tests to validate assumptions:
- What to test
- How to test
- What indicates pass/fail`
  },

  '4.0': {
    name: 'UI System',
    tool: 'Claude Chat',
    time: '4-8 hours',
    description: 'Create design tokens, components, and screen specs',
    requiresArtifacts: ['designBrief', 'uxPackage'],
    template: `[ROLE: UI DESIGNER — Principal SaaS visual designer creating buildable interface for {{productName}}]

CONTEXT: Translate UX wireframes into premium, consistent, buildable interface. Output must be implementable with Tailwind/shadcn.

RULES:
- Preserve UX structure and flows
- Only propose UX changes if they reduce steps or fix usability
- Provide scalable design system (tokens + components)
- Include responsive rules and all states

INPUT — DESIGN BRIEF:
<<<
{{designBrief}}
>>>

INPUT — UX PACKAGE (v2 with critic fixes incorporated):
<<<
{{uxPackage}}
>>>

OUTPUT:

## 1) VISUAL DIRECTION
2-3 directions with rationale. Recommend one for {{productName}}.

## 2) DESIGN TOKENS
### Colors
- Primary: [hex] — usage
- Secondary: [hex] — usage
- Background: [hex]
- Surface: [hex]
- Text: [hex]
- Muted: [hex]
- Border: [hex]
- Error: [hex]
- Success: [hex]
- Warning: [hex]

### Typography
- Font family: [name]
- Scale: xs(12), sm(14), base(16), lg(18), xl(20), 2xl(24), 3xl(30), 4xl(36)
- Weights: normal(400), medium(500), semibold(600), bold(700)

### Spacing
- Scale: 1(4px), 2(8px), 3(12px), 4(16px), 6(24px), 8(32px), 12(48px), 16(64px)

### Radius
- none, sm(2px), md(4px), lg(8px), xl(12px), full

### Shadows
- sm, md, lg definitions

## 3) COMPONENT INVENTORY
For each component:
- Name
- Variants (size, color, state)
- Props
- States: default, hover, focus, disabled, loading
- Usage notes

## 4) SCREEN SPECS
For each screen in {{productName}}:
### [Screen Name]
**Layout:** Grid/flex structure, breakpoints
**Components used:** List with specific variants
**Spacing:** Specific values
**Responsive:** Mobile, tablet, desktop differences
**Dev notes:** Implementation hints

## 5) ACCESSIBILITY
- Contrast ratios
- Focus indicators
- Touch targets (min 44px)

## 6) PROPOSED UX CHANGES (if any)
- Change: [what]
- Rationale: [why]
- Impact: [what changes]`
  },

  '5.0': {
    name: 'Solution Architecture',
    tool: 'Claude Chat',
    time: '2-4 hours',
    description: 'Design data model, APIs, and infrastructure',
    requiresArtifacts: ['designBrief', 'uxPackage', 'uiSpecs'],
    template: `[ROLE: SOLUTION ARCHITECT — Design pragmatic architecture for {{productName}} on Next.js + Supabase + Stripe + Vercel]

CONTEXT: Architecture that ships fast but won't block scaling. Balance speed with avoiding technical debt.

CONSTRAINTS:
- Deploy on Vercel
- Next.js App Router + TypeScript
- Tailwind + shadcn/ui
- Supabase Postgres + Auth + RLS
- Stripe subscriptions + webhooks

INPUT — DESIGN BRIEF:
<<<
{{designBrief}}
>>>

INPUT — UX PACKAGE (key flows):
<<<
{{uxPackage}}
>>>

INPUT — UI SPECS (component needs):
<<<
{{uiSpecs}}
>>>

OUTPUT:

## 1) ARCHITECTURE OVERVIEW
Modules, boundaries, data flow diagram (text-based) for {{productName}}

## 2) TENANCY & ROLES
- Model: [single-user | workspace | multi-workspace]
- Roles: [list with permissions]
- RLS strategy: [how tenant isolation enforced]

## 3) DATA MODEL
For each table:
- Name
- Columns (name, type, constraints)
- Indexes
- RLS policies
- Relationships

## 4) API OUTLINE
### Server Actions
- Action name → Purpose → Auth required
### Route Handlers
- Route → Method → Purpose → Auth
### Read patterns
- Pagination approach
- Caching strategy

## 5) STRIPE BILLING
- Products/Prices mapping to {{productName}} plans
- Checkout flow
- Customer portal setup
- Webhook events handled:
  - Event → DB update → Side effects
- Trial/upgrade/downgrade/cancel flows

## 6) SECURITY BASELINE
- RLS policies summary
- Secrets/env vars needed
- Rate limiting approach
- File upload constraints
- Input validation approach

## 7) OBSERVABILITY
- Logging strategy (what, where)
- Error tracking setup
- Analytics events
- Audit logging (if needed)

## 8) DEPLOYMENT
- Environments: local → preview → production
- Migration strategy
- Rollback approach
- Environment variables

## 9) RISKS & TRADEOFFS
- Known shortcuts for MVP
- Technical debt accepted
- Scaling concerns

## 10) BUILD PLAN
Milestones in order:
1. [Milestone] — Scope — Estimated time
2. ...

Dependencies between milestones.`
  },

  'R3': {
    name: 'Test Strategy',
    tool: 'Claude Chat',
    time: '1 hour',
    description: 'Define testing approach before build',
    requiresArtifacts: ['designBrief', 'architecture'],
    template: `[ROLE: QA ARCHITECT — Create test strategy for {{productName}} MVP]

CONTEXT: Define what to test, how to test, and what coverage to target before implementation begins.

INPUT — DESIGN BRIEF:
<<<
{{designBrief}}
>>>

INPUT — ARCHITECTURE:
<<<
{{architecture}}
>>>

KEY USER JOURNEYS FROM UX:
<<<
{{keyJourneys}}
>>>

OUTPUT:

## 1) TEST PYRAMID
- Unit tests: X% of effort
- Integration tests: Y% of effort
- E2E tests: Z% of effort

## 2) UNIT TEST TARGETS
### Business Logic
- Function/module: [name] — Coverage: 100%
### Utilities
- Function: [name] — Coverage: [target]
### Hooks
- Hook: [name] — Coverage: [target]

## 3) INTEGRATION TEST TARGETS
### API Routes
- Route: [path] — Test: [scenarios]
### Webhook Handlers
- Handler: [event] — Test: [scenarios]
### RLS Policies
- Table: [name] — Test: [verify isolation]

## 4) E2E TEST TARGETS
### Money Path
- Steps to automate for {{productName}}
### Critical Journeys
- Journey: [name] — Steps

## 5) TEST DATA STRATEGY
- Fixtures needed: [list]
- Seed data approach: [how]
- Test tenant isolation: [approach]

## 6) CI INTEGRATION
- Block merge: [which tests]
- Run on deploy: [which tests]

## 7) COVERAGE TARGETS
- Business logic: 100%
- API routes: 80%+
- Overall: 60%+`
  },

  'R4': {
    name: 'Scale Readiness',
    tool: 'Claude Chat',
    time: '30 minutes',
    description: 'Assess architecture for growth',
    requiresArtifacts: ['designBrief', 'architecture'],
    template: `[ROLE: SCALE READINESS REVIEWER — Assess {{productName}} architecture for growth]

CONTEXT: Ensure MVP architecture won't block scaling. Identify what to do now vs defer.

INPUT — DESIGN BRIEF:
<<<
{{designBrief}}
>>>

INPUT — ARCHITECTURE:
<<<
{{architecture}}
>>>

EXPECTED SCALE: [Specify: 100 / 1K / 10K users in first year]

OUTPUT:

## 1) PHASE RECOMMENDATION
Current phase: [MVP | Phase 1 | Phase 1.5 | Phase 2]
Rationale: [why this phase for {{productName}}]

## 2) MUST-DO NOW (10 items)
Non-negotiable for current phase:
1. [Item] — Why critical
2. ...

## 3) CAN-WAIT (10 items)
Safe to defer:
1. [Item] — When to revisit
2. ...

## 4) PERFORMANCE RISKS
- Risk: [what] — Mitigation: [action] — When: [trigger]

## 5) OPERATIONAL RISKS
- Risk: [what] — Mitigation: [action] — When: [trigger]

## 6) SECURITY RISKS
- Risk: [what] — Mitigation: [action] — Priority: [now/later]

## 7) UPGRADE TRIGGERS
Metrics/events that indicate time to move phases:
- Trigger: [metric > threshold] → Action: [what to do]`
  },

  '6.0': {
    name: 'Build',
    tool: 'Claude Code CLI',
    time: '40-80 hours',
    description: 'Implement the application according to specs',
    requiresArtifacts: ['designBrief', 'uiSpecs', 'architecture'],
    template: `[ROLE: SENIOR FULL-STACK ENGINEER — Implement {{productName}} according to specs]

CONTEXT: Build the application following provided specs exactly. Do not invent new UX or architecture.

STACK:
- Next.js App Router + TypeScript (strict)
- Tailwind + shadcn/ui
- Supabase Auth + Postgres + RLS
- Stripe billing + webhooks
- Deploy on Vercel

RULES:
- Follow specs exactly — do not invent
- Implement all states (loading/empty/error/validation)
- Keep code clean, typed, modular
- Server Components for data fetching
- Client Components only when needed
- No secrets in code — env vars only
- No PII in logs
- Write tests for business logic and API routes

INPUT — UI SPECS:
<<<
{{uiSpecs}}
>>>

INPUT — ARCHITECTURE:
<<<
{{architecture}}
>>>

INPUT — SECURITY REQUIREMENTS:
<<<
{{securityRequirements}}
>>>

INPUT — TEST STRATEGY:
<<<
{{testStrategy}}
>>>

BUILD ORDER FOR {{productName}}:
1. Scaffold repo (if not done)
2. Configure Tailwind + shadcn with tokens
3. Configure Supabase clients
4. Implement layouts (marketing vs app)
5. Build shared components
6. Implement pages: onboarding → dashboard → core feature → billing → settings
7. Implement DB schema + RLS + migrations
8. Implement Stripe checkout + webhooks
9. Add analytics + error tracking
10. Write tests (unit + integration + E2E money path)
11. Add CI checks

FOR EACH MILESTONE:
- State what you're building
- Show the code
- Explain key decisions
- Note any deviations from spec (with rationale)
- Suggest tests to add

CURRENT MILESTONE: [Specify which milestone to work on]
<<<
[PASTE RELEVANT SPECS FOR THIS MILESTONE]
>>>`
  },

  '7.0': {
    name: 'QA & Launch',
    tool: 'Claude Chat',
    time: '2-4 hours',
    description: 'Final validation and launch preparation',
    requiresArtifacts: ['designBrief', 'uxPackage', 'uiSpecs', 'architecture'],
    template: `[ROLE: QA + RELEASE MANAGER — Validate {{productName}} MVP meets all acceptance criteria]

CONTEXT: Final validation before launch. Generate comprehensive checklists and verify everything works.

INPUT — UX PACKAGE:
<<<
{{uxPackage}}
>>>

INPUT — UI SPECS:
<<<
{{uiSpecs}}
>>>

INPUT — ARCHITECTURE:
<<<
{{architecture}}
>>>

BUILD SUMMARY — WHAT WAS IMPLEMENTED:
<<<
{{buildSummary}}
>>>

OUTPUT:

## 1) E2E TEST CHECKLIST (by journey)
### Money Path for {{productName}}
- [ ] Step 1: [action] → [expected result]
- [ ] Step 2: ...
### Onboarding
- [ ] ...
### Returning User
- [ ] ...

## 2) SCREEN CHECKLIST
For each screen:
- [ ] Default state renders correctly
- [ ] Loading state shows feedback
- [ ] Empty state has guidance + CTA
- [ ] Error state shows message + recovery
- [ ] Validation shows inline errors
- [ ] Responsive: mobile, tablet, desktop

## 3) BILLING CHECKLIST
- [ ] Free trial starts correctly
- [ ] Upgrade flow works
- [ ] Downgrade flow works
- [ ] Cancel flow works
- [ ] Customer portal accessible
- [ ] Webhook: checkout.session.completed
- [ ] Webhook: customer.subscription.updated
- [ ] Webhook: customer.subscription.deleted
- [ ] Invoice generated correctly

## 4) SECURITY CHECKLIST
- [ ] RLS prevents cross-tenant access
- [ ] AuthZ enforced on all mutations
- [ ] Rate limiting active
- [ ] No secrets in client bundle
- [ ] No PII in logs
- [ ] Stripe webhook signature verified
- [ ] File uploads validated (if applicable)

## 5) ACCESSIBILITY CHECKLIST
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Form labels present
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets 44px minimum

## 6) PERFORMANCE CHECKLIST
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] No N+1 queries
- [ ] Images optimized

## 7) LAUNCH CHECKLIST
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Environment variables set in production
- [ ] Database migrated
- [ ] Stripe live mode configured
- [ ] Analytics tracking verified
- [ ] Error tracking enabled
- [ ] Support email configured

## 8) ROLLBACK PLAN
- Trigger: [what indicates need to rollback]
- Steps: [exact commands/actions]
- Verification: [how to confirm rollback worked]

## 9) POST-LAUNCH MONITORING
- Dashboard 1: [what to watch]
- Dashboard 2: [what to watch]
- Alert triggers: [conditions]`
  }
};

// Stage order for progress tracking
const STAGE_ORDER = ['0.1', '1.0', '2.0', 'R2', 'R1', '3.0', '3.1', '4.0', '5.0', 'R3', 'R4', '6.0', '7.0'];

// Artifact keys mapped to display names
const ARTIFACT_NAMES = {
  businessOnePager: 'Business One-Pager',
  designBrief: 'Design Brief',
  uxPackage: 'UX Package',
  uiSpecs: 'UI Specs',
  architecture: 'Architecture',
  adrs: 'ADRs',
  securityRequirements: 'Security Requirements',
  testStrategy: 'Test Strategy',
  buildSummary: 'Build Summary'
};

export default function PromptBuilder() {
  // Project context state
  const [project, setProject] = useState({
    productName: '',
    productNameSlug: '',
    productDescription: '',
    targetCustomer: '',
    researchNotes: '',
    additionalContext: ''
  });

  // Artifacts state
  const [artifacts, setArtifacts] = useState({
    businessOnePager: '',
    designBrief: '',
    uxPackage: '',
    uiSpecs: '',
    architecture: '',
    adrs: '',
    securityRequirements: '',
    testStrategy: '',
    buildSummary: ''
  });

  // Completed stages
  const [completedStages, setCompletedStages] = useState([]);

  // Current view
  const [currentView, setCurrentView] = useState('setup'); // setup, prompts, artifacts
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedProject = localStorage.getItem('promptBuilder_project');
    const savedArtifacts = localStorage.getItem('promptBuilder_artifacts');
    const savedCompleted = localStorage.getItem('promptBuilder_completed');
    
    if (savedProject) setProject(JSON.parse(savedProject));
    if (savedArtifacts) setArtifacts(JSON.parse(savedArtifacts));
    if (savedCompleted) setCompletedStages(JSON.parse(savedCompleted));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('promptBuilder_project', JSON.stringify(project));
  }, [project]);

  useEffect(() => {
    localStorage.setItem('promptBuilder_artifacts', JSON.stringify(artifacts));
  }, [artifacts]);

  useEffect(() => {
    localStorage.setItem('promptBuilder_completed', JSON.stringify(completedStages));
  }, [completedStages]);

  // Generate slug from product name
  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Handle project field change
  const handleProjectChange = (field, value) => {
    setProject(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'productName' ? { productNameSlug: generateSlug(value) } : {})
    }));
  };

  // Handle artifact change
  const handleArtifactChange = (key, value) => {
    setArtifacts(prev => ({ ...prev, [key]: value }));
  };

  // Toggle stage completion
  const toggleStageComplete = (stageId) => {
    setCompletedStages(prev => 
      prev.includes(stageId) 
        ? prev.filter(id => id !== stageId)
        : [...prev, stageId]
    );
  };

  // Generate prompt with substitutions
  const generatePromptText = (stageId) => {
    const template = PROMPT_TEMPLATES[stageId];
    if (!template) return '';

    let prompt = template.template;

    // Replace project context
    prompt = prompt.replace(/\{\{productName\}\}/g, project.productName || '[PRODUCT NAME]');
    prompt = prompt.replace(/\{\{productNameSlug\}\}/g, project.productNameSlug || '[product-name]');
    prompt = prompt.replace(/\{\{productDescription\}\}/g, project.productDescription || '[PRODUCT DESCRIPTION]');
    prompt = prompt.replace(/\{\{targetCustomer\}\}/g, project.targetCustomer || '[TARGET CUSTOMER]');
    prompt = prompt.replace(/\{\{researchNotes\}\}/g, project.researchNotes || '[PASTE YOUR RESEARCH NOTES HERE]');
    prompt = prompt.replace(/\{\{additionalContext\}\}/g, project.additionalContext || '[ADDITIONAL CONTEXT IF ANY]');

    // Replace artifacts
    prompt = prompt.replace(/\{\{businessOnePager\}\}/g, artifacts.businessOnePager || '[BUSINESS ONE-PAGER NOT YET SAVED]');
    prompt = prompt.replace(/\{\{designBrief\}\}/g, artifacts.designBrief || '[DESIGN BRIEF NOT YET SAVED]');
    prompt = prompt.replace(/\{\{uxPackage\}\}/g, artifacts.uxPackage || '[UX PACKAGE NOT YET SAVED]');
    prompt = prompt.replace(/\{\{uiSpecs\}\}/g, artifacts.uiSpecs || '[UI SPECS NOT YET SAVED]');
    prompt = prompt.replace(/\{\{architecture\}\}/g, artifacts.architecture || '[ARCHITECTURE NOT YET SAVED]');
    prompt = prompt.replace(/\{\{securityRequirements\}\}/g, artifacts.securityRequirements || '[SECURITY REQUIREMENTS NOT YET SAVED]');
    prompt = prompt.replace(/\{\{testStrategy\}\}/g, artifacts.testStrategy || '[TEST STRATEGY NOT YET SAVED]');
    prompt = prompt.replace(/\{\{buildSummary\}\}/g, artifacts.buildSummary || '[BUILD SUMMARY NOT YET SAVED]');
    
    // Replace other placeholders
    prompt = prompt.replace(/\{\{currentStage\}\}/g, template.name);
    prompt = prompt.replace(/\{\{stageContext\}\}/g, '[ADDITIONAL CONTEXT FOR THIS STAGE]');
    prompt = prompt.replace(/\{\{keyJourneys\}\}/g, '[KEY USER JOURNEYS FROM UX PACKAGE]');

    return prompt;
  };

  // Select a prompt
  const selectPrompt = (stageId) => {
    setSelectedPrompt(stageId);
    setGeneratedPrompt(generatePromptText(stageId));
    setCopySuccess(false);
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Check if prompt has missing artifacts
  const getMissingArtifacts = (stageId) => {
    const template = PROMPT_TEMPLATES[stageId];
    if (!template) return [];
    
    return template.requiresArtifacts.filter(key => !artifacts[key]);
  };

  // Reset project
  const resetProject = () => {
    if (confirm('Are you sure you want to reset all project data? This cannot be undone.')) {
      setProject({
        productName: '',
        productNameSlug: '',
        productDescription: '',
        targetCustomer: '',
        researchNotes: '',
        additionalContext: ''
      });
      setArtifacts({
        businessOnePager: '',
        designBrief: '',
        uxPackage: '',
        uiSpecs: '',
        architecture: '',
        adrs: '',
        securityRequirements: '',
        testStrategy: '',
        buildSummary: ''
      });
      setCompletedStages([]);
      setSelectedPrompt(null);
      setGeneratedPrompt('');
    }
  };

  // Calculate progress
  const progress = Math.round((completedStages.length / STAGE_ORDER.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                AI SaaS Prompt Builder
              </h1>
              {project.productName && (
                <p className="text-sm text-slate-500">Building: {project.productName}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-slate-500 mr-4">
                Progress: {progress}%
              </div>
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex gap-1 mt-3">
            <button
              onClick={() => setCurrentView('setup')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'setup' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Project Setup
            </button>
            <button
              onClick={() => setCurrentView('prompts')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'prompts' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Prompts
            </button>
            <button
              onClick={() => setCurrentView('artifacts')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'artifacts' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Save className="w-4 h-4 inline mr-2" />
              Saved Artifacts
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Setup View */}
        {currentView === 'setup' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Project Context</h2>
              <p className="text-sm text-slate-500 mb-6">
                Enter your project details once. These will be automatically inserted into every prompt you generate.
              </p>
              
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={project.productName}
                    onChange={(e) => handleProjectChange('productName', e.target.value)}
                    placeholder="e.g., ListingSnap"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    One-Line Description *
                  </label>
                  <input
                    type="text"
                    value={project.productDescription}
                    onChange={(e) => handleProjectChange('productDescription', e.target.value)}
                    placeholder="e.g., AI-powered property listing generator for real estate agents"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Target Customer (ICP) *
                  </label>
                  <input
                    type="text"
                    value={project.targetCustomer}
                    onChange={(e) => handleProjectChange('targetCustomer', e.target.value)}
                    placeholder="e.g., Independent real estate agents managing 10-50 listings per month"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Research Notes / Business Plan
                  </label>
                  <textarea
                    value={project.researchNotes}
                    onChange={(e) => handleProjectChange('researchNotes', e.target.value)}
                    placeholder="Paste your research notes, market analysis, or business plan here. This will be included in the Business One-Pager prompt."
                    rows={6}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Additional Context (Optional)
                  </label>
                  <textarea
                    value={project.additionalContext}
                    onChange={(e) => handleProjectChange('additionalContext', e.target.value)}
                    placeholder="Any additional context like brand guidelines, deadlines, or technical constraints"
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={resetProject}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Reset Project
              </button>
              <button
                onClick={() => setCurrentView('prompts')}
                disabled={!project.productName}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Continue to Prompts
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Prompts View */}
        {currentView === 'prompts' && (
          <div className="grid grid-cols-12 gap-6">
            {/* Stage List */}
            <div className="col-span-4">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                  <h2 className="font-semibold text-slate-800">Workflow Stages</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {STAGE_ORDER.map((stageId) => {
                    const template = PROMPT_TEMPLATES[stageId];
                    const isComplete = completedStages.includes(stageId);
                    const isSelected = selectedPrompt === stageId;
                    const missingArtifacts = getMissingArtifacts(stageId);
                    
                    return (
                      <button
                        key={stageId}
                        onClick={() => selectPrompt(stageId)}
                        className={`w-full p-3 text-left hover:bg-slate-50 transition-colors ${
                          isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isComplete 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-slate-100 text-slate-400'
                          }`}>
                            {isComplete ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <span className="text-xs font-medium">{stageId}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-800 text-sm">
                              {template.name}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {template.tool} • {template.time}
                            </div>
                            {missingArtifacts.length > 0 && (
                              <div className="flex items-center gap-1 mt-1 text-xs text-amber-600">
                                <AlertCircle className="w-3 h-3" />
                                Missing: {missingArtifacts.map(k => ARTIFACT_NAMES[k]).join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Prompt Detail */}
            <div className="col-span-8">
              {selectedPrompt ? (
                <div className="bg-white rounded-xl border border-slate-200">
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-slate-800">
                        {PROMPT_TEMPLATES[selectedPrompt].name}
                      </h2>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {PROMPT_TEMPLATES[selectedPrompt].description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleStageComplete(selectedPrompt)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          completedStages.includes(selectedPrompt)
                            ? 'bg-green-100 text-green-700'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {completedStages.includes(selectedPrompt) ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 inline mr-1" />
                            Completed
                          </>
                        ) : (
                          'Mark Complete'
                        )}
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                          copySuccess
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        <Copy className="w-4 h-4" />
                        {copySuccess ? 'Copied!' : 'Copy Prompt'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="px-2 py-1 bg-slate-100 rounded text-slate-600">
                        {PROMPT_TEMPLATES[selectedPrompt].tool}
                      </span>
                      <span className="text-slate-500">
                        Estimated time: {PROMPT_TEMPLATES[selectedPrompt].time}
                      </span>
                    </div>
                    
                    {getMissingArtifacts(selectedPrompt).length > 0 && (
                      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-amber-800">
                              Missing Required Artifacts
                            </p>
                            <p className="text-sm text-amber-700 mt-0.5">
                              This prompt requires: {getMissingArtifacts(selectedPrompt).map(k => ARTIFACT_NAMES[k]).join(', ')}. 
                              Complete earlier stages first, or the prompt will include placeholder text.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <textarea
                      value={generatedPrompt}
                      onChange={(e) => setGeneratedPrompt(e.target.value)}
                      className="w-full h-96 px-4 py-3 font-mono text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    
                    <p className="text-xs text-slate-400 mt-2">
                      You can edit the prompt above before copying. Changes are not saved.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-600">Select a Stage</h3>
                  <p className="text-slate-500 mt-1">
                    Choose a workflow stage from the list to generate a customized prompt.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Artifacts View */}
        {currentView === 'artifacts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-2">Saved Artifacts</h2>
              <p className="text-sm text-slate-500 mb-6">
                After Claude generates output for each stage, paste the final approved version here. 
                These artifacts are automatically included in subsequent prompts.
              </p>
              
              <div className="space-y-6">
                {Object.entries(ARTIFACT_NAMES).map(([key, name]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700">
                        {name}
                      </label>
                      {artifacts[key] && (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Saved ({artifacts[key].length} characters)
                        </span>
                      )}
                    </div>
                    <textarea
                      value={artifacts[key]}
                      onChange={(e) => handleArtifactChange(key, e.target.value)}
                      placeholder={`Paste your approved ${name} here...`}
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-medium text-blue-800 mb-2">💡 Tip: Keep Artifacts Updated</h3>
              <p className="text-sm text-blue-700">
                When you iterate on a stage (like incorporating UX Critic feedback into your UX Package), 
                update the artifact here with the latest version. All future prompts will use the updated version.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
