#!/bin/bash
# SPEC Verification Script
# Automates documentation sync checks for the Technical Debt Scoring Framework
#
# Usage: ./spec-check.sh [--json]
#   --json  Output results in JSON format (for CI integration)
#
# Checks performed:
# 1. All SPECs have Status: Done
# 2. Each SPEC has corresponding test file with // SPEC: comment
# 3. Test case IDs from SPEC appear in test files
# 4. No orphaned TODOs older than 7 days

set -e

SPECS_DIR="docs/specs"
SRC_DIR="src"
JSON_OUTPUT=false
SCORE=10
ISSUES=()

# Parse arguments
if [[ "$1" == "--json" ]]; then
  JSON_OUTPUT=true
fi

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_issue() {
  local severity=$1
  local message=$2
  ISSUES+=("{\"severity\": \"$severity\", \"message\": \"$message\"}")
  if [[ "$JSON_OUTPUT" == false ]]; then
    if [[ "$severity" == "error" ]]; then
      echo -e "${RED}[ERROR]${NC} $message"
    else
      echo -e "${YELLOW}[WARN]${NC} $message"
    fi
  fi
}

log_success() {
  if [[ "$JSON_OUTPUT" == false ]]; then
    echo -e "${GREEN}[OK]${NC} $1"
  fi
}

