import React, {useState, useCallback, useMemo} from 'react';
import {useProject} from '../../context/ProjectContext';
import {artifactDefinitions, ArtifactStatus} from '../../lib/conductorSchema';
import styles from './styles.module.css';

// Map placeholder tokens to project field paths
const placeholderMap: Record<string, string> = {
  '[PRODUCT_NAME]': 'phase1.productName',
  '[PRODUCT_CONCEPT]': 'phase1.productConcept',
  '[TARGET_CUSTOMER]': 'phase1.targetCustomer',
  '[PROBLEM_STATEMENT]': 'phase1.problemStatement',
  '[PROBLEM]': 'phase1.problemStatement',
  '[MARKET_TAM]': 'phase1.marketTAM',
  '[MARKET_SAM]': 'phase1.marketSAM',
  '[MARKET_SOM]': 'phase1.marketSOM',
  '[COMPETITORS]': 'phase1.competitors',
  '[PRICING_MODEL]': 'phase1.pricingModel',
  '[PRICING_AMOUNT]': 'phase1.pricingAmount',
  '[MVP_FEATURES]': 'phase1.mvpFeatures',
  '[OUT_OF_SCOPE]': 'phase1.outOfScope',
  '[USER_PERSONAS]': 'phase2.userPersonas',
  '[CORE_FEATURES]': 'phase2.coreFeatures',
  '[DESIGN_PRINCIPLES]': 'phase2.designPrinciples',
  '[USER_FLOWS]': 'phase2.keyUserFlows',
  '[TECH_STACK]': 'phase3.techStack',
  '[ENTITIES]': 'phase3.entities',
  '[API_ENDPOINTS]': 'phase3.apiEndpoints',
  '[AUTH_STRATEGY]': 'phase3.authStrategy',
  '[SECURITY_NOTES]': 'phase3.securityNotes',
  '[REPO_URL]': 'phase4.repoUrl',
  '[PROJECT_FOLDER]': 'phase4.projectFolder',
  '[ENV_VARIABLES]': 'phase4.envVariables',
  '[MILESTONES]': 'phase4.completedMilestones',
  '[STAGING_URL]': 'phase5.stagingUrl',
  '[PRODUCTION_URL]': 'phase5.productionUrl',
  '[LAUNCH_DATE]': 'phase5.launchDate',
};

interface SmartPromptProps {
  template: string;
  title?: string;
  artifactId?: string;
}

interface EditingField {
  token: string;
  path: string;
}

interface PlaceholderMatch {
  token: string;
  index: number;
  path: string | undefined;
}

