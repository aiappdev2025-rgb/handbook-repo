import React, {useState, useEffect} from 'react';
import {useProject} from '../../context/ProjectContext';
import {ArtifactStatus} from '../../lib/conductorSchema';
import styles from './styles.module.css';

interface ArtifactVersion {
  id: string;
  content: string;
  createdAt: string;
  note: string;
}

interface ArtifactData {
  id: string;
  filename: string;
  title: string;
  description: string;
  status: ArtifactStatus;
  content: string;
  updatedAt?: string;
  versionNote?: string;
  versions?: ArtifactVersion[];
}

interface ArtifactModalProps {
  artifact: ArtifactData;
  mode: 'view' | 'edit';
  onClose: () => void;
  onSave: (content: string, status: ArtifactStatus, note: string) => void;
}

export default function ArtifactModal({
  artifact,
  mode: initialMode,
  onClose,
  onSave,
}: ArtifactModalProps): JSX.Element {
  const {restoreArtifactVersion} = useProject();

  const [mode, setMode] = useState<'view' | 'edit' | 'history'>(initialMode);
  const [content, setContent] = useState(artifact.content || '');
  const [status, setStatus] = useState<ArtifactStatus>(
    artifact.status === 'empty' ? 'draft' : artifact.status
  );
  const [versionNote, setVersionNote] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContent(artifact.content || '');
    setStatus(artifact.status === 'empty' ? 'draft' : artifact.status);
  }, [artifact]);

  const handleSave = (): void => {
    setSaving(true);
    onSave(content, status, versionNote);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setVersionNote('');
      setTimeout(() => setSaved(false), 1500);
    }, 300);
  };

  const handleRestoreVersion = (versionId: string): void => {
    if (window.confirm('Restore this version? Current content will be saved as a new version.')) {
      restoreArtifactVersion(artifact.id, versionId);
      onClose();
    }
  };

  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    );
  };

  // Simple markdown to HTML converter for preview
  const renderMarkdown = (md: string): string => {
    if (!md) return '<p class="empty">No content</p>';

    let html = md
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Unordered lists
      .replace(/^\s*[-*] (.*$)/gim, '<li>$1</li>')
      // Ordered lists
      .replace(/^\s*\d+\. (.*$)/gim, '<li>$1</li>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>');

    // Wrap in paragraph
    html = '<p>' + html + '</p>';

    // Fix list items (wrap consecutive li in ul)
    html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');

    return html;
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <h2 className={styles.filename}>{artifact.filename}</h2>
            <span className={`${styles.statusBadge} ${styles[`status-${status}`]}`}>
              {status}
            </span>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.modeTabs}>
              <button
                className={`${styles.modeTab} ${mode === 'view' ? styles.active : ''}`}
                onClick={() => setMode('view')}
              >
                View
              </button>
              <button
                className={`${styles.modeTab} ${mode === 'edit' ? styles.active : ''}`}
                onClick={() => setMode('edit')}
              >
                Edit
              </button>
              <button
                className={`${styles.modeTab} ${mode === 'history' ? styles.active : ''}`}
                onClick={() => setMode('history')}
                disabled={!artifact.versions?.length}
              >
                History ({artifact.versions?.length || 0})
              </button>
            </div>
            <button onClick={onClose} className={styles.closeBtn}>
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {mode === 'view' && (
            <div className={styles.viewMode}>
              <div
                className={styles.markdownPreview}
                dangerouslySetInnerHTML={{__html: renderMarkdown(content)}}
              />
            </div>
          )}

          {mode === 'edit' && (
            <div className={styles.editMode}>
              <div className={styles.editToolbar}>
                <button
                  className={`${styles.previewToggle} ${showPreview ? styles.active : ''}`}
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>

              <div className={`${styles.editContainer} ${showPreview ? styles.withPreview : ''}`}>
                <div className={styles.editorPane}>
                  <div className={styles.paneHeader}>Editor</div>
                  <textarea
                    className={styles.editor}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter markdown content..."
                  />
                </div>

                {showPreview && (
                  <div className={styles.previewPane}>
                    <div className={styles.paneHeader}>Preview</div>
                    <div
                      className={styles.markdownPreview}
                      dangerouslySetInnerHTML={{__html: renderMarkdown(content)}}
                    />
                  </div>
                )}
              </div>

              <div className={styles.editMeta}>
                <div className={styles.statusSelect}>
                  <label htmlFor="artifact-status">Status:</label>
                  <select
                    id="artifact-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ArtifactStatus)}
                  >
                    <option value="draft">Draft</option>
                    <option value="complete">Complete</option>
                  </select>
                </div>
                <div className={styles.versionNoteInput}>
                  <input
                    type="text"
                    placeholder="Version note (optional)"
                    value={versionNote}
                    onChange={(e) => setVersionNote(e.target.value)}
                  />
                </div>
                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save'}
                </button>
              </div>
            </div>
          )}

          {mode === 'history' && (
            <div className={styles.historyMode}>
              {artifact.versions && artifact.versions.length > 0 ? (
                <div className={styles.versionList}>
                  {/* Current version */}
                  <div className={`${styles.versionItem} ${styles.currentVersion}`}>
                    <div className={styles.versionInfo}>
                      <span className={styles.versionLabel}>Current Version</span>
                      <span className={styles.versionDate}>{formatDate(artifact.updatedAt)}</span>
                      {artifact.versionNote && (
                        <span className={styles.versionNoteTag}>{artifact.versionNote}</span>
                      )}
                    </div>
                    <div className={styles.versionPreview}>
                      {content?.substring(0, 200)}
                      {content && content.length > 200 ? '...' : ''}
                    </div>
                  </div>

                  {/* Previous versions */}
                  {[...artifact.versions].reverse().map((version, index) => (
                    <div key={version.id} className={styles.versionItem}>
                      <div className={styles.versionInfo}>
                        <span className={styles.versionLabel}>
                          Version {artifact.versions!.length - index}
                        </span>
                        <span className={styles.versionDate}>{formatDate(version.createdAt)}</span>
                        {version.note && (
                          <span className={styles.versionNoteTag}>{version.note}</span>
                        )}
                      </div>
                      <div className={styles.versionPreview}>
                        {version.content?.substring(0, 200)}
                        {version.content && version.content.length > 200 ? '...' : ''}
                      </div>
                      <div className={styles.versionActions}>
                        <button
                          className={styles.restoreBtn}
                          onClick={() => handleRestoreVersion(version.id)}
                        >
                          Restore
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noHistory}>
                  <p>No version history yet.</p>
                  <p>Versions are created automatically when you save changes.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
