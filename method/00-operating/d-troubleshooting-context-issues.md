---
part: 0
part_name: "Operating"
appendix: "D"
title: "Troubleshooting Context Issues"
slug: "d-troubleshooting-context-issues"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# Appendix D: Troubleshooting Context Issues

This appendix provides solutions for common context management problems. Reference this when you encounter issues with Claude "forgetting" work or context filling too fast.

## Problem: Claude "Forgets" Previous Work

| Symptom | Cause | Solution |
| --- | --- | --- |
| Claude asks about things you already discussed | Context was auto-compacted | Check /status, clear and reload from files |
| Claude suggests changes to already-completed work | Outdated context | Clear context, ask Claude to re-read files |
| Claude doesn't know about recent code | Files not read into context | Explicitly ask Claude to read the files |

## Problem: Context Fills Up Too Fast

| Symptom | Cause | Solution |
| --- | --- | --- |
| Hitting 100K+ tokens quickly | Reading too many files | Only read files relevant to current task |
| Large jumps in token count | Verbose command output | Pipe output through head/tail |
| Slow response times | Context too large | Clear and restart with minimal context |

---