// Format complex values for display
function formatValue(value: unknown, path: string): string {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '';

    // Handle competitors array
    if (path.includes('competitors')) {
      return value
        .map((c: {name?: string; strengths?: string; weaknesses?: string}) =>
          c.name ? `${c.name}${c.strengths ? ` (${c.strengths})` : ''}` : ''
        )
        .filter(Boolean)
        .join(', ');
    }

    // Handle features arrays
    if (path.includes('Features') || path.includes('mvpFeatures')) {
      return value
        .map((f: {name?: string}) => f.name || '')
        .filter(Boolean)
        .join(', ');
    }

    // Handle personas
    if (path.includes('Personas')) {
      return value
        .map((p: {name?: string; description?: string}) =>
          p.name ? `${p.name}${p.description ? `: ${p.description}` : ''}` : ''
        )
        .filter(Boolean)
        .join('; ');
    }

    // Handle user flows
    if (path.includes('Flows') || path.includes('userFlows')) {
      return value
        .map((f: {name?: string; steps?: string[]}) =>
          f.name ? `${f.name}${f.steps?.length ? ` (${f.steps.length} steps)` : ''}` : ''
        )
        .filter(Boolean)
        .join(', ');
    }

    // Handle entities
    if (path.includes('entities')) {
      return value
        .map((e: {name?: string; fields?: string[]}) =>
          e.name ? `${e.name}${e.fields?.length ? ` [${e.fields.length} fields]` : ''}` : ''
        )
        .filter(Boolean)
        .join(', ');
    }

    // Handle API endpoints
    if (path.includes('apiEndpoints')) {
      return value
        .map((e: {method?: string; path?: string; description?: string}) =>
          e.path ? `${e.method || 'GET'} ${e.path}` : ''
        )
        .filter(Boolean)
        .join(', ');
    }

    // Handle env variables
    if (path.includes('envVariables')) {
      return value
        .map((v: {key?: string}) => v.key || '')
        .filter(Boolean)
        .join(', ');
    }

    // Handle milestones
    if (path.includes('Milestones')) {
      return value.join(', ');
    }

    // Handle string arrays (outOfScope, designPrinciples, etc.)
    if (value.every((v: unknown) => typeof v === 'string')) {
      return value.filter(Boolean).join(', ');
    }

    return JSON.stringify(value);
  }

  // Handle techStack object
  if (typeof value === 'object' && path.includes('techStack')) {
    const stack = value as Record<string, string>;
    return Object.entries(stack)
      .filter(([_, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
  }

  // Handle other objects
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

export default function SmartPrompt({template, title, artifactId}: SmartPromptProps): JSX.Element {
  const {activeProject, getField, updateField, getArtifact, saveArtifact} = useProject();
  const [editingField, setEditingField] = useState<EditingField | null>(null);
  const [editValue, setEditValue] = useState('');
  const [copied, setCopied] = useState(false);

  // Output section state
  const [showOutput, setShowOutput] = useState(false);
  const [outputContent, setOutputContent] = useState('');
  const [outputStatus, setOutputStatus] = useState<ArtifactStatus>('draft');
  const [versionNote, setVersionNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Get artifact definition and current artifact
  const artifactDef = artifactId ? artifactDefinitions[artifactId] : null;
  const currentArtifact = artifactId ? getArtifact(artifactId) : null;

  // Load existing artifact content when opening output section
  const handleToggleOutput = useCallback(() => {
    if (!showOutput && currentArtifact?.currentContent) {
      setOutputContent(currentArtifact.currentContent);
      setOutputStatus(currentArtifact.status || 'draft');
    }
    setShowOutput(!showOutput);
  }, [showOutput, currentArtifact]);

  // Handle file upload
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setOutputContent(result);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  }, []);

  // Save artifact
  const handleSaveArtifact = useCallback(() => {
    if (!artifactId || !outputContent.trim()) return;

    setSaving(true);
    saveArtifact(artifactId, outputContent, outputStatus, versionNote);

    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setVersionNote('');
      setTimeout(() => setSaved(false), 2000);
    }, 300);
  }, [artifactId, outputContent, outputStatus, versionNote, saveArtifact]);

  // Find all placeholders in template
  const placeholders = useMemo((): PlaceholderMatch[] => {
    const regex = /\[([A-Z_]+)\]/g;
    const matches: PlaceholderMatch[] = [];
    let match;
    while ((match = regex.exec(template)) !== null) {
      matches.push({
        token: match[0],
        index: match.index,
        path: placeholderMap[match[0]],
      });
    }
    return matches;
  }, [template]);

  // Get missing and filled counts
  const {missingFields, filledCount} = useMemo(() => {
    const missing: {token: string; path: string}[] = [];
    let filled = 0;

    placeholders.forEach(({token, path}) => {
      if (!path) return;
      const value = getField(path);
      const formatted = formatValue(value, path);
      if (!formatted) {
        missing.push({token, path});
      } else {
        filled++;
      }
    });

    return {missingFields: missing, filledCount: filled};
  }, [placeholders, getField]);

  // Generate filled prompt for copying
  const getFilledPrompt = useCallback((): string => {
    let filled = template;
    placeholders.forEach(({token, path}) => {
      if (!path) return;
      const value = getField(path);
      const formatted = formatValue(value, path);
      if (formatted) {
        filled = filled.split(token).join(formatted);
      }
    });
    return filled;
  }, [template, placeholders, getField]);

  // Handle inline edit
  const startEdit = useCallback((token: string, path: string) => {
    const currentValue = getField<string>(path);
    // Only allow editing simple string fields
    if (typeof currentValue === 'string' || currentValue === '' || currentValue === undefined) {
      setEditingField({token, path});
      setEditValue(currentValue || '');
    }
  }, [getField]);

  const saveEdit = useCallback(() => {
    if (editingField) {
      updateField(editingField.path, editValue);
      setEditingField(null);
      setEditValue('');
    }
  }, [editingField, editValue, updateField]);

  const cancelEdit = useCallback(() => {
    setEditingField(null);
    setEditValue('');
  }, []);

  // Handle key press in edit input
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  }, [saveEdit, cancelEdit]);

  // Copy to clipboard
  const copyPrompt = useCallback(() => {
    navigator.clipboard.writeText(getFilledPrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [getFilledPrompt]);

  // Render prompt with interactive placeholders
  const renderPrompt = useCallback((): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    placeholders.forEach(({token, index, path}, i) => {
      // Add text before this placeholder
      if (index > lastIndex) {
        elements.push(
          <span key={`text-${i}`}>{template.slice(lastIndex, index)}</span>
        );
      }

      const value = path ? getField(path) : null;
      const formatted = formatValue(value, path || '');
      const isSimpleField = typeof value === 'string' || value === '' || value === undefined || value === null;

      // Add interactive placeholder
      if (editingField?.token === token) {
        elements.push(
          <span key={`edit-${i}`} className={styles.editWrapper}>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.editInput}
              autoFocus
              placeholder={token}
            />
            <button onClick={saveEdit} className={styles.saveBtn} title="Save (Enter)">
              <span className={styles.btnIcon}>&#10003;</span>
            </button>
            <button onClick={cancelEdit} className={styles.cancelBtn} title="Cancel (Esc)">
              <span className={styles.btnIcon}>&#10005;</span>
            </button>
          </span>
        );
      } else if (formatted) {
        elements.push(
          <span
            key={`filled-${i}`}
            className={`${styles.placeholder} ${styles.filled}`}
            onClick={isSimpleField && path ? () => startEdit(token, path) : undefined}
            title={isSimpleField ? 'Click to edit' : 'Edit in Project Profile'}
            role={isSimpleField ? 'button' : undefined}
            tabIndex={isSimpleField ? 0 : undefined}
          >
            <span className={styles.placeholderValue}>{formatted}</span>
            {isSimpleField && <span className={styles.editHint}>&#9998;</span>}
          </span>
        );
      } else {
        elements.push(
          <span
            key={`empty-${i}`}
            className={`${styles.placeholder} ${styles.empty}`}
            onClick={path && isSimpleField ? () => startEdit(token, path) : undefined}
            title={isSimpleField ? 'Click to fill' : 'Fill in Project Profile'}
            role={isSimpleField ? 'button' : undefined}
            tabIndex={isSimpleField ? 0 : undefined}
          >
            <span className={styles.placeholderToken}>{token}</span>
            {isSimpleField && <span className={styles.fillHint}>+</span>}
          </span>
        );
      }

      lastIndex = index + token.length;
    });

    // Add remaining text
    if (lastIndex < template.length) {
      elements.push(
        <span key="text-end">{template.slice(lastIndex)}</span>
      );
    }

    return elements;
  }, [template, placeholders, editingField, editValue, getField, startEdit, saveEdit, cancelEdit, handleKeyDown]);

  const totalPlaceholders = placeholders.filter(p => p.path).length;
  const completionPercent = totalPlaceholders > 0
    ? Math.round((filledCount / totalPlaceholders) * 100)
    : 0;

  return (
    <div className={styles.smartPrompt}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.indicator} />
          <span className={styles.title}>{title || 'PROMPT'}</span>
          {totalPlaceholders > 0 && (
            <span className={styles.completion}>
              {filledCount}/{totalPlaceholders} fields
            </span>
          )}
        </div>
        <div className={styles.actions}>
          {totalPlaceholders > 0 && (
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{width: `${completionPercent}%`}}
              />
            </div>
          )}
          <button
            onClick={copyPrompt}
            className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
          >
            {copied ? (
              <>
                <span className={styles.copyIcon}>&#10003;</span>
                <span>COPIED</span>
              </>
            ) : (
              <>
                <span className={styles.copyIcon}>&#9112;</span>
                <span>COPY</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className={styles.promptContent}>
        <pre className={styles.promptText}>
          {activeProject ? renderPrompt() : template}
        </pre>
      </div>

      {missingFields.length > 0 && activeProject && (
        <div className={styles.missingWarning}>
          <span className={styles.warningIndicator} />
          <span className={styles.warningText}>
            Missing: {missingFields.slice(0, 3).map(f => f.token).join(', ')}
            {missingFields.length > 3 && ` +${missingFields.length - 3} more`}
          </span>
          <a href="/my-project" className={styles.fillLink}>
            Complete in Project Profile &#8594;
          </a>
        </div>
      )}

      {!activeProject && (
        <div className={styles.noProject}>
          <span className={styles.noProjectIndicator} />
          <span className={styles.noProjectText}>No project selected</span>
          <a href="/my-project" className={styles.createLink}>
            Create or select a project &#8594;
          </a>
        </div>
      )}

      {/* Output Section - Only show if artifactId is provided */}
      {artifactId && activeProject && (
        <div className={styles.outputSection}>
          <div
            className={styles.outputHeader}
            onClick={handleToggleOutput}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleToggleOutput()}
          >
            <div className={styles.outputHeaderLeft}>
              <span className={styles.outputIcon}>&#128190;</span>
              <span className={styles.outputTitle}>
                Save Output: {artifactDef?.filename || 'artifact.md'}
              </span>
              {currentArtifact && (
                <span className={`${styles.statusBadge} ${styles[`status${currentArtifact.status.charAt(0).toUpperCase() + currentArtifact.status.slice(1)}`]}`}>
                  {currentArtifact.status}
                </span>
              )}
            </div>
            <span className={styles.toggleIcon}>{showOutput ? '\u25BC' : '\u25B6'}</span>
          </div>

          {showOutput && (
            <div className={styles.outputBody}>
              <p className={styles.outputInstructions}>
                After running the prompt above, paste Claude's response or upload the .md file:
              </p>

              <div className={styles.outputActions}>
                <label className={styles.uploadBtn}>
                  <span>&#128193; Upload .md File</span>
                  <input
                    type="file"
                    accept=".md,.txt"
                    onChange={handleFileUpload}
                    hidden
                  />
                </label>
              </div>

              <textarea
                className={styles.outputTextarea}
                value={outputContent}
                onChange={(e) => setOutputContent(e.target.value)}
                placeholder="Paste Claude's markdown output here..."
                rows={12}
              />

              <div className={styles.outputMeta}>
                <div className={styles.statusSelector}>
                  <label htmlFor="artifact-status">Status:</label>
                  <select
                    id="artifact-status"
                    value={outputStatus}
                    onChange={(e) => setOutputStatus(e.target.value as ArtifactStatus)}
                  >
                    <option value="draft">Draft</option>
                    <option value="complete">Complete</option>
                  </select>
                </div>

                <div className={styles.versionNote}>
                  <input
                    type="text"
                    placeholder="Version note (optional)"
                    value={versionNote}
                    onChange={(e) => setVersionNote(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.outputSave}>
                <button
                  onClick={handleSaveArtifact}
                  className={styles.saveArtifactBtn}
                  disabled={!outputContent.trim() || saving}
                >
                  {saving ? 'Saving...' : saved ? '\u2713 Saved!' : 'Save Artifact'}
                </button>

                {currentArtifact?.versions?.length > 0 && (
                  <span className={styles.versionCount}>
                    {currentArtifact.versions.length} previous version(s)
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
