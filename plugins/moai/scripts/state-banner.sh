#!/usr/bin/env bash
# state-banner.sh — print a one-screen MOAI status banner at session start.
#
# CRITICAL: this plugin is installed globally, so this script runs in EVERY project.
# It must exit 0 with ZERO output when the current directory is not a MOAI project.
# A hook that prints noise in unrelated repos is a hook that gets uninstalled.
set -u

STATE="docs/moai/state.md"
[ -f "$STATE" ] || exit 0

# Extract the frontmatter ONCE, bounded to the leading block.
#
# The previous implementation used `sed -n '/^---$/,/^---$/p'`, which is a trap: a sed
# range address re-arms, so a single unmatched `---` in the body runs the range to EOF
# and body prose gets read as state. The body is explicitly designed as a human view
# that restates `phase:` and `activeSpec:` below section rules, so this fired in normal
# use. This awk form stops at the closing delimiter and never restarts.
FM=$(awk 'NR==1 && /^---[[:space:]]*$/ {f=1; next} f && /^---[[:space:]]*$/ {exit} f' "$STATE")
[ -n "$FM" ] || exit 0

# Read one flat, column-0 scalar. Nested keys are deliberately out of scope: the
# state template keeps every banner-critical value flat for exactly this reason.
fm() {
  printf '%s\n' "$FM" \
    | grep -m1 "^$1:" \
    | sed "s/^$1:[[:space:]]*//; s/[[:space:]]*$//; s/^[\"']//; s/[\"']$//"
}

# YAML null is the steady state between SPECs (/moai:tdd clears activeSpec on DONE),
# so treat the literal string as absent rather than printing "active: null".
val() { v=$(fm "$1"); [ "$v" = "null" ] || [ "$v" = "~" ] && v=""; printf '%s' "$v"; }

product=$(val productName); [ -n "$product" ] || product=$(val project)
phase=$(val phase)
milestone=$(val milestone)
spec=$(val activeSpec)
tdd=$(val tddPhase)
ckpt=$(val lastCheckpoint)
score=$(val lastCheckpointScore)

# No identifiable project means this is not a MOAI state file. Stay silent.
[ -n "$product" ] || exit 0

line="MOAI · $product"
[ -n "$phase" ] && line="$line · Phase $phase"
[ -n "$milestone" ] && line="$line · $milestone"
echo "$line"

detail="active: ${spec:-none}"
[ -n "$tdd" ] && detail="$detail · tdd: $tdd"
if [ -n "$ckpt" ]; then
  detail="$detail · last checkpoint: $ckpt"
  [ -n "$score" ] && detail="$detail ($score)"
fi
echo "$detail"
echo "run /moai:status for the full picture"
exit 0
