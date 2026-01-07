import React, {useRef, useState} from 'react';
import {useProject} from '../../context/ProjectContext';
import {jsonToProject} from '../../lib/conductorExport';
import styles from './styles.module.css';

interface ProjectImportProps {
  onComplete?: () => void;
}

export default function ProjectImport({onComplete}: ProjectImportProps): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {projects, importProject} = useProject();
  const [importing, setImporting] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);

    try {
      const content = await file.text();

      if (file.name.endsWith('.json')) {
        // Check if it's an array (multiple projects) or single project
        const parsed = JSON.parse(content);

        if (Array.isArray(parsed)) {
          // Import multiple projects
          let importedCount = 0;
          for (const proj of parsed) {
            const result = importProject(JSON.stringify(proj));
            if (result) importedCount++;
          }
          if (importedCount > 0) {
            alert(`Imported ${importedCount} project(s) successfully!`);
            onComplete?.();
          } else {
            alert('No valid projects found in file');
          }
        } else {
          // Single project
          const project = jsonToProject(content);
          if (project && project.name && project.phase1) {
            // Check if project with same ID exists
            const exists = projects.find(p => p.id === project.id);
            if (exists) {
              const replace = confirm('A project with this ID already exists. Replace it?');
              if (!replace) {
                setImporting(false);
                return;
              }
            }
            const result = importProject(content);
            if (result) {
              onComplete?.();
            } else {
              alert('Failed to import project');
            }
          } else {
            alert('Invalid project file format');
          }
        }
      } else if (file.name.endsWith('.md')) {
        alert('Markdown import is not yet supported. Please use JSON files.');
      } else {
        alert('Unsupported file format. Please use .json files.');
      }
    } catch (err) {
      console.error('Import error:', err);
      alert('Failed to parse import file. Please check the file format.');
    }

    setImporting(false);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.importWrapper}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".json,.md"
        style={{display: 'none'}}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className={styles.importBtn}
        disabled={importing}
      >
        {importing ? 'Importing...' : 'Import'}
      </button>
    </div>
  );
}
