// Conductor System - Project Data Schema
// Defines the structure for user project data that auto-fills prompts throughout the handbook

// =============================================================================
// ARTIFACT DEFINITIONS
// Maps artifacts to chapters - used for artifact storage and chapter navigation
// =============================================================================

export interface ArtifactDefinition {
  phase: 1 | 2 | 3 | 4 | 5;
  chapter: string;
  filename: string;
  title: string;
  description: string;
  extractFields: string[];
}

export const artifactDefinitions: Record<string, ArtifactDefinition> = {
  // Phase 1: Validate
  'market-research': {
    phase: 1,
    chapter: 'market-research',
    filename: 'market-research.md',
    title: 'Market Research',
    description: 'TAM/SAM/SOM analysis and market trends',
    extractFields: ['phase1.marketTAM', 'phase1.marketSAM', 'phase1.marketSOM'],
  },
  'opportunity-assessment': {
    phase: 1,
    chapter: 'opportunity-assessment',
    filename: 'opportunity-assessment.md',
    title: 'Opportunity Assessment',
    description: 'Opportunity scoring and evaluation',
    extractFields: [],
  },
  'business-one-pager': {
    phase: 1,
    chapter: 'business-one-pager',
    filename: 'business-one-pager.md',
    title: 'Business One-Pager',
    description: 'Complete business overview document',
    extractFields: ['phase1.productConcept', 'phase1.problemStatement', 'phase1.pricingModel'],
  },
  'competitive-analysis': {
    phase: 1,
    chapter: 'competitive-analysis',
    filename: 'competitive-analysis.md',
    title: 'Competitive Analysis',
    description: 'Competitor research and differentiation',
    extractFields: ['phase1.competitors'],
  },
  'mvp-scope': {
    phase: 1,
    chapter: 'mvp-scoping',
    filename: 'mvp-scope.md',
    title: 'MVP Scope',
    description: 'Feature prioritization and scope definition',
    extractFields: ['phase1.mvpFeatures', 'phase1.outOfScope'],
  },
  'design-brief': {
    phase: 1,
    chapter: 'design-brief',
    filename: 'design-brief.md',
    title: 'Design Brief',
    description: 'Product requirements and user stories',
    extractFields: ['phase2.coreFeatures', 'phase2.userPersonas'],
  },

  // Phase 2: Design
  'design-philosophy': {
    phase: 2,
    chapter: 'design-philosophy',
    filename: 'design-philosophy.md',
    title: 'Design Philosophy',
    description: 'Design principles and visual direction',
    extractFields: ['phase2.designPrinciples'],
  },
  'ux-package': {
    phase: 2,
    chapter: 'ux-package',
    filename: 'ux-package.md',
    title: 'UX Package',
    description: 'Information architecture and user flows',
    extractFields: ['phase2.keyUserFlows'],
  },
  'user-flows': {
    phase: 2,
    chapter: 'user-flows',
    filename: 'user-flows.md',
    title: 'User Flows',
    description: 'Detailed user journey documentation',
    extractFields: [],
  },
  'ui-system': {
    phase: 2,
    chapter: 'ui-system',
    filename: 'ui-system.md',
    title: 'UI System',
    description: 'Visual design system specification',
    extractFields: [],
  },
  'component-library': {
    phase: 2,
    chapter: 'component-library',
    filename: 'component-library.md',
    title: 'Component Library',
    description: 'UI component specifications',
    extractFields: [],
  },

  // Phase 3: Architect
  'solution-architecture': {
    phase: 3,
    chapter: 'solution-architecture',
    filename: 'solution-architecture.md',
    title: 'Solution Architecture',
    description: 'System design and tech stack',
    extractFields: ['phase3.techStack'],
  },
  'data-model': {
    phase: 3,
    chapter: 'data-model',
    filename: 'data-model.md',
    title: 'Data Model',
    description: 'Database schema and entities',
    extractFields: ['phase3.entities'],
  },
  'api-spec': {
    phase: 3,
    chapter: 'api-specification',
    filename: 'api-spec.md',
    title: 'API Specification',
    description: 'API endpoints and contracts',
    extractFields: ['phase3.apiEndpoints'],
  },
  'security-architecture': {
    phase: 3,
    chapter: 'security',
    filename: 'security-architecture.md',
    title: 'Security Architecture',
    description: 'Auth and security design',
    extractFields: ['phase3.authStrategy'],
  },
  'build-contract': {
    phase: 3,
    chapter: 'build-contract',
    filename: 'build-contract.md',
    title: 'Build Contract',
    description: 'Implementation roadmap for Claude Code',
    extractFields: [],
  },
  'adr-templates': {
    phase: 3,
    chapter: 'adr-templates',
    filename: 'adrs.md',
    title: 'Architecture Decision Records',
    description: 'Technical decision documentation',
    extractFields: [],
  },
  'test-strategy': {
    phase: 3,
    chapter: 'test-strategy',
    filename: 'test-strategy.md',
    title: 'Test Strategy',
    description: 'Testing approach and configuration',
    extractFields: [],
  },
};

