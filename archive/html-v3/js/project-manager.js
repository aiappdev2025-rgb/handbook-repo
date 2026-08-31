/**
 * AI SaaS Handbook - Project Manager
 * Business logic layer for project operations
 *
 * Handles:
 * - Project lifecycle (create, open, close)
 * - Artifact management with timing
 * - Activity logging
 * - Progress tracking and analytics
 */

(function(global) {
  'use strict';

  /**
   * ProjectManager - Business logic for project operations
   */
  class ProjectManager {
    constructor() {
      this.db = new WorkspaceDB();
      this.currentProject = null;
      this.artifactTimers = {}; // Track start times for duration calculation
      this.autoSaveInterval = null;
      this.autoSaveDelay = 30000; // 30 seconds
    }

    /**
     * Initialize the project manager
     * @returns {Promise<void>}
     */
    async init() {
      await this.db.init();
      console.log('ProjectManager: Initialized');
    }

    // =========================================
    // Project Lifecycle
    // =========================================

    /**
     * Create a new project
     * @param {string} name - Project name
     * @param {Object} profile - Initial profile data
     * @returns {Promise<Object>}
     */
    async newProject(name, profile = {}) {
      await this.init();

      const project = await this.db.createProject(name, profile);
      this.currentProject = project;
      this.startAutoSave();

      return project;
    }

    /**
     * Open an existing project
     * @param {string} id - Project ID
     * @returns {Promise<Object>}
     */
    async openProject(id) {
      await this.init();

      const project = await this.db.loadProject(id);
      if (!project) {
        throw new Error(`Project not found: ${id}`);
      }

      this.currentProject = project;

      // Log project opened
      this.log('project_opened', `Opened project "${project.meta.name}"`);

      // Update status if still draft
      if (project.meta.status === 'draft') {
        project.meta.status = 'in_progress';
      }

      await this.save();
      this.startAutoSave();

      return project;
    }

    /**
     * Close the current project
     * @returns {Promise<void>}
     */
    async closeProject() {
      if (this.currentProject) {
        this.log('project_closed', `Closed project "${this.currentProject.meta.name}"`);
        await this.save();
        this.stopAutoSave();
        this.currentProject = null;
        this.artifactTimers = {};
      }
    }

    /**
     * Save the current project
     * @returns {Promise<Object>}
     */
    async save() {
      if (!this.currentProject) {
        throw new Error('No project is currently open');
      }
      return await this.db.saveProject(this.currentProject);
    }

    /**
     * Get the current project
     * @returns {Object|null}
     */
    getCurrent() {
      return this.currentProject;
    }

    /**
     * List all projects
     * @param {Object} options - Query options
     * @returns {Promise<Array>}
     */
    async listProjects(options = {}) {
      await this.init();
      return await this.db.listProjects(options);
    }

    /**
     * Delete a project
     * @param {string} id - Project ID
     * @returns {Promise<void>}
     */
    async deleteProject(id) {
      await this.init();

      // Close if it's the current project
      if (this.currentProject && this.currentProject.meta.id === id) {
        this.stopAutoSave();
        this.currentProject = null;
      }

      await this.db.deleteProject(id);
    }

    // =========================================
    // Profile Management
    // =========================================

    /**
     * Update project profile
     * @param {Object} updates - Profile fields to update
     * @returns {Promise<Object>}
     */
    async updateProfile(updates) {
      if (!this.currentProject) {
        throw new Error('No project is currently open');
      }

      // Merge updates into profile
      Object.assign(this.currentProject.profile, updates);

      this.log('profile_updated', 'Project profile updated');
      await this.save();

      return this.currentProject.profile;
    }

    /**
     * Add a user role
     * @param {Object} role - { name, description }
     */
    async addUserRole(role) {
      if (!this.currentProject) throw new Error('No project open');

      this.currentProject.profile.userRoles.push(role);
      this.log('role_added', `Added role: ${role.name}`);
      await this.save();
    }

    /**
     * Remove a user role
     * @param {string} roleName
     */
    async removeUserRole(roleName) {
      if (!this.currentProject) throw new Error('No project open');

      const index = this.currentProject.profile.userRoles.findIndex(r => r.name === roleName);
      if (index > -1) {
        this.currentProject.profile.userRoles.splice(index, 1);
        this.log('role_removed', `Removed role: ${roleName}`);
        await this.save();
      }
    }

    /**
     * Add a core feature
     * @param {Object} feature - { name, description }
     */
    async addCoreFeature(feature) {
      if (!this.currentProject) throw new Error('No project open');

      this.currentProject.profile.coreFeatures.push(feature);
      this.log('feature_added', `Added feature: ${feature.name}`);
      await this.save();
    }

    /**
     * Remove a core feature
     * @param {string} featureName
     */
    async removeCoreFeature(featureName) {
      if (!this.currentProject) throw new Error('No project open');

      const index = this.currentProject.profile.coreFeatures.findIndex(f => f.name === featureName);
      if (index > -1) {
        this.currentProject.profile.coreFeatures.splice(index, 1);
        this.log('feature_removed', `Removed feature: ${featureName}`);
        await this.save();
      }
    }

    // =========================================
    // Artifact Management
    // =========================================

    /**
     * Get artifact key from phase and id
     * @param {number} phase
     * @param {string} artifactId
     * @returns {string}
     */
    getArtifactKey(phase, artifactId) {
      return `phase${phase}/${artifactId}`;
    }

    /**
     * Start working on an artifact (begins timing)
     * @param {number} phase - Phase number (1-5)
     * @param {string} artifactId - Artifact identifier
     * @param {Object} metadata - Additional metadata
     * @returns {Promise<Object>}
     */
    async startArtifact(phase, artifactId, metadata = {}) {
      if (!this.currentProject) throw new Error('No project open');

      const key = this.getArtifactKey(phase, artifactId);
      const now = new Date().toISOString();

      // Check if artifact already exists
      if (!this.currentProject.artifacts[key]) {
        this.currentProject.artifacts[key] = {
          id: artifactId,
          name: metadata.name || artifactId,
          phase: phase,
          chapter: metadata.chapter || null,
          content: '',
          status: 'in_progress',
          createdAt: now,
          startedAt: now,
          completedAt: null,
          totalDurationMinutes: 0
        };
      } else {
        // Resume existing artifact
        this.currentProject.artifacts[key].status = 'in_progress';
        this.currentProject.artifacts[key].startedAt = now;
      }

      // Start timer
      this.artifactTimers[key] = Date.now();

      this.log('artifact_started', metadata.name || artifactId, { phase, chapter: metadata.chapter });
      await this.save();

      return this.currentProject.artifacts[key];
    }

    /**
     * Save artifact content (auto-saves timing)
     * @param {number} phase
     * @param {string} artifactId
     * @param {string} content
     * @param {string} status - 'draft' | 'in_progress' | 'completed'
     * @returns {Promise<Object>}
     */
    async saveArtifact(phase, artifactId, content, status = 'draft') {
      if (!this.currentProject) throw new Error('No project open');

      const key = this.getArtifactKey(phase, artifactId);

      if (!this.currentProject.artifacts[key]) {
        throw new Error(`Artifact not found: ${key}`);
      }

      const artifact = this.currentProject.artifacts[key];
      artifact.content = content;
      artifact.status = status;

      // Update duration if timer is running
      if (this.artifactTimers[key]) {
        const elapsed = Math.round((Date.now() - this.artifactTimers[key]) / 60000);
        artifact.totalDurationMinutes += elapsed;
        this.artifactTimers[key] = Date.now(); // Reset timer
      }

      this.log('artifact_saved', artifact.name, { phase, status });
      await this.save();

      return artifact;
    }

    /**
     * Complete an artifact
     * @param {number} phase
     * @param {string} artifactId
     * @param {string} content - Final content (optional if already saved)
     * @returns {Promise<Object>}
     */
    async completeArtifact(phase, artifactId, content = null) {
      if (!this.currentProject) throw new Error('No project open');

      const key = this.getArtifactKey(phase, artifactId);

      if (!this.currentProject.artifacts[key]) {
        throw new Error(`Artifact not found: ${key}`);
      }

      const artifact = this.currentProject.artifacts[key];
      const now = new Date().toISOString();

      if (content !== null) {
        artifact.content = content;
      }

      artifact.status = 'completed';
      artifact.completedAt = now;

      // Calculate final duration
      if (this.artifactTimers[key]) {
        const elapsed = Math.round((Date.now() - this.artifactTimers[key]) / 60000);
        artifact.totalDurationMinutes += elapsed;
        delete this.artifactTimers[key];
      }

      this.log('artifact_completed', artifact.name, {
        phase,
        duration: artifact.totalDurationMinutes
      });

      // Check if phase is complete
      await this.checkPhaseCompletion(phase);
      await this.save();

      return artifact;
    }

    /**
     * Get an artifact
     * @param {number} phase
     * @param {string} artifactId
     * @returns {Object|null}
     */
    getArtifact(phase, artifactId) {
      if (!this.currentProject) return null;

      const key = this.getArtifactKey(phase, artifactId);
      return this.currentProject.artifacts[key] || null;
    }

    /**
     * Get all artifacts for a phase
     * @param {number} phase
     * @returns {Array}
     */
    getPhaseArtifacts(phase) {
      if (!this.currentProject) return [];

      const prefix = `phase${phase}/`;
      const artifacts = [];

      for (const [key, artifact] of Object.entries(this.currentProject.artifacts)) {
        if (key.startsWith(prefix)) {
          artifacts.push(artifact);
        }
      }

      return artifacts;
    }

    /**
     * Add a SPEC artifact (Phase 4 dynamic artifacts)
     * @param {string} specId - e.g., 'SPEC-AUTH-001'
     * @param {string} name - e.g., 'Authentication'
     * @param {number} chapter
     * @returns {Promise<Object>}
     */
    async addSpec(specId, name, chapter = 24) {
      return await this.startArtifact(4, `specs/${specId}`, {
        name: `SPEC: ${name}`,
        chapter: chapter
      });
    }

    // =========================================
    // Progress Tracking
    // =========================================

    /**
     * Get phase progress
     * @param {number} phase
     * @returns {Object} - { completed, total, percentage, timeSpent }
     */
    getPhaseProgress(phase) {
      if (!this.currentProject) {
        return { completed: 0, total: 0, percentage: 0, timeSpent: 0 };
      }

      const templates = ARTIFACT_TEMPLATES[`phase${phase}`] || [];
      const artifacts = this.getPhaseArtifacts(phase);

      let completed = 0;
      let timeSpent = 0;

      for (const artifact of artifacts) {
        if (artifact.status === 'completed') {
          completed++;
        }
        timeSpent += artifact.totalDurationMinutes || 0;
      }

      // For phase 4, count SPECs separately
      const total = phase === 4
        ? Math.max(templates.length, artifacts.length)
        : templates.length;

      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      return { completed, total, percentage, timeSpent };
    }

    /**
     * Get overall project progress
     * @returns {Object}
     */
    getOverallProgress() {
      if (!this.currentProject) {
        return { completed: 0, total: 0, percentage: 0, timeSpent: 0, currentPhase: 1 };
      }

      let totalCompleted = 0;
      let totalArtifacts = 0;
      let totalTime = 0;
      let currentPhase = 1;

      for (let phase = 1; phase <= 5; phase++) {
        const progress = this.getPhaseProgress(phase);
        totalCompleted += progress.completed;
        totalArtifacts += progress.total;
        totalTime += progress.timeSpent;

        // Determine current phase (first incomplete phase)
        if (progress.percentage < 100 && currentPhase === phase) {
          currentPhase = phase;
        } else if (progress.percentage === 100 && phase < 5) {
          currentPhase = phase + 1;
        }
      }

      const percentage = totalArtifacts > 0
        ? Math.round((totalCompleted / totalArtifacts) * 100)
        : 0;

      return {
        completed: totalCompleted,
        total: totalArtifacts,
        percentage,
        timeSpent: totalTime,
        currentPhase
      };
    }

    /**
     * Check if a phase is complete and log it
     * @param {number} phase
     */
    async checkPhaseCompletion(phase) {
      const progress = this.getPhaseProgress(phase);

      if (progress.percentage === 100) {
        // Check if we already logged this completion
        const alreadyLogged = this.currentProject.logs.some(
          log => log.action === 'phase_completed' && log.extra?.phase === phase
        );

        if (!alreadyLogged) {
          this.log('phase_completed', `Phase ${phase} completed`, {
            phase,
            duration: progress.timeSpent
          });
        }
      }
    }

    // =========================================
    // Logging
    // =========================================

    /**
     * Add a log entry
     * @param {string} action - Action type
     * @param {string} detail - Description
     * @param {Object} extra - Additional data
     */
    log(action, detail, extra = {}) {
      if (!this.currentProject) return;

      const entry = {
        ts: new Date().toISOString(),
        action,
        detail,
        ...extra
      };

      this.currentProject.logs.push(entry);

      // Keep logs manageable (max 1000 entries)
      if (this.currentProject.logs.length > 1000) {
        this.currentProject.logs = this.currentProject.logs.slice(-1000);
      }
    }

    /**
     * Get logs with optional filtering
     * @param {Object} options
     * @param {string} options.action - Filter by action type
     * @param {number} options.phase - Filter by phase
     * @param {number} options.limit - Max entries to return
     * @param {string} options.since - ISO date string
     * @returns {Array}
     */
    getLogs(options = {}) {
      if (!this.currentProject) return [];

      let logs = [...this.currentProject.logs];

      if (options.action) {
        logs = logs.filter(l => l.action === options.action);
      }

      if (options.phase) {
        logs = logs.filter(l => l.phase === options.phase);
      }

      if (options.since) {
        logs = logs.filter(l => l.ts >= options.since);
      }

      // Sort by timestamp descending (newest first)
      logs.sort((a, b) => b.ts.localeCompare(a.ts));

      if (options.limit) {
        logs = logs.slice(0, options.limit);
      }

      return logs;
    }

    /**
     * Get activity summary
     * @returns {Object}
     */
    getActivitySummary() {
      if (!this.currentProject) return null;

      const logs = this.currentProject.logs;
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();

      return {
        totalEntries: logs.length,
        todayEntries: logs.filter(l => l.ts >= today).length,
        weekEntries: logs.filter(l => l.ts >= weekAgo).length,
        artifactsCompleted: logs.filter(l => l.action === 'artifact_completed').length,
        phasesCompleted: logs.filter(l => l.action === 'phase_completed').length,
        firstActivity: logs.length > 0 ? logs[0].ts : null,
        lastActivity: logs.length > 0 ? logs[logs.length - 1].ts : null
      };
    }

    // =========================================
    // Auto-save
    // =========================================

    /**
     * Start auto-save interval
     */
    startAutoSave() {
      this.stopAutoSave();
      this.autoSaveInterval = setInterval(async () => {
        if (this.currentProject) {
          await this.save();
          console.log('ProjectManager: Auto-saved');
        }
      }, this.autoSaveDelay);
    }

    /**
     * Stop auto-save interval
     */
    stopAutoSave() {
      if (this.autoSaveInterval) {
        clearInterval(this.autoSaveInterval);
        this.autoSaveInterval = null;
      }
    }

    // =========================================
    // Export/Import
    // =========================================

    /**
     * Export current project
     * @returns {Promise<string>}
     */
    async exportCurrent() {
      if (!this.currentProject) {
        throw new Error('No project is currently open');
      }
      return await this.db.exportProject(this.currentProject.meta.id);
    }

    /**
     * Download current project as JSON file
     */
    async downloadCurrent() {
      if (!this.currentProject) {
        throw new Error('No project is currently open');
      }
      await this.db.downloadProject(this.currentProject.meta.id);
    }

    /**
     * Import project from file
     * @param {File} file
     * @returns {Promise<Object>}
     */
    async importFromFile(file) {
      await this.init();
      return await this.db.importFromFile(file);
    }

    // =========================================
    // Utilities
    // =========================================

    /**
     * Format duration in minutes to human readable
     * @param {number} minutes
     * @returns {string}
     */
    static formatDuration(minutes) {
      if (minutes < 60) {
        return `${minutes}m`;
      }
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }

    /**
     * Format timestamp to relative time
     * @param {string} isoString
     * @returns {string}
     */
    static formatRelativeTime(isoString) {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;

      return date.toLocaleDateString();
    }

    /**
     * Format timestamp to date/time string
     * @param {string} isoString
     * @returns {string}
     */
    static formatDateTime(isoString) {
      const date = new Date(isoString);
      return date.toLocaleString();
    }
  }

  // Export to global scope
  global.ProjectManager = ProjectManager;

})(typeof window !== 'undefined' ? window : this);
