---
chapter: 21
title: "Generating the Build Contract"
slug: "generating-contract"
phase: 3
phase_name: "Architect"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "new-chat"
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase3/chapter-21-generating-contract.html"
---

# Chapter 21: Generating the Build Contract

In this chapter, you'll generate your Build Contract by having Claude Chat synthesize your design artifacts into the seven-section structure. This is the final step before transitioning to Claude Code for implementation. By the end of this chapter, you'll have a complete Build Contract saved in your project's docs folder.

## 21.1 Build Contract Prompt

Start a fresh chat in Claude Chat for this synthesis task. A clean context ensures Claude focuses on extracting and organizing information rather than continuing previous discussions. Attach all four design artifacts so Claude can cross-reference them.

> **Run in:** Claude Chat · **Session:** New Chat · fresh context for synthesis

> Prompt file: [`prompts/X-21-1-generating-the-build-contract.md`](../../prompts/X-21-1-generating-the-build-contract.md)

```text
I need you to generate a Build Contract from my design artifacts.

Please analyze the attached design artifacts and create a Build Contract with these sections:

1. **Vocabulary**: Extract all canonical terms from the Design Brief.
   Format as table: | Term | Definition | Usage Context |

2. **User Model**: Extract user types, auth, and flows from UX Package.

3. **Screen Inventory**: Extract all screens with routes from UI System.
   Format as table: | Screen | Route | Purpose | Key Components |

4. **Component Specifications**: Extract key component behaviors from UI System.

5. **Data Model**: Extract entities and relationships from Architecture.
   Format as table: | Table | Columns | Constraints | RLS Policy |

6. **API Surface**: Extract all API routes from Architecture.
   Format as table: | Route | Method | Purpose | Auth Required |

7. **Quality Standards**: Compile standards from all documents.

[Attach: Design Brief, UX Package, UI System, Architecture Document]

Output in markdown format, ready to save as docs/build-contract.md.
```

> **Expected Outcome**
>
> **What you should have:** A complete Build Contract document (typically 2,000-4,000 words) with all seven sections populated from your design artifacts.
>
> **How to validate:** Each section should have substantive content. Vocabulary should list 10+ terms. Screen Inventory should match your UX Package. Data Model should match your Architecture schema.
>
> **Next:** Save the Build Contract to your project.

## 21.2 Save the Build Contract

The Build Contract must be saved in your project's docs folder so Claude Code can reference it during implementation. This is the critical bridge file between design and implementation phases.

### Instructions

1. Copy the complete Build Contract output from Claude Chat
2. Save as `docs/build-contract.md`

> **Note:** Bridge Complete:
>
> With the Build Contract saved, you now have all design artifacts ready in your
>
> docs/
>
> folder. Claude Code will reference these during implementation.

> **Expected Outcome**
>
> **What you should have:** A file at `docs/build-contract.md` containing your complete Build Contract with all seven sections.
>
> **How to validate:** Open the file and verify all seven sections are present and populated. The file should be 150+ lines of structured markdown.
>
> **Next:** Chapter 22 — Set up your development environment for Claude Code implementation.

## 21.3 Chapter Summary

You've completed the Build Contract phase. Here's what you accomplished:

- Generated a Build Contract from your design artifacts
- Synthesized vocabulary, user model, screens, components, data model, API surface, and quality standards
- Saved the bridge document for Claude Code to reference

The Build Contract is complete. You now have the bridge between design and implementation. In the next chapter, you'll set up your development environment and transition to Claude Code for the Build Phase.
