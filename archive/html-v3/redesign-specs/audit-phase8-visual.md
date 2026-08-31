# Audit Phase 8: Visual/UX

**Date:** 2026-01-08
**Auditor:** Claude Opus 4.5
**Status:** COMPLETE

## Executive Summary

This audit reviews the visual consistency and UX patterns across the MOAI Handbook redesign. The codebase uses a "Geometric Grid" design system with dark mode as primary and light mode support. Overall, the implementation is solid with a few notable issues around border-radius violations and some components missing explicit theme styles.

**Key Findings:**
- 25+ border-radius violations of Geometric Grid theme
- 3 components missing explicit dark/light theme styles
- 2 components using legacy `--ifm-*` variables without theme overrides
- Good responsive design coverage across all major components
- Most interactive states properly implemented
- Typography system well-defined and consistent

---

## 1. Dark Mode Consistency

| Component | Has Dark Styles | Has Light Styles | Status |
|-----------|-----------------|------------------|--------|
| custom.css | Default (dark) | [data-theme='light'] | PASS |
| SmartPrompt/styles.module.css | Default (dark) | :global([data-theme='light']) | PASS |
| ArtifactsTab/styles.module.css | Default (dark) | :global([data-theme='light']) | PASS |
| ArtifactModal/styles.module.css | Default (dark) | :global([data-theme='light']) | PASS |
| my-project.module.css | Default (dark) | :global([data-theme='light']) | PASS |
| ChapterComponents/styles.module.css | Default (dark) | :global([data-theme='light']) | PASS |
| ProjectImport/styles.module.css | Default (dark) | :global([data-theme='light']) | PASS |
| ProgressTracker/styles.module.css | Uses --ifm-* vars | None | WARN |
| ProjectIndicator/styles.module.css | [data-theme='dark'] | Implied default | WARN |
| PromptBuilder/styles.module.css | Uses --ifm-* vars | None | WARN |
| HomepageFeatures/styles.module.css | Minimal/none | None | WARN |
| index.module.css | Uses --ifm-* vars | None | WARN |

### Issues Found

1. **ProgressTracker/styles.module.css** - Relies entirely on `--ifm-*` CSS variables without explicit dark/light theme overrides
2. **PromptBuilder/styles.module.css** - Relies on `--ifm-*` variables without explicit theme handling
3. **index.module.css** - Homepage uses `--ifm-*` variables, may have contrast issues in some themes
4. **ProjectIndicator/styles.module.css** - Uses inverted pattern (dark mode explicit, light implied)

---

## 2. Light Mode Contrast

| Element | Color Value | Background | Est. Ratio | Status |
|---------|-------------|------------|------------|--------|
| Body text | #1e293b | #ffffff | ~12.6:1 | PASS |
| Headings | #0f172a | #ffffff | ~16:1 | PASS |
| Secondary text | #475569 | #ffffff | ~6.5:1 | PASS |
| Code text | #334155 | #f1f5f9 | ~7:1 | PASS |
| Primary link | #3b82f6 | #ffffff | ~4.5:1 | PASS |
| Gray-500 text | #737373 | #ffffff | ~4.6:1 | PASS |
| Gray-400 text | #a3a3a3 | #ffffff | ~2.9:1 | WARN |

### Issues Found

