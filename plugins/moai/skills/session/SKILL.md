---
name: session
description: The context-boundary ritual. `start` restores what the last session established; `end` writes the session log, memory and progress entries so the work survives /clear.
argument-hint: "<start|end>"
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash]
---

# /moai:session

Context does not survive `/clear`. The filesystem does. This is the handoff.

## start

Read, in order: `docs/moai/state.md`, the tail of `PROGRESS.md`, `docs/MEMORY.md`, the
most recent `docs/sessions/*.md`, and the active SPEC if there is one.

Then state in three lines: where the project is, what the last session finished, and
what it said to do next. Confirm the task before doing anything else. That is all —
resist the urge to start working during `start`.

## end

1. Write `docs/sessions/YYYY-MM-DD-<slug>.md`:
   `Duration / Milestone / Context clears / Completed / Decisions Made / Next Session Should`
2. Append durable learnings to `docs/MEMORY.md` — things that will still be true next
   week, not what you did today.
3. Append a dated entry to `PROGRESS.md` (the human narrative log).
4. Update `updatedAt` in state. Commit.
5. Tell the user to run `/clear`.

**Decisions Made** is the highest-value section: a decision you do not record is one
you will relitigate next session with less context than you have now.
