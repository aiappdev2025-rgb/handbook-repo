#!/usr/bin/env bash
#
# verify-migration.sh — read-only end-to-end check of the iCloud -> ~/Projects migration.
#
# Nine gates. Prints GREEN/RED per gate and exits nonzero if any is RED.
# READ-ONLY: this script never writes, moves or deletes anything, and never touches
# the iCloud source folder except to stat it.
#
# Usage: bash tools/verify-migration.sh   (or: npm run migrate)
set -u

G=$'\033[32m'; R=$'\033[31m'; Y=$'\033[33m'; B=$'\033[1m'; X=$'\033[0m'
pass=0; fail=0
ok()   { printf '%s  PASS%s  %s\n' "$G" "$X" "$1"; pass=$((pass+1)); }
bad()  { printf '%s  FAIL%s  %s\n' "$R" "$X" "$1"; fail=$((fail+1)); }
warn() { printf '%s  WARN%s  %s\n' "$Y" "$X" "$1"; }
gate() { printf '\n%sGATE %s%s\n' "$B" "$1" "$X"; }

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT" || exit 1
ICLOUD="/Users/gcerrada/Desktop/000 Saas Projects/AI Handbook"
EXPECT_HEAD="189630170760e7c372940f4995f818538a4f390b"

gate "1  clone fidelity"
head=$(git --no-optional-locks rev-parse "$EXPECT_HEAD^{commit}" 2>/dev/null)
if [ "$head" = "$EXPECT_HEAD" ]; then ok "upstream commit $EXPECT_HEAD present in history"
else bad "upstream commit $EXPECT_HEAD not found"; fi
n=$(git --no-optional-locks ls-tree -r --name-only "$EXPECT_HEAD" 2>/dev/null | wc -l | tr -d ' ')
[ "$n" = "224" ] && ok "upstream tree has all 224 tracked files" || bad "upstream tree has $n files, expected 224"
git --no-optional-locks fsck --full >/dev/null 2>&1 && ok "git fsck clean" || bad "git fsck reported errors"
loose=$(git count-objects -v | awk '/^count:/{print $2}')
[ "$loose" -lt 500 ] 2>/dev/null && ok "objects packed (loose: $loose)" || warn "loose objects: $loose — consider git gc"

gate "2  iCloud source untouched"
if [ -d "$ICLOUD" ]; then
  # Nothing under the iCloud root may be newer than the newest file we created here.
  newest_local=$(find method prompts tools plugins -type f -newermt '2026-08-31 00:00:00' 2>/dev/null | head -1)
  modified=$(find "$ICLOUD" -type f -newermt "2026-08-31 13:14:33" 2>/dev/null | wc -l | tr -d ' ')
  [ "$modified" = "0" ] \
    && ok "no file under the iCloud folder modified since migration start" \
    || { bad "$modified file(s) modified under the iCloud folder"; find "$ICLOUD" -type f -newermt "2026-08-31 13:14:33" 2>/dev/null | head -5; }
else
  warn "iCloud folder not present on this machine — nothing to check"
fi

gate "3  hand-carried orphans"
check_size() { [ -f "$1" ] && [ "$(stat -f %z "$1")" = "$2" ] && ok "$(basename "$1") ($2 B)" || bad "missing or wrong size: $1 (expected $2 B)"; }
check_size "archive/orphans/PromptBuilder-standalone.jsx" 49686
check_size "archive/orphans/meta-prompts/documentation-structure-prompt.md" 3197
check_size "archive/orphans/meta-prompts/section-numbering-audit-prompt.md" 4104
check_size "archive/orphans/provenance/handbook-v2.2-source.docx" 43439

gate "4  conversion lossless"
if node tools/verify-conversion.mjs >/tmp/moai-verify.$$ 2>&1; then
  ok "all 7 conversion checks green"
else
  bad "conversion checks failed:"; grep -E 'FAIL' /tmp/moai-verify.$$ | sed 's/^/      /'
fi
rm -f /tmp/moai-verify.$$

gate "5  frontmatter complete"
missing=0
while IFS= read -r f; do
  grep -q '^title:' "$f" || { missing=$((missing+1)); warn "no title: $f"; }
done < <(find method -name '*.md' ! -name 'README.md')
[ "$missing" = "0" ] && ok "every method file has a title" || bad "$missing file(s) missing frontmatter"

gate "6  prompt library integrity"
np=$(find prompts -name '*.md' ! -name 'INDEX.md' | wc -l | tr -d ' ')
[ "$np" -ge 100 ] && ok "$np prompt files" || bad "only $np prompt files, expected >= 100"
# An ID is intentionally shared by a canonical prompt and its .alt-v3 variant; the
# FILE is what must be unique.
dupes=$(awk -F'|' 'NR>2 && NF>6 {gsub(/[ `\[\]()]/,"",$8); if ($8 ~ /\.md/) print $8}' prompts/INDEX.md | sort | uniq -d | grep -c . )
[ "$dupes" = "0" ] && ok "no duplicate prompt files in INDEX.md" || bad "$dupes duplicate file(s) in INDEX.md"
nv=$(find prompts -name '*.alt-v3.md' | wc -l | tr -d ' ')
ok "$nv archive variants preserved (the reconciliation review queue)"