1. **Gray-400 (#a3a3a3)** used for some labels may not meet WCAG AA ratio against white backgrounds
2. Some placeholder text uses --gray-400 which may have borderline contrast

---

## 3. Component Styles Consistency

### Callout Boxes Padding/Margins

| Component | Padding | Margin | Status |
|-----------|---------|--------|--------|
| .tldr-box | 0 (header/content separate) | 2rem 0 | PASS |
| .when-to-use | 0 (structured) | 2rem 0 | PASS |
| .prerequisites | 0 (structured) | 2rem 0 | PASS |
| .expected-output | 0 (structured) | 2rem 0 | PASS |
| .verification | 0 (structured) | 2rem 0 | PASS |
| .next-steps | 0 (structured) | margin-top: 3rem | WARN |

### Status Badges Colors

| Component | Empty | Draft | Complete | Consistent |
|-----------|-------|-------|----------|------------|
| SmartPrompt | gray-700/gray-400 | amber 0.2/fbbf24 | green 0.2/4ade80 | YES |
| ArtifactModal | gray-700/gray-400 | amber 0.2/fbbf24 | green 0.2/4ade80 | YES |
| ArtifactsTab | gray-500 | #fbbf24 | #4ade80 | YES |

### Button Styles

| Button Type | Background | Border | Border-Radius | Status |
|-------------|------------|--------|---------------|--------|
| template-download__button | transparent | 1px accent-blue | 0 | PASS |
| SmartPrompt copyBtn | transparent | 1px gray-600 | 0 | PASS |
| SmartPrompt saveArtifactBtn | accent-blue | none | 0 | PASS |
| ArtifactsTab exportAllBtn | accent-blue | none | 4px | FAIL |
| ArtifactModal saveBtn | accent-blue | none | 4px | FAIL |
| my-project addButton | transparent | 1px accent-blue | 0 | PASS |

### Issues Found

1. **Margin inconsistency:** .next-steps uses margin-top: 3rem while other callouts use margin: 2rem 0
2. **Border-radius violations:** See Geometric Grid section

---

## 4. Responsive Design

### Breakpoints Coverage

| Breakpoint | Components Handling | Status |
|------------|---------------------|--------|
| 996px (tablet) | chapter-nav, index.module.css (hero, phases, quickGrid) | PASS |
| 768px (mobile landscape) | when-grid, expected-output, template-download, SmartPrompt, ArtifactsTab, ArtifactModal, my-project | PASS |
| 576px (mobile portrait) | index.module.css only | PASS |

### Component Responsive Handling

| Component | Mobile Ready | Issues |
|-----------|--------------|--------|
| SmartPrompt | YES | Header stacks vertically, input widths adjust |
| ArtifactsTab | YES | Summary/phase headers stack, action buttons wrap |
| ArtifactModal | YES | Header wraps, edit panes stack vertically |
| My Project page | YES | Header stacks, field rows single column |
| chapter-nav | YES | Single column layout |
| ProgressTracker | NO | No responsive breakpoints defined |
| PromptBuilder | NO | Only relies on auto-fit grid |

### Issues Found

1. **ProgressTracker/styles.module.css** - No explicit responsive breakpoints
2. **PromptBuilder/styles.module.css** - Relies only on CSS Grid auto-fit without breakpoint adjustments

---

## 5. Geometric Grid Theme Compliance

| Principle | Followed | Exceptions |
|-----------|----------|------------|
| Sharp corners (border-radius: 0) | PARTIAL | 25+ violations (see below) |
| Visible structure (borders, dividers) | YES | All components have clear borders |
| 8px grid spacing | YES | Consistent spacing multiplies |
| Monochrome + accent colors | YES | Proper grayscale + accent usage |

### Border-Radius Violations

**ArtifactModal/styles.module.css:**
- `.statusBadge`: border-radius: 12px (line 77)
- `.modeTabs`: border-radius: 6px (line 122)
- `.modeTab`: border-radius: 4px (line 134)
- `.modeTab.active`: box-shadow roundness (line 156)
- `.closeBtn`: border-radius: 4px (line 180)
- `.markdownPreview code`: border-radius: 3px (line 273)
- `.markdownPreview pre`: border-radius: 6px (line 286)
- `.previewToggle`: border-radius: 4px (line 333)
- `.statusSelect select`: border-radius: 4px (line 466)
- `.versionNoteInput input`: border-radius: 4px (line 487)
- `.saveBtn`: border-radius: 4px (line 513)
- `.versionItem`: border-radius: 6px (line 548)
- `.versionPreview`: border-radius: 4px (line 606)
- `.restoreBtn`: border-radius: 4px (line 627)
- `.parsePromptConfidence`: border-radius: 10px (line 699)
- `.parseApplyBtn`: border-radius: 4px (line 715)
- `.parseDismissBtn`: border-radius: 4px (line 731)

**ArtifactsTab/styles.module.css:**
- `.exportAllBtn`: border-radius: 4px (line 47)
- `.phaseExportBtn`: border-radius: 4px (line 123)

**SmartPrompt/styles.module.css:**
- `.parseResult`: border-radius: 4px (line 718)
- `.parseField`: border-radius: 3px (line 767)
- `.applyBtn`: border-radius: 3px (line 810)
- `.dismissBtn`: border-radius: 3px (line 826)

**ProgressTracker/styles.module.css:**
- `.tracker`: border-radius: 8px (line 5)
- `.overallBar`: border-radius: 4px (line 30)
- `.overallFill`: border-radius: 4px (line 38)
- `.compact`: border-radius: 6px (line 109)
- `.compactBar`: border-radius: 3px (line 137)
- `.compactFill`: border-radius: 3px (line 145)
- `.phaseDot`: border-radius: 50% (line 64)
- `.compactDot`: border-radius: 50% (line 163)

**PromptBuilder/styles.module.css:**
- `.promptBuilder`: border-radius: 8px (line 5)
- `.select`: border-radius: 6px (line 46)
- `.description`: border-radius: 6px (line 67)
- `.variableInput input`: border-radius: 6px (line 103)
- `.outputSection`: border-radius: 8px (line 128)
- `.copyButton`: border-radius: 6px (line 148)

**ProjectIndicator/styles.module.css:**
- `.indicator`: border-radius: 9999px (line 6) - pill shape

**my-project.module.css:**
- `.exportMenu`: border-radius: 6px (line 183)

---

## 6. Interactive States

| Element | Hover | Focus | Active | Status |
|---------|-------|-------|--------|--------|
| Primary buttons | YES | Browser default | No explicit | WARN |
| Secondary buttons | YES | Browser default | No explicit | WARN |
| Form inputs | YES | YES (custom) | No explicit | PASS |
| Links | YES | Browser default | No explicit | PASS |
| Checkboxes | N/A | Browser default | N/A | WARN |
| SmartPrompt placeholders | YES | YES (outline) | No explicit | PASS |
| Modal tabs | YES | Browser default | YES (active class) | PASS |
| Collapsible headers | YES | Browser default | No explicit | WARN |

### Issues Found

1. **Buttons:** Most buttons lack explicit :focus styles, relying on browser defaults
2. **Checkboxes:** Custom checkboxes (appearance: none) lack :focus ring
3. **Active states:** Few components define explicit :active pseudo-class styles

---

## 7. Loading/Empty States

| Scenario | Handled | Implementation | Status |
|----------|---------|----------------|--------|
| No project selected | YES | SmartPrompt .noProject bar | PASS |
| Empty artifacts list | YES | Implied by phase stats (0 items) | PASS |
| No search results | NO | Not visible in CSS | WARN |
| Loading indicators | NO | No skeleton/spinner styles in CSS | WARN |
| Missing placeholders | YES | SmartPrompt .missingWarning | PASS |
| No version history | YES | ArtifactModal .noHistory | PASS |
| Empty project state | YES | my-project .emptyState | PASS |

### Issues Found

1. **No loading states:** No CSS for loading spinners, skeletons, or progress indicators
2. **Search results:** No dedicated "no results" styling visible (may be in components)

---

## 8. Typography Consistency

| Element | Size Variable | Actual Size | Status |
|---------|---------------|-------------|--------|
| H1 | --text-4xl | 2.25rem (36px) | PASS |
| H2 | --text-2xl | 1.5rem (24px) | PASS |
| H3 | --text-xl | 1.25rem (20px) | PASS |
| H4 | --text-lg | 1.125rem (18px) | PASS |
| Body text | --text-base | 1rem (16px) | PASS |
| Small text | --text-sm | 0.875rem (14px) | PASS |
| Labels | --text-xs | 0.75rem (12px) | PASS |
| Code | --ifm-font-family-monospace | JetBrains Mono/Fira Code | PASS |

### Typography Pattern

- **Headers:** Consistent hierarchy with weight 600-700
- **Labels:** UPPERCASE with letter-spacing: 0.05-0.1em
- **Body:** 14-16px with good line-height (1.5-1.7)
- **Code:** Monospace with consistent sizing

**No typography issues found.**

---

## 9. Accessibility Basics

| Check | Pass | Issues |
|-------|------|--------|
| Focus indicators visible | PARTIAL | Custom elements rely on browser defaults |
| Color not only indicator | YES | Text labels accompany color status |
| Sufficient color contrast | PARTIAL | Gray-400 borderline for small text |
| Form labels present | N/A | (Check in components, not CSS) |
| Custom checkbox accessible | PARTIAL | Has checkmark but no focus ring |

### Issues Found

1. **Focus rings:** Custom-styled elements (buttons, checkboxes) don't always have visible focus indicators
2. **Contrast:** --gray-400 (#a3a3a3) may not meet WCAG AA for small text on white

---

## Issues Summary

### Critical (Must Fix)
None

### Major (Should Fix)
1. **25+ border-radius violations** breaking Geometric Grid theme consistency
2. **Missing focus states** on custom buttons and checkboxes (accessibility)
3. **Gray-400 contrast** may not meet WCAG AA for small text

### Minor (Nice to Fix)
4. ProgressTracker, PromptBuilder, index.module.css rely on --ifm-* without explicit theme overrides
5. No CSS loading/skeleton states defined
6. .next-steps margin inconsistent with other callouts (3rem vs 2rem)
7. ProjectIndicator uses pill shape (border-radius: 9999px) breaking geometric theme

---

## Recommendations

### High Priority
1. Remove border-radius from all components to comply with Geometric Grid
2. Add explicit :focus styles to all interactive elements
3. Ensure all custom form elements have visible focus rings

### Medium Priority
4. Add explicit dark/light theme overrides to ProgressTracker and PromptBuilder
5. Define loading state CSS (spinners or skeletons)
6. Review gray-400 usage for contrast compliance

### Low Priority
7. Standardize .next-steps margin to match other callouts
8. Consider adding responsive breakpoints to ProgressTracker

---

## Summary

| Category | Status | Score |
|----------|--------|-------|
| Dark mode complete | PARTIAL | 8/12 components |
| Light mode contrast | PASS | AA compliant (mostly) |
| Responsive design | PASS | All key components covered |
| Geometric Grid | PARTIAL | 25+ violations |
| Interactive states | PARTIAL | Hover good, focus needs work |
| Loading/Empty states | PARTIAL | Empty good, loading missing |
| Typography | PASS | Consistent system |
| Accessibility | PARTIAL | Focus rings need attention |

**Total Issues Found:** 32
- Border-radius violations: 25+
- Theme handling gaps: 4
- Accessibility concerns: 3
