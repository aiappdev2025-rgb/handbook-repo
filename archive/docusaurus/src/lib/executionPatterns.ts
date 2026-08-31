// Execution context types
export type Platform = 'claude-chat' | 'claude-code' | 'either';
export type Session = 'new' | 'continue' | 'dedicated-project';

export interface ExecutionContext {
  platform: Platform;
  session: Session;
  contextFiles?: string[];      // Files to include/reference
  prerequisites?: string[];     // What must exist before running
  estimatedTime?: string;       // e.g., "5-10 min"
  tips?: string[];              // Additional guidance
}

// Phase-based defaults
export const phaseDefaults: Record<number, ExecutionContext> = {
  1: {
    platform: 'claude-chat',
    session: 'new',
    estimatedTime: '10-15 min',
    tips: ['Start fresh for each artifact', 'Save output before closing']
  },
  2: {
    platform: 'claude-chat',
    session: 'continue',
    estimatedTime: '15-20 min',
    tips: ['Reference Phase 1 artifacts', 'Keep design context in same chat']
  },
  3: {
    platform: 'claude-chat',
    session: 'continue',
    estimatedTime: '15-30 min',
    tips: ['Have design docs ready to reference', 'Architecture decisions build on each other']
  },
  4: {
    platform: 'claude-code',
    session: 'dedicated-project',
    estimatedTime: '30-60 min per milestone',
    tips: ['Use Claude Code CLI', 'Keep CLAUDE.md updated', 'Commit after each milestone']
  },
  5: {
    platform: 'claude-code',
    session: 'continue',
    estimatedTime: '30-60 min',
    tips: ['Run from project root', 'Have staging environment ready']
  }
};

// Specific overrides per artifact
export const artifactExecutionOverrides: Record<string, Partial<ExecutionContext>> = {
  'market-research': {
    platform: 'claude-chat',
    session: 'new',
    contextFiles: [],
    prerequisites: ['Initial product idea'],
    estimatedTime: '15-20 min',
    tips: [
      'Start a new chat for fresh perspective',
      'Have your product concept ready to describe',
      'Web search may be used for market data'
    ]
  },
  'opportunity-assessment': {
    contextFiles: ['market-research.md'],
    prerequisites: ['Market research complete'],
    tips: ['Reference your market research output']
  },
  'business-one-pager': {
    contextFiles: ['market-research.md', 'opportunity-assessment.md'],
    prerequisites: ['Market research', 'Opportunity assessment'],
    tips: ['This synthesizes all Phase 1 research']
  },
  'competitive-analysis': {
    session: 'new',
    contextFiles: ['business-one-pager.md'],
    prerequisites: ['Business one-pager complete'],
    tips: ['Claude may use web search for competitor info']
  },
  'mvp-scope': {
    contextFiles: ['business-one-pager.md', 'competitive-analysis.md'],
    prerequisites: ['Competitive analysis complete'],
  },
  'design-brief': {
    contextFiles: ['business-one-pager.md', 'mvp-scope.md'],
    prerequisites: ['MVP scope defined'],
    tips: ['This bridges Phase 1 to Phase 2']
  },
  'design-philosophy': {
    platform: 'claude-chat',
    session: 'new',
    contextFiles: ['design-brief.md'],
    prerequisites: ['Design brief complete'],
    tips: ['Start Phase 2 with fresh context']
  },
  'ux-package': {
    contextFiles: ['design-philosophy.md', 'design-brief.md'],
    prerequisites: ['Design philosophy complete'],
    tips: ['Keep in same chat as design philosophy']
  },
  'user-flows': {
    contextFiles: ['ux-package.md'],
    prerequisites: ['UX package complete'],
  },
  'ui-system': {
    contextFiles: ['design-philosophy.md', 'ux-package.md'],
    prerequisites: ['User flows documented'],
  },
  'component-library': {
    contextFiles: ['ui-system.md'],
    prerequisites: ['UI system complete'],
    tips: ['Final Phase 2 artifact']
  },
  'solution-architecture': {
    platform: 'claude-chat',
    session: 'new',
    contextFiles: ['design-brief.md', 'component-library.md'],
    prerequisites: ['Phase 2 complete'],
    tips: ['Start Phase 3 with fresh context', 'Have all Phase 2 outputs ready']
  },
  'data-model': {
    contextFiles: ['solution-architecture.md'],
    prerequisites: ['Solution architecture complete'],
  },
  'api-spec': {
    contextFiles: ['data-model.md', 'solution-architecture.md'],
    prerequisites: ['Data model complete'],
  },
  'security-architecture': {
    contextFiles: ['solution-architecture.md', 'api-spec.md'],
    prerequisites: ['API specification complete'],
    tips: ['Final architecture artifact before build']
  },
  'adr-templates': {
    contextFiles: ['solution-architecture.md'],
    prerequisites: ['Solution architecture complete', 'Tech stack decided'],
    estimatedTime: '15-20 min',
    tips: ['Generate all ADRs at once, then save individually', 'Number ADRs sequentially (001, 002, etc.)']
  },
  'test-strategy': {
    platform: 'claude-code',
    session: 'dedicated-project',
    contextFiles: ['solution-architecture.md'],
    prerequisites: ['Tech stack decided', 'Project initialized'],
    estimatedTime: '15-20 min',
    tips: ['Claude Code will create all test files', 'Install dependencies after generation']
  },
  'build-contract': {
    platform: 'claude-chat',
    session: 'new',
    contextFiles: ['All Phase 3 artifacts'],
    prerequisites: ['All architecture docs complete'],
    tips: ['Creates the contract for Claude Code implementation']
  },
  'm1-foundation': {
    platform: 'claude-code',
    session: 'dedicated-project',
    contextFiles: ['build-contract.md', 'CLAUDE.md'],
    prerequisites: ['Build contract ready', 'Repo initialized'],
    tips: ['Run from project root', 'Claude Code will create files directly']
  },
  'm2-database-schema': {
    platform: 'claude-code',
    session: 'continue',
    contextFiles: ['data-model.md'],
    prerequisites: ['M1 complete'],
  },
  'm4-ui-shell': {
    platform: 'claude-code',
    session: 'continue',
    contextFiles: ['component-library.md', 'ui-system.md'],
    prerequisites: ['M3 complete'],
  }
};

// Helper to get full execution context for an artifact
export function getExecutionContext(artifactId: string, phase: number): ExecutionContext {
  const defaults = phaseDefaults[phase] || phaseDefaults[1];
  const overrides = artifactExecutionOverrides[artifactId] || {};
  return { ...defaults, ...overrides };
}
