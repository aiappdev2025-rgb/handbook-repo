import React, { useState } from 'react';
import styles from './styles.module.css';

interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  template: string;
  variables: string[];
}

interface MilestoneData {
  id: string;
  title: string;
  prompts: PromptTemplate[];
}

interface PhaseData {
  id: string;
  title: string;
  color: string;
  milestones: MilestoneData[];
}

const PHASES: PhaseData[] = [
  {
    id: 'phase1',
    title: 'Phase 1: Validate',
    color: '#FF6B6B',
    milestones: [
      {
        id: 'opportunity',
        title: 'Opportunity Assessment',
        prompts: [
          {
            id: 'market-research',
            title: 'Market Research',
            description: 'Research market opportunity for your SaaS idea',
            template: `I'm building a SaaS product for [TARGET_MARKET] that solves [PROBLEM].

Help me conduct market research:
1. Identify the total addressable market (TAM)
2. Find 5 direct competitors and analyze their pricing
3. Identify gaps in current solutions
4. Estimate demand indicators (search volume, community size)

Format as a structured report with sources.`,
            variables: ['TARGET_MARKET', 'PROBLEM'],
          },
          {
            id: 'competitive-analysis',
            title: 'Competitive Analysis',
            description: 'Analyze competitors and positioning',
            template: `Analyze these competitors for [PRODUCT_TYPE]:
[COMPETITOR_LIST]

For each, extract:
- Pricing tiers and model
- Core features
- Target audience
- Positioning/messaging
- Weaknesses and gaps

Conclude with differentiation opportunities for a new entrant.`,
            variables: ['PRODUCT_TYPE', 'COMPETITOR_LIST'],
          },
        ],
      },
      {
        id: 'design-brief',
        title: 'Design Brief',
        prompts: [
          {
            id: 'one-pager',
            title: 'Business One-Pager',
            description: 'Generate a business one-pager for your SaaS',
            template: `Create a business one-pager for my SaaS:

Product: [PRODUCT_NAME]
Problem: [PROBLEM_STATEMENT]
Solution: [SOLUTION_APPROACH]
Target User: [TARGET_USER]

Include:
- Value proposition (one sentence)
- Key features (3-5 bullets)
- Business model
- Success metrics
- MVP scope recommendation`,
            variables: ['PRODUCT_NAME', 'PROBLEM_STATEMENT', 'SOLUTION_APPROACH', 'TARGET_USER'],
          },
        ],
      },
    ],
  },
  {
    id: 'phase2',
    title: 'Phase 2: Design',
    color: '#4ECDC4',
    milestones: [
      {
        id: 'ux-design',
        title: 'UX Design',
        prompts: [
          {
            id: 'user-flows',
            title: 'User Flow Design',
            description: 'Design core user flows',
            template: `Design user flows for [PRODUCT_NAME]:

Core features: [FEATURE_LIST]
User types: [USER_TYPES]

For each flow, provide:
1. Entry point and trigger
2. Step-by-step screens/actions
3. Decision points and branches
4. Success/error states
5. Exit points

Format as Mermaid flowcharts.`,
            variables: ['PRODUCT_NAME', 'FEATURE_LIST', 'USER_TYPES'],
          },
          {
            id: 'ui-system',
            title: 'UI System Definition',
            description: 'Define UI design system',
            template: `Create a UI system specification for [PRODUCT_NAME]:

Style: [DESIGN_STYLE] (e.g., minimal, corporate, playful)
Primary color: [PRIMARY_COLOR]

Define:
- Color palette (primary, secondary, semantic)
- Typography scale (headings, body, captions)
- Spacing system (4px or 8px base)
- Component patterns (buttons, inputs, cards)
- Tailwind CSS configuration

Output as a design tokens JSON + Tailwind config.`,
            variables: ['PRODUCT_NAME', 'DESIGN_STYLE', 'PRIMARY_COLOR'],
          },
        ],
      },
    ],
  },
  {
    id: 'phase3',
    title: 'Phase 3: Architect',
    color: '#45B7D1',
    milestones: [
      {
        id: 'solution-arch',
        title: 'Solution Architecture',
        prompts: [
          {
            id: 'tech-stack',
            title: 'Tech Stack Decision',
            description: 'Choose and document tech stack',
            template: `Help me choose a tech stack for [PRODUCT_NAME]:

Requirements:
- [REQUIREMENT_1]
- [REQUIREMENT_2]
- [REQUIREMENT_3]

Constraints: [CONSTRAINTS]
Team experience: [TECH_EXPERIENCE]

Compare options and recommend:
- Frontend framework
- Backend/API approach
- Database
- Auth solution
- Hosting/deployment

Format as an ADR (Architecture Decision Record).`,
            variables: ['PRODUCT_NAME', 'REQUIREMENT_1', 'REQUIREMENT_2', 'REQUIREMENT_3', 'CONSTRAINTS', 'TECH_EXPERIENCE'],
          },
          {
            id: 'data-model',
            title: 'Data Model Design',
            description: 'Design database schema',
            template: `Design the data model for [PRODUCT_NAME]:

Core entities: [ENTITY_LIST]
Key relationships: [RELATIONSHIPS]
Multi-tenancy: [MULTI_TENANT_YN]

Provide:
1. Entity-relationship diagram (Mermaid)
2. Prisma schema with all fields and relations
3. Indexes for common queries
4. Soft delete and audit fields where appropriate`,
            variables: ['PRODUCT_NAME', 'ENTITY_LIST', 'RELATIONSHIPS', 'MULTI_TENANT_YN'],
          },
        ],
      },
      {
        id: 'build-contract',
        title: 'Build Contract',
        prompts: [
          {
            id: 'spec-generation',
            title: 'Feature SPEC Generation',
            description: 'Generate a detailed feature SPEC',
            template: `Create a detailed SPEC for: [FEATURE_NAME]

Context:
- Product: [PRODUCT_NAME]
- This feature: [FEATURE_DESCRIPTION]
- User story: As a [USER_TYPE], I want [GOAL] so that [BENEFIT]

Generate a complete SPEC with:
1. Overview and requirements
2. EARS-format requirements (When/While/If conditions)
3. Data model changes
4. API endpoints with request/response schemas
5. UI component breakdown
6. Test cases
7. Edge cases and error handling
8. Acceptance criteria`,
            variables: ['FEATURE_NAME', 'PRODUCT_NAME', 'FEATURE_DESCRIPTION', 'USER_TYPE', 'GOAL', 'BENEFIT'],
          },
        ],
      },
    ],
  },
  {
    id: 'phase4',
    title: 'Phase 4: Build',
    color: '#96CEB4',
    milestones: [
      {
        id: 'm1-foundation',
        title: 'M1: Foundation',
        prompts: [
          {
            id: 'project-init',
            title: 'Project Initialization',
            description: 'Initialize Next.js project with full stack',
            template: `Initialize a new Next.js project for [PRODUCT_NAME]:

Stack:
- Next.js 14+ with App Router
- TypeScript strict mode
- Tailwind CSS
- Prisma + [DATABASE]
- [AUTH_PROVIDER] for auth

Set up:
1. Project structure following feature-first organization
2. ESLint + Prettier configuration
3. Path aliases (@/ imports)
4. Environment variables template
5. Basic CLAUDE.md for AI-assisted development

Create the foundation with a working dev environment.`,
            variables: ['PRODUCT_NAME', 'DATABASE', 'AUTH_PROVIDER'],
          },
        ],
      },
      {
        id: 'm2-database',
        title: 'M2: Database',
        prompts: [
          {
            id: 'prisma-setup',
            title: 'Prisma Schema Setup',
            description: 'Set up complete Prisma schema',
            template: `Implement the Prisma schema for [PRODUCT_NAME]:

Based on this data model:
[DATA_MODEL_DESCRIPTION]

Include:
1. All models with proper relations
2. Indexes for query performance
3. Soft delete (deletedAt) on relevant models
4. Audit fields (createdAt, updatedAt)
5. Enum types where appropriate
6. Database seed script with sample data

After schema, run migration and verify.`,
            variables: ['PRODUCT_NAME', 'DATA_MODEL_DESCRIPTION'],
          },
        ],
      },
      {
        id: 'm5-auth',
        title: 'M5: Authentication',
        prompts: [
          {
            id: 'auth-implementation',
            title: 'Auth Implementation',
            description: 'Implement authentication flow',
            template: `Implement authentication for [PRODUCT_NAME] using [AUTH_PROVIDER]:

Requirements:
- Email/password login
- OAuth providers: [OAUTH_PROVIDERS]
- Protected routes middleware
- Session management
- User profile linked to auth

Implement:
1. Auth configuration
2. Sign up / Sign in pages
3. Protected route wrapper
4. User context/hook
5. Logout functionality
6. Tests for auth flows`,
            variables: ['PRODUCT_NAME', 'AUTH_PROVIDER', 'OAUTH_PROVIDERS'],
          },
        ],
      },
      {
        id: 'm6-features',
        title: 'M6: Core Features',
        prompts: [
          {
            id: 'feature-tdd',
            title: 'TDD Feature Implementation',
            description: 'Implement feature with TDD workflow',
            template: `Implement [FEATURE_NAME] using TDD workflow:

SPEC:
[PASTE_SPEC_HERE]

Workflow:
1. Write failing tests first (unit + integration)
2. Implement minimum code to pass
3. Refactor while keeping tests green
4. Add edge case tests
5. Document the implementation

Use existing patterns from codebase. Run tests after each step.`,
            variables: ['FEATURE_NAME', 'PASTE_SPEC_HERE'],
          },
        ],
      },
      {
        id: 'm9-payments',
        title: 'M9: Payments',
        prompts: [
          {
            id: 'stripe-integration',
            title: 'Stripe Integration',
            description: 'Integrate Stripe for payments',
            template: `Integrate Stripe payments for [PRODUCT_NAME]:

Pricing tiers:
[PRICING_TIERS]

Implement:
1. Stripe SDK setup
2. Checkout session creation
3. Webhook handling (checkout.completed, subscription events)
4. Customer portal link
5. Subscription status sync to database
6. Feature gating based on plan
7. Tests with Stripe test mode`,
            variables: ['PRODUCT_NAME', 'PRICING_TIERS'],
          },
        ],
      },
    ],
  },
  {
    id: 'phase5',
    title: 'Phase 5: Launch',
    color: '#DDA0DD',
    milestones: [
      {
        id: 'qa-deployment',
        title: 'QA & Deployment',
        prompts: [
          {
            id: 'deployment-checklist',
            title: 'Deployment Checklist',
            description: 'Pre-launch deployment checklist',
            template: `Create deployment checklist for [PRODUCT_NAME]:

Deployment target: [DEPLOYMENT_TARGET]
Domain: [DOMAIN]

Verify:
1. Environment variables configured
2. Database migrations applied
3. API endpoints tested
4. Auth flows working
5. Payment webhooks configured
6. Error tracking set up
7. Analytics installed
8. SEO meta tags
9. Performance baseline
10. Security headers

Run through each item and report status.`,
            variables: ['PRODUCT_NAME', 'DEPLOYMENT_TARGET', 'DOMAIN'],
          },
        ],
      },
    ],
  },
];