// =============================================================================
// ARTIFACT VERSION & STORAGE TYPES
// =============================================================================

export type ArtifactStatus = 'empty' | 'draft' | 'complete';

export interface ArtifactVersion {
  id: string;
  content: string;
  createdAt: string;
  note: string;
}

export interface Artifact {
  id: string;
  status: ArtifactStatus;
  currentContent: string;
  versions: ArtifactVersion[];
  updatedAt: string;
  versionNote?: string;
}

// =============================================================================
// PROJECT DATA TYPES
// =============================================================================

// Type definitions
export interface Competitor {
  name: string;
  strengths: string;
  weaknesses: string;
}

export interface MvpFeature {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface UserPersona {
  name: string;
  description: string;
  goals: string[];
  painPoints: string[];
}

export interface CoreFeature {
  name: string;
  userStories: string[];
  acceptanceCriteria: string[];
}

export interface UserFlow {
  name: string;
  steps: string[];
}

export interface Entity {
  name: string;
  fields: string[];
  relationships: string[];
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
}

export interface EnvVariable {
  key: string;
  description: string;
  value: string;
}

export interface TechStack {
  frontend: string;
  backend: string;
  database: string;
  hosting: string;
  auth: string;
  payments: string;
  ai: string;
}

export interface Phase1Data {
  productName: string;
  productConcept: string;
  targetCustomer: string;
  problemStatement: string;
  marketTAM: string;
  marketSAM: string;
  marketSOM: string;
  competitors: Competitor[];
  pricingModel: string;
  pricingAmount: string;
  mvpFeatures: MvpFeature[];
  outOfScope: string[];
}

export interface Phase2Data {
  userPersonas: UserPersona[];
  coreFeatures: CoreFeature[];
  designPrinciples: string[];
  keyUserFlows: UserFlow[];
}

export interface Phase3Data {
  techStack: TechStack;
  entities: Entity[];
  apiEndpoints: ApiEndpoint[];
  authStrategy: string;
  securityNotes: string;
}

export interface Phase4Data {
  repoUrl: string;
  projectFolder: string;
  envVariables: EnvVariable[];
  completedMilestones: string[];
}

export interface Phase5Data {
  stagingUrl: string;
  productionUrl: string;
  monitoringSetup: boolean;
  launchDate: string;
}

export interface Project {
  // Meta
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  currentPhase: 1 | 2 | 3 | 4 | 5;

  // Phase data
  phase1: Phase1Data;
  phase2: Phase2Data;
  phase3: Phase3Data;
  phase4: Phase4Data;
  phase5: Phase5Data;

