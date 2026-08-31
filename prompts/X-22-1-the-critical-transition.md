---
id: "X-22-1"
title: "The Critical Transition"
tool: "claude-code"
chapter: 22
variant: "canonical"
source: "archive/html-v3/handbook"
---

```text
Generate a CLAUDE.md file for this project by reading the design artifacts in docs/.

Read these files:
- docs/design-brief.md (for vocabulary, user types, product overview)
- docs/architecture.md (for tech stack, folder structure, API patterns, database conventions)
- docs/build-contract.md (for quality standards, component specs)

Generate CLAUDE.md at project root with these sections:

1. **Project Overview**: Brief description from design-brief.md
2. **Technology Stack**: Extract from architecture.md
3. **Project Structure**: Folder layout from architecture.md Project Structure section
4. **Code Standards**: Quality requirements from build-contract.md
5. **Database Conventions**: Naming, RLS policies from architecture.md
6. **API Conventions**: Route patterns, validation from architecture.md
7. **Key Commands**: Standard npm scripts (dev, build, test, lint, type-check)
8. **Vocabulary**: Canonical terms from design-brief.md Section 2
9. **Current Sprint Focus**: Set to "M1 - Project Setup"
10. **Project Artifacts**: List all docs/*.md files with descriptions
11. **SPEC Convention**: Note that test files must include `// SPEC: SPEC-XXX-NNN` comment

Keep the file concise (~2-5K tokens). Focus on actionable context, not prose.
```
