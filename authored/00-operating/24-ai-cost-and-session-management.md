---
part: 0
part_name: "Operating"
chapter: 24
title: "AI Cost and Session Management"
slug: "24-ai-cost-and-session-management"
section: "PART VII: COST AND LIMITS"
---

# 24. AI Cost and Session Management

In this chapter, you'll learn what a MOAI build costs in money rather than tokens, which levers move that number, and how to shape sessions around usage limits instead of discovering them mid-milestone. By the end of this chapter, you'll be able to turn the session plan from Chapter 20 into a spend estimate and pick a model, an effort level and a session shape for each kind of MOAI work.

Chapters 1, 2 and 12 cover the context window, the token thresholds and when to clear. This chapter does not repeat them. It prices them.

## 24.1 Where the Money Goes

Every request re-sends the whole conversation. The bill for one turn is *everything so far* at the input price plus *what comes back* at the output price. Three things follow:

| Fact | Consequence |
|------|-------------|
| Input is cumulative | The 40th message carries the previous 39. Chapter 2's Working band (50-100K) is also the cost band to stay in. |
| Cache reads cost about a tenth of fresh input | Claude Code caches `CLAUDE.md`, skills and the conversation prefix automatically. You keep the benefit by keeping the front of the context stable. |
| Output costs five times input | Long file rewrites, verbose explanations and pasted test output dominate. Ask for diffs and summaries, not whole files and full logs. |

Anthropic API list prices per million tokens, as checked in June 2026. Confirm before budgeting; they change.

| Model | Input | Output | Cache read (≈) |
|-------|-------|--------|----------------|
| Claude Opus 5 | $5.00 | $25.00 | $0.50 |
| Claude Sonnet 5 | $2.00 | $10.00 | $0.20 |
| Claude Haiku 4.5 | $1.00 | $5.00 | $0.10 |

**A worked session.** Forty turns that stay inside the Working band, averaging 60K of context and 1.5K of output per turn, is 2.4M input tokens and 60K output tokens. With the cache serving 80% of the input, on Opus 5 that is roughly **$5**; uncached it is about $13.50. Applied to Chapter 20's 22-32 sessions, a full Build Phase lands near **$105-160 on Opus 5** or **$40-65 on Sonnet 5**, caching assumed. Design phases are cheaper: fewer, shorter sessions with small outputs.

On a Claude subscription the arithmetic is the same but the unit changes: you are not billed per token, you are spending a usage allowance, and the same session shapes make it last longer.

## 24.2 Model and Effort per Kind of Work

Two dials, in this order: **effort first, model second.** Lower effort on the newest model usually beats high effort on an older one, and staying on one model keeps one cache. Switch models with `/model`; effort is set alongside it.

| MOAI work | Model | Effort | Why |
|-----------|-------|--------|-----|
| SPEC authoring, Build Contract, ADRs, architecture | Opus 5 | high-xhigh | Judgement-heavy, cheap in tokens, expensive when wrong |
| RED: tests from a SPEC | Opus 5 | high | The tests are the contract; a weak test set costs a whole cycle |
| GREEN: minimal implementation | Opus 5 or Sonnet 5 | high | Mechanical when the SPEC and tests are good |
| REFACTOR, lint, doc sync | Sonnet 5 | medium | Bounded work, verified by the quality gate |
| Checkpoint audit sub-agents | Sonnet 5 or Haiku 4.5 | low-medium | Read-only, parallel, tightly scoped |
| Session start/end ritual, `/moai:status` | Haiku 4.5 or Sonnet 5 | low | Bookkeeping |

> **⚠ Warning:** Judge cost per finished SPEC, not per request. A cheaper model that needs a second RED/GREEN cycle is the expensive one. Never downgrade the model for the steps that make decisions.

## 24.3 Session Shape: Caching and Batching

The cache is a prefix match. Anything that changes near the front of the context invalidates everything after it, and entries expire after minutes of inactivity.

- **Stable front.** `CLAUDE.md`, skills and `docs/moai/state.md` load first and stay unchanged during a session. Edit `CLAUDE.md` at session end, not mid-task.
- **Work in runs.** A coffee break can cost a full re-read. Do the small, related tasks back to back; take the break at a `/clear` boundary (Chapter 12), where a re-read is happening anyway.
- **Keep RED and GREEN together.** The test file is the shared context between them. Clear after REFACTOR, not between phases.
- **Sub-agents for reading, not writing.** A sub-agent (Chapter 16) has its own context: it can read forty files without polluting the main window. It is also billed from zero, so hand it audits and searches, not edits the main conversation needs to see.
- **One verifiable outcome (Chapter 9) is also the cost rule.** The cheapest token is the one not spent re-explaining a task that was too big.

## 24.4 Limits, Plan Mode and Autonomous Loops

There are two kinds of ceiling. **API rate limits** are per-minute request and token caps; a 429 means back off and retry. **Subscription usage windows** are a rolling allowance plus a weekly cap; when it is exhausted the session pauses until the window resets. Plan the heavy milestones from Chapter 20 (M6, M7, M9) so that a reset does not fall in the middle of GREEN.

**Instruments.** `/cost` reports spend for the current session; `/status` reports context size and plan. Read both at session end and add a `Cost:` line to the session log from Chapter 19. After three sessions you have your own numbers and can stop using the table above.

**Plan mode.** A read-only pass before any edit. Use it to open a milestone: a wrong plan costs a session, a wrong build costs a milestone.

**Autonomous loops.** Checkpoint audits and "run until green" loops re-read the context on every iteration, so an unbounded loop is an unbounded bill. Give every loop a stop condition in iterations or tokens, and make the gate the terminator: the loop ends when `npm test` is green, not when the model says it is.

> **Expected Outcome**
>
> **What you should understand:** Why input is cumulative and output is the expensive direction, which model and effort fit each kind of MOAI work, and how session shape decides how much of the context the cache pays for.
>
> **How to validate:** You can estimate your Build Phase spend from Chapter 20's session table, and your session logs carry a `Cost:` line from now on.
>
> **Next:** Appendices — the starter `CLAUDE.md`, task-state templates, the session checklist and the command reference.

## Chapter 24 Summary

- Cost is cumulative input plus output; output tokens cost five times input on every current model
- Cache reads cost about a tenth of fresh input; a stable context front is what earns them
- Tune effort before switching model; judge cost per finished SPEC, not per request
- Keep RED and GREEN in one session, use sub-agents for reading, take breaks at `/clear` boundaries
- Every autonomous loop needs a stop condition and a gate that terminates it

---