  // Artifacts storage (key = artifact ID)
  artifacts: Record<string, Artifact>;
}

// Default project schema (used as template for new projects)
export const projectSchema: Project = {
  // Meta
  id: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  currentPhase: 1,

  // Phase 1: Validate
  phase1: {
    productName: '',
    productConcept: '',
    targetCustomer: '',
    problemStatement: '',
    marketTAM: '',
    marketSAM: '',
    marketSOM: '',
    competitors: [],
    pricingModel: '',
    pricingAmount: '',
    mvpFeatures: [],
    outOfScope: [],
  },

  // Phase 2: Design
  phase2: {
    userPersonas: [],
    coreFeatures: [],
    designPrinciples: [],
    keyUserFlows: [],
  },

  // Phase 3: Architect
  phase3: {
    techStack: {
      frontend: '',
      backend: '',
      database: '',
      hosting: '',
      auth: '',
      payments: '',
      ai: '',
    },
    entities: [],
    apiEndpoints: [],
    authStrategy: '',
    securityNotes: '',
  },

  // Phase 4: Build
  phase4: {
    repoUrl: '',
    projectFolder: '',
    envVariables: [],
    completedMilestones: [],
  },

  // Phase 5: Launch
  phase5: {
    stagingUrl: '',
    productionUrl: '',
    monitoringSetup: false,
    launchDate: '',
  },

  // Artifacts storage
  artifacts: {},
};

// Field metadata for UI rendering and validation
export interface FieldMeta {
  label: string;
  placeholder: string;
  required: boolean;
  usedIn: string[];
  type?: 'text' | 'textarea' | 'select' | 'array';
}

export const fieldMeta: Record<string, FieldMeta> = {
  'phase1.productName': {
    label: 'Product Name',
    placeholder: 'e.g., ListingSnap',
    required: true,
    usedIn: ['all'],
  },
  'phase1.productConcept': {
    label: 'Product Concept',
    placeholder: 'One-line description of what your product does',
    required: true,
    usedIn: ['business-one-pager', 'design-brief', 'competitive-analysis'],
    type: 'textarea',
  },
  'phase1.targetCustomer': {
    label: 'Target Customer',
    placeholder: 'e.g., Real estate agents who list 10+ properties per month',
    required: true,
    usedIn: ['business-one-pager', 'user-personas', 'marketing'],
    type: 'textarea',
  },
  'phase1.problemStatement': {
    label: 'Problem Statement',
    placeholder: 'What specific problem does your product solve?',
    required: true,
    usedIn: ['business-one-pager', 'pitch-deck', 'landing-page'],
    type: 'textarea',
  },
  'phase1.marketTAM': {
    label: 'Total Addressable Market (TAM)',
    placeholder: 'e.g., $50B global real estate tech market',
    required: false,
    usedIn: ['market-analysis', 'pitch-deck'],
  },
  'phase1.marketSAM': {
    label: 'Serviceable Addressable Market (SAM)',
    placeholder: 'e.g., $5B US real estate listing tools',
    required: false,
    usedIn: ['market-analysis', 'pitch-deck'],
  },
  'phase1.marketSOM': {
    label: 'Serviceable Obtainable Market (SOM)',
    placeholder: 'e.g., $50M high-volume agents segment',
    required: false,
    usedIn: ['market-analysis', 'pitch-deck'],
  },
  'phase1.pricingModel': {
    label: 'Pricing Model',
    placeholder: 'e.g., Per-listing, Monthly subscription, Freemium',
    required: false,
    usedIn: ['business-one-pager', 'financial-model'],
  },
  'phase1.pricingAmount': {
    label: 'Price Point',
    placeholder: 'e.g., $29/month, $5/listing',
    required: false,
    usedIn: ['business-one-pager', 'landing-page'],
  },
  'phase2.designPrinciples': {
    label: 'Design Principles',
    placeholder: 'Core UX principles guiding your design',
    required: false,
    usedIn: ['design-brief', 'style-guide'],
    type: 'array',
  },
  'phase3.authStrategy': {
    label: 'Authentication Strategy',
    placeholder: 'e.g., Email/password + OAuth (Google, GitHub)',
    required: false,
    usedIn: ['architecture-doc', 'security-review'],
  },
  'phase3.securityNotes': {
    label: 'Security Notes',
    placeholder: 'Key security considerations and decisions',
    required: false,
    usedIn: ['architecture-doc', 'security-review'],
    type: 'textarea',
  },
  'phase4.repoUrl': {
    label: 'Repository URL',
    placeholder: 'e.g., https://github.com/username/project',
    required: false,
    usedIn: ['build-setup'],
  },
  'phase4.projectFolder': {
    label: 'Project Folder',
    placeholder: 'e.g., ~/projects/my-saas',
    required: false,
    usedIn: ['build-setup'],
  },
  'phase5.stagingUrl': {
    label: 'Staging URL',
    placeholder: 'e.g., https://staging.myapp.com',
    required: false,
    usedIn: ['launch-checklist'],
  },
  'phase5.productionUrl': {
    label: 'Production URL',
    placeholder: 'e.g., https://myapp.com',
    required: false,
    usedIn: ['launch-checklist', 'marketing'],
  },
  'phase5.launchDate': {
    label: 'Launch Date',
    placeholder: 'e.g., 2025-03-15',
    required: false,
    usedIn: ['launch-checklist'],
  },
};

// Helper to get nested value from path
export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.');
  let value: unknown = obj;
  for (const key of keys) {
    if (value === null || value === undefined) return undefined;
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

// Helper to set nested value from path
export function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.');
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      current[keys[i]] = {};
    }
    current = current[keys[i]] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}