gate "7  defects closed"
g() { c=$(grep -rl "$1" $2 2>/dev/null | wc -l | tr -d ' '); [ "$c" = "0" ] && ok "$3" || { bad "$3 — $c file(s) still match"; grep -rl "$1" $2 2>/dev/null | head -3 | sed 's/^/      /'; }; }
g 'build-guide-v3\.html'      'method --include=*.md' "D1  no dead build-guide CTA"
g 'Documentation Sync.*15%'   'plugins method --include=*.md' "D4  Doc-Sync weight is 10% everywhere"
g 'navigation-data\.json'     'method --include=*.md' "D5  navigation-data.json gone"
g 'Downloads/handbook'        '. --include=*.md --exclude-dir=archive' "D6  browser download loop gone"
[ ! -f WORKFLOW.md ] && ok "D6  WORKFLOW.md deleted" || bad "D6  WORKFLOW.md still present"
{ [ ! -f docs/TASKS.md ] && [ ! -f docs/ROADMAP.md ] && [ -f PROGRESS.md ]; } \
  && ok "D7  stale trackers replaced by PROGRESS.md" || bad "D7  TASKS/ROADMAP still at docs/ or PROGRESS.md missing"
c=$(find . -name 'DOCUSAURUS-SETUP-SPEC.md' -not -path './archive/*' | wc -l | tr -d ' ')
[ "$c" = "0" ] && ok "D8  duplicated setup spec archived" || bad "D8  $c copies outside archive/"
node -e '
const p=JSON.parse(require("fs").readFileSync(".claude/settings.local.json")).permissions.allow;
const badp=p.filter(x=>/^Bash\((fi|done|then |do |while )/.test(x));
if(badp.length){console.error(badp.join(", "));process.exit(1)}' 2>/dev/null \
  && ok "D9  permissions file clean (no shell fragments)" || bad "D9  malformed permission entries"
grep -q 'Known Divergences' prompts/INDEX.md && ok "D10 prompt-ID divergences documented" || bad "D10 divergence table missing"
mode=$(git --no-optional-locks ls-files -s plugins/moai/assets/templates/spec-check.sh 2>/dev/null | awk '{print $1}')
{ [ "$mode" = "100755" ] && [ -x plugins/moai/assets/templates/spec-check.sh ]; } \
  && ok "D11 spec-check.sh executable and committed 100755" || bad "D11 spec-check.sh mode is ${mode:-untracked}"
# Body only: source_html in the frontmatter is deliberate provenance.
d12=0
for f in $(grep -rl 'workflow-guide-v1\.html' method --include='*.md' 2>/dev/null); do
  awk 'BEGIN{n=0} /^---$/{n++;next} n>=2 && /workflow-guide-v1\.html/{found=1} END{exit !found}' "$f" && d12=$((d12+1))
done
[ "$d12" = "0" ] && ok "D12 workflow-guide links retargeted to Part 0" || bad "D12 $d12 file(s) still link to the retired guide"
grep -q 'count+1' plugins/moai/assets/templates/spec-check.sh \
  && ok "D13 spec-check.sh survives its first finding" || bad "D13 post-increment under set -e not fixed"
grep -q 'TC-\[A-Z\]' plugins/moai/assets/templates/spec-check.sh \
  && ok "D14 test-case regex matches TC-AUTH-001 form" || bad "D14 test-case regex still numeric-only"
grep -q "node-version: '22'" plugins/moai/assets/templates/github-debt-check.yml \
  && ok "D15 CI pinned to Node 22" || bad "D15 CI still on Node 20"
grep -q 'the metadata table spec-template.md emits' plugins/moai/assets/templates/spec-check.sh \
  && ok "D16 status check accepts the template's table form" || bad "D16 status check still requires a colon"

gate "8  milestone map consistent"
grep -q 'Checkpoint A: Foundation Audit (After M3)' plugins/moai/assets/templates/quality-checklist.md \
  && ok "quality-checklist places Checkpoint A after M3" || bad "quality-checklist still says After M5"
grep -q 'M3 Database' plugins/moai/skills/method/SKILL.md \
  && ok "skill carries the canonical M1-M11 sequence" || bad "skill milestone sequence missing"
# Body only: source_html legitimately names the chapter-31-checkpoint-1-REWRITTEN file.
ck=0
for f in $(grep -rlE '[Cc]heckpoint[ -]1([^0-9]|$)' method --include='*.md' 2>/dev/null); do
  awk 'BEGIN{n=0} /^---$/{n++;next} n>=2 && /[Cc]heckpoint[ -]1([^0-9]|$)/{found=1} END{exit !found}' "$f" && ck=$((ck+1))
done
[ "$ck" = "0" ] && ok "checkpoints named a/b/c throughout" || bad "checkpoint-1 survives in $ck file(s)"

gate "9  environment"
[ "$(cat .nvmrc 2>/dev/null)" = "22" ] && ok ".nvmrc pinned to 22" || bad ".nvmrc missing or wrong"
node --version | grep -q '^v22\.' && ok "node $(node --version)" || warn "node $(node --version), expected v22.x"
[ -d node_modules/cheerio ] && ok "cheerio installed" || bad "cheerio not installed — run npm ci"
bash -n tools/verify-migration.sh && ok "this script parses clean"
for f in .claude-plugin/marketplace.json plugins/moai/.claude-plugin/plugin.json plugins/moai/hooks/hooks.json; do
  node -e "JSON.parse(require('fs').readFileSync('$f'))" 2>/dev/null && ok "$f is valid JSON" || bad "$f is invalid JSON"
done
ns=$(find plugins/moai/skills -name SKILL.md | wc -l | tr -d ' ')
[ "$ns" = "8" ] && ok "8 plugin skills present" || bad "$ns plugin skills, expected 8"
na=$(find plugins/moai/agents -name '*.md' | wc -l | tr -d ' ')
[ "$na" = "3" ] && ok "3 audit subagents present" || bad "$na subagents, expected 3"
[ -z "$(cd /tmp && bash "$ROOT/plugins/moai/scripts/state-banner.sh")" ] \
  && ok "SessionStart hook is silent outside a MOAI project" || bad "hook prints noise in non-MOAI repos"

gate "10 plugin surface integrity"
# Every ${CLAUDE_PLUGIN_ROOT} path must resolve. This is the defect class that structural
# checks miss: a skill instructing Claude to read a file that is not there.
brk=0
while IFS= read -r rel; do
  [ -e "plugins/moai/$rel" ] || { bad "unresolved plugin path: $rel"; brk=$((brk+1)); }
done < <(grep -rhoE '\$\{CLAUDE_PLUGIN_ROOT\}/[A-Za-z0-9_./-]+' plugins/moai | sed 's|\${CLAUDE_PLUGIN_ROOT}/||' | sort -u)
[ "$brk" = "0" ] && ok "every \${CLAUDE_PLUGIN_ROOT} path resolves"

# The plugin reads its own copy of the mined data; a stale copy is invisible at runtime.
same=1
for f in artifacts.json execution.json placeholders.json; do
  cmp -s "method/_data/$f" "plugins/moai/skills/method/references/$f" || { bad "plugin copy of $f is stale — run npm run convert"; same=0; }
done
[ "$same" = "1" ] && ok "plugin references match method/_data"

node -e '
const fs=require("fs");
const a=JSON.parse(fs.readFileSync("plugins/moai/skills/method/references/artifacts.json"));
const e=JSON.parse(fs.readFileSync("plugins/moai/skills/method/references/execution.json"));
const errs=[];
for(const [id,d] of Object.entries(a)){
  if(!d.chapterPath||!fs.existsSync(d.chapterPath)) errs.push(id+": chapterPath missing");
  if(!Array.isArray(d.requires)) errs.push(id+": no requires array");
  for(const r of (d.requires||[])) if(!a[r]) errs.push(id+": requires unknown artifact "+r);
}
for(const k of Object.keys(e.artifactExecutionOverrides||{})) if(!a[k]) errs.push("orphan override: "+k);
const bc=e.artifactExecutionOverrides?.["build-contract"]?.contextFiles||[];
if(bc.some(x=>!x.endsWith(".md"))) errs.push("build-contract contextFiles is not a filename list");
if(errs.length){console.error(errs.join("\n"));process.exit(1)}' 2>/dev/null \
  && ok "artifact registry: chapterPaths resolve, requires graph closed, no orphans" \
  || { bad "artifact registry invalid:"; node -e '
const fs=require("fs");
const a=JSON.parse(fs.readFileSync("plugins/moai/skills/method/references/artifacts.json"));
for(const [id,d] of Object.entries(a)){ if(!d.chapterPath||!fs.existsSync(d.chapterPath)) console.error("      "+id); }' 2>/dev/null; }

# The quality checklist ships to every project; all five gates must be present and ordered.
qc=plugins/moai/assets/templates/quality-checklist.md
{ grep -q '^## Checkpoint A: Foundation Audit (After M3)' $qc \
  && grep -q '^## Checkpoint B: Feature Complete (After M6)' $qc \
  && grep -q '^## Checkpoint C: Pre-Launch Audit (After M10)' $qc; } \
  && ok "shipped quality-checklist has all three checkpoints at M3/M6/M10" \
  || bad "quality-checklist is missing a checkpoint section"

printf '\n%s%s%s  %d passed, %d failed\n\n' \
  "$([ "$fail" -eq 0 ] && echo "$G" || echo "$R")" \
  "$([ "$fail" -eq 0 ] && echo 'ALL GREEN' || echo 'RED')" "$X" "$pass" "$fail"
[ "$fail" -eq 0 ]
