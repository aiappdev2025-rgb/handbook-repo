#!/usr/bin/env bash
# state-banner.sh — print a one-screen MOAI status banner at session start.
#
# CRITICAL: this plugin is installed globally, so this script runs in EVERY project.
# It must exit 0 with ZERO output when the current directory is not a MOAI project.
# A hook that prints noise in unrelated repos is a hook that gets uninstalled.
set -u

STATE="docs/moai/state.md"
[ -f "$STATE" ] || exit 0

fm() { sed -n '/^---$/,/^---$/p' "$STATE" | grep -m1 "^$1:" | sed "s/^$1:[[:space:]]*//; s/^\"//; s/\"$//"; }

product=$(fm productName); [ -n "$product" ] || product=$(fm project)
phase=$(fm phase)
milestone=$(fm milestone)
spec=$(fm activeSpec)
tdd=$(fm tddPhase)
ckpt=$(fm lastCheckpoint)
score=$(fm lastCheckpointScore)

line="MOAI · ${product:-project}"
[ -n "$phase" ] && [ "$phase" != "null" ] && line="$line · Phase $phase"
[ -n "$milestone" ] && [ "$milestone" != "null" ] && line="$line · $milestone"
echo "$line"

detail="active: ${spec:-none}"
[ -n "$tdd" ] && [ "$tdd" != "null" ] && detail="$detail · tdd: $tdd"
if [ -n "$ckpt" ] && [ "$ckpt" != "null" ]; then
  detail="$detail · last checkpoint: $ckpt"
  [ -n "$score" ] && [ "$score" != "null" ] && detail="$detail ($score)"
fi
echo "$detail"
echo "run /moai:status for the full picture"
exit 0
