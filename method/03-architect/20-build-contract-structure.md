---
chapter: 20
title: "Build Contract Structure"
slug: "build-contract-structure"
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
source_html: "archive/html-v3/handbook/phase3/chapter-20-build-contract-structure.html"
---

# Chapter 20: Build Contract Structure

In this chapter, you'll learn the seven standard sections that every Build Contract contains. Understanding this structure helps you know what to expect and how to reference specific sections during implementation. By the end of this chapter, you'll know exactly what information each section provides.

## 20.1 The Seven Sections

Every Build Contract contains these seven standard sections, each serving a specific implementation purpose:

1. **Vocabulary**: Canonical terms used throughout the product — ensures consistent naming in code
2. **User Model**: User types, permissions, authentication, core flows — defines auth requirements
3. **Screen Inventory**: Complete list of screens with routes — maps UI to file structure
4. **Component Specifications**: Key component behaviors and states — guides component implementation
5. **Data Model**: Database entities, columns, types, constraints — defines schema
6. **API Surface**: All API routes with methods and auth requirements — specifies endpoints
7. **Quality Standards**: Code structure, security, testing requirements — sets implementation bar

## 20.2 How SPECs Reference Sections

During implementation, SPECs reference specific Build Contract sections. For example:

- "User authentication flow per Build Contract Section 2 (User Model)"
- "Database schema per Build Contract Section 5 (Data Model)"
- "API endpoint structure per Build Contract Section 6 (API Surface)"

This targeted referencing keeps SPECs concise while maintaining full traceability to design decisions.

> **Expected Outcome**
>
> **What you should understand:** The seven sections of a Build Contract and how each supports implementation work.
>
> **How to validate:** You can explain what information you'd find in each of the seven sections.
>
> **Next:** Chapter 21 — Generate your Build Contract from your design artifacts.

## 20.3 Chapter Summary

You've learned the Build Contract structure. Key takeaways:

- Seven standard sections cover all implementation needs
- Each section extracts specific information from design artifacts
- SPECs reference sections by number for efficient lookup
- Consistent structure makes navigation predictable

In the next chapter, you'll generate your Build Contract by prompting Claude Chat to synthesize your design artifacts.