# =============================================================================
# Check 1: All SPECs have Status: Done
# =============================================================================
check_spec_status() {
  if [[ "$JSON_OUTPUT" == false ]]; then
    echo ""
    echo "=== Checking SPEC Status ==="
  fi

  if [[ ! -d "$SPECS_DIR" ]]; then
    log_issue "warn" "No specs directory found at $SPECS_DIR"
    return
  fi

  local incomplete_count=0
  for spec_file in "$SPECS_DIR"/*.md; do
    [[ -f "$spec_file" ]] || continue

    # Check for a Done status, in either form the handbook uses:
    #   "Status: Done"              (prose form)
    #   "| **Status** | Done |"     (the metadata table spec-template.md emits)
    # The original pattern required a colon, so a SPEC written from the official
    # template could never pass this check.
    if ! grep -qiE '\*{0,2}Status\*{0,2}[[:space:]]*[:|][[:space:]]*\*{0,2}Done' "$spec_file"; then
      spec_name=$(basename "$spec_file")
      log_issue "error" "SPEC not marked Done: $spec_name"
      incomplete_count=$((incomplete_count+1))
    fi
  done

  if [[ $incomplete_count -eq 0 ]]; then
    log_success "All SPECs marked as Done"
  else
    # Deduct 1 point per incomplete SPEC (max 3 points)
    local deduction=$((incomplete_count > 3 ? 3 : incomplete_count))
    SCORE=$((SCORE - deduction))
  fi
}

# =============================================================================
# Check 2: Each SPEC has corresponding test file with // SPEC: comment
# =============================================================================
check_spec_test_links() {
  if [[ "$JSON_OUTPUT" == false ]]; then
    echo ""
    echo "=== Checking SPEC-to-Test Links ==="
  fi

  if [[ ! -d "$SPECS_DIR" ]]; then
    return
  fi

  local missing_count=0
  for spec_file in "$SPECS_DIR"/*.md; do
    [[ -f "$spec_file" ]] || continue

    spec_name=$(basename "$spec_file" .md)

    # Search for test files containing // SPEC: SPEC-NAME
    if ! grep -rq "// SPEC: $spec_name" "$SRC_DIR" --include="*.test.ts" --include="*.test.tsx" --include="*.spec.ts" --include="*.spec.tsx" 2>/dev/null; then
      log_issue "error" "No test file found for: $spec_name (missing // SPEC: $spec_name comment)"
      missing_count=$((missing_count+1))
    fi
  done

  if [[ $missing_count -eq 0 ]]; then
    log_success "All SPECs have linked test files"
  else
    # Deduct 1 point per missing link (max 3 points)
    local deduction=$((missing_count > 3 ? 3 : missing_count))
    SCORE=$((SCORE - deduction))
  fi
}

# =============================================================================
# Check 3: Test case IDs from SPEC appear in test files
# =============================================================================
check_test_case_coverage() {
  if [[ "$JSON_OUTPUT" == false ]]; then
    echo ""
    echo "=== Checking Test Case ID Coverage ==="
  fi

  if [[ ! -d "$SPECS_DIR" ]]; then
    return
  fi

  local missing_tc_count=0
  for spec_file in "$SPECS_DIR"/*.md; do
    [[ -f "$spec_file" ]] || continue

    spec_name=$(basename "$spec_file" .md)

    # Extract test case IDs (TC-001, TC-002, etc.) from SPEC
    test_cases=$(grep -oE "TC-[A-Z]+-[0-9]{3}" "$spec_file" 2>/dev/null | sort -u)

    if [[ -z "$test_cases" ]]; then
      continue  # No test cases defined in this SPEC
    fi

    # Find the linked test file
    test_file=$(grep -rl "// SPEC: $spec_name" "$SRC_DIR" --include="*.test.ts" --include="*.test.tsx" --include="*.spec.ts" --include="*.spec.tsx" 2>/dev/null | head -1)

    if [[ -z "$test_file" ]]; then
      continue  # Already reported in check 2
    fi

    # Check each test case ID appears in the test file
    for tc_id in $test_cases; do
      if ! grep -q "$tc_id" "$test_file"; then
        log_issue "warn" "Test case $tc_id from $spec_name not found in test file"
        missing_tc_count=$((missing_tc_count+1))
      fi
    done
  done

  if [[ $missing_tc_count -eq 0 ]]; then
    log_success "All test case IDs covered in test files"
  else
    # Deduct 0.5 points per missing test case (max 2 points)
    local deduction=$((missing_tc_count > 4 ? 2 : missing_tc_count / 2))
    SCORE=$((SCORE - deduction))
  fi
}

# =============================================================================
# Check 4: No orphaned TODOs older than 7 days
# =============================================================================
check_orphaned_todos() {
  if [[ "$JSON_OUTPUT" == false ]]; then
    echo ""
    echo "=== Checking Orphaned TODOs ==="
  fi

  if [[ ! -d "$SRC_DIR" ]]; then
    return
  fi

  local old_todo_count=0
  local seven_days_ago=$(date -v-7d +%s 2>/dev/null || date -d "7 days ago" +%s 2>/dev/null)

  # Find all TODO comments
  while IFS= read -r line; do
    file=$(echo "$line" | cut -d: -f1)
    line_num=$(echo "$line" | cut -d: -f2)

    # Get git blame timestamp for this line
    blame_output=$(git blame -p -L "$line_num,$line_num" "$file" 2>/dev/null | grep "^author-time" | cut -d' ' -f2)

    if [[ -n "$blame_output" ]] && [[ "$blame_output" -lt "$seven_days_ago" ]]; then
      log_issue "warn" "TODO older than 7 days: $file:$line_num"
      old_todo_count=$((old_todo_count+1))
    fi
  done < <(grep -rn "TODO" "$SRC_DIR" --include="*.ts" --include="*.tsx" 2>/dev/null || true)

  if [[ $old_todo_count -eq 0 ]]; then
    log_success "No orphaned TODOs older than 7 days"
  else
    # Deduct 0.5 points per old TODO (max 2 points)
    local deduction=$((old_todo_count > 4 ? 2 : old_todo_count / 2))
    SCORE=$((SCORE - deduction))
  fi
}

# =============================================================================
# Check 5: CLAUDE.md exists and was modified recently
# =============================================================================
check_claude_md() {
  if [[ "$JSON_OUTPUT" == false ]]; then
    echo ""
    echo "=== Checking CLAUDE.md ==="
  fi

  if [[ ! -f "CLAUDE.md" ]]; then
    log_issue "error" "CLAUDE.md not found at project root"
    SCORE=$((SCORE - 2))
    return
  fi

  log_success "CLAUDE.md exists"

  # Check if CLAUDE.md was modified in last 30 days (optional warning)
  local thirty_days_ago=$(date -v-30d +%s 2>/dev/null || date -d "30 days ago" +%s 2>/dev/null)
  local claude_mtime=$(git log -1 --format=%ct -- CLAUDE.md 2>/dev/null || stat -f %m CLAUDE.md 2>/dev/null || stat -c %Y CLAUDE.md 2>/dev/null)

  if [[ -n "$claude_mtime" ]] && [[ "$claude_mtime" -lt "$thirty_days_ago" ]]; then
    log_issue "warn" "CLAUDE.md not updated in 30+ days - may be stale"
  fi
}

# =============================================================================
# Main
# =============================================================================
main() {
  if [[ "$JSON_OUTPUT" == false ]]; then
    echo "============================================"
    echo "SPEC Verification - Documentation Sync Check"
    echo "============================================"
  fi

  check_spec_status
  check_spec_test_links
  check_test_case_coverage
  check_orphaned_todos
  check_claude_md

  # Ensure score doesn't go below 0
  SCORE=$((SCORE < 0 ? 0 : SCORE))

  if [[ "$JSON_OUTPUT" == true ]]; then
    # Output JSON for CI
    issues_json=$(IFS=,; echo "[${ISSUES[*]}]")
    echo "{\"score\": $SCORE, \"issues\": $issues_json}"
  else
    echo ""
    echo "============================================"
    echo "Documentation Sync Score: $SCORE / 10"
    echo "============================================"

    if [[ $SCORE -ge 8 ]]; then
      echo -e "${GREEN}Status: Excellent${NC}"
    elif [[ $SCORE -ge 6 ]]; then
      echo -e "${YELLOW}Status: Acceptable${NC}"
    else
      echo -e "${RED}Status: Needs Attention${NC}"
    fi
  fi

  # Exit with error if score is below threshold
  if [[ $SCORE -lt 6 ]]; then
    exit 1
  fi
}

main
