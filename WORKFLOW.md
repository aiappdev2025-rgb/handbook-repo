# Handbook Maintenance Workflow

This document explains exactly how to maintain the AI SaaS Handbook documentation system, keeping your Git repository in sync with your Claude Project.

## Understanding the Two-System Approach

You're maintaining documentation in two places that serve different purposes:

**Git Repository (This Repo)**
- Acts as your source of truth and permanent record
- Provides version history so you can see what changed and when
- Enables rollback if something goes wrong
- Lives on your local machine (and optionally GitHub/GitLab for backup)

**Claude Project**
- Provides AI-assisted editing capabilities
- Gives Claude context about your documentation in every conversation
- Makes updates easier because Claude can read existing content
- Files are read-only during conversations (Claude produces new versions)

The key insight is that these systems complement each other. You edit via Claude Project conversations, then commit the results to Git for permanent storage.

## The Update Cycle

Here's the complete workflow for making updates to your documentation:

### Step 1: Start in Claude Project

Open a new conversation in your Claude Project that contains the handbook files. Claude automatically has access to all files in `/mnt/project/`.

### Step 2: Describe Your Changes

Be specific about what you want to change. Good examples:

```
"Add a new section to handbook-v3.html about webhook security 
best practices. It should go after the API Security section 
in Part IV."

"Update the Build Guide milestone 9 to include the new Stripe 
Payment Element approach instead of the legacy Card Element."

"Fix the broken internal link in the navigation guide that 
points to handbook-v2.2.html - it should point to handbook-v3.html"
```

### Step 3: Review Claude's Output

Claude will produce updated file(s). Review the changes by:
- Reading through Claude's summary of what changed
- Opening the HTML file(s) in your browser to visually verify
- Checking that internal links still work

### Step 4: Download the Files

Download the updated files from Claude's output. They'll typically be in the outputs section of the conversation.

### Step 5: Update Your Local Repository

Replace the files in your `docs/` folder:

```bash
cd ~/path/to/ai-saas-handbook

# Move downloaded files to docs folder
mv ~/Downloads/handbook-v3.html docs/
mv ~/Downloads/build-guide-v3.html docs/  # if updated

# Check what changed
git diff docs/
```

### Step 6: Commit with a Good Message

```bash
git add docs/
git commit -m "docs: Add webhook security section to handbook

- Added new section 15.3 covering webhook signature verification
- Included code examples for Stripe and generic webhook validation
- Cross-referenced from Build Guide milestone 9"
```

### Step 7: Update CHANGELOG (for significant changes)

If this is a meaningful update (not just a typo fix), add an entry to CHANGELOG.md:

```markdown
## [Unreleased]

### Added
- Webhook security best practices section (Handbook 15.3)
```

### Step 8: Sync Back to Claude Project

This is the step people often forget. After committing to Git, update your Claude Project:

1. Go to your Claude Project settings
2. Navigate to the Project Knowledge section
3. Remove the old version of any files you updated
4. Upload the new versions from your `docs/` folder

Now your Claude Project matches your Git repository, and the next conversation will have access to the latest versions.

## When to Use Each Approach

### Use Claude Project + Git Workflow For:
- Adding new sections or chapters
- Rewriting or reorganizing content
- Updating code examples
- Fixing errors or outdated information
- Any change where AI assistance is valuable

### Edit Directly in Git For:
- Simple typo fixes (faster to just edit the HTML)
- Updating version numbers or dates
- Changing a single link
- Any trivial change where spinning up a Claude conversation is overkill

For direct edits, just edit the file locally, commit, and then re-upload to Claude Project.

## Handling Conflicts

Sometimes you might have changes in your Claude Project that haven't been committed to Git, and then make different changes directly. Here's how to handle this:

**Prevention (Best Approach)**
- Always commit to Git immediately after getting files from Claude
- Always sync to Claude Project immediately after committing
- Don't let the two systems drift apart

**Resolution (If It Happens)**
- Git is your source of truth
- If in doubt, take the Git version and re-apply changes via a new Claude conversation
- Use `git log` and `git diff` to understand what changed when

## Version Numbering

Use semantic versioning for the handbook:

```
v[MAJOR].[MINOR]

MAJOR: Significant restructuring, new methodology additions
MINOR: New sections, updated content, fixes
```

Examples:
- v3.0 → v3.1: Added new section on webhook security
- v3.1 → v3.2: Updated all code examples to Next.js 15
- v3.2 → v4.0: Complete rewrite of Build Phase methodology

## Backup Strategy

Your Git repository is already a backup, but consider:

1. **Push to Remote**: If you have a GitHub/GitLab account, push regularly
   ```bash
   git remote add origin git@github.com:yourusername/ai-saas-handbook.git
   git push -u origin main
   ```

2. **Tag Releases**: When you reach a stable version
   ```bash
   git tag -a v3.0 -m "MOAI Integration Edition"
   git push origin v3.0
   ```

3. **Export from Claude Project**: Periodically download all files from your Claude Project as an additional backup

## Troubleshooting

### "Claude doesn't see my latest changes"

The files in Claude Project are cached. Make sure you:
1. Removed the old file from Project Knowledge
2. Uploaded the new file
3. Started a NEW conversation (existing conversations may have old context)

### "My links are broken after an update"

Check that:
- All files are in the same directory
- Filenames match exactly (case-sensitive)
- No extra spaces or characters in filenames

### "I made changes but forgot to commit"

If you downloaded files from Claude but didn't commit:
1. Check your Downloads folder for the files
2. Check if you have the Claude conversation still open (you can re-download)
3. If lost, start a new conversation and describe the changes again

### "I want to go back to a previous version"

This is why we use Git:
```bash
# See version history
git log --oneline docs/handbook-v3.html

# See what a file looked like at a specific commit
git show abc123:docs/handbook-v3.html

# Restore a previous version
git checkout abc123 -- docs/handbook-v3.html
```

## Checklist for Each Update Session

Use this checklist to ensure you don't miss any steps:

- [ ] Started conversation in correct Claude Project
- [ ] Clearly described the changes needed
- [ ] Reviewed Claude's output
- [ ] Downloaded updated file(s)
- [ ] Replaced files in local `docs/` folder
- [ ] Ran `git diff` to verify changes look correct
- [ ] Committed with descriptive message
- [ ] Updated CHANGELOG.md (if significant change)
- [ ] Pushed to remote (if using GitHub/GitLab)
- [ ] Updated Claude Project Knowledge with new files
- [ ] Verified new conversation sees the updates