export default function PromptBuilder(): JSX.Element {
  const [selectedPhase, setSelectedPhase] = useState<string>('');
  const [selectedMilestone, setSelectedMilestone] = useState<string>('');
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const phase = PHASES.find(p => p.id === selectedPhase);
  const milestone = phase?.milestones.find(m => m.id === selectedMilestone);
  const prompt = milestone?.prompts.find(p => p.id === selectedPrompt);

  const handlePhaseChange = (phaseId: string) => {
    setSelectedPhase(phaseId);
    setSelectedMilestone('');
    setSelectedPrompt('');
    setVariables({});
  };

  const handleMilestoneChange = (milestoneId: string) => {
    setSelectedMilestone(milestoneId);
    setSelectedPrompt('');
    setVariables({});
  };

  const handlePromptChange = (promptId: string) => {
    setSelectedPrompt(promptId);
    setVariables({});
  };

  const handleVariableChange = (key: string, value: string) => {
    setVariables(prev => ({ ...prev, [key]: value }));
  };

  const generatePrompt = (): string => {
    if (!prompt) return '';
    let result = prompt.template;
    for (const variable of prompt.variables) {
      const value = variables[variable] || `[${variable}]`;
      result = result.replace(new RegExp(`\\[${variable}\\]`, 'g'), value);
    }
    return result;
  };

  const copyToClipboard = async () => {
    const text = generatePrompt();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.promptBuilder}>
      <div className={styles.header}>
        <h2>Prompt Builder</h2>
        <p>Generate copy-paste prompts for Claude Code based on MOAI methodology</p>
      </div>

      <div className={styles.selectors}>
        <div className={styles.selectorGroup}>
          <label>Phase</label>
          <select
            value={selectedPhase}
            onChange={e => handlePhaseChange(e.target.value)}
            className={styles.select}
          >
            <option value="">Select Phase...</option>
            {PHASES.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        {phase && (
          <div className={styles.selectorGroup}>
            <label>Milestone</label>
            <select
              value={selectedMilestone}
              onChange={e => handleMilestoneChange(e.target.value)}
              className={styles.select}
            >
              <option value="">Select Milestone...</option>
              {phase.milestones.map(m => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </div>
        )}

        {milestone && (
          <div className={styles.selectorGroup}>
            <label>Prompt Template</label>
            <select
              value={selectedPrompt}
              onChange={e => handlePromptChange(e.target.value)}
              className={styles.select}
            >
              <option value="">Select Prompt...</option>
              {milestone.prompts.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {prompt && (
        <>
          <div className={styles.description}>
            <strong>{prompt.title}</strong>: {prompt.description}
          </div>

          <div className={styles.variablesSection}>
            <h3>Fill in Variables</h3>
            <div className={styles.variableInputs}>
              {prompt.variables.map(variable => (
                <div key={variable} className={styles.variableInput}>
                  <label>{variable.replace(/_/g, ' ')}</label>
                  <input
                    type="text"
                    value={variables[variable] || ''}
                    onChange={e => handleVariableChange(variable, e.target.value)}
                    placeholder={`Enter ${variable.toLowerCase().replace(/_/g, ' ')}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.outputSection}>
            <div className={styles.outputHeader}>
              <h3>Generated Prompt</h3>
              <button onClick={copyToClipboard} className={styles.copyButton}>
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <pre className={styles.output}>{generatePrompt()}</pre>
          </div>
        </>
      )}

      {!selectedPhase && (
        <div className={styles.placeholder}>
          <p>Select a phase to get started with prompt generation</p>
        </div>
      )}
    </div>
  );
}
