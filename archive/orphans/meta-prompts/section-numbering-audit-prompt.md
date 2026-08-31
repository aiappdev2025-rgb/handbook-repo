# Prompt: Audit and Fix Section Numbering and TOC

**Task:** Audit the section numbering in the following HTML documentation file(s) and update the Table of Contents to ensure:

1. **Chapter numbers are sequential** with no gaps (e.g., 1, 2, 3... not 1, 2, 4)
2. **Section numbers within each chapter are sequential** (e.g., 5.1, 5.2, 5.3... not 5.1, 5.3)
3. **Consistent ID naming convention:**
   - Chapters use: `id="chapter-X"`
   - Sections use: `id="section-X-Y"` where X = chapter number, Y = section number
4. **TOC links match actual section IDs** in the document
5. **Section heading format is consistent** (e.g., `<h2 id="section-5-1">5.1 Section Title</h2>`)

---

## Execution Steps

### Step 1: Audit

Search for all IDs and analyze the structure:

```bash
# Find all chapter IDs
grep -n 'id="chapter-' [FILE]

# Find all section IDs
grep -n 'id="section-' [FILE]

# Find TOC section (usually near the top)
grep -n -A 50 'class="toc"' [FILE]
```

**Check for:**
- Gaps in chapter numbering (e.g., 1, 2, 4 - missing 3)
- Gaps in section numbering within chapters (e.g., 5.1, 5.3 - missing 5.2)
- Inconsistent ID patterns (e.g., `chapter-X-Y` used instead of `section-X-Y`)
- Mismatched TOC links vs actual section IDs

### Step 2: Report Findings

Present findings in a table format before making changes:

```
| Chapter | Sections in TOC | Actual Sections | Status |
|---------|-----------------|-----------------|--------|
| 1       | 1.1-1.4         | 1.1-1.4         | OK     |
| 2       | 2.1-2.3         | 2.1, 2.3        | GAP    |
| 3       | -               | -               | MISSING|
```

**Identify:**
- Which chapters need renumbering
- Which sections need renumbering
- Which IDs need format normalization
- Which TOC links need updating

### Step 3: Fix Issues (after user confirmation)

**Renumber chapters to eliminate gaps:**
```html
<!-- Before -->
<h1 id="chapter-30">Chapter 30: Title</h1>

<!-- After (if 29 is missing) -->
<h1 id="chapter-29">Chapter 29: Title</h1>
```

**Renumber sections to eliminate gaps:**
```html
<!-- Before -->
<h2 id="section-5-3">5.3 Section Title</h2>

<!-- After (if 5.2 is missing) -->
<h2 id="section-5-2">5.2 Section Title</h2>
```

**Normalize inconsistent IDs:**
```html
<!-- Before (inconsistent) -->
<h1 id="chapter-23-2">Chapter 23.2: Subsection</h1>

<!-- After (normalized to section) -->
<h2 id="section-23-2">23.2 Subsection</h2>
```

### Step 4: Update TOC

**Update chapter links:**
```html
<a href="#chapter-29">29. Chapter Title</a>
```

**Update section links (standard format):**
```html
<a href="#chapter-5">5. Chapter Title</a>
(<a href="#section-5-1">5.1</a> | <a href="#section-5-2">5.2</a> | <a href="#section-5-3">5.3</a>)
```

### Step 5: Verify

Re-scan all IDs to confirm:
- All chapter numbers are sequential (no gaps)
- All section numbers within each chapter are sequential (no gaps)
- All IDs follow the naming convention
- All TOC links match actual IDs

---

## File(s) to Audit

[INSERT FILE PATH(S) HERE]

Example:
- `/path/to/handbook-part1.html`
- `/path/to/handbook-part2.html`
- `/path/to/handbook-part3.html`

---

## Expected Output Format

### Audit Report

| File | Chapters | Section Count | Issues Found |
|------|----------|---------------|--------------|
| part1.html | 1-13 | 45 | None |
| part2.html | 14-23 | 52 | Chapter 23 inconsistent IDs |
| part3.html | 24-32 | 28 | Gaps: missing 29, 31 |

### Detailed Findings Per File

**[filename]:**
| Chapter | TOC Sections | Actual Sections | Status |
|---------|--------------|-----------------|--------|
| X | X.1-X.4 | X.1-X.4 | OK |

### Summary of Required Changes

1. **Renumber:** Chapter 30 → 29, Chapter 32 → 30
2. **Normalize:** Chapter 23 sections (chapter-23-X → section-23-X)
3. **Update TOC:** All affected chapters and sections

---

## Notes

- Always audit and report findings BEFORE making changes
- Wait for user confirmation before executing fixes
- After fixes, run verification to confirm all issues resolved
- Update any cross-references to renamed chapters/sections (e.g., "See Chapter 32" → "See Chapter 30")
