---
chapter: 19
title: "Build Contract Introduction"
slug: "build-contract-intro"
phase: 3
phase_name: "Architect"
milestone: null
checkpoint: null
tool: null
session: null
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase3/chapter-19-build-contract-intro.html"
---

# Chapter 19: Build Contract Introduction

In this chapter, you'll understand the purpose and value of the Build Contract—a bridge document that compresses your design artifacts into a structured reference optimized for implementation. By the end of this chapter, you'll understand why this document is essential and how it improves your development workflow.

## 19.1 What is the Build Contract?

The Build Contract is a bridge document that compresses your design artifacts (Design Brief, UX Package, UI System, Architecture) into a structured reference optimized for implementation. It extracts decisions from exploration-focused documents and organizes them for quick lookup during coding.

> **Why Build Contract?**
>
> Design artifacts are optimized for exploration. But during implementation, you need quick reference to decisions made. The Build Contract extracts the "what" and organizes it for implementation lookup. SPECs reference Build Contract sections rather than hunting through multiple design documents.

## 19.2 Benefits Comparison

The Build Contract significantly improves the implementation experience by providing a single, canonical reference:

| Without Build Contract | With Build Contract |
| --- | --- |
| SPECs reference multiple documents | SPECs reference single source |
| ~15-20K tokens for design context | ~2-5K tokens for relevant sections |
| Inconsistent terminology possible | Single canonical vocabulary |

> **Expected Outcome**
>
> **What you should understand:** The Build Contract serves as a compressed, implementation-ready reference that reduces context overhead and ensures consistency.
>
> **Key insight:** Design documents help you explore and decide. The Build Contract helps you implement what you decided.
>
> **Next:** Chapter 20 — Learn the seven standard sections of every Build Contract.

## 19.3 Chapter Summary

You've learned the purpose of the Build Contract. Key takeaways:

- The Build Contract bridges design exploration and implementation
- It compresses multiple design artifacts into a single reference
- SPECs reference Build Contract sections for efficient context lookup
- Using a Build Contract reduces token overhead by 70-80%

In the next chapter, you'll learn the seven standard sections that every Build Contract contains.
