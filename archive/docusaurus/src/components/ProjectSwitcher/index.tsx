import React, {useState, useRef, useEffect} from 'react';
import {useProject} from '../../context/ProjectContext';
import styles from './styles.module.css';

export default function ProjectSwitcher(): JSX.Element {
  const {
    projects,
    activeProject,
    createProject,
    switchProject,
  } = useProject();

  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCreating(false);
        setNewProjectName('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when creating
  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreating]);

  const handleCreateProject = () => {
    const trimmedName = newProjectName.trim();
    if (trimmedName) {
      createProject(trimmedName);
      setNewProjectName('');
      setIsCreating(false);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateProject();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewProjectName('');
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.projectName}>
          {activeProject?.name || 'No Project'}
        </span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {projects.length === 0 && !isCreating && (
            <div className={styles.noProjects}>
              No projects yet
            </div>
          )}

          {projects.map(project => (
            <button
              key={project.id}
              onClick={() => {
                switchProject(project.id);
                setIsOpen(false);
              }}
              className={`${styles.dropdownItem} ${project.id === activeProject?.id ? styles.dropdownItemActive : ''}`}
              role="option"
              aria-selected={project.id === activeProject?.id}
            >
              {project.name}
            </button>
          ))}

          {projects.length > 0 && <div className={styles.divider} />}

          {isCreating ? (
            <div className={styles.inputContainer}>
              <input
                ref={inputRef}
                type="text"
                value={newProjectName}
                onChange={e => setNewProjectName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Project name..."
                className={styles.input}
              />
            </div>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className={styles.dropdownItem}
            >
              <span className={styles.newProjectItem}>
                + New Project
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
