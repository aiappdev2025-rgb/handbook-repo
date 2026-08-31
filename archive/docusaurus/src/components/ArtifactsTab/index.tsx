import React, {useState, useCallback} from 'react';
import {useProject} from '../../context/ProjectContext';
import {artifactDefinitions, ArtifactStatus} from '../../lib/conductorSchema';
import {downloadArtifactsZip, downloadPhaseArtifactsZip} from '../../lib/conductorExport';
import ArtifactModal from '../ArtifactModal';
import styles from './styles.module.css';

interface ArtifactWithState {
  id: string;
  phase: number;
  chapter: string;
  filename: string;
  title: string;
  description: string;
  extractFields: string[];
  status: ArtifactStatus;
  content: string;
  versions: Array<{id: string; content: string; createdAt: string; note: string}>;
  updatedAt: string | null;
}

type ModalMode = 'view' | 'edit';

const phases = [
  {num: 1, name: 'Validate', color: '#3b82f6'},
  {num: 2, name: 'Design', color: '#ec4899'},
  {num: 3, name: 'Architect', color: '#22c55e'},
  {num: 4, name: 'Build', color: '#a855f7'},
  {num: 5, name: 'Launch', color: '#f59e0b'},
];

export default function ArtifactsTab(): JSX.Element {
  const {getArtifact, saveArtifact, activeProject} = useProject();
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactWithState | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>('view');
  const [exporting, setExporting] = useState(false);

  const getArtifactsForPhase = useCallback((phaseNum: number): ArtifactWithState[] => {
    return Object.entries(artifactDefinitions)
      .filter(([, def]) => def.phase === phaseNum)
      .map(([id, def]) => {
        const artifact = getArtifact(id);
        return {
          id,
          ...def,
          status: (artifact?.status || 'empty') as ArtifactStatus,
          content: artifact?.currentContent || '',
          versions: artifact?.versions || [],
          updatedAt: artifact?.updatedAt || null,
        };
      });
  }, [getArtifact]);

  const handleView = useCallback((artifact: ArtifactWithState) => {
    setSelectedArtifact(artifact);
    setModalMode('view');
  }, []);

  const handleEdit = useCallback((artifact: ArtifactWithState) => {
    setSelectedArtifact(artifact);
    setModalMode('edit');
  }, []);

  const handleUpload = useCallback((artifactId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          saveArtifact(artifactId, result, 'draft', 'Uploaded from file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [saveArtifact]);

  const handleDownload = useCallback((artifact: ArtifactWithState) => {
    if (!artifact.content) return;
    const blob = new Blob([artifact.content], {type: 'text/markdown'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = artifact.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedArtifact(null);
  }, []);

  const handleSaveFromModal = useCallback((content: string, status: ArtifactStatus, note: string) => {
    if (selectedArtifact) {
      saveArtifact(selectedArtifact.id, content, status, note);
      setSelectedArtifact(null);
    }
  }, [selectedArtifact, saveArtifact]);

  const handleExportAllArtifacts = useCallback(async () => {
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
  }, [activeProject]);

  const handleExportPhaseArtifacts = useCallback(async (phaseNum: number) => {
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
  }, [activeProject]);

  const getStatusIcon = (status: ArtifactStatus): string => {
    switch (status) {
      case 'complete':
        return '\u2705';
      case 'draft':
        return '\uD83D\uDCDD';
      default:
        return '\u2B1C';
    }
  };

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    );
  };

  return (
    <div className={styles.artifactsTab}>
      <div className={styles.summary}>
        <div className={styles.summaryText}>
          <p>
            Track all your project documents. Upload Claude's outputs or edit directly.
          </p>
        </div>
        <div className={styles.summaryActions}>
          <button
            className={styles.exportAllBtn}
            onClick={handleExportAllArtifacts}
            disabled={exporting}
          >
            {exporting ? 'Exporting...' : 'Export All Artifacts'}
          </button>
        </div>
      </div>

      {phases.map((phase) => {
        const artifacts = getArtifactsForPhase(phase.num);
        const completed = artifacts.filter((a) => a.status === 'complete').length;
        const drafts = artifacts.filter((a) => a.status === 'draft').length;

        return (
          <div key={phase.num} className={styles.phaseSection}>
            <div
              className={styles.phaseHeader}
              style={{'--phase-border-color': phase.color} as React.CSSProperties}
            >
              <div className={styles.phaseTitle}>
                <span className={styles.phaseLabel} style={{color: phase.color}}>
                  PHASE {phase.num}
                </span>
                <span className={styles.phaseName}>{phase.name}</span>
              </div>
              <div className={styles.phaseActions}>
                <button
                  className={styles.phaseExportBtn}
                  onClick={() => handleExportPhaseArtifacts(phase.num)}
                  disabled={exporting}
                  title="Export phase artifacts"
                >
                  ⬇
                </button>
                <div className={styles.phaseStats}>
                  <span className={styles.statComplete}>{completed} complete</span>
                  <span className={styles.statDraft}>{drafts} draft</span>
                  <span className={styles.statEmpty}>
                    {artifacts.length - completed - drafts} empty
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.artifactsList}>
              {artifacts.map((artifact) => (
                <div key={artifact.id} className={styles.artifactRow}>
                  <div className={styles.artifactInfo}>
                    <span className={styles.artifactStatus}>
                      {getStatusIcon(artifact.status)}
                    </span>
                    <div className={styles.artifactDetails}>
                      <span className={styles.artifactFilename}>{artifact.filename}</span>
                      <span className={styles.artifactDescription}>
                        {artifact.description}
                      </span>
                      {artifact.updatedAt && (
                        <span className={styles.artifactDate}>
                          Last updated: {formatDate(artifact.updatedAt)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.artifactActions}>
                    {artifact.status === 'empty' ? (
                      <>
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleUpload(artifact.id)}
                        >
                          Upload
                        </button>
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleEdit(artifact)}
                        >
                          Create
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleView(artifact)}
                        >
                          View
                        </button>
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleEdit(artifact)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleDownload(artifact)}
                        >
                          Download
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {selectedArtifact && (
        <ArtifactModal
          artifact={selectedArtifact}
          mode={modalMode}
          onClose={handleCloseModal}
          onSave={handleSaveFromModal}
        />
      )}
    </div>
  );
}
