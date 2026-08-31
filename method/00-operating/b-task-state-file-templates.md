---
part: 0
part_name: "Operating"
appendix: "B"
title: "Task State File Templates"
slug: "b-task-state-file-templates"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# Appendix B: Task State File Templates

This appendix provides templates for STATE.md and session log files. Use these templates to maintain consistent project state tracking.

**`docs/STATE.md`**

```text
# Project State

**Last Updated:** [Date and time]
**Current Milestone:** [N] - [Name]
**Overall Progress:** [Summary]

## Current Session

**Active Task:** [Task name]
**Status:** [Not started / In progress / Blocked / Complete]
**Started:** [Time]
**Context Level:** [~XK tokens]

## Today's Progress

- [x] [Completed task]
- [~] [In-progress task]
- [ ] [Not started]

## Blockers

- [Description] - [What's needed to unblock]

## Next Up

1. [Current/next task]
2. [Following task]
3. --> Checkpoint: [Quality gate or milestone completion]

## Notes for Next Session

- [Important context]
- [Decisions made]
- [Files that need attention]
```

---
