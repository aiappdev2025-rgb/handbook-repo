import React, {useState, useRef, useEffect} from 'react';
import {useProject} from '../../context/ProjectContext';

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.375rem 0.75rem',
    background: 'var(--ifm-background-surface-color)',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '0.375rem',
    color: 'var(--ifm-color-content)',
    fontSize: '0.875rem',
    cursor: 'pointer',
    minWidth: '140px',
    justifyContent: 'space-between',
  },
  buttonHover: {
    borderColor: 'var(--ifm-color-primary)',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    minWidth: '200px',
    background: 'var(--ifm-background-surface-color)',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '0.375rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    overflow: 'hidden',
  },
  dropdownItem: {
    display: 'block',
    width: '100%',
    padding: '0.5rem 0.75rem',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    color: 'var(--ifm-color-content)',
    fontSize: '0.875rem',
    cursor: 'pointer',
  },
  dropdownItemActive: {
    background: 'var(--ifm-color-primary-lightest)',
    color: 'var(--ifm-color-primary-darkest)',
  },
  dropdownItemHover: {
    background: 'var(--ifm-color-emphasis-100)',
  },
  divider: {
    height: '1px',
    background: 'var(--ifm-color-emphasis-200)',
    margin: '0.25rem 0',
  },
  newProjectItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--ifm-color-primary)',
    fontWeight: 500,
  },
  noProjects: {
    padding: '0.75rem',
    color: 'var(--ifm-color-content-secondary)',
    fontSize: '0.8125rem',
    textAlign: 'center',
  },
  projectName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  chevron: {
    fontSize: '0.625rem',
    transition: 'transform 0.15s ease',
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
  inputContainer: {
    padding: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.375rem 0.5rem',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    outline: 'none',
  },
};

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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
    if (newProjectName.trim()) {
      createProject(newProjectName.trim());
      setNewProjectName('');
      setIsCreating(false);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateProject();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewProjectName('');
    }
  };

  return (
    <div ref={containerRef} style={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.button}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span style={styles.projectName}>
          {activeProject?.name || 'No Project'}
        </span>
        <span style={{
          ...styles.chevron,
          ...(isOpen ? styles.chevronOpen : {}),
        }}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div style={styles.dropdown} role="listbox">
          {projects.length === 0 && !isCreating && (
            <div style={styles.noProjects as React.CSSProperties}>
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
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                ...styles.dropdownItem,
                ...(project.id === activeProject?.id ? styles.dropdownItemActive : {}),
                ...(hoveredId === project.id && project.id !== activeProject?.id
                  ? styles.dropdownItemHover
                  : {}),
              }}
              role="option"
              aria-selected={project.id === activeProject?.id}
            >
              {project.name}
            </button>
          ))}

          {projects.length > 0 && <div style={styles.divider} />}

          {isCreating ? (
            <div style={styles.inputContainer}>
              <input
                ref={inputRef}
                type="text"
                value={newProjectName}
                onChange={e => setNewProjectName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Project name..."
                style={styles.input}
              />
            </div>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              onMouseEnter={() => setHoveredId('new')}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                ...styles.dropdownItem,
                ...(hoveredId === 'new' ? styles.dropdownItemHover : {}),
              }}
            >
              <span style={styles.newProjectItem}>
                + New Project
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
