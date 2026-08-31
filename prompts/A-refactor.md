---
id: "A-refactor"
title: "Refactoring Audit"
tool: "claude-code"
milestone: null
variant: "canonical"
source: "archive/html-v3/archive/build-guide-v3.html"
---

```text

  
  ROLE
Senior Developer conducting a code quality audit.

CONTEXT
Project: {{productName}}
Just completed: {{milestone name}}
Conducting quality review before proceeding.

OBJECTIVE
Identify and fix code quality issues.

AUDIT AREAS

1. LONG FUNCTIONS (exceeding 30 lines)
Search for functions over 30 lines
For each: identify, explain issue, provide refactored version

2. LONG FILES (exceeding 200 lines)
Search for files over 200 lines
For each: identify, suggest how to split

3. DEEP NESTING (more than 3 levels)
Search for deeply nested code
For each: identify, show flattened version using early returns

4. DUPLICATE CODE
Find repeated patterns (3+ occurrences)
For each: identify locations, create shared utility

5. MISSING ERROR HANDLING
Find async operations without try/catch
For each: identify, add proper error handling

6. TYPE SAFETY ISSUES
Find uses of "any" type
Find non-null assertions (!) without justification
For each: provide proper typing

7. NAMING ISSUES
Find vague names (data, info, item, temp)
Find inconsistent naming patterns
For each: suggest better name

OUTPUT FORMAT
For each issue found:
- File and line number
- Category (from above)
- Current code snippet
- Problem explanation
- Fixed code

Summary at end:
- Total issues by category
- Most problematic files
- Recommended priority order for fixes
```
