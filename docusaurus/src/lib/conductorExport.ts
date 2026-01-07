// Conductor System - Export/Import Utilities
// Generates markdown, JSON, and ZIP exports for project data

import type {Project} from './conductorSchema';
import {artifactDefinitions} from './conductorSchema';

// Generate markdown content for a project
export function projectToMarkdown(project: Project): string {
  const md = `---
type: project-profile
version: 1.0
projectId: ${project.id}
projectName: ${project.name}
createdAt: ${project.createdAt}
updatedAt: ${project.updatedAt}
currentPhase: ${project.currentPhase}
---

# ${project.phase1.productName || project.name}

## Phase 1: Validate

### Product Overview
- **Product Name**: ${project.phase1.productName || '_Not set_'}
- **Product Concept**: ${project.phase1.productConcept || '_Not set_'}
- **Target Customer**: ${project.phase1.targetCustomer || '_Not set_'}
- **Problem Statement**: ${project.phase1.problemStatement || '_Not set_'}

### Market Research
- **TAM**: ${project.phase1.marketTAM || '_Not set_'}
- **SAM**: ${project.phase1.marketSAM || '_Not set_'}
- **SOM**: ${project.phase1.marketSOM || '_Not set_'}

### Competitors
${project.phase1.competitors?.length > 0
  ? project.phase1.competitors.map(c => `- **${c.name}**: Strengths: ${c.strengths || 'N/A'}, Weaknesses: ${c.weaknesses || 'N/A'}`).join('\n')
  : '_No competitors added_'}

### Pricing
- **Model**: ${project.phase1.pricingModel || '_Not set_'}
- **Amount**: ${project.phase1.pricingAmount || '_Not set_'}

### MVP Features
${project.phase1.mvpFeatures?.length > 0
  ? project.phase1.mvpFeatures.map(f => `- **${f.name}** (${f.priority || 'Medium'}): ${f.description || ''}`).join('\n')
  : '_No features added_'}

### Out of Scope
${project.phase1.outOfScope?.length > 0
  ? project.phase1.outOfScope.map(item => `- ${item}`).join('\n')
  : '_Not defined_'}

---

## Phase 2: Design

### User Personas
${project.phase2.userPersonas?.length > 0
  ? project.phase2.userPersonas.map(p => `
#### ${p.name}
- **Description**: ${p.description || 'N/A'}
- **Goals**: ${p.goals?.join(', ') || 'N/A'}
- **Pain Points**: ${p.painPoints?.join(', ') || 'N/A'}
`).join('\n')
  : '_No personas added_'}

### Core Features
${project.phase2.coreFeatures?.length > 0
  ? project.phase2.coreFeatures.map(f => `
#### ${f.name}
**User Stories:**
${f.userStories?.map(s => `- ${s}`).join('\n') || '- _None_'}

**Acceptance Criteria:**
${f.acceptanceCriteria?.map(c => `- ${c}`).join('\n') || '- _None_'}
`).join('\n')
  : '_No features defined_'}

### Design Principles
${project.phase2.designPrinciples?.length > 0
  ? project.phase2.designPrinciples.map(p => `- ${p}`).join('\n')
  : '_Not defined_'}

### Key User Flows
${project.phase2.keyUserFlows?.length > 0
  ? project.phase2.keyUserFlows.map(f => `
#### ${f.name}
${f.steps?.map((s, i) => `${i + 1}. ${s}`).join('\n') || '_No steps_'}
`).join('\n')
  : '_No flows defined_'}

---

## Phase 3: Architect

### Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | ${project.phase3.techStack?.frontend || '_Not set_'} |
| Backend | ${project.phase3.techStack?.backend || '_Not set_'} |
| Database | ${project.phase3.techStack?.database || '_Not set_'} |
| Hosting | ${project.phase3.techStack?.hosting || '_Not set_'} |
| Auth | ${project.phase3.techStack?.auth || '_Not set_'} |
| Payments | ${project.phase3.techStack?.payments || '_Not set_'} |
| AI | ${project.phase3.techStack?.ai || '_Not set_'} |

### Entities
${project.phase3.entities?.length > 0
  ? project.phase3.entities.map(e => `
#### ${e.name}
**Fields:** ${e.fields?.join(', ') || 'None'}
**Relationships:** ${e.relationships?.join(', ') || 'None'}
`).join('\n')
  : '_No entities defined_'}

### API Endpoints
${project.phase3.apiEndpoints?.length > 0
  ? '| Method | Path | Description |\n|--------|------|-------------|\n' +
    project.phase3.apiEndpoints.map(e => `| ${e.method} | ${e.path} | ${e.description} |`).join('\n')
  : '_No endpoints defined_'}

### Security
- **Auth Strategy**: ${project.phase3.authStrategy || '_Not set_'}
- **Notes**: ${project.phase3.securityNotes || '_Not set_'}

---

## Phase 4: Build

- **Repo URL**: ${project.phase4.repoUrl || '_Not set_'}
- **Project Folder**: ${project.phase4.projectFolder || '_Not set_'}

### Environment Variables
${project.phase4.envVariables?.length > 0
  ? '| Key | Description |\n|-----|-------------|\n' +
    project.phase4.envVariables.map(v => `| ${v.key} | ${v.description} |`).join('\n')
  : '_No variables defined_'}

### Completed Milestones
${project.phase4.completedMilestones?.length > 0
  ? project.phase4.completedMilestones.map(m => `- [x] ${m}`).join('\n')
  : '_No milestones completed_'}

---

## Phase 5: Launch

- **Staging URL**: ${project.phase5.stagingUrl || '_Not set_'}
- **Production URL**: ${project.phase5.productionUrl || '_Not set_'}
- **Monitoring Setup**: ${project.phase5.monitoringSetup ? 'Yes' : 'No'}
- **Launch Date**: ${project.phase5.launchDate || '_Not set_'}
`;

  return md;
}

