// Conductor System - Auto-Parse Artifacts
// Extracts structured data from artifact content back into project fields

import {artifactDefinitions} from './conductorSchema';

export interface ParseResult {
  extracted: Record<string, unknown>;
  confidence: number;
}

// Main parser function - detects artifact type and extracts fields
export function parseArtifact(artifactId: string, content: string): ParseResult {
  const definition = artifactDefinitions[artifactId];
  if (!definition || !definition.extractFields?.length) {
    return {extracted: {}, confidence: 0};
  }

  const extracted: Record<string, unknown> = {};
  let fieldsFound = 0;

  switch (artifactId) {
    case 'market-research':
      extracted['phase1.marketTAM'] = extractMarketSize(content, 'TAM');
      extracted['phase1.marketSAM'] = extractMarketSize(content, 'SAM');
      extracted['phase1.marketSOM'] = extractMarketSize(content, 'SOM');
      fieldsFound = Object.values(extracted).filter((v) => v).length;
      break;

    case 'business-one-pager':
      extracted['phase1.productConcept'] = extractSection(content, [
        'Product Concept',
        'Solution Overview',
        'Product Overview',
      ]);
      extracted['phase1.problemStatement'] = extractSection(content, [
        'Problem Statement',
        'Problem',
        'The Problem',
      ]);
      extracted['phase1.pricingModel'] = extractPricingModel(content);
      fieldsFound = Object.values(extracted).filter((v) => v).length;
      break;

    case 'competitive-analysis':
      extracted['phase1.competitors'] = extractCompetitors(content);
      fieldsFound = (extracted['phase1.competitors'] as unknown[])?.length > 0 ? 1 : 0;
      break;

    case 'mvp-scope':
      extracted['phase1.mvpFeatures'] = extractFeatures(content, [
        'MVP Features',
        'Core Features',
        'Features',
      ]);
      extracted['phase1.outOfScope'] = extractListItems(content, [
        'Out of Scope',
        'Not Included',
        'Excluded',
      ]);
      fieldsFound = Object.values(extracted).filter(
        (v) => v && (Array.isArray(v) ? v.length > 0 : true)
      ).length;
      break;

    case 'design-brief':
      extracted['phase2.coreFeatures'] = extractFeatures(content, [
        'Core Features',
        'Features',
        'Key Features',
      ]);
      extracted['phase2.userPersonas'] = extractPersonas(content);
      fieldsFound = Object.values(extracted).filter(
        (v) => v && (Array.isArray(v) ? v.length > 0 : true)
      ).length;
      break;

    case 'design-philosophy':
      extracted['phase2.designPrinciples'] = extractListItems(content, [
        'Design Principles',
        'Principles',
        'Guiding Principles',
      ]);
      fieldsFound = (extracted['phase2.designPrinciples'] as string[])?.length > 0 ? 1 : 0;
      break;

    case 'ux-package':
      extracted['phase2.keyUserFlows'] = extractUserFlows(content);
      fieldsFound = (extracted['phase2.keyUserFlows'] as unknown[])?.length > 0 ? 1 : 0;
      break;

    case 'solution-architecture':
      extracted['phase3.techStack'] = extractTechStack(content);
      fieldsFound =
        Object.values((extracted['phase3.techStack'] as Record<string, string>) || {}).filter(
          (v) => v
        ).length > 0
          ? 1
          : 0;
      break;

    case 'data-model':
      extracted['phase3.entities'] = extractEntities(content);
      fieldsFound = (extracted['phase3.entities'] as unknown[])?.length > 0 ? 1 : 0;
      break;

    case 'api-spec':
      extracted['phase3.apiEndpoints'] = extractApiEndpoints(content);
      fieldsFound = (extracted['phase3.apiEndpoints'] as unknown[])?.length > 0 ? 1 : 0;
      break;

    case 'security-architecture':
      extracted['phase3.authStrategy'] = extractSection(content, [
        'Auth Strategy',
        'Authentication',
        'Auth',
      ]);
      fieldsFound = extracted['phase3.authStrategy'] ? 1 : 0;
      break;

    default:
      break;
  }

  const totalFields = definition.extractFields.length;
  const confidence = totalFields > 0 ? Math.round((fieldsFound / totalFields) * 100) : 0;

  // Filter out empty/null values
  const cleanExtracted: Record<string, unknown> = {};
  Object.entries(extracted).forEach(([key, value]) => {
    if (value && (Array.isArray(value) ? value.length > 0 : true)) {
      cleanExtracted[key] = value;
    }
  });

  return {extracted: cleanExtracted, confidence};
}

