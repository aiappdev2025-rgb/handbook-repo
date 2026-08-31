# Audit Phase 3: SmartPrompt Integration

Date: 2026-01-08

## Artifact Definitions

**Total Defined:** 16 artifacts in `src/lib/conductorSchema.ts`

| Artifact ID | Phase | Chapter | Filename |
|-------------|-------|---------|----------|
| market-research | 1 | market-research | market-research.md |
| opportunity-assessment | 1 | opportunity-assessment | opportunity-assessment.md |
| business-one-pager | 1 | business-one-pager | business-one-pager.md |
| competitive-analysis | 1 | competitive-analysis | competitive-analysis.md |
| mvp-scope | 1 | mvp-scoping | mvp-scope.md |
| design-brief | 1 | design-brief | design-brief.md |
| design-philosophy | 2 | design-philosophy | design-philosophy.md |
| ux-package | 2 | ux-package | ux-package.md |
| user-flows | 2 | user-flows | user-flows.md |
| ui-system | 2 | ui-system | ui-system.md |
| component-library | 2 | component-library | component-library.md |
| solution-architecture | 3 | solution-architecture | solution-architecture.md |
| data-model | 3 | data-model | data-model.md |
| api-spec | 3 | api-specification | api-spec.md |
| security-architecture | 3 | security | security-architecture.md |
| build-contract | 3 | build-contract | build-contract.md |

## SmartPrompt Usages

**Total SmartPrompt Components:** 19

| File | Prompt Title | artifactId | Expected | Status |
|------|--------------|------------|----------|--------|
| phase-1-validate/market-research.mdx | Market Research Prompt | (none) | market-research | NEEDS FIX |
| phase-1-validate/opportunity-assessment.mdx | Opportunity Assessment Prompt | (none) | opportunity-assessment | NEEDS FIX |
| phase-1-validate/business-one-pager.mdx | One-Pager Prompt | business-one-pager | business-one-pager | OK |
| phase-1-validate/competitive-analysis.mdx | Competitive Analysis Prompt | (none) | competitive-analysis | NEEDS FIX |
| phase-1-validate/mvp-scoping.mdx | MVP Scoping Prompt | (none) | mvp-scope | NEEDS FIX |
| phase-1-validate/design-brief.mdx | Design Brief Prompt | (none) | design-brief | NEEDS FIX |
| phase-2-design/design-philosophy.mdx | Design Philosophy Prompt | (none) | design-philosophy | NEEDS FIX |
| phase-2-design/ux-package.mdx | UX Package Prompt | (none) | ux-package | NEEDS FIX |
| phase-2-design/user-flows.mdx | UX Flows Critique Prompt | (none) | user-flows | NEEDS FIX |
| phase-2-design/ui-system.mdx | UI System Prompt | (none) | ui-system | NEEDS FIX |
| phase-2-design/component-library.mdx | Component Library Prompt | (none) | component-library | NEEDS FIX |
| phase-3-architect/solution-architecture.mdx | Solution Architecture Prompt | (none) | solution-architecture | NEEDS FIX |
| phase-3-architect/data-model.mdx | Data Model Prompt | (none) | data-model | NEEDS FIX |
| phase-3-architect/api-specification.mdx | API Specification Prompt | (none) | api-spec | NEEDS FIX |
| phase-3-architect/security.mdx | Security Architecture Prompt | (none) | security-architecture | NEEDS FIX |
| phase-4-build/m1-foundation.mdx | M1: Project Foundation Prompt | (none) | N/A | BUILD PROMPT |
| phase-4-build/m2-database.mdx | M2: Database Schema Prompt | (none) | N/A | BUILD PROMPT |
| phase-4-build/m3-api.mdx | (import only, no component) | N/A | N/A | UNUSED IMPORT |
| phase-4-build/m4-ui-shell.mdx | M4: UI Shell Prompt | (none) | N/A | BUILD PROMPT |

## Missing artifactId (HIGH PRIORITY)

**14 SmartPrompts need artifactId added** to enable artifact saving:

### Phase 1: Validate
1. `phase-1-validate/market-research.mdx` - add `artifactId="market-research"`
2. `phase-1-validate/opportunity-assessment.mdx` - add `artifactId="opportunity-assessment"`
3. `phase-1-validate/competitive-analysis.mdx` - add `artifactId="competitive-analysis"`
4. `phase-1-validate/mvp-scoping.mdx` - add `artifactId="mvp-scope"`
5. `phase-1-validate/design-brief.mdx` - add `artifactId="design-brief"`

### Phase 2: Design
6. `phase-2-design/design-philosophy.mdx` - add `artifactId="design-philosophy"`
7. `phase-2-design/ux-package.mdx` - add `artifactId="ux-package"`
8. `phase-2-design/user-flows.mdx` - add `artifactId="user-flows"`
9. `phase-2-design/ui-system.mdx` - add `artifactId="ui-system"`
10. `phase-2-design/component-library.mdx` - add `artifactId="component-library"`

