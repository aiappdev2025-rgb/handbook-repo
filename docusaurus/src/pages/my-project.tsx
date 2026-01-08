import React, {useState, useCallback, useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import {useProject} from '../context/ProjectContext';
import {
  projectToMarkdown,
  projectToJSON,
  downloadFile,
  downloadProjectZip,
  downloadAllProjectsZip,
  downloadFullProjectZip,
  downloadArtifactsZip,
  downloadPhaseArtifactsZip,
} from '../lib/conductorExport';
import ProjectImport from '../components/ProjectImport';
import ArtifactsTab from '../components/ArtifactsTab';
import styles from './my-project.module.css';

// Types from conductor schema
type PricingModel = 'subscription' | 'usage' | 'one-time' | 'freemium' | '';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type Priority = 'high' | 'medium' | 'low';

// Debounce hook for auto-save
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Save indicator component
function SaveIndicator({saving}: {saving: boolean}) {
  return (
    <div className={styles.saveIndicator}>
      {saving ? (
        <span className={styles.saving}>Saving...</span>
      ) : (
        <span className={styles.saved}>Saved</span>
      )}
    </div>
  );
}

// Phase header with completion badge
function PhaseHeader({
  phaseNum,
  title,
  completion,
  isExpanded,
  onToggle,
  prerequisiteWarning,
}: {
  phaseNum: number;
  title: string;
  completion: number;
  isExpanded: boolean;
  onToggle: () => void;
  prerequisiteWarning?: string;
}) {
  const phaseColors = {
    1: '#3b82f6',
    2: '#ec4899',
    3: '#22c55e',
    4: '#a855f7',
    5: '#f59e0b',
  };

  const getBadgeClass = () => {
    if (completion >= 75) return styles.badgeGreen;
    if (completion >= 25) return styles.badgeAmber;
    return styles.badgeRed;
  };

  return (
    <button
      className={styles.phaseHeader}
      onClick={onToggle}
      style={{'--phase-color': phaseColors[phaseNum as keyof typeof phaseColors]} as React.CSSProperties}
    >
      <div className={styles.phaseHeaderLeft}>
        <span className={styles.phaseIndicator}>Phase {phaseNum}</span>
        <span className={styles.phaseTitle}>{title}</span>
        {prerequisiteWarning && (
          <span className={styles.prerequisiteWarning} title={prerequisiteWarning}>
            !
          </span>
        )}
      </div>
      <div className={styles.phaseHeaderRight}>
        <span className={`${styles.completionBadge} ${getBadgeClass()}`}>
          {completion}%
        </span>
        <span className={styles.expandIcon}>{isExpanded ? '−' : '+'}</span>
      </div>
    </button>
  );
}

// Generic text input with auto-save
function TextInput({
  label,
  path,
  placeholder,
  multiline,
}: {
  label: string;
  path: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const {getField, updateField, activeProjectId} = useProject();
  const [localValue, setLocalValue] = useState(getField<string>(path));
  const debouncedValue = useDebounce(localValue, 500);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    updateField(path, debouncedValue);
  }, [debouncedValue, path, updateField]);

  // Re-sync local value when project changes
  useEffect(() => {
    setLocalValue(getField<string>(path));
  }, [getField, path, activeProjectId]);

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>{label}</label>
      <InputComponent
        className={`${styles.fieldInput} ${multiline ? styles.textarea : ''}`}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        rows={multiline ? 4 : undefined}
      />
    </div>
  );
}