// Generate JSON export
export function projectToJSON(project: Project): string {
  return JSON.stringify(project, null, 2);
}

// Parse markdown back to project (basic parsing - extracts frontmatter)
export function markdownToProject(mdContent: string): Partial<Project> | null {
  const frontmatterMatch = mdContent.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter: Record<string, string> = {};
  frontmatterMatch[1].split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  });

  return {
    id: frontmatter.projectId,
    name: frontmatter.projectName,
    createdAt: frontmatter.createdAt,
    updatedAt: frontmatter.updatedAt,
    currentPhase: (parseInt(frontmatter.currentPhase) || 1) as 1 | 2 | 3 | 4 | 5,
  };
}

// Parse JSON back to project
export function jsonToProject(jsonContent: string): Project | null {
  try {
    return JSON.parse(jsonContent) as Project;
  } catch {
    return null;
  }
}

// Create downloadable file
export function downloadFile(content: string, filename: string, type = 'text/markdown'): void {
  const blob = new Blob([content], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Get safe filename from project name
function getSafeFilename(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project';
}

// Create ZIP file with all exports
export async function downloadProjectZip(project: Project): Promise<void> {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  const folderName = getSafeFilename(project.phase1.productName || project.name);
  const folder = zip.folder(folderName);

  if (!folder) return;

  // Add main profile files
  folder.file('project-profile.md', projectToMarkdown(project));
  folder.file('project-profile.json', projectToJSON(project));

  // Generate ZIP
  const content = await zip.generateAsync({type: 'blob'});
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${folderName}-export.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Export all projects as a single ZIP
export async function downloadAllProjectsZip(projects: Project[]): Promise<void> {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  projects.forEach((project) => {
    const folderName = getSafeFilename(project.phase1.productName || project.name);
    const folder = zip.folder(folderName);
    if (folder) {
      folder.file('project-profile.md', projectToMarkdown(project));
      folder.file('project-profile.json', projectToJSON(project));
    }
  });

  // Add combined JSON
  zip.file('all-projects.json', JSON.stringify(projects, null, 2));

  const content = await zip.generateAsync({type: 'blob'});
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'all-projects-export.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Phase definitions for export organization
const phases = [
  {num: 1, name: 'phase-1-validate'},
  {num: 2, name: 'phase-2-design'},
  {num: 3, name: 'phase-3-architect'},
  {num: 4, name: 'phase-4-build'},
  {num: 5, name: 'phase-5-launch'},
];

// Export project with artifacts as ZIP
export async function downloadFullProjectZip(project: Project): Promise<void> {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  const projectName = getSafeFilename(project.phase1.productName || project.name);
  const root = zip.folder(projectName);

  if (!root) return;

  // Add project profile
  root.file('project-profile.md', projectToMarkdown(project));
  root.file('project-profile.json', projectToJSON(project));

  // Add artifacts organized by phase
  const artifactsFolder = root.folder('artifacts');

  if (artifactsFolder) {
    phases.forEach((phase) => {
      const phaseArtifacts = Object.entries(artifactDefinitions).filter(
        ([, def]) => def.phase === phase.num
      );

      if (phaseArtifacts.length > 0) {
        const phaseFolder = artifactsFolder.folder(phase.name);

        if (phaseFolder) {
          phaseArtifacts.forEach(([id, def]) => {
            const artifact = project.artifacts?.[id];
            if (artifact?.currentContent) {
              // Add current content
              phaseFolder.file(def.filename, artifact.currentContent);

              // Add versions if they exist
              if (artifact.versions?.length > 0) {
                const versionsFolder = phaseFolder.folder(`${id}-versions`);
                if (versionsFolder) {
                  artifact.versions.forEach((version, index) => {
                    const versionFilename = `v${index + 1}-${version.createdAt.split('T')[0]}.md`;
                    versionsFolder.file(versionFilename, version.content);
                  });
                }
              }
            }
          });
        }
      }
    });
  }

  // Add README for the export
  const readme = `# ${project.phase1.productName || project.name} - Project Export

Exported: ${new Date().toISOString()}

## Contents

- \`project-profile.md\` - Project overview and field data
- \`project-profile.json\` - Machine-readable project data
- \`artifacts/\` - All generated documents organized by phase

## Artifacts by Phase

${phases
  .map((phase) => {
    const phaseArtifacts = Object.entries(artifactDefinitions)
      .filter(([, def]) => def.phase === phase.num)
      .map(([id, def]) => {
        const artifact = project.artifacts?.[id];
        const status = artifact?.status || 'empty';
        const statusIcon = status === 'complete' ? '✅' : status === 'draft' ? '📝' : '⬜';
        return `  - ${statusIcon} ${def.filename}`;
      })
      .join('\n');
    return `### Phase ${phase.num}\n${phaseArtifacts}`;
  })
  .join('\n\n')}

## Importing

To import this project back into MOAI Handbook:
1. Go to My Project page
2. Click Import
3. Select \`project-profile.json\`

Note: Artifacts must be re-uploaded individually after import.
`;

  root.file('README.md', readme);

  // Generate and download ZIP
  const content = await zip.generateAsync({type: 'blob'});
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName}-full-export.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Export only artifacts (no profile)
export async function downloadArtifactsZip(project: Project): Promise<boolean> {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  const projectName = getSafeFilename(project.phase1.productName || project.name);

  let hasArtifacts = false;

  phases.forEach((phase) => {
    const phaseArtifacts = Object.entries(artifactDefinitions).filter(
      ([, def]) => def.phase === phase.num
    );

    phaseArtifacts.forEach(([id, def]) => {
      const artifact = project.artifacts?.[id];
      if (artifact?.currentContent) {
        hasArtifacts = true;
        zip.file(`${phase.name}/${def.filename}`, artifact.currentContent);
      }
    });
  });

  if (!hasArtifacts) {
    return false;
  }

  const content = await zip.generateAsync({type: 'blob'});
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName}-artifacts.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}

