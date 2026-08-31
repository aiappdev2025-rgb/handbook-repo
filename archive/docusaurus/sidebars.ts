import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  handbookSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsible: true,
      collapsed: false,
      items: [
        'getting-started/quick-reference',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Phase 1: Validate',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Phase 1: Validate',
        description: 'Research, planning, and business validation',
        slug: '/phase-1-validate',
      },
      items: [
        'phase-1-validate/introduction',
        'phase-1-validate/market-research',
        'phase-1-validate/opportunity-assessment',
        'phase-1-validate/business-one-pager',
        'phase-1-validate/competitive-analysis',
        'phase-1-validate/mvp-scoping',
        'phase-1-validate/design-brief',
      ],
    },
    {
      type: 'category',
      label: 'Phase 2: Design',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Phase 2: Design',
        description: 'UX/UI design and component specification',
        slug: '/phase-2-design',
      },
      items: [
        'phase-2-design/design-philosophy',
        'phase-2-design/ux-package',
        'phase-2-design/user-flows',
        'phase-2-design/ui-system',
        'phase-2-design/component-library',
      ],
    },
    {
      type: 'category',
      label: 'Phase 3: Architect',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Phase 3: Architect',
        description: 'Technical architecture and build preparation',
        slug: '/phase-3-architect',
      },
      items: [
        'phase-3-architect/solution-architecture',
        'phase-3-architect/data-model',
        'phase-3-architect/api-specification',
        'phase-3-architect/security',
        'phase-3-architect/infrastructure',
        'phase-3-architect/multi-environment',
        'phase-3-architect/adr-templates',
        'phase-3-architect/test-strategy',
        {
          type: 'doc',
          id: 'phase-3-architect/build-contract',
          label: 'Build Contract',
        },
        {
          type: 'doc',
          id: 'phase-3-architect/dev-environment',
          label: 'Dev Environment',
        },
      ],
    },
    {
      type: 'category',
      label: 'Phase 4: Build',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Phase 4: Build',
        description: 'MOAI-powered implementation with TDD',
        slug: '/phase-4-build',
      },
      items: [
        'phase-4-build/moai-overview',
        'phase-4-build/spec-first',
        'phase-4-build/tdd-workflow',
        'phase-4-build/quality-gates',
        {
          type: 'category',
          label: 'Milestones 1-4',
          items: [
            'phase-4-build/m1-foundation',
            'phase-4-build/m2-database',
            'phase-4-build/m3-api',
            'phase-4-build/m4-ui-shell',
          ],
        },
        {
          type: 'doc',
          id: 'phase-4-build/checkpoint-1',
          label: 'Checkpoint 1',
        },
        {
          type: 'category',
          label: 'Milestones 5-7',
          items: [
            'phase-4-build/m5-auth',
            'phase-4-build/m5-implementation',
            'phase-4-build/m6-core-features',
            'phase-4-build/m7-admin',
            'phase-4-build/m7-implementation',
          ],
        },
        {
          type: 'doc',
          id: 'phase-4-build/checkpoint-2',
          label: 'Checkpoint 2',
        },
        {
          type: 'category',
          label: 'Milestones 8-11',
          items: [
            'phase-4-build/m8-advanced',
            'phase-4-build/m9-payments',
            'phase-4-build/m10-polish',
            'phase-4-build/m11-prelaunch',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Phase 5: Launch',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Phase 5: Launch',
        description: 'QA, deployment, and launch',
        slug: '/phase-5-launch',
      },
      items: [
        'phase-5-launch/qa-deployment',
        'phase-5-launch/launch-checklist',
      ],
    },
    {
      type: 'html',
      value: '<hr class="sidebar-divider" />',
    },
    {
      type: 'category',
      label: 'Reference Guides',
      collapsible: true,
      collapsed: true,
      items: [
        'reference/workflow-guide',
        'reference/claude-code-timing',
        'reference/ears-syntax',
        'reference/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Templates',
      collapsible: true,
      collapsed: true,
      items: [
        'templates/claude-md',
        'templates/spec-template',
        'templates/build-contract',
        'templates/quality-checklist',
        'templates/tech-debt',
      ],
    },
    {
      type: 'category',
      label: 'Interactive Tools',
      collapsible: true,
      collapsed: false,
      items: [
        'tools/prompt-builder',
      ],
    },
  ],
};

export default sidebars;
