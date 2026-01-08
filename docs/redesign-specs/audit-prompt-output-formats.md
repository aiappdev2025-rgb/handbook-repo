# Audit: SmartPrompt Output Formats

**Date**: 2026-01-08
**Auditor**: Claude
**Scope**: All SmartPrompt templates in docusaurus/docs/

---

## Summary

| Metric | Count |
|--------|-------|
| Total SmartPrompts Found | 18 |
| With Output Format | 13 |
| Missing Output Format | 4 |
| N/A (SQL/Code Output) | 2 |

**Pass Rate**: 76% (13/17 markdown-based prompts)

---

## Prompts WITH Output Format Specification

| File | artifactId | Format Specification |
|------|------------|---------------------|
| phase-1-validate/market-research.mdx | market-research | `Output as structured markdown.` |
| phase-1-validate/business-one-pager.mdx | business-one-pager | `Output in markdown format, ready to save as docs/one-pager.md.` |
| phase-1-validate/competitive-analysis.mdx | competitive-analysis | `Output in markdown format as docs/competitive-analysis.md.` |
| phase-1-validate/mvp-scoping.mdx | mvp-scope | `Output as MVP Scope document in markdown format.` |
| phase-1-validate/design-brief.mdx | design-brief | `Output as design-brief.md` |
| phase-2-design/design-philosophy.mdx | design-philosophy | `Output as design-philosophy.md` |
| phase-2-design/ux-package.mdx | ux-package | `Output as ux-package.md` |
| phase-2-design/ui-system.mdx | ui-system | `Output as ui-system.md` |
| phase-2-design/component-library.mdx | component-library | `Output as component-library.md` |
| phase-3-architect/solution-architecture.mdx | solution-architecture | `Output as solution-architecture.md` |
| phase-3-architect/api-specification.mdx | api-spec | `Output as api-spec.md` |
| phase-3-architect/security.mdx | security-architecture | `Output as security-architecture.md` |
| templates/build-contract.mdx | build-contract | `Output as markdown ready for docs/build-contract.md` |

---

## Prompts with Appropriate Non-Markdown Output

| File | artifactId | Format Specification | Notes |
|------|------------|---------------------|-------|
| phase-3-architect/data-model.mdx | data-model | `Output as a single SQL migration file (00001_initial_schema.sql)` | SQL file - appropriate |
| phase-4-build/m2-database.mdx | m2-database-schema | `Use descriptive filename: YYYYMMDDHHMMSS_create_core_schema.sql` | SQL file - appropriate |

---

## Prompts MISSING Output Format Specification

| File | artifactId | Current Ending | Suggested Fix |
|------|------------|----------------|---------------|
| phase-1-validate/opportunity-assessment.mdx | opportunity-assessment | `Recommendation: Proceed, Pivot, or Pass` | Add: `Output in markdown format, ready to save as docs/opportunity-assessment.md` |
| phase-2-design/user-flows.mdx | user-flows | `Output as a structured critique document.` | Change to: `Output in markdown format as a structured critique document, ready for review.` |
| phase-4-build/m1-foundation.mdx | m1-foundation | Ends with VERIFICATION instructions | This is a Claude Code prompt - produces files directly, not markdown output. **No fix needed.** |
| phase-4-build/m4-ui-shell.mdx | m4-ui-shell | Ends with VERIFICATION instructions | This is a Claude Code prompt - produces files directly, not markdown output. **No fix needed.** |

---

## Analysis by Category

### Good Patterns Found

1. **Explicit filename**: `Output as [filename].md` - Clear, consistent
2. **With save location**: `Output in markdown format, ready to save as docs/[filename].md` - Best practice
3. **Format + type**: `Output as [description] in markdown format` - Good for documents that don't save to files

### Patterns Needing Improvement

1. **Missing format entirely**: Template ends with requirements or questions without specifying output
2. **Vague format**: "Output as a structured critique document" doesn't specify markdown

### Claude Code vs Claude Chat Prompts

Two categories of prompts exist:
- **Claude Chat prompts** (Phases 1-3): Should output markdown for user to save
- **Claude Code prompts** (Phase 4 milestones): Execute directly, create files - don't need markdown output spec

---

## Files Requiring Fixes

### Priority 1: Fix Output Format (2 files)

1. **phase-1-validate/opportunity-assessment.mdx**
   - Current: Template ends with `Recommendation: Proceed, Pivot, or Pass`
   - Fix: Add to end of template:
   ```
   Output in markdown format, ready to save as docs/opportunity-assessment.md
   ```

2. **phase-2-design/user-flows.mdx**
   - Current: `Output as a structured critique document.`
   - Fix: Change to:
   ```
   Output in markdown format as a structured critique document.
   ```

### No Fix Needed (2 files)

- **phase-4-build/m1-foundation.mdx** - Claude Code prompt, produces files directly
- **phase-4-build/m4-ui-shell.mdx** - Claude Code prompt, produces files directly

---

## Recommended Standard

All Claude Chat prompts should end with one of these patterns:

**For artifacts that save to specific files:**
```
Output in markdown format, ready to save as docs/[filename].md
```

**For artifacts that match the artifactId:**
```
Output as [artifactId].md
```

**For SQL/code output:**
```
Output as [filename].[extension]
```
or
```
Create migration file: [filename].sql
```

---

## Verification Checklist

- [ ] opportunity-assessment.mdx updated with output format
- [ ] user-flows.mdx output format clarified
- [ ] Verify m1-foundation.mdx and m4-ui-shell.mdx are intentionally without markdown output spec
- [ ] All future SmartPrompt templates include output format specification

---

## Notes

- m3-api.mdx does NOT use SmartPrompt component (uses raw markdown prompt blocks instead)
- data-model.mdx and m2-database.mdx correctly use SQL file output specifications
- build-contract.mdx has the most complete pattern: "Output as markdown ready for docs/build-contract.md"
