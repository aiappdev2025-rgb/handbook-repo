# Prompt: Apply Consistent Section Structure to Documentation

**Task:** Update chapters [X-Y] with the following consistent section structure pattern.

---

## Structure Pattern for Each Chapter:

### 1. Chapter Intro Paragraph
Add after the `<h1>` chapter heading:
- Brief paragraph explaining what the chapter covers and what the reader will accomplish
- Example: "In this chapter, you'll learn [topic]. By the end, you'll have [outcome]."

### 2. Section IDs for Navigation
- Format: `id="section-X-Y"` where X = chapter number, Y = section number
- Add to each `<h2>` or `<h3>` section heading
- Example: `<h2 id="section-5-1">5.1 Section Title</h2>`

### 3. Section Intro Context
Add after each section heading:
- 1-2 sentences explaining WHY this section matters before diving into instructions
- Distinguishes informative content from actionable steps
- Maintains conversational flow

### 4. Expected Outcome Box
Add at the end of each major section:

```html
<div class="success">
  <h4>Expected Outcome</h4>
  <p><strong>What you should have:</strong> [concrete deliverable]</p>
  <p><strong>How to validate:</strong> [verification steps]</p>
  <p><strong>Next:</strong> [next section/chapter reference]</p>
</div>
```

### 5. Chapter Summary
Add at the end of each chapter:
- Use `<h2>Chapter X Summary</h2>` heading
- Bullet list of key takeaways
- Reinforces main concepts covered

### 6. TOC Updates
Add section-level navigation links to Table of Contents:
- Format: `(<a href="#section-X-1">X.1</a> | <a href="#section-X-2">X.2</a> | ...)`
- Place after the chapter link

---

## Execution Steps:

1. **Read** the target file to understand current structure
2. **Identify** all chapters and their sections
3. **For each chapter:**
   - Add chapter intro paragraph
   - Add section IDs to headings
   - Add intro context paragraphs
   - Add Expected Outcome boxes
   - Add Chapter Summary
4. **Update TOC** with section-level links
5. **Review** for duplicate paragraphs created during editing

---

## Example Implementation:

### Before:
```html
<h1 id="chapter-5">Chapter 5: Topic Name</h1>

<h2>5.1 First Section</h2>
<p>Instructions here...</p>
```

### After:
```html
<h1 id="chapter-5">Chapter 5: Topic Name</h1>

<p>In this chapter, you'll learn about [topic]. Understanding this is essential because [reason]. By the end of this chapter, you'll have [outcome].</p>

<h2 id="section-5-1">5.1 First Section</h2>

<p>This section covers [what] and why it matters for [context].</p>

<p>Instructions here...</p>

<div class="success">
  <h4>Expected Outcome</h4>
  <p><strong>What you should have:</strong> A completed [deliverable]</p>
  <p><strong>How to validate:</strong> Check that [validation criteria]</p>
  <p><strong>Next:</strong> Continue to Section 5.2 to [next topic]</p>
</div>

<h2>Chapter 5 Summary</h2>
<ul>
  <li>Key takeaway 1</li>
  <li>Key takeaway 2</li>
  <li>Key takeaway 3</li>
</ul>
```

---

## Notes:
- Maintain the document's existing voice and tone
- Keep intro paragraphs concise (2-4 sentences)
- Expected Outcome boxes should have actionable validation steps
- Section numbering should match chapter number (Chapter 5 = sections 5.1, 5.2, etc.)
