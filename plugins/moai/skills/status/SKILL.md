---
name: status
description: Show the whole MOAI project on one screen — phase, milestone, artifacts, SPECs, debt score and the single recommended next action. Read-only.
argument-hint: ""
allowed-tools: [Read, Glob, Grep, Bash]
---

# /moai:status

Render the project's current state. **Writes nothing.**

## Steps

1. Read `docs/moai/state.md`. If absent, say the project is not initialised and stop —
   suggest `/moai:init`.
2. Run `bash scripts/spec-check.sh --json` if it exists (this is the Doc-Sync score).
3. Read `git log --oneline -5`, `git tag -l 'checkpoint-*'`, `ls docs/specs`.
4. **Reconcile.** Compare state against disk and report drift — SPEC files not in
   state, a `checkpoint-b` tag with no `lastCheckpoint`, a `testFile` that no longer
   exists. Offer to fix; do not silently mutate.

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
