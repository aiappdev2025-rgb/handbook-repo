---
name: init
description: Bootstrap a project into a MOAI-executable state — directories, templates, CLAUDE.md, and the state file. Interviews first, and supports --dry-run.
argument-hint: "[project-name] [--dry-run]"
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash]
---

# /moai:init

Prepare a project so the rest of the method can run in it.

## Ask first — always, before touching anything

1. Confirm the project root (print `pwd` and the detected package manager / framework).
2. GitHub remote URL, or "local only".
3. Node version (house standard: 22), the package manager, and **where tests live plus
   the test/build/lint commands**. These populate `state.gates` and `state.paths`, which
   `/moai:tdd`, `/moai:checkpoint` and `spec-check.sh` all read instead of hardcoding
   `npm` and `src/`. Detect the defaults from `package.json` and confirm, don't ask cold.
4. **Which design artifacts already exist?** The original REPO STEWARD prompt assumed
   greenfield, but a project usually arrives with a one-pager or architecture doc
   already written. Do not scaffold over them.

Then print the full manifest of what you will create and **wait for confirmation**.
With `--dry-run`, print the manifest and stop.

## Creates

Directories: `docs/`, `docs/specs/`, `docs/adr/`, `docs/sessions/`, `docs/moai/`,
`docs/security/`, `docs/ops/`, `src/__tests__/`, `scripts/`, `.github/workflows/`.

Copied from `${CLAUDE_PLUGIN_ROOT}/assets/templates/`:

| Source | Destination | Condition |
| --- | --- | --- |
| `spec-template.md` | `docs/moai/spec-template.md` | always |
| `TECH-DEBT.md` | `TECH-DEBT.md` | if absent |
| `spec-check.sh` | `scripts/spec-check.sh` + `chmod +x` | always |
| `state.md.template` | `docs/moai/state.md` | always (substitute the placeholders) |
| `quality-checklist.md` | `docs/moai/quality-checklist.md` | always |
| `build-contract-template.md` | `docs/build-contract.md` | if absent |
| `github-debt-check.yml` | `.github/workflows/debt-check.yml` | **ask**; only with a GitHub remote |
| `checkpoint-config.yaml.template` | `.checkpoint-config.yaml` | only if stack detection was uncertain |
| `eslint-debt-config.js` | **never copied** — print as merge guidance | it would clobber an existing ESLint config |

Generated: `CLAUDE.md`, `PROGRESS.md`, `docs/TASKS.md`
(M1–M11 + A/B/C), `docs/MEMORY.md`, `.github/pull_request_template.md`, `.gitignore`
additions (`.env*`, `*.pem`, `*.key`, `node_modules/`, `.next/`, `dist/`, `.DS_Store`).

## Never

- `npm install`, create the GitHub repo, or `git push`.
- Overwrite an existing `CLAUDE.md` — diff it and ask.
- Scaffold 18 empty artifact `.md` files. State tracks `status: empty`; empty files
  would make `/moai:status` report work that does not exist.

## Success condition

All four must hold:

1. `bash "${CLAUDE_PLUGIN_ROOT}/scripts/state-banner.sh"` prints a banner naming the real
   product — proves `docs/moai/state.md` exists and its flat scalars parse.
2. `docs/specs`, `docs/adr`, `docs/sessions`, `docs/moai` all exist.
3. `bash scripts/spec-check.sh --json` returns valid JSON with `"score": 10` and an empty
   `issues` array. A fresh project has no SPECs, so anything less means a scaffolding bug —
   most likely `paths.src` not matching where tests actually live.
4. `CLAUDE.md` exists and one commit is staged, not pushed.
