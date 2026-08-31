---
name: spec
description: Author or revise one SPEC using EARS requirements and GIVEN/WHEN/THEN test cases, then self-verify it against the SPEC Ready checklist before marking it ready.
argument-hint: "<feature description | SPEC-ID>"
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash]
---

# /moai:spec

Write one SPEC. A SPEC is the unit of work: one feature, testable, traceable to the
Build Contract.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/assets/templates/spec-template.md`,
   `${CLAUDE_PLUGIN_ROOT}/skills/method/references/quality-gates.md`, and
   `docs/build-contract.md` (SPECs must cite its section numbers — that is the
   traceability link; if it is missing, say so and stop).
2. Read `docs/moai/state.md` for the current milestone and the next free number in the
   prefix series. Prefixes: AUTH, DASH, PHOTO, GEN, BILL, ADMIN, CORE.
3. Ask clarifying questions **before** writing — a wrong SPEC costs a whole TDD cycle.
4. Write `docs/specs/SPEC-<PREFIX>-<NNN>.md`. The filename stem must equal the ID
   exactly, with no descriptive suffix: `spec-check.sh` links SPEC to test by that stem.
5. Requirements in EARS (`REQ-<PREFIX>-<NNN>`), each tagged with its pattern type.
   Include at least one **Unwanted** requirement — the security-relevant one is the
   requirement people forget.
6. Test cases (`TC-<PREFIX>-<NNN>`) in GIVEN / WHEN / THEN. At least one per requirement.
7. **Self-verify** against the SPEC Ready checklist. Report which items pass. Only if
   all pass set `Status: Ready`; otherwise leave `Status: Draft` and list what is missing.
8. Update `docs/moai/state.md`: `specs.<id> = {status, milestone, testCases}` and set
   `activeSpec`.

## Success condition

The SPEC file exists, every checklist item passes, and state records it. A SPEC that
does not pass the checklist stays `Draft` — do not mark it Ready to move on.