### Phase 3: Architect
11. `phase-3-architect/solution-architecture.mdx` - add `artifactId="solution-architecture"`
12. `phase-3-architect/data-model.mdx` - add `artifactId="data-model"`
13. `phase-3-architect/api-specification.mdx` - add `artifactId="api-spec"`
14. `phase-3-architect/security.mdx` - add `artifactId="security-architecture"`

## Chapters Missing SmartPrompt (HIGH PRIORITY)

**1 chapter should have SmartPrompt but doesn't:**

| Chapter | Has Artifact Definition | Issue |
|---------|------------------------|-------|
| phase-3-architect/build-contract.mdx | Yes (`build-contract`) | No SmartPrompt component |

## Invalid Placeholders

**None found.** All placeholder tokens are valid and mapped:

| Token | Maps To |
|-------|---------|
| [PRODUCT_NAME] | phase1.productName |
| [PRODUCT_CONCEPT] | phase1.productConcept |
| [TARGET_CUSTOMER] | phase1.targetCustomer |
| [PROBLEM_STATEMENT] | phase1.problemStatement |
| [PROBLEM] | phase1.problemStatement (alias) |
| [COMPETITORS] | phase1.competitors |
| [MVP_FEATURES] | phase1.mvpFeatures |
| [USER_PERSONAS] | phase2.userPersonas |
| [CORE_FEATURES] | phase2.coreFeatures |
| [DESIGN_PRINCIPLES] | phase2.designPrinciples |
| [USER_FLOWS] | phase2.keyUserFlows |
| [TECH_STACK] | phase3.techStack |
| [ENTITIES] | phase3.entities |
| [AUTH_STRATEGY] | phase3.authStrategy |
| [PROJECT_FOLDER] | phase4.projectFolder |

## Other Issues

### Unused Import
- `phase-4-build/m3-api.mdx` imports SmartPrompt but uses markdown code blocks instead
  - **Action:** Remove unused import OR convert prompts to SmartPrompt components

### Build Prompts (No Action Required)
Phase 4 build prompts (M1, M2, M4) are implementation guides, not artifact generators.
They don't need artifactId because they don't produce saveable artifacts.

---

## Fix Script

### 1. Add artifactId to existing SmartPrompts

```bash
# Phase 1
# market-research.mdx line 96-98
# Change: <SmartPrompt title="Market Research Prompt" template={...
# To:     <SmartPrompt title="Market Research Prompt" artifactId="market-research" template={...

# opportunity-assessment.mdx line 110-112
# Change: <SmartPrompt title="Opportunity Assessment Prompt" template={...
# To:     <SmartPrompt title="Opportunity Assessment Prompt" artifactId="opportunity-assessment" template={...

# competitive-analysis.mdx line 128-130
# Change: <SmartPrompt title="Competitive Analysis Prompt" template={...
# To:     <SmartPrompt title="Competitive Analysis Prompt" artifactId="competitive-analysis" template={...

# mvp-scoping.mdx line 98-100
# Change: <SmartPrompt title="MVP Scoping Prompt" template={...
# To:     <SmartPrompt title="MVP Scoping Prompt" artifactId="mvp-scope" template={...

# design-brief.mdx line 140-142
# Change: <SmartPrompt title="Design Brief Prompt" template={...
# To:     <SmartPrompt title="Design Brief Prompt" artifactId="design-brief" template={...

# Phase 2
# design-philosophy.mdx line 121-123
# Add: artifactId="design-philosophy"

# ux-package.mdx line 115-117
# Add: artifactId="ux-package"

# user-flows.mdx line 54-56
# Add: artifactId="user-flows"

# ui-system.mdx line 202-204
# Add: artifactId="ui-system"

# component-library.mdx line 219-221
# Add: artifactId="component-library"

# Phase 3
# solution-architecture.mdx line 104-106
# Add: artifactId="solution-architecture"

# data-model.mdx line 62-64
# Add: artifactId="data-model"

# api-specification.mdx line 101-103
# Add: artifactId="api-spec"

# security.mdx line 150-152
# Add: artifactId="security-architecture"
```

### 2. Add SmartPrompt to build-contract.mdx

Create a SmartPrompt component with artifactId="build-contract" for generating the Build Contract artifact.

### 3. Clean up m3-api.mdx

Remove the unused `import SmartPrompt from '@site/src/components/SmartPrompt';` line (line 16).

---

## Summary

| Metric | Count |
|--------|-------|
| Artifact definitions | 16 |
| SmartPrompt components | 19 |
| SmartPrompts with artifactId | 1/15 (artifact prompts only) |
| Need artifactId added | 14 |
| Invalid placeholders | 0 |
| Chapters missing SmartPrompt | 1 |
| Unused imports | 1 |

### Priority Actions
1. **HIGH:** Add artifactId to 14 SmartPrompts (enables artifact saving)
2. **HIGH:** Add SmartPrompt to build-contract.mdx
3. **LOW:** Remove unused import from m3-api.mdx
