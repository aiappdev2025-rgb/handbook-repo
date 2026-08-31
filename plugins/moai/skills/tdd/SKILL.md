---
name: tdd
description: Run one phase of the RED/GREEN/REFACTOR loop for a SPEC. RED writes failing tests only and never implementation; REFACTOR runs the full quality gate and marks the SPEC done.
argument-hint: "<SPEC-ID> [red|green|refactor]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# /moai:tdd

One phase per invocation. With no phase argument, read `tddPhase` from
`docs/moai/state.md` and run the next one.

## RED

Write `src/__tests__/<feature>.test.ts` (or the project's test path from `state.gates`):

- First line: `// SPEC: SPEC-XXX-NNN`
- One `it()` per `TC-*` id in the SPEC, named for that id
- **No implementation code. None.** Not a stub, not a type, not a helper.

Run the test command. Success is: tests **fail**, and they fail for the right reason
(an assertion, not an import error). If they fail on a missing module, create only the
empty file the import needs — nothing more.

Then: `tddPhase: red`, record `testFile`, commit `test(<scope>): failing tests for <ID>`.

## GREEN

Minimum implementation to pass. No extra features, no speculative abstraction.
Run tests → all pass. Then `tddPhase: green`, commit `feat(<scope>): <summary> per <ID>`.

## REFACTOR

Clean up: functions ≤ 30 lines, files ≤ 200, nesting ≤ 3, no `any`, no empty catches.

Run the **full gate**: `npm test && npm run build && npm run lint && npx tsc --noEmit`
(use the commands recorded in `state.gates`, not hardcoded ones).

Then work the Implementation Done checklist. If it all passes: set the SPEC to
`Status: Done`, tick its acceptance criteria, set `specs.<id>.status: done`,
`tddPhase: null`, `activeSpec: null`, and commit `refactor(<scope>): <ID> done`.

## Rule

Never skip RED. If tests already exist for this SPEC, verify they cover every `TC-*`
id before proceeding to GREEN.
