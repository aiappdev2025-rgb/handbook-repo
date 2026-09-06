/**
 * title-case.mjs — the Part 0 section heading rule, shared by split-guide (which writes
 * the Part 0 index) and copy-authored (which appends to it).
 */
export function titleCase(s) {
  // The Roman numeral is captured before the case fold so "PART II" stays "Part II"
  // (it used to come out as "Part Ii").
  return String(s).replace(/^PART\s+([IVX]+):\s*(.*)$/i, (_, n, rest) =>
    `Part ${n.toUpperCase()} — ${rest.replace(/\b([A-Z]{2,})\b/g, (m) => m[0] + m.slice(1).toLowerCase())}`)
    .replace(/^(?!Part [IVX]+ — )(.*)$/, (m) => m.replace(/\b([A-Z]{2,})\b/g, (w) => w[0] + w.slice(1).toLowerCase()))
    // Small words stay lowercase inside a heading ("Cost and Limits"), never at its start.
    .replace(/(?<=\S )\b(And|Of|The|In|For|To)\b/g, (w) => w.toLowerCase());
}