// Extract market size values (TAM, SAM, SOM)
function extractMarketSize(content: string, type: string): string | null {
  const patterns = [
    new RegExp(`\\*\\*${type}\\*\\*[:\\s]*([\\$\\d\\.]+[BMK]?)`, 'i'),
    new RegExp(`${type}[:\\s]*([\\$\\d\\.]+[BMK]?)`, 'i'),
    new RegExp(
      `${
        type === 'TAM'
          ? 'Total Addressable Market'
          : type === 'SAM'
            ? 'Serviceable Addressable Market'
            : 'Serviceable Obtainable Market'
      }[:\\s]*([\\$\\d\\.]+[BMK]?)`,
      'i'
    ),
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Extract a section by heading
function extractSection(content: string, headings: string[]): string | null {
  for (const heading of headings) {
    // Try markdown heading format
    const headingPattern = new RegExp(
      `(?:^|\\n)#+\\s*${heading}[\\s\\S]*?\\n([\\s\\S]*?)(?=\\n#|$)`,
      'i'
    );
    let match = content.match(headingPattern);
    if (match) {
      const text = match[1]
        .trim()
        .split('\n')[0]
        .replace(/^\*\*|\*\*$/g, '')
        .trim();
      if (text && text.length > 10) return text;
    }

    // Try bold format
    const boldPattern = new RegExp(`\\*\\*${heading}\\*\\*[:\\s]*([^\\n]+)`, 'i');
    match = content.match(boldPattern);
    if (match) return match[1].trim();

    // Try colon format
    const colonPattern = new RegExp(`${heading}[:\\s]+([^\\n]+)`, 'i');
    match = content.match(colonPattern);
    if (match) return match[1].trim();
  }
  return null;
}

// Extract pricing model
function extractPricingModel(content: string): string | null {
  const models = ['subscription', 'freemium', 'usage', 'one-time', 'tiered'];
  const lowerContent = content.toLowerCase();

  for (const model of models) {
    if (lowerContent.includes(model)) return model;
  }
  return null;
}

interface Competitor {
  name: string;
  strengths: string;
  weaknesses: string;
}

// Extract competitors as array
function extractCompetitors(content: string): Competitor[] {
  const competitors: Competitor[] = [];

  // Look for competitor sections or lists
  const lines = content.split('\n');
  let inCompetitorSection = false;

  for (const line of lines) {
    if (line.match(/competitor|competition|versus|vs\./i)) {
      inCompetitorSection = true;
    }

    if (inCompetitorSection) {
      // Match list items or headings that look like competitor names
      const listMatch = line.match(/^[-*\u2022]\s*\*?\*?([A-Z][A-Za-z0-9\s.]+)\*?\*?/);
      const headingMatch = line.match(/^#{2,4}\s*([A-Z][A-Za-z0-9\s.]+)/);

      if (listMatch) {
        const name = listMatch[1].trim().replace(/\*\*/g, '');
        if (name.length > 2 && name.length < 50) {
          competitors.push({name, strengths: '', weaknesses: ''});
        }
      } else if (headingMatch) {
        const name = headingMatch[1].trim();
        if (name.length > 2 && name.length < 50 && !name.match(/strength|weakness|overview|analysis/i)) {
          competitors.push({name, strengths: '', weaknesses: ''});
        }
      }
    }
  }

  return competitors.slice(0, 10); // Limit to 10
}

interface Feature {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

// Extract features
function extractFeatures(content: string, headings: string[]): Feature[] {
  const features: Feature[] = [];

  for (const heading of headings) {
    const sectionPattern = new RegExp(
      `(?:^|\\n)#+\\s*${heading}[\\s\\S]*?\\n([\\s\\S]*?)(?=\\n#|$)`,
      'i'
    );
    const match = content.match(sectionPattern);

    if (match) {
      const section = match[1];
      const lines = section.split('\n');

      for (const line of lines) {
        const listMatch = line.match(/^[-*\u2022]\s*\*?\*?([^:*]+)\*?\*?[:\s]*(.*)?/);
        if (listMatch) {
          const name = listMatch[1].trim().replace(/\*\*/g, '');
          const description = listMatch[2]?.trim() || '';
          if (name.length > 2 && name.length < 100) {
            features.push({name, description, priority: 'medium'});
          }
        }
      }
    }
  }

  return features.slice(0, 20); // Limit to 20
}

// Extract list items
function extractListItems(content: string, headings: string[]): string[] {
  const items: string[] = [];

  for (const heading of headings) {
    const sectionPattern = new RegExp(
      `(?:^|\\n)#+\\s*${heading}[\\s\\S]*?\\n([\\s\\S]*?)(?=\\n#|$)`,
      'i'
    );
    const match = content.match(sectionPattern);

    if (match) {
      const section = match[1];
      const lines = section.split('\n');

      for (const line of lines) {
        const listMatch = line.match(/^[-*\u2022]\s*(.+)/);
        if (listMatch) {
          const item = listMatch[1].trim().replace(/\*\*/g, '');
          if (item.length > 2 && item.length < 200) {
            items.push(item);
          }
        }
      }
    }
  }

  return items.slice(0, 20);
}

interface Persona {
  name: string;
  description: string;
  goals: string[];
  painPoints: string[];
}

// Extract user personas
function extractPersonas(content: string): Persona[] {
  const personas: Persona[] = [];

  // Look for persona patterns
  const personaPattern = /(?:^|\n)#{2,4}\s*(?:Persona[:\s]*)?([A-Z][^#\n]+?)(?:\n|\s*$)/gi;
  let match;

  while ((match = personaPattern.exec(content)) !== null) {
    const name = match[1]
      .trim()
      .replace(/[:\u2013\u2014-]/g, '')
      .trim();
    if (name.length > 2 && name.length < 100 && !name.match(/overview|summary|description|user persona/i)) {
      personas.push({
        name,
        description: '',
        goals: [],
        painPoints: [],
      });
    }
  }

  return personas.slice(0, 5);
}

interface UserFlow {
  name: string;
  steps: string[];
}

// Extract user flows
function extractUserFlows(content: string): UserFlow[] {
  const flows: UserFlow[] = [];

  // Look for flow headings
  const flowPattern =
    /(?:^|\n)#{2,4}\s*(?:Flow[:\s]*|User Flow[:\s]*)?([^#\n]+?Flow[^#\n]*|[^#\n]*Journey[^#\n]*)/gi;
  let match;

  while ((match = flowPattern.exec(content)) !== null) {
    const name = match[1].trim();
    if (name.length > 2 && name.length < 100) {
      flows.push({name, steps: []});
    }
  }

  return flows.slice(0, 10);
}

interface TechStack {
  frontend: string;
  backend: string;
  database: string;
  hosting: string;
  auth: string;
  payments: string;
  ai: string;
}

// Extract tech stack
function extractTechStack(content: string): TechStack {
  const stack: TechStack = {
    frontend: '',
    backend: '',
    database: '',
    hosting: '',
    auth: '',
    payments: '',
    ai: '',
  };

  const patterns: Record<keyof TechStack, RegExp> = {
    frontend: /(?:frontend|front-end|ui|client)[:\s]*([^\n,]+)/i,
    backend: /(?:backend|back-end|server|api)[:\s]*([^\n,]+)/i,
    database: /(?:database|db|data store)[:\s]*([^\n,]+)/i,
    hosting: /(?:hosting|deployment|infrastructure|cloud)[:\s]*([^\n,]+)/i,
    auth: /(?:auth|authentication|identity)[:\s]*([^\n,]+)/i,
    payments: /(?:payments?|billing|stripe)[:\s]*([^\n,]+)/i,
    ai: /(?:ai|llm|ml|machine learning|claude|openai|gpt)[:\s]*([^\n,]+)/i,
  };

  (Object.entries(patterns) as [keyof TechStack, RegExp][]).forEach(([key, pattern]) => {
    const match = content.match(pattern);
    if (match) {
      stack[key] = match[1]
        .trim()
        .replace(/\*\*/g, '')
        .substring(0, 100);
    }
  });

  return stack;
}

interface Entity {
  name: string;
  fields: string[];
  relationships: string[];
}

// Extract entities/tables
function extractEntities(content: string): Entity[] {
  const entities: Entity[] = [];

  // Look for table/entity headings
  const entityPattern =
    /(?:^|\n)#{2,4}\s*(?:Table[:\s]*|Entity[:\s]*)?([A-Z][a-z]+(?:s|es)?)\s*(?:Table|Entity)?/g;
  let match;

  while ((match = entityPattern.exec(content)) !== null) {
    const name = match[1].trim();
    if (name.length > 2 && name.length < 50 && !name.match(/overview|summary|description|schema/i)) {
      entities.push({
        name,
        fields: [],
        relationships: [],
      });
    }
  }

  return entities.slice(0, 20);
}

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
}

// Extract API endpoints
function extractApiEndpoints(content: string): ApiEndpoint[] {
  const endpoints: ApiEndpoint[] = [];

  // Look for HTTP method patterns
  const endpointPattern = /(?:^|\n)\s*(GET|POST|PUT|PATCH|DELETE)\s+([/\w\-{}:]+)/gi;
  let match;

  while ((match = endpointPattern.exec(content)) !== null) {
    const method = match[1].toUpperCase();
    const path = match[2].trim();

    endpoints.push({
      method,
      path,
      description: '',
    });
  }

  return endpoints.slice(0, 50);
}

// Helper to get a friendly field name from path
export function getFieldDisplayName(path: string): string {
  const lastPart = path.split('.').pop() || path;
  // Convert camelCase to Title Case
  return lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

// Helper to format extracted value for display
export function formatExtractedValue(value: unknown): string {
  if (Array.isArray(value)) {
    return `${value.length} item${value.length !== 1 ? 's' : ''}`;
  }
  if (typeof value === 'object' && value !== null) {
    const obj = value as Record<string, unknown>;
    const filled = Object.values(obj).filter((v) => v).length;
    return `${filled} field${filled !== 1 ? 's' : ''} filled`;
  }
  if (typeof value === 'string') {
    return value.length > 50 ? value.substring(0, 47) + '...' : value;
  }
  return String(value);
}
