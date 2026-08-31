import React, {createContext, useContext, useState, useEffect, useCallback, useMemo} from 'react';
import {
  Project,
  projectSchema,
  getNestedValue,
  setNestedValue,
  Artifact,
  ArtifactStatus,
  ArtifactDefinition,
  artifactDefinitions,
} from '../lib/conductorSchema';

const STORAGE_KEY = 'conductor-projects';

// Combined artifact definition + current state for UI
export interface PhaseArtifact extends ArtifactDefinition {
  id: string;
  status: ArtifactStatus;
  currentContent: string;
}

interface ProjectContextValue {
  projects: Project[];
  activeProject: Project | null;
  activeProjectId: string | null;
  createProject: (name: string) => Project;
  updateField: (path: string, value: unknown) => void;
  getField: <T = unknown>(path: string) => T;
  switchProject: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
  getPhaseCompletion: (phaseNum: 1 | 2 | 3 | 4 | 5) => number;
  duplicateProject: (projectId: string) => Project | null;
  exportProject: (projectId: string) => string | null;
  importProject: (jsonData: string) => Project | null;
  // Artifact management
  getArtifact: (artifactId: string) => Artifact | null;
  saveArtifact: (artifactId: string, content: string, status?: ArtifactStatus, note?: string) => void;
  updateArtifactStatus: (artifactId: string, status: ArtifactStatus) => void;
  restoreArtifactVersion: (artifactId: string, versionId: string) => void;
  getPhaseArtifacts: (phaseNum: 1 | 2 | 3 | 4 | 5) => PhaseArtifact[];
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

interface StorageData {
  projects: Project[];
  activeProjectId: string | null;
}

// Deep clone helper for creating new projects
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function ProjectProvider({children}: {children: React.ReactNode}): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: StorageData = JSON.parse(saved);
        setProjects(parsed.projects || []);
        setActiveProjectId(parsed.activeProjectId || null);
      }
    } catch (error) {
      console.error('Failed to load projects from localStorage:', error);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on change (only after initialization)
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;

    try {
      const data: StorageData = {
        projects,
        activeProjectId,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save projects to localStorage:', error);
    }
  }, [projects, activeProjectId, isInitialized]);

  // Get active project
  const activeProject = useMemo(
    () => projects.find(p => p.id === activeProjectId) || null,
    [projects, activeProjectId]
  );

  // Create new project
  const createProject = useCallback((name: string): Project => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...deepClone(projectSchema),
      id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name,
      createdAt: now,
      updatedAt: now,
      phase1: {
        ...deepClone(projectSchema.phase1),
        productName: name,
      },
    };
    setProjects(prev => [...prev, newProject]);
    setActiveProjectId(newProject.id);
    return newProject;
  }, []);

  // Update project field
  const updateField = useCallback((path: string, value: unknown): void => {
    if (!activeProjectId) return;

    setProjects(prev =>
      prev.map(p => {
        if (p.id !== activeProjectId) return p;
        const updated = deepClone(p);
        updated.updatedAt = new Date().toISOString();
        setNestedValue(updated as unknown as Record<string, unknown>, path, value);
        return updated;
      })
    );
  }, [activeProjectId]);

  // Get field value by path
  const getField = useCallback(<T = unknown>(path: string): T => {
    if (!activeProject) return '' as T;
    const value = getNestedValue(activeProject as unknown as Record<string, unknown>, path);
    return (value ?? '') as T;
  }, [activeProject]);

  // Switch project
  const switchProject = useCallback((projectId: string): void => {
    setActiveProjectId(projectId);
  }, []);

  // Delete project
  const deleteProject = useCallback((projectId: string): void => {
    setProjects(prev => {
      const filtered = prev.filter(p => p.id !== projectId);
      // If deleting active project, switch to first remaining or null
      if (activeProjectId === projectId) {
        setActiveProjectId(filtered[0]?.id || null);
      }
      return filtered;
    });
  }, [activeProjectId]);

  // Calculate phase completion percentage
  const getPhaseCompletion = useCallback((phaseNum: 1 | 2 | 3 | 4 | 5): number => {
    if (!activeProject) return 0;

    const phaseKey = `phase${phaseNum}` as keyof Project;
    const phaseData = activeProject[phaseKey];

    if (!phaseData || typeof phaseData !== 'object') return 0;

    const fields = Object.values(phaseData);
    if (fields.length === 0) return 0;

    const filled = fields.filter(v => {
      if (v === null || v === undefined) return false;
      if (typeof v === 'boolean') return true; // Booleans count as filled
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === 'object') {
        // For nested objects (like techStack), check if any field is filled
        return Object.values(v).some(
          subV => subV !== null && subV !== undefined && subV !== ''
        );
      }
      return v !== '';
    }).length;

    return Math.round((filled / fields.length) * 100);
  }, [activeProject]);

  // Duplicate a project
  const duplicateProject = useCallback((projectId: string): Project | null => {
    const original = projects.find(p => p.id === projectId);
    if (!original) return null;

    const now = new Date().toISOString();
    const duplicated: Project = {
      ...deepClone(original),
      id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: `${original.name} (Copy)`,
      createdAt: now,
      updatedAt: now,
    };

    setProjects(prev => [...prev, duplicated]);
    return duplicated;
  }, [projects]);

  // Export project as JSON string
  const exportProject = useCallback((projectId: string): string | null => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return null;
    return JSON.stringify(project, null, 2);
  }, [projects]);

  // Import project from JSON string
  const importProject = useCallback((jsonData: string): Project | null => {
    try {
      const parsed = JSON.parse(jsonData) as Project;

      // Validate it has required fields
      if (!parsed.name || !parsed.phase1) {
        throw new Error('Invalid project data');
      }

      const now = new Date().toISOString();
      const imported: Project = {
        ...deepClone(projectSchema),
        ...parsed,
        id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        createdAt: now,
        updatedAt: now,
      };

      setProjects(prev => [...prev, imported]);
      setActiveProjectId(imported.id);
      return imported;
    } catch (error) {
      console.error('Failed to import project:', error);
      return null;
    }
  }, []);

  // ==========================================================================
  // ARTIFACT MANAGEMENT FUNCTIONS
  // ==========================================================================

  // Get artifact by ID
  const getArtifact = useCallback((artifactId: string): Artifact | null => {
    if (!activeProject) return null;
    return activeProject.artifacts?.[artifactId] || null;
  }, [activeProject]);

  // Save artifact (creates new version from previous content)
  const saveArtifact = useCallback((
    artifactId: string,
    content: string,
    status: ArtifactStatus = 'draft',
    note: string = ''
  ): void => {
    if (!activeProjectId) return;

    setProjects(prev =>
      prev.map(p => {
        if (p.id !== activeProjectId) return p;

        const now = new Date().toISOString();
        const existingArtifact = p.artifacts?.[artifactId];

        // Create version from previous content if exists
        const versions = existingArtifact?.versions || [];
        if (existingArtifact?.currentContent) {
          versions.push({
            id: `v_${Date.now()}`,
            content: existingArtifact.currentContent,
            createdAt: existingArtifact.updatedAt,
            note: existingArtifact.versionNote || '',
          });
        }

        // Keep only last 10 versions
        const trimmedVersions = versions.slice(-10);

        return {
          ...p,
          updatedAt: now,
          artifacts: {
            ...p.artifacts,
            [artifactId]: {
              id: artifactId,
              status,
              currentContent: content,
              versions: trimmedVersions,
              updatedAt: now,
              versionNote: note,
            },
          },
        };
      })
    );
  }, [activeProjectId]);

  // Update artifact status only
  const updateArtifactStatus = useCallback((artifactId: string, status: ArtifactStatus): void => {
    if (!activeProjectId) return;

    setProjects(prev =>
      prev.map(p => {
        if (p.id !== activeProjectId) return p;
        if (!p.artifacts?.[artifactId]) return p;

        return {
          ...p,
          artifacts: {
            ...p.artifacts,
            [artifactId]: {
              ...p.artifacts[artifactId],
              status,
              updatedAt: new Date().toISOString(),
            },
          },
        };
      })
    );
  }, [activeProjectId]);

  // Restore artifact to a previous version
  const restoreArtifactVersion = useCallback((artifactId: string, versionId: string): void => {
    if (!activeProjectId) return;

    setProjects(prev =>
      prev.map(p => {
        if (p.id !== activeProjectId) return p;

        const artifact = p.artifacts?.[artifactId];
        if (!artifact) return p;

        const version = artifact.versions.find(v => v.id === versionId);
        if (!version) return p;

        // Save current as new version, restore old
        const now = new Date().toISOString();
        const newVersions = [
          ...artifact.versions,
          {
            id: `v_${Date.now()}`,
            content: artifact.currentContent,
            createdAt: artifact.updatedAt,
            note: 'Before restore',
          },
        ].slice(-10);

        return {
          ...p,
          artifacts: {
            ...p.artifacts,
            [artifactId]: {
              ...artifact,
              currentContent: version.content,
              versions: newVersions,
              updatedAt: now,
            },
          },
        };
      })
    );
  }, [activeProjectId]);

  // Get all artifacts for a phase with their definitions
  const getPhaseArtifacts = useCallback((phaseNum: 1 | 2 | 3 | 4 | 5): PhaseArtifact[] => {
    return Object.entries(artifactDefinitions)
      .filter(([, def]) => def.phase === phaseNum)
      .map(([id, def]) => ({
        ...def,
        id,
        status: (activeProject?.artifacts?.[id]?.status || 'empty') as ArtifactStatus,
        currentContent: activeProject?.artifacts?.[id]?.currentContent || '',
      }));
  }, [activeProject]);

  const contextValue = useMemo<ProjectContextValue>(() => ({
    projects,
    activeProject,
    activeProjectId,
    createProject,
    updateField,
    getField,
    switchProject,
    deleteProject,
    getPhaseCompletion,
    duplicateProject,
    exportProject,
    importProject,
    // Artifact management
    getArtifact,
    saveArtifact,
    updateArtifactStatus,
    restoreArtifactVersion,
    getPhaseArtifacts,
  }), [
    projects,
    activeProject,
    activeProjectId,
    createProject,
    updateField,
    getField,
    switchProject,
    deleteProject,
    getPhaseCompletion,
    duplicateProject,
    exportProject,
    importProject,
    getArtifact,
    saveArtifact,
    updateArtifactStatus,
    restoreArtifactVersion,
    getPhaseArtifacts,
  ]);

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject(): ProjectContextValue {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