// Export single phase artifacts
export async function downloadPhaseArtifactsZip(
  project: Project,
  phaseNum: number
): Promise<boolean> {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  const projectName = getSafeFilename(project.phase1.productName || project.name);
  const phaseName = `phase-${phaseNum}`;

  const phaseArtifacts = Object.entries(artifactDefinitions).filter(
    ([, def]) => def.phase === phaseNum
  );

  let hasArtifacts = false;

  phaseArtifacts.forEach(([id, def]) => {
    const artifact = project.artifacts?.[id];
    if (artifact?.currentContent) {
      hasArtifacts = true;
      zip.file(def.filename, artifact.currentContent);
    }
  });

  if (!hasArtifacts) {
    return false;
  }

  const content = await zip.generateAsync({type: 'blob'});
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName}-${phaseName}-artifacts.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}

// Generate artifact summary for markdown export
export interface ArtifactSummary {
  phase: number;
  total: number;
  completed: number;
  drafts: number;
  empty: number;
}

export function getArtifactSummary(project: Project): ArtifactSummary[] {
  const summary: ArtifactSummary[] = [];

  [1, 2, 3, 4, 5].forEach((phaseNum) => {
    const phaseArtifacts = Object.entries(artifactDefinitions).filter(
      ([, def]) => def.phase === phaseNum
    );

    const completed = phaseArtifacts.filter(
      ([id]) => project.artifacts?.[id]?.status === 'complete'
    ).length;

    const drafts = phaseArtifacts.filter(
      ([id]) => project.artifacts?.[id]?.status === 'draft'
    ).length;

    summary.push({
      phase: phaseNum,
      total: phaseArtifacts.length,
      completed,
      drafts,
      empty: phaseArtifacts.length - completed - drafts,
    });
  });

  return summary;
}
