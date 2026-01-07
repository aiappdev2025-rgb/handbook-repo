// Conductor System - Project Data Schema
// Defines the structure for user project data that auto-fills prompts throughout the handbook

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
