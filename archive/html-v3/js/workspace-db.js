/**
 * AI SaaS Handbook - Workspace Database
 * IndexedDB wrapper for project storage
 *
 * Stores projects with artifacts, logs, and metadata
 * Works offline with file:// protocol
 */

(function(global) {
  'use strict';

  const DB_NAME = 'HandbookWorkspace';
  const DB_VERSION = 1;
  const STORE_PROJECTS = 'projects';

  /**
   * WorkspaceDB - IndexedDB wrapper for project storage
   */
  class WorkspaceDB {
    constructor() {
      this.db = null;
      this.isReady = false;
    }

    /**
     * Initialize the database
     * @returns {Promise<void>}
     */
    async init() {
      if (this.isReady) return;

      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
          console.error('WorkspaceDB: Failed to open database', request.error);
          reject(request.error);
        };

        request.onsuccess = () => {
          this.db = request.result;
          this.isReady = true;
          console.log('WorkspaceDB: Database initialized');
          resolve();
        };

        request.onupgradeneeded = (event) => {
          const db = event.target.result;

          // Create projects store
          if (!db.objectStoreNames.contains(STORE_PROJECTS)) {
            const store = db.createObjectStore(STORE_PROJECTS, { keyPath: 'meta.id' });

            // Indexes for querying
            store.createIndex('name', 'meta.name', { unique: false });
            store.createIndex('status', 'meta.status', { unique: false });
            store.createIndex('lastModifiedAt', 'meta.lastModifiedAt', { unique: false });

            console.log('WorkspaceDB: Created projects store');
          }
        };
      });
    }

    /**
     * Ensure database is ready before operations
     */
    async ensureReady() {
      if (!this.isReady) {
        await this.init();
      }
    }

    /**
     * Generate a unique project ID
     * @returns {string}
     */
    generateId() {
      return 'proj_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Create a new project
     * @param {string} name - Project name
     * @param {Object} profile - Initial profile data (optional)
     * @returns {Promise<Object>} - The created project
     */
    async createProject(name, profile = {}) {
      await this.ensureReady();

      const now = new Date().toISOString();
      const project = {
        meta: {
          id: this.generateId(),
          name: name,
          createdAt: now,
          lastModifiedAt: now,
          status: 'draft' // draft | in_progress | completed
        },
        profile: {
          appName: profile.appName || name,
          tagline: profile.tagline || '',
          description: profile.description || '',
          techStack: profile.techStack || {
            framework: 'nextjs',
            database: 'supabase',
            styling: 'tailwind-shadcn',
            auth: 'supabase'
          },
          userRoles: profile.userRoles || [],
          coreFeatures: profile.coreFeatures || [],
          customFields: profile.customFields || {}
        },
        artifacts: {},
        logs: [
          {
            ts: now,
            action: 'project_created',
            detail: `Project "${name}" initialized`
          }
        ]
      };

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([STORE_PROJECTS], 'readwrite');
        const store = transaction.objectStore(STORE_PROJECTS);
        const request = store.add(project);

        request.onsuccess = () => {
          console.log('WorkspaceDB: Project created', project.meta.id);
          resolve(project);
        };

        request.onerror = () => {
          console.error('WorkspaceDB: Failed to create project', request.error);
          reject(request.error);
        };
      });
    }

    /**
     * Load a project by ID
     * @param {string} id - Project ID
     * @returns {Promise<Object|null>}
     */
    async loadProject(id) {
      await this.ensureReady();

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([STORE_PROJECTS], 'readonly');
        const store = transaction.objectStore(STORE_PROJECTS);
        const request = store.get(id);

        request.onsuccess = () => {
          resolve(request.result || null);
        };

        request.onerror = () => {
          console.error('WorkspaceDB: Failed to load project', request.error);
          reject(request.error);
        };
      });
    }

    /**
     * Save/update a project
     * @param {Object} project - The project to save
     * @returns {Promise<Object>}
     */
    async saveProject(project) {
      await this.ensureReady();

      // Update modification timestamp
      project.meta.lastModifiedAt = new Date().toISOString();

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([STORE_PROJECTS], 'readwrite');
        const store = transaction.objectStore(STORE_PROJECTS);
        const request = store.put(project);

        request.onsuccess = () => {
          console.log('WorkspaceDB: Project saved', project.meta.id);
          resolve(project);
        };

        request.onerror = () => {
          console.error('WorkspaceDB: Failed to save project', request.error);
          reject(request.error);
        };
      });
    }

    /**
     * List all projects
     * @param {Object} options - Query options
     * @param {string} options.sortBy - Sort field (default: lastModifiedAt)
     * @param {string} options.order - Sort order: 'asc' or 'desc' (default: desc)
     * @returns {Promise<Array>}
     */
    async listProjects(options = {}) {
      await this.ensureReady();

      const { sortBy = 'lastModifiedAt', order = 'desc' } = options;

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([STORE_PROJECTS], 'readonly');
        const store = transaction.objectStore(STORE_PROJECTS);
        const request = store.getAll();

        request.onsuccess = () => {
          let projects = request.result || [];

          // Sort projects
          projects.sort((a, b) => {
            let valA, valB;

            if (sortBy === 'name') {
              valA = a.meta.name.toLowerCase();
              valB = b.meta.name.toLowerCase();
            } else if (sortBy === 'createdAt') {
              valA = a.meta.createdAt;
              valB = b.meta.createdAt;
            } else {
              valA = a.meta.lastModifiedAt;
              valB = b.meta.lastModifiedAt;
            }

            if (order === 'asc') {
              return valA < valB ? -1 : valA > valB ? 1 : 0;
            } else {
              return valA > valB ? -1 : valA < valB ? 1 : 0;
            }
          });

          resolve(projects);
        };

        request.onerror = () => {
          console.error('WorkspaceDB: Failed to list projects', request.error);
          reject(request.error);
        };
      });
    }

    /**
     * Delete a project
     * @param {string} id - Project ID
     * @returns {Promise<void>}
     */
    async deleteProject(id) {
      await this.ensureReady();

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([STORE_PROJECTS], 'readwrite');
        const store = transaction.objectStore(STORE_PROJECTS);
        const request = store.delete(id);

        request.onsuccess = () => {
          console.log('WorkspaceDB: Project deleted', id);
          resolve();
        };

        request.onerror = () => {
          console.error('WorkspaceDB: Failed to delete project', request.error);
          reject(request.error);
        };
      });
    }

    /**
     * Export a project as JSON
     * @param {string} id - Project ID
     * @returns {Promise<string>} - JSON string
     */
    async exportProject(id) {
      const project = await this.loadProject(id);
      if (!project) {
        throw new Error(`Project not found: ${id}`);
      }

      const exportData = {
        exportVersion: 1,
        exportedAt: new Date().toISOString(),
        project: project
      };

      return JSON.stringify(exportData, null, 2);
    }

    /**
     * Export a project and trigger download
     * @param {string} id - Project ID
     */
    async downloadProject(id) {
      const project = await this.loadProject(id);
      if (!project) {
        throw new Error(`Project not found: ${id}`);
      }

      const json = await this.exportProject(id);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.meta.name.toLowerCase().replace(/\s+/g, '-')}-workspace.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    /**
     * Import a project from JSON
     * @param {string|Object} data - JSON string or parsed object
     * @param {Object} options - Import options
     * @param {boolean} options.generateNewId - Generate new ID (default: true)
     * @returns {Promise<Object>} - The imported project
     */
    async importProject(data, options = {}) {
      await this.ensureReady();

      const { generateNewId = true } = options;

      // Parse if string
      let importData;
      if (typeof data === 'string') {
        try {
          importData = JSON.parse(data);
        } catch (e) {
          throw new Error('Invalid JSON format');
        }
      } else {
        importData = data;
      }

      // Validate structure
      if (!importData.project || !importData.project.meta) {
        throw new Error('Invalid project format');
      }

      const project = importData.project;

      // Generate new ID to avoid conflicts
      if (generateNewId) {
        const oldId = project.meta.id;
        project.meta.id = this.generateId();

        // Add import log entry
        project.logs.push({
          ts: new Date().toISOString(),
          action: 'project_imported',
          detail: `Imported from backup (original ID: ${oldId})`
        });
      }

      // Update timestamps
      project.meta.lastModifiedAt = new Date().toISOString();

      // Save to database
      return await this.saveProject(project);
    }

    /**
     * Import from file input
     * @param {File} file - File object from input
     * @returns {Promise<Object>} - The imported project
     */
    async importFromFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
          try {
            const project = await this.importProject(e.target.result);
            resolve(project);
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };

        reader.readAsText(file);
      });
    }

    /**
     * Get storage usage info
     * @returns {Promise<Object>}
     */
    async getStorageInfo() {
      const projects = await this.listProjects();
      const totalProjects = projects.length;

      // Estimate storage size
      let estimatedSize = 0;
      for (const project of projects) {
        estimatedSize += JSON.stringify(project).length;
      }

      return {
        projectCount: totalProjects,
        estimatedSizeBytes: estimatedSize,
        estimatedSizeKB: Math.round(estimatedSize / 1024),
        estimatedSizeMB: (estimatedSize / (1024 * 1024)).toFixed(2)
      };
    }

    /**
     * Clear all data (use with caution!)
     * @returns {Promise<void>}
     */
    async clearAll() {
      await this.ensureReady();

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([STORE_PROJECTS], 'readwrite');
        const store = transaction.objectStore(STORE_PROJECTS);
        const request = store.clear();

        request.onsuccess = () => {
          console.log('WorkspaceDB: All data cleared');
          resolve();
        };

        request.onerror = () => {
          console.error('WorkspaceDB: Failed to clear data', request.error);
          reject(request.error);
        };
      });
    }
  }

  // Artifact templates - defines expected artifacts per phase
  const ARTIFACT_TEMPLATES = {
    phase1: [
      { id: 'one-pager', name: 'One-Pager', chapter: 6 },
      { id: 'design-brief', name: 'Design Brief', chapter: 7 },
      { id: 'research-notes', name: 'Research Notes', chapter: 5 }
    ],
    phase2: [
      { id: 'ux-package', name: 'UX Package', chapter: 9 },
      { id: 'ui-system', name: 'UI System', chapter: 11 },
      { id: 'visual-direction', name: 'Visual Direction', chapter: 12 }
    ],
    phase3: [
      { id: 'build-contract', name: 'Build Contract', chapter: 21 },
      { id: 'database-schema', name: 'Database Schema', chapter: 14 },
      { id: 'claude-md', name: 'CLAUDE.md', chapter: 22 },
      { id: 'environment-config', name: 'Environment Config', chapter: 18 }
    ],
    phase4: [
      { id: 'tech-debt', name: 'TECH-DEBT.md', chapter: 26 }
      // SPECs are dynamic, added as needed
    ],
    phase5: [
      { id: 'launch-checklist', name: 'Launch Checklist', chapter: 42 }
    ]
  };

  // Export to global scope
  global.WorkspaceDB = WorkspaceDB;
  global.ARTIFACT_TEMPLATES = ARTIFACT_TEMPLATES;

})(typeof window !== 'undefined' ? window : this);
