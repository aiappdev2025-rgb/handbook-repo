---
id: "CA-11"
title: "Generate Checkpoint A Report"
tool: "claude-code"
chapter: 31
variant: "canonical"
source: "archive/html-v3/handbook"
---

```text
Generate Checkpoint A Report:

1. Create CHECKPOINT-A-REPORT.md with:

# Checkpoint A: Foundation Audit Report

**Project:** [detect from package.json name]
**Date:** [today's date]
**Architecture:** [detected architecture profile]

## Architecture

| Component  | Detected     |
|------------|--------------|
| Database   | ...          |
| Auth       | ...          |
| API        | ...          |
| Deployment | ...          |
| Framework  | ...          |

## Results Summary

| Status | Count |
|--------|-------|
| ✅ Passed  | X |
| ⚠️ Adapted | X |
| ⏭️ Skipped | X |
| ❌ Failed  | X |

## Detailed Results

### ✅ Passed
[list all passed checks]

### ⚠️ Adapted
[list checks that were adapted, with what they were adapted to]

### ⏭️ Skipped
[list skipped checks with reason]

### ❌ Failed
[list failed checks with fix instructions]

## Manual Checks Required
[list any checks that need manual verification with instructions]

## Next Steps
[pull from BUILD-CONTRACT.md if found]

## Git Tag

[if all critical pass:]
git add .
git commit -m "Complete Checkpoint A: Foundation verified"
git tag -a checkpoint-a -m "Checkpoint A: Foundation audit complete"
git push origin checkpoint-a

[if failures:]
⚠️ Fix failed checks before tagging

2. Save to project root as CHECKPOINT-A-REPORT.md
3. Show me a summary
```
