import React, {useState, useEffect} from 'react';
import {ArtifactStatus} from '../../lib/conductorSchema';
import styles from './styles.module.css';

interface ArtifactData {
  id: string;
  filename: string;
  title: string;
  description: string;
  status: ArtifactStatus;
  content: string;
  versions?: Array<{id: string; content: string; createdAt: string; note: string}>;
}

interface ArtifactModalProps {
  artifact: ArtifactData;
  mode: 'view' | 'edit';
  onClose: () => void;
  onSave: (content: string, status: ArtifactStatus, note: string) => void;
}

export default function ArtifactModal({
  artifact,
  mode,
  onClose,
  onSave,
}: ArtifactModalProps): JSX.Element {
  const [editContent, setEditContent] = useState(artifact.content);
  const [editStatus, setEditStatus] = useState<ArtifactStatus>(artifact.status === 'empty' ? 'draft' : artifact.status);
  const [versionNote, setVersionNote] = useState('');

  useEffect(() => {
    setEditContent(artifact.content);
    setEditStatus(artifact.status === 'empty' ? 'draft' : artifact.status);
  }, [artifact]);

  const handleSave = () => {
    onSave(editContent, editStatus, versionNote);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose} onKeyDown={handleKeyDown}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <h2 className={styles.modalTitle}>{artifact.filename}</h2>
            <span className={`${styles.modalStatus} ${styles[`status${artifact.status.charAt(0).toUpperCase() + artifact.status.slice(1)}`]}`}>
              {artifact.status}
            </span>
          </div>
          <button onClick={onClose} className={styles.closeBtn}>
            \u2715
          </button>
        </div>

        <div className={styles.modalBody}>
          {mode === 'view' ? (
            <div className={styles.viewContent}>
              {artifact.content ? (
                <pre className={styles.contentPre}>{artifact.content}</pre>
              ) : (
                <div className={styles.emptyContent}>
                  <p>No content yet</p>
                  <p className={styles.emptyHint}>
                    Use the Edit button to add content or upload a file from the Artifacts tab.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.editContent}>
              <textarea
                className={styles.editTextarea}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Enter or paste content here..."
                autoFocus
              />
              <div className={styles.editMeta}>
                <div className={styles.statusSelector}>
                  <label htmlFor="modal-status">Status:</label>
                  <select
                    id="modal-status"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as ArtifactStatus)}
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
              </div>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          {artifact.versions && artifact.versions.length > 0 && (
            <span className={styles.versionCount}>
              {artifact.versions.length} previous version(s)
            </span>
          )}
          <div className={styles.modalActions}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            {mode === 'edit' && (
              <button
                className={styles.saveBtn}
                onClick={handleSave}
                disabled={!editContent.trim()}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
