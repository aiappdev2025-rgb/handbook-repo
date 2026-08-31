---
chapter: 15
title: "GitHub Repository Setup"
slug: "github-setup"
phase: 3
phase_name: "Architect"
milestone: null
checkpoint: null
tool: "claude-code"
session: "new-session"
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase3/chapter-15-github-setup.html"
---

# Chapter 15: GitHub Repository Setup

In this chapter, you'll create your GitHub repository and initialize the project structure using Claude Code. This is where your architecture and schema documents come together into an actual codebase. By the end of this chapter, you'll have a fully structured Next.js project connected to GitHub and ready for development.

## 15.1 Purpose

The GitHub repository is the foundation for all development work. It stores your code, tracks changes, and integrates with Vercel for automatic deployments. Setting it up correctly from the start—with proper folder structure, configuration files, and branching strategy—prevents organizational debt that's painful to fix later.

**What you'll accomplish:** Create a GitHub repository, initialize a Next.js project with your architecture's folder structure, and establish a branching strategy.

## 15.2 Repository Creation

First, create an empty repository on GitHub. You'll initialize the actual project locally and push it to this remote. Creating the repo first ensures you have the remote URL ready for the initialization step.

> **Note:** Tool:
>
> Manual (GitHub Website) - Repository creation requires the GitHub interface.

### Instructions

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `[your-project-name]` (lowercase, hyphens, e.g., `my-saas-app`)
3. Visibility: **Private** (recommended until launch)
4. Initialize with README: **No** (we'll create our own)
5. Add .gitignore: **None** (Claude Code will create a comprehensive one)
6. Click "Create repository"
7. Copy the repository URL (e.g., `https://github.com/username/my-saas-app.git`)

> **Expected Outcome**
>
> **What you should have:** An empty GitHub repository with the URL copied.
>
> **How to validate:** The GitHub page shows "Quick setup" instructions because the repository is empty.
>
> **Next:** Initialize the project using Claude Code.

## 15.3 Project Initialization with Claude Code

Now you'll use Claude Code to create the actual project. This is your first time using Claude Code in this workflow. The prompt references your architecture document, so Claude Code will read it and set up the folder structure exactly as you designed it.

> **⚠ Warning:** Prerequisites Before running this prompt, ensure `docs/architecture.md` exists in your project directory (created in Chapter 14). Claude Code will read this file to determine the folder structure.

> **Run in:** Claude Code · **Session:** New Session · first time using Claude Code

> Prompt file: [`prompts/X-15-1-github-repository-setup.md`](../../prompts/X-15-1-github-repository-setup.md)

```text
Initialize a new Next.js project for [PROJECT_NAME].

**Reference**: Read docs/architecture.md and use the Project Structure section.

1. Create the project with:
   - Next.js 14+ with App Router
   - TypeScript (strict mode)
   - Tailwind CSS
   - ESLint

2. Set up the folder structure as defined in docs/architecture.md, including:
   - All route groups from the Architecture
   - Feature-specific component folders for each domain entity
   - Service integration folders (supabase/, stripe/, etc.)
   - Any domain-specific lib/ folders

3. Create a comprehensive .gitignore for Next.js + Supabase + env files

4. Create initial README.md with project name and setup instructions

5. Initialize git and make initial commit

6. Connect to GitHub remote: [REPO_URL]
```

> **Replace Placeholders**
>
> Replace `[PROJECT_NAME]` with your project name and `[REPO_URL]` with the GitHub URL you copied in the previous step.

> **Expected Outcome**
>
> **What you should have:** A complete Next.js project with your architecture's folder structure, connected to GitHub.
>
> **How to validate:**
>
> - Run `npm run dev` — app starts at localhost:3000
> - Folder structure matches your architecture document
> - `git remote -v` shows your GitHub repository
> - GitHub repository shows the initial commit
>
> **Next:** Understand the branching strategy for development.

## 15.4 Branch Strategy

A consistent branching strategy keeps your codebase organized and integrates cleanly with Vercel's deployment model. This strategy maps branch types to deployment environments.

| Branch | Purpose | Deploys To |
| --- | --- | --- |
| `main` | Production-ready code | Production (Vercel) |
| `develop` | Integration branch (optional) | Preview |
| `feature/*` | New features | Preview |
| `fix/*` | Bug fixes | Preview |

> **Solo Developer Simplification**
>
> For solo development, you can skip the `develop` branch and merge feature branches directly to `main`. The key principle: `main` should always be deployable.

> **Expected Outcome**
>
> **What you should have:** Understanding of how branches map to deployments.
>
> **How to validate:** You know that pushing to `main` deploys to production, and all other branches create preview deployments.
>
> **Next:** Chapter 16 — Set up your Supabase projects.

## 15.5 Chapter Summary

You've completed the GitHub Repository Setup. Here's what you accomplished:

- Created a GitHub repository for your project
- Initialized a Next.js project with your architecture's folder structure
- Set up TypeScript, Tailwind CSS, and ESLint
- Connected local repository to GitHub remote
- Understand the branching strategy for development

Your codebase is initialized and version-controlled. In the next chapter, you'll set up Supabase projects for your development and production environments.
