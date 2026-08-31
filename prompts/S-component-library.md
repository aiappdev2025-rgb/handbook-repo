---
id: "S-component-library"
title: "Component Library Prompt"
tool: "claude-chat"
variant: "canonical"
source: "archive/docusaurus/docs"
---

```text
Specify component library for [PRODUCT_NAME].

**UI System**: Reference the design tokens from ui-system.md
**Core Features**: [CORE_FEATURES]

For each component, define:

1. **Component Name**: Clear identifier
2. **Purpose**: When and why to use this component
3. **Props/Variants**: All configuration options
   - variant: primary, secondary, ghost, destructive
   - size: sm, md, lg
   - state: default, loading, disabled
4. **States**: Visual appearance for each state
   - default, hover, active, focus, disabled, error, loading
5. **Responsive Behavior**: How it adapts to screen sizes
6. **Accessibility Requirements**:
   - ARIA attributes
   - Keyboard navigation
   - Focus management

Document these components:
- Button, IconButton, ButtonGroup
- Input, Textarea, Select, Checkbox, Radio, Switch
- Card, Modal, Drawer, Popover
- Toast, Alert, Badge
- Table, List, Pagination
- Avatar, Tooltip, Skeleton

Output as component-library.md
```
