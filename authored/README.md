# authored/

Hand-written chapters that post-date the migration. `archive/` is frozen and `method/`
is regenerated on every build, so new content lives here and `tools/copy-authored.mjs`
copies it into `method/` at the same relative path.

Rules:

- Same layout and frontmatter as the generated chapter it sits beside. Part 0 chapters
  need numeric `chapter:`, `title:` and a `section:` (the Part 0 index heading to list
  it under). Appendices need `appendix:` and `title:`.
- A file here must not collide with a generated one; the build fails if it would.
- Edit here, never in `method/`. Then `npm run convert && npm run verify`.
