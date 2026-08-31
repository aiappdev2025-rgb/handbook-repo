---
name: status
description: Show the whole MOAI project on one screen — phase, milestone, artifacts, SPECs, debt score and the single recommended next action. Read-only.
argument-hint: ""
allowed-tools: [Read, Glob, Grep, Bash(git:*), Bash(bash scripts/spec-check.sh:*)]
---

# /moai:status

Render the project's current state. **Writes nothing.**

## Steps

1. Read `docs/moai/state.md`. If absent, say the project is not initialised and stop —
   suggest `/moai:init`.
2. Run `bash scripts/spec-check.sh --json` if it exists (this is the Doc-Sync score).
3. Read `git log --oneline -5`, `git tag -l 'checkpoint-*'`, `ls docs/specs`.
4. **Reconcile.** Compare state against disk and report drift, then name the command
   that owns the fix — this skill writes nothing itself:

   | drift | say to run |
   | --- | --- |
   | a `checkpoint-*` git tag with no matching `lastCheckpoint` | `/moai:checkpoint <a\|b\|c>` |
   | a SPEC file in `docs/specs/` not registered in state | `/moai:spec <ID>` |
   | `specs.<id>.testFile` pointing at a file that no longer exists | `/moai:tdd <ID> red` |
   | `artifacts.<id>.status: complete` with no file at its path | `/moai:artifact <id>` |

## Output shape

```
<product> · Phase <n> <NAME> · <milestone> <name>
Milestones  [####·······]  n/11 done   ✓a ─ b(after M6) ─ c(after M10)
Artifacts   n/18 complete · missing: <ids>
SPECs       SPEC-AUTH-001  in-progress  🔴 tests linked
Debt        7.9/10  (a: 7.4 → now 7.9, improving) · n open · D-001 high
DocSync     spec-check.sh → 8/10 · 1 warn: TC-AUTH-003 not in test file
Git         checkpoint-a tagged · 3 commits since · clean tree

Next: /moai:tdd SPEC-AUTH-001 green
```

End with **exactly one** recommended next action.