// Select dropdown
function SelectInput({
  label,
  path,
  options,
}: {
  label: string;
  path: string;
  options: {value: string; label: string}[];
}) {
  const {getField, updateField} = useProject();
  const value = getField<string>(path);

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>{label}</label>
      <select
        className={styles.fieldSelect}
        value={value}
        onChange={(e) => updateField(path, e.target.value)}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Repeatable group for competitors
function CompetitorsList() {
  const {getField, updateField} = useProject();
  const competitors = getField<Array<{name: string; strengths: string; weaknesses: string}>>('phase1.competitors') || [];

  const addCompetitor = () => {
    updateField('phase1.competitors', [...competitors, {name: '', strengths: '', weaknesses: ''}]);
  };

  const updateCompetitor = (index: number, field: string, value: string) => {
    const updated = [...competitors];
    updated[index] = {...updated[index], [field]: value};
    updateField('phase1.competitors', updated);
  };

  const removeCompetitor = (index: number) => {
    updateField('phase1.competitors', competitors.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.repeatableGroup}>
      <div className={styles.repeatableHeader}>
        <span className={styles.repeatableLabel}>Competitors</span>
        <button className={styles.addButton} onClick={addCompetitor}>+ Add Competitor</button>
      </div>
      {competitors.map((comp, idx) => (
        <div key={idx} className={styles.repeatableItem}>
          <div className={styles.repeatableItemHeader}>
            <span className={styles.repeatableItemIndex}>#{idx + 1}</span>
            <button className={styles.removeButton} onClick={() => removeCompetitor(idx)}>Remove</button>
          </div>
          <div className={styles.repeatableFields}>
            <input
              className={styles.fieldInput}
              placeholder="Competitor name"
              value={comp.name}
              onChange={(e) => updateCompetitor(idx, 'name', e.target.value)}
            />
            <input
              className={styles.fieldInput}
              placeholder="Strengths"
              value={comp.strengths}
              onChange={(e) => updateCompetitor(idx, 'strengths', e.target.value)}
            />
            <input
              className={styles.fieldInput}
              placeholder="Weaknesses"
              value={comp.weaknesses}
              onChange={(e) => updateCompetitor(idx, 'weaknesses', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// MVP Features list
function MvpFeaturesList() {
  const {getField, updateField} = useProject();
  const features = getField<Array<{name: string; description: string; priority: Priority}>>('phase1.mvpFeatures') || [];

  const addFeature = () => {
    updateField('phase1.mvpFeatures', [...features, {name: '', description: '', priority: 'medium'}]);
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const updated = [...features];
    updated[index] = {...updated[index], [field]: value};
    updateField('phase1.mvpFeatures', updated);
  };

  const removeFeature = (index: number) => {
    updateField('phase1.mvpFeatures', features.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.repeatableGroup}>
      <div className={styles.repeatableHeader}>
        <span className={styles.repeatableLabel}>MVP Features</span>
        <button className={styles.addButton} onClick={addFeature}>+ Add Feature</button>
      </div>
      {features.map((feature, idx) => (
        <div key={idx} className={styles.repeatableItem}>
          <div className={styles.repeatableItemHeader}>
            <span className={styles.repeatableItemIndex}>#{idx + 1}</span>
            <button className={styles.removeButton} onClick={() => removeFeature(idx)}>Remove</button>
          </div>
          <div className={styles.repeatableFields}>
            <input
              className={styles.fieldInput}
              placeholder="Feature name"
              value={feature.name}
              onChange={(e) => updateFeature(idx, 'name', e.target.value)}
            />
            <input
              className={styles.fieldInput}
              placeholder="Description"
              value={feature.description}
              onChange={(e) => updateFeature(idx, 'description', e.target.value)}
            />
            <select
              className={styles.fieldSelect}
              value={feature.priority}
              onChange={(e) => updateFeature(idx, 'priority', e.target.value)}
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

// Out of scope list (simple string array)
function OutOfScopeList() {
  const {getField, updateField} = useProject();
  const items = getField<string[]>('phase1.outOfScope') || [];

  const addItem = () => {
    updateField('phase1.outOfScope', [...items, '']);
  };

  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    updateField('phase1.outOfScope', updated);
  };

  const removeItem = (index: number) => {
    updateField('phase1.outOfScope', items.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.repeatableGroup}>
      <div className={styles.repeatableHeader}>
        <span className={styles.repeatableLabel}>Out of Scope</span>
        <button className={styles.addButton} onClick={addItem}>+ Add Item</button>
      </div>
      {items.map((item, idx) => (
        <div key={idx} className={styles.repeatableSimpleItem}>
          <input
            className={styles.fieldInput}
            placeholder="Out of scope item"
            value={item}
            onChange={(e) => updateItem(idx, e.target.value)}
          />
          <button className={styles.removeButtonSmall} onClick={() => removeItem(idx)}>×</button>
        </div>
      ))}
    </div>
  );
}

// User Personas list
function UserPersonasList() {
  const {getField, updateField} = useProject();
  const personas = getField<Array<{name: string; description: string; goals: string[]; painPoints: string[]}>>('phase2.userPersonas') || [];

  const addPersona = () => {
    updateField('phase2.userPersonas', [...personas, {name: '', description: '', goals: [], painPoints: []}]);
  };

  const updatePersona = (index: number, field: string, value: unknown) => {
    const updated = [...personas];
    updated[index] = {...updated[index], [field]: value};
    updateField('phase2.userPersonas', updated);
  };

  const removePersona = (index: number) => {
    updateField('phase2.userPersonas', personas.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.repeatableGroup}>
      <div className={styles.repeatableHeader}>
        <span className={styles.repeatableLabel}>User Personas</span>
        <button className={styles.addButton} onClick={addPersona}>+ Add Persona</button>
      </div>
      {personas.map((persona, idx) => (
        <div key={idx} className={styles.repeatableItem}>
          <div className={styles.repeatableItemHeader}>
            <span className={styles.repeatableItemIndex}>#{idx + 1}</span>
            <button className={styles.removeButton} onClick={() => removePersona(idx)}>Remove</button>
          </div>
          <div className={styles.repeatableFields}>
            <input
              className={styles.fieldInput}
              placeholder="Persona name"
              value={persona.name}
              onChange={(e) => updatePersona(idx, 'name', e.target.value)}
            />
            <textarea
              className={`${styles.fieldInput} ${styles.textarea}`}
              placeholder="Description"
              value={persona.description}
              onChange={(e) => updatePersona(idx, 'description', e.target.value)}
              rows={2}
            />
            <StringArrayInput
              label="Goals"
              value={persona.goals}
              onChange={(goals) => updatePersona(idx, 'goals', goals)}
            />
            <StringArrayInput
              label="Pain Points"
              value={persona.painPoints}
              onChange={(painPoints) => updatePersona(idx, 'painPoints', painPoints)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper for string array inputs (goals, pain points, etc.)
function StringArrayInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const addItem = () => onChange([...value, '']);
  const updateItem = (idx: number, newVal: string) => {
    const updated = [...value];
    updated[idx] = newVal;
    onChange(updated);
  };
  const removeItem = (idx: number) => onChange(value.filter((_, i) => i !== idx));

  return (
    <div className={styles.stringArrayGroup}>
      <div className={styles.stringArrayHeader}>
        <span className={styles.stringArrayLabel}>{label}</span>
        <button className={styles.addButtonSmall} onClick={addItem}>+</button>
      </div>
      {value.map((item, idx) => (
        <div key={idx} className={styles.stringArrayItem}>
          <input
            className={styles.fieldInputSmall}
            value={item}
            onChange={(e) => updateItem(idx, e.target.value)}
            placeholder={`${label} item`}
          />
          <button className={styles.removeButtonSmall} onClick={() => removeItem(idx)}>×</button>
        </div>
      ))}
    </div>
  );
}

// Core Features list
function CoreFeaturesList() {
  const {getField, updateField} = useProject();
  const features = getField<Array<{name: string; userStories: string[]; acceptanceCriteria: string[]}>>('phase2.coreFeatures') || [];

  const addFeature = () => {
    updateField('phase2.coreFeatures', [...features, {name: '', userStories: [], acceptanceCriteria: []}]);
  };

  const updateFeature = (index: number, field: string, value: unknown) => {
    const updated = [...features];
    updated[index] = {...updated[index], [field]: value};
    updateField('phase2.coreFeatures', updated);
  };

  const removeFeature = (index: number) => {
    updateField('phase2.coreFeatures', features.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.repeatableGroup}>
      <div className={styles.repeatableHeader}>
        <span className={styles.repeatableLabel}>Core Features</span>
        <button className={styles.addButton} onClick={addFeature}>+ Add Feature</button>
      </div>
      {features.map((feature, idx) => (
        <div key={idx} className={styles.repeatableItem}>
          <div className={styles.repeatableItemHeader}>
            <span className={styles.repeatableItemIndex}>#{idx + 1}</span>
            <button className={styles.removeButton} onClick={() => removeFeature(idx)}>Remove</button>
          </div>
          <div className={styles.repeatableFields}>
            <input
              className={styles.fieldInput}
              placeholder="Feature name"
              value={feature.name}
              onChange={(e) => updateFeature(idx, 'name', e.target.value)}
            />
            <StringArrayInput
              label="User Stories"
              value={feature.userStories}
              onChange={(stories) => updateFeature(idx, 'userStories', stories)}
            />
            <StringArrayInput
              label="Acceptance Criteria"
              value={feature.acceptanceCriteria}
              onChange={(criteria) => updateFeature(idx, 'acceptanceCriteria', criteria)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Design Principles (simple string array)
function DesignPrinciplesList() {
  const {getField, updateField} = useProject();
  const principles = getField<string[]>('phase2.designPrinciples') || [];

  const addItem = () => updateField('phase2.designPrinciples', [...principles, '']);
  const updateItem = (idx: number, val: string) => {
    const updated = [...principles];
    updated[idx] = val;
    updateField('phase2.designPrinciples', updated);
  };
  const removeItem = (idx: number) => updateField('phase2.designPrinciples', principles.filter((_, i) => i !== idx));

  return (
    <div className={styles.repeatableGroup}>
      <div className={styles.repeatableHeader}>
        <span className={styles.repeatableLabel}>Design Principles</span>
        <button className={styles.addButton} onClick={addItem}>+ Add Principle</button>
      </div>
      {principles.map((item, idx) => (
        <div key={idx} className={styles.repeatableSimpleItem}>
          <input
            className={styles.fieldInput}
            placeholder="Design principle"
            value={item}
            onChange={(e) => updateItem(idx, e.target.value)}
          />
          <button className={styles.removeButtonSmall} onClick={() => removeItem(idx)}>×</button>
        </div>
      ))}
    </div>
  );
}

// Key User Flows
function UserFlowsList() {
  const {getField, updateField} = useProject();
  const flows = getField<Array<{name: string; steps: string[]}>>('phase2.keyUserFlows') || [];

  const addFlow = () => {
    updateField('phase2.keyUserFlows', [...flows, {name: '', steps: []}]);
  };

  const updateFlow = (index: number, field: string, value: unknown) => {
    const updated = [...flows];
    updated[index] = {...updated[index], [field]: value};
    updateField('phase2.keyUserFlows', updated);
  };

  const removeFlow = (index: number) => {
    updateField('phase2.keyUserFlows', flows.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.repeatableGroup}>
      <div className={styles.repeatableHeader}>
        <span className={styles.repeatableLabel}>Key User Flows</span>
        <button className={styles.addButton} onClick={addFlow}>+ Add Flow</button>
      </div>
      {flows.map((flow, idx) => (
        <div key={idx} className={styles.repeatableItem}>
          <div className={styles.repeatableItemHeader}>
            <span className={styles.repeatableItemIndex}>#{idx + 1}</span>
            <button className={styles.removeButton} onClick={() => removeFlow(idx)}>Remove</button>
          </div>
          <div className={styles.repeatableFields}>
            <input
              className={styles.fieldInput}
              placeholder="Flow name"
              value={flow.name}
              onChange={(e) => updateFlow(idx, 'name', e.target.value)}
            />
            <StringArrayInput
              label="Steps"
              value={flow.steps}
              onChange={(steps) => updateFlow(idx, 'steps', steps)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Tech Stack group
function TechStackGroup() {
  const fields = [
    {key: 'frontend', label: 'Frontend', placeholder: 'e.g., Next.js, React'},
    {key: 'backend', label: 'Backend', placeholder: 'e.g., Node.js, Python'},
    {key: 'database', label: 'Database', placeholder: 'e.g., PostgreSQL, MongoDB'},
    {key: 'hosting', label: 'Hosting', placeholder: 'e.g., Vercel, AWS'},
    {key: 'auth', label: 'Auth', placeholder: 'e.g., NextAuth, Clerk'},
    {key: 'payments', label: 'Payments', placeholder: 'e.g., Stripe'},
    {key: 'ai', label: 'AI', placeholder: 'e.g., OpenAI, Claude'},
  ];

  return (
    <div className={styles.techStackGroup}>
      <div className={styles.repeatableHeader}>
        <span className={styles.repeatableLabel}>Tech Stack</span>
      </div>
      <div className={styles.techStackGrid}>
        {fields.map((field) => (
          <TextInput
            key={field.key}
            label={field.label}
            path={`phase3.techStack.${field.key}`}
            placeholder={field.placeholder}
          />
        ))}
      </div>
    </div>
  );
}

// Entities list
function EntitiesList() {
  const {getField, updateField} = useProject();
  const entities = getField<Array<{name: string; fields: string[]; relationships: string[]}>>('phase3.entities') || [];

  const addEntity = () => {
    updateField('phase3.entities', [...entities, {name: '', fields: [], relationships: []}]);
  };

  const updateEntity = (index: number, field: string, value: unknown) => {
    const updated = [...entities];
    updated[index] = {...updated[index], [field]: value};
    updateField('phase3.entities', updated);
  };

  const removeEntity = (index: number) => {
    updateField('phase3.entities', entities.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.repeatableGroup}>
      <div className={styles.repeatableHeader}>
        <span className={styles.repeatableLabel}>Entities</span>
        <button className={styles.addButton} onClick={addEntity}>+ Add Entity</button>
      </div>
      {entities.map((entity, idx) => (
        <div key={idx} className={styles.repeatableItem}>
          <div className={styles.repeatableItemHeader}>
            <span className={styles.repeatableItemIndex}>#{idx + 1}</span>
            <button className={styles.removeButton} onClick={() => removeEntity(idx)}>Remove</button>
          </div>
          <div className={styles.repeatableFields}>
            <input
              className={styles.fieldInput}
              placeholder="Entity name"
              value={entity.name}
              onChange={(e) => updateEntity(idx, 'name', e.target.value)}
            />
            <StringArrayInput
              label="Fields"
              value={entity.fields}
              onChange={(fields) => updateEntity(idx, 'fields', fields)}
            />
            <StringArrayInput
              label="Relationships"
              value={entity.relationships}
              onChange={(rels) => updateEntity(idx, 'relationships', rels)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// API Endpoints list
function ApiEndpointsList() {
  const {getField, updateField} = useProject();
  const endpoints = getField<Array<{method: HttpMethod; path: string; description: string}>>('phase3.apiEndpoints') || [];

  const addEndpoint = () => {
    updateField('phase3.apiEndpoints', [...endpoints, {method: 'GET', path: '', description: ''}]);
  };

  const updateEndpoint = (index: number, field: string, value: string) => {
    const updated = [...endpoints];
    updated[index] = {...updated[index], [field]: value};
    updateField('phase3.apiEndpoints', updated);
  };

  const removeEndpoint = (index: number) => {
    updateField('phase3.apiEndpoints', endpoints.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.repeatableGroup}>
      <div className={styles.repeatableHeader}>
        <span className={styles.repeatableLabel}>API Endpoints</span>
        <button className={styles.addButton} onClick={addEndpoint}>+ Add Endpoint</button>
      </div>
      {endpoints.map((endpoint, idx) => (
        <div key={idx} className={styles.repeatableItem}>
          <div className={styles.repeatableItemHeader}>
            <span className={styles.repeatableItemIndex}>#{idx + 1}</span>
            <button className={styles.removeButton} onClick={() => removeEndpoint(idx)}>Remove</button>
          </div>
          <div className={styles.repeatableFieldsHorizontal}>
            <select
              className={styles.fieldSelectSmall}
              value={endpoint.method}
              onChange={(e) => updateEndpoint(idx, 'method', e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              className={styles.fieldInput}
              placeholder="/api/path"
              value={endpoint.path}
              onChange={(e) => updateEndpoint(idx, 'path', e.target.value)}
            />
            <input
              className={styles.fieldInput}
              placeholder="Description"
              value={endpoint.description}
              onChange={(e) => updateEndpoint(idx, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Env Variables list
function EnvVariablesList() {
  const {getField, updateField} = useProject();
  const vars = getField<Array<{key: string; description: string; value: string}>>('phase4.envVariables') || [];

  const addVar = () => {
    updateField('phase4.envVariables', [...vars, {key: '', description: '', value: ''}]);
  };

  const updateVar = (index: number, field: string, value: string) => {
    const updated = [...vars];
    updated[index] = {...updated[index], [field]: value};
    updateField('phase4.envVariables', updated);
  };

  const removeVar = (index: number) => {
    updateField('phase4.envVariables', vars.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.repeatableGroup}>
      <div className={styles.repeatableHeader}>
        <span className={styles.repeatableLabel}>Environment Variables</span>
        <button className={styles.addButton} onClick={addVar}>+ Add Variable</button>
      </div>
      {vars.map((v, idx) => (
        <div key={idx} className={styles.repeatableItem}>
          <div className={styles.repeatableItemHeader}>
            <span className={styles.repeatableItemIndex}>#{idx + 1}</span>
            <button className={styles.removeButton} onClick={() => removeVar(idx)}>Remove</button>
          </div>
          <div className={styles.repeatableFields}>
            <input
              className={styles.fieldInput}
              placeholder="KEY_NAME"
              value={v.key}
              onChange={(e) => updateVar(idx, 'key', e.target.value)}
            />
            <input
              className={styles.fieldInput}
              placeholder="Description"
              value={v.description}
              onChange={(e) => updateVar(idx, 'description', e.target.value)}
            />
            <input
              className={styles.fieldInput}
              placeholder="Value (optional)"
              value={v.value}
              onChange={(e) => updateVar(idx, 'value', e.target.value)}
              type="password"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Milestones checkboxes
function MilestonesCheckboxes() {
  const {getField, updateField} = useProject();
  const completed = getField<string[]>('phase4.completedMilestones') || [];

  const milestones = [
    {id: 'M1', label: 'M1: Foundation'},
    {id: 'M2', label: 'M2: Auth'},
    {id: 'M3', label: 'M3: Data Model'},
    {id: 'M4', label: 'M4: Core API'},
    {id: 'M5', label: 'M5: UI Foundation'},
    {id: 'M6', label: 'M6: Core Features'},
    {id: 'M7', label: 'M7: Payments'},
    {id: 'M8', label: 'M8: Polish'},
    {id: 'M9', label: 'M9: Testing'},
    {id: 'M10', label: 'M10: Deployment'},
    {id: 'M11', label: 'M11: Launch'},
  ];

  const toggleMilestone = (id: string) => {
    if (completed.includes(id)) {
      updateField('phase4.completedMilestones', completed.filter(m => m !== id));
    } else {
      updateField('phase4.completedMilestones', [...completed, id]);
    }
  };

  return (
    <div className={styles.milestoneGroup}>
      <div className={styles.repeatableHeader}>
        <span className={styles.repeatableLabel}>Completed Milestones</span>
      </div>
      <div className={styles.milestoneGrid}>
        {milestones.map((m) => (
          <label key={m.id} className={styles.milestoneItem}>
            <input
              type="checkbox"
              checked={completed.includes(m.id)}
              onChange={() => toggleMilestone(m.id)}
            />
            <span>{m.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// Empty state component
function EmptyState({onCreateProject}: {onCreateProject: (name: string) => void}) {
  const [projectName, setProjectName] = useState('');

  const handleCreate = () => {
    if (projectName.trim()) {
      onCreateProject(projectName.trim());
    }
  };

  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateCard}>
        <div className={styles.emptyStateIcon}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <h2 className={styles.emptyStateTitle}>Start Your SaaS Journey</h2>
        <p className={styles.emptyStateText}>Create your first project to begin tracking your product development</p>
        <div className={styles.emptyStateForm}>
          <input
            type="text"
            className={styles.emptyStateInput}
            placeholder="My Awesome SaaS"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          />
          <button className={styles.emptyStateButton} onClick={handleCreate} disabled={!projectName.trim()}>
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}

// Project header with switcher
function ProjectHeader() {
  const {
    projects,
    activeProject,
    activeProjectId,
    switchProject,
    createProject,
    deleteProject,
  } = useProject();

  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createProject(newProjectName.trim());
      setNewProjectName('');
      setShowNewProject(false);
    }
  };

  const handleExportJSON = () => {
    if (!activeProject) return;
    downloadFile(
      projectToJSON(activeProject),
      `${activeProject.phase1.productName || activeProject.name || 'project'}.json`,
      'application/json'
    );
    setShowExportMenu(false);
  };

  const handleExportMarkdown = () => {
    if (!activeProject) return;
    downloadFile(
      projectToMarkdown(activeProject),
      `${activeProject.phase1.productName || activeProject.name || 'project'}.md`,
      'text/markdown'
    );
    setShowExportMenu(false);
  };

  const handleExportZip = async () => {
    if (!activeProject) return;
    setExporting(true);
    try {
      await downloadProjectZip(activeProject);
    } catch (err) {
      console.error('Failed to export ZIP:', err);
      alert('Failed to export ZIP file');
    }
    setExporting(false);
    setShowExportMenu(false);
  };

  const handleExportAllZip = async () => {
    if (projects.length === 0) return;
    setExporting(true);
    try {
      await downloadAllProjectsZip(projects);
    } catch (err) {
      console.error('Failed to export all projects:', err);
      alert('Failed to export ZIP file');
    }
    setExporting(false);
    setShowExportMenu(false);
  };

  const handleExportFullZip = async () => {
    if (!activeProject) return;
    setExporting(true);
    try {
      await downloadFullProjectZip(activeProject);
    } catch (err) {
      console.error('Failed to export full ZIP:', err);
      alert('Failed to export ZIP file');
    }
    setExporting(false);
    setShowExportMenu(false);
  };

  const handleExportArtifactsZip = async () => {
    if (!activeProject) return;
    setExporting(true);
    try {
      const success = await downloadArtifactsZip(activeProject);
      if (!success) {
        alert('No artifacts to export. Create some artifacts first!');
      }
    } catch (err) {
      console.error('Failed to export artifacts:', err);
      alert('Failed to export artifacts');
    }
    setExporting(false);
    setShowExportMenu(false);
  };

  const handleExportPhaseArtifacts = async (phaseNum: number) => {
    if (!activeProject) return;
    setExporting(true);
    try {
      const success = await downloadPhaseArtifactsZip(activeProject, phaseNum);
      if (!success) {
        alert(`No artifacts in Phase ${phaseNum} to export.`);
      }
    } catch (err) {
      console.error('Failed to export phase artifacts:', err);
      alert('Failed to export phase artifacts');
    }
    setExporting(false);
    setShowExportMenu(false);
  };

  return (
    <div className={styles.projectHeader}>
      <div className={styles.projectHeaderLeft}>
        <select
          className={styles.projectSwitcher}
          value={activeProjectId || ''}
          onChange={(e) => switchProject(e.target.value)}
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {showNewProject ? (
          <div className={styles.newProjectForm}>
            <input
              type="text"
              className={styles.newProjectInput}
              placeholder="Project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
              autoFocus
            />
            <button className={styles.newProjectSave} onClick={handleCreateProject}>Create</button>
            <button className={styles.newProjectCancel} onClick={() => setShowNewProject(false)}>Cancel</button>
          </div>
        ) : (
          <button className={styles.newProjectButton} onClick={() => setShowNewProject(true)}>
            + New Project
          </button>
        )}
      </div>
      <div className={styles.projectHeaderRight}>
        <div className={styles.exportDropdown}>
          <button
            className={styles.exportButton}
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={exporting}
          >
            {exporting ? 'Exporting...' : 'Export'}
          </button>
          {showExportMenu && (
            <div className={styles.exportMenu}>
              <div className={styles.exportSection}>
                <span className={styles.exportLabel}>Full Project</span>
                <button onClick={handleExportFullZip}>Export All (ZIP with Artifacts)</button>
                <button onClick={handleExportJSON}>Export JSON (Backup)</button>
                <button onClick={handleExportMarkdown}>Export Profile (MD)</button>
              </div>
              <div className={styles.exportDivider} />
              <div className={styles.exportSection}>
                <span className={styles.exportLabel}>Artifacts Only</span>
                <button onClick={handleExportArtifactsZip}>All Artifacts (ZIP)</button>
                <button onClick={() => handleExportPhaseArtifacts(1)}>Phase 1 Artifacts</button>
                <button onClick={() => handleExportPhaseArtifacts(2)}>Phase 2 Artifacts</button>
                <button onClick={() => handleExportPhaseArtifacts(3)}>Phase 3 Artifacts</button>
              </div>
              <div className={styles.exportDivider} />
              <div className={styles.exportSection}>
                <span className={styles.exportLabel}>Multiple Projects</span>
                <button onClick={handleExportAllZip}>Export All Projects (ZIP)</button>
              </div>
            </div>
          )}
        </div>
        <ProjectImport onComplete={() => setShowExportMenu(false)} />
        {activeProjectId && (
          <button
            className={styles.deleteButton}
            onClick={() => {
              if (confirm('Delete this project? This cannot be undone.')) {
                deleteProject(activeProjectId);
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

// Phase sections
function Phase1Section() {
  return (
    <div className={styles.phaseContent}>
      <div className={styles.fieldRow}>
        <TextInput label="Product Name" path="phase1.productName" placeholder="e.g., ListingSnap" />
        <TextInput label="Target Customer" path="phase1.targetCustomer" placeholder="e.g., Real estate agents" />
      </div>
      <TextInput label="Product Concept" path="phase1.productConcept" placeholder="One-line description" multiline />
      <TextInput label="Problem Statement" path="phase1.problemStatement" placeholder="What problem does this solve?" multiline />
      <div className={styles.fieldRow}>
        <TextInput label="TAM (Total Addressable Market)" path="phase1.marketTAM" placeholder="e.g., $50B" />
        <TextInput label="SAM (Serviceable Addressable)" path="phase1.marketSAM" placeholder="e.g., $5B" />
        <TextInput label="SOM (Serviceable Obtainable)" path="phase1.marketSOM" placeholder="e.g., $50M" />
      </div>
      <CompetitorsList />
      <div className={styles.fieldRow}>
        <SelectInput
          label="Pricing Model"
          path="phase1.pricingModel"
          options={[
            {value: 'subscription', label: 'Subscription'},
            {value: 'usage', label: 'Usage-based'},
            {value: 'one-time', label: 'One-time'},
            {value: 'freemium', label: 'Freemium'},
          ]}
        />
        <TextInput label="Price Point" path="phase1.pricingAmount" placeholder="e.g., $29/month" />
      </div>
      <MvpFeaturesList />
      <OutOfScopeList />
    </div>
  );
}

function Phase2Section() {
  return (
    <div className={styles.phaseContent}>
      <UserPersonasList />
      <CoreFeaturesList />
      <DesignPrinciplesList />
      <UserFlowsList />
    </div>
  );
}

function Phase3Section() {
  return (
    <div className={styles.phaseContent}>
      <TechStackGroup />
      <EntitiesList />
      <ApiEndpointsList />
      <TextInput label="Auth Strategy" path="phase3.authStrategy" placeholder="e.g., Email/password + OAuth" multiline />
      <TextInput label="Security Notes" path="phase3.securityNotes" placeholder="Key security considerations" multiline />
    </div>
  );
}

function Phase4Section() {
  return (
    <div className={styles.phaseContent}>
      <div className={styles.fieldRow}>
        <TextInput label="Repository URL" path="phase4.repoUrl" placeholder="https://github.com/..." />
        <TextInput label="Project Folder" path="phase4.projectFolder" placeholder="~/projects/my-saas" />
      </div>
      <EnvVariablesList />
      <MilestonesCheckboxes />
    </div>
  );
}

function Phase5Section() {
  const {getField, updateField} = useProject();
  const monitoringSetup = getField<boolean>('phase5.monitoringSetup');

  return (
    <div className={styles.phaseContent}>
      <div className={styles.fieldRow}>
        <TextInput label="Staging URL" path="phase5.stagingUrl" placeholder="https://staging.myapp.com" />
        <TextInput label="Production URL" path="phase5.productionUrl" placeholder="https://myapp.com" />
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Monitoring Setup</label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={monitoringSetup || false}
              onChange={(e) => updateField('phase5.monitoringSetup', e.target.checked)}
            />
            <span>Monitoring configured</span>
          </label>
        </div>
        <TextInput label="Launch Date" path="phase5.launchDate" placeholder="YYYY-MM-DD" />
      </div>
    </div>
  );
}

// Tab type
type TabType = 'fields' | 'artifacts';

// Main page component
export default function MyProjectPage(): JSX.Element {
  const {projects, activeProject, createProject, getPhaseCompletion} = useProject();
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1]);
  const [activeTab, setActiveTab] = useState<TabType>('fields');

  const togglePhase = (phaseNum: number) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseNum) ? prev.filter((p) => p !== phaseNum) : [...prev, phaseNum]
    );
  };

  const getPrerequisiteWarning = (phaseNum: number): string | undefined => {
    if (phaseNum === 1) return undefined;
    const prevCompletion = getPhaseCompletion((phaseNum - 1) as 1 | 2 | 3 | 4 | 5);
    if (prevCompletion < 50) {
      return `Phase ${phaseNum - 1} is only ${prevCompletion}% complete`;
    }
    return undefined;
  };

  // Show empty state if no projects
  if (projects.length === 0) {
    return (
      <Layout title="My Project" description="Manage your SaaS project data">
        <EmptyState onCreateProject={createProject} />
      </Layout>
    );
  }

  const phases = [
    {num: 1, title: 'Validate', Component: Phase1Section},
    {num: 2, title: 'Design', Component: Phase2Section},
    {num: 3, title: 'Architect', Component: Phase3Section},
    {num: 4, title: 'Build', Component: Phase4Section},
    {num: 5, title: 'Launch', Component: Phase5Section},
  ];

  return (
    <Layout title="My Project" description="Manage your SaaS project data">
      <div className={styles.pageContainer}>
        <ProjectHeader />

        {/* Tabs */}
        <div className={styles.projectTabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'fields' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('fields')}
          >
            Fields
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'artifacts' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('artifacts')}
          >
            Artifacts
          </button>
        </div>

        {/* Fields Tab */}
        {activeTab === 'fields' && (
          <div className={styles.phaseSections}>
            {phases.map(({num, title, Component}) => (
              <div key={num} className={styles.phaseSection}>
                <PhaseHeader
                  phaseNum={num}
                  title={title}
                  completion={getPhaseCompletion(num as 1 | 2 | 3 | 4 | 5)}
                  isExpanded={expandedPhases.includes(num)}
                  onToggle={() => togglePhase(num)}
                  prerequisiteWarning={getPrerequisiteWarning(num)}
                />
                {expandedPhases.includes(num) && <Component />}
              </div>
            ))}
          </div>
        )}

        {/* Artifacts Tab */}
        {activeTab === 'artifacts' && <ArtifactsTab />}

        <SaveIndicator saving={false} />
      </div>
    </Layout>
  );
}
