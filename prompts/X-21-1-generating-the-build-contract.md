---
id: "X-21-1"
title: "Generating the Build Contract"
tool: "claude-chat"
chapter: 21
variant: "canonical"
source: "archive/html-v3/handbook"
---

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
