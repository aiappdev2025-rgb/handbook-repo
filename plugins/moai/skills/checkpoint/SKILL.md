---
name: checkpoint
description: Run a milestone checkpoint audit — detect the stack, run the quality gates, dispatch the audit subagents, score technical debt, write the report and propose the git tag. Blocks on any failure.
argument-hint: "[a|b|c] [--dry-run]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task
---

# /moai:checkpoint

The gate between milestones. **Checkpoint A after M3, B after M6, C after M10.**

## Steps

1. **Detect the stack.** Read `.checkpoint-config.yaml` if present; otherwise infer
   from `package.json`, lockfiles and directory shape. Print a table of what you
   detected with a confidence per row, and confirm before proceeding.

2. **Universal gates** — run and record each: `npm run build`, `npm run lint`,
   `npx tsc --noEmit`, `npm audit`. Use the commands from `state.gates`.

3. **Conditional checks by stack:**
   - *Supabase* — emit the RLS verification SQL and the manual dashboard checklist
   - *Prisma* — migration status, schema drift
   - *file-based / local-only* — skip with ⏭️, do not fail

4. **Dispatch subagents** (read-only, in parallel):
   - `moai-debt-analyst` — always
   - `moai-security-auditor` — at B and C
   - `moai-refactor-auditor` — at B and C

5. **Read `docs/build-contract.md`** and check the milestone's deliverables against it.

6. **Write `CHECKPOINT-<A|B|C>-REPORT.md`** with ✅ / ⚠️ / ⏭️ / ❌ per item, and append
   the audit block to `TECH-DEBT.md` with the category table and any new `D-<NNN>` items.

7. **Update state**: `lastCheckpoint`, `lastCheckpointScore`, `debt.*`, `milestones.*`.

## Gate

Pass requires debt score **≥ 6.0** *and* **zero ❌**. Only then print:

```
git tag -a checkpoint-a -m "Checkpoint A: Foundation audit — M1-M3 verified (debt 7.8)"
git push origin checkpoint-a     # run this yourself
```

Never run `git push`. On failure, print the remediation prompt for each ❌ and stop —
`prompts/A-refactor.md`, `A-security.md`, `A-debt-remediation.md` are written for this.

`--dry-run` scores without writing the report or touching state — use it for a pulse
check between checkpoints.
