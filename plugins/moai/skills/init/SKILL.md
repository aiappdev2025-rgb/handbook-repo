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
3. Node version (house standard: 22).
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
| `spec-template.md` | `docs/specs/_TEMPLATE.md` | always |
| `TECH-DEBT.md` | `TECH-DEBT.md` | if absent |
| `spec-check.sh` | `scripts/spec-check.sh` + `chmod +x` | always |
| `quality-checklist.md` | `docs/moai/quality-checklist.md` | always |
| `build-contract-template.md` | `docs/build-contract.md` | if absent |
| `github-debt-check.yml` | `.github/workflows/debt-check.yml` | **ask**; only with a GitHub remote |
| `checkpoint-config.yaml.template` | `.checkpoint-config.yaml` | only if stack detection was uncertain |
| `eslint-debt-config.js` | **never copied** — print as merge guidance | it would clobber an existing ESLint config |

Generated: `docs/moai/state.md`, `CLAUDE.md`, `PROGRESS.md`, `docs/TASKS.md`
(M1–M11 + A/B/C), `docs/MEMORY.md`, `.github/pull_request_template.md`, `.gitignore`
additions (`.env*`, `*.pem`, `*.key`, `node_modules/`, `.next/`, `dist/`, `.DS_Store`).

## Never

- `npm install`, create the GitHub repo, or `git push`.
- Overwrite an existing `CLAUDE.md` — diff it and ask.
- Scaffold 18 empty artifact `.md` files. State tracks `status: empty`; empty files
  would make `/moai:status` report work that does not exist.

## Success condition

`docs/moai/state.md` parses; `docs/specs`, `docs/adr`, `docs/sessions` exist;
`CLAUDE.md` exists; `bash scripts/spec-check.sh --json` returns valid JSON; one commit
staged and not pushed.
