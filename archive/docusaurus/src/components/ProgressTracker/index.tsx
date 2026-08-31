import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface PhaseProgress {
  id: string;
  title: string;
  color: string;
  pages: string[];
}

const PHASES: PhaseProgress[] = [
  {
    id: 'phase-1',
    title: 'Validate',
    color: '#FF6B6B',
    pages: [
      '/phase-1-validate/introduction',
      '/phase-1-validate/market-research',
      '/phase-1-validate/opportunity-assessment',
      '/phase-1-validate/business-one-pager',
      '/phase-1-validate/competitive-analysis',
      '/phase-1-validate/mvp-scoping',
      '/phase-1-validate/design-brief',
    ],
  },
  {
    id: 'phase-2',
    title: 'Design',
    color: '#4ECDC4',
    pages: [
      '/phase-2-design/design-philosophy',
      '/phase-2-design/ux-package',
      '/phase-2-design/user-flows',
      '/phase-2-design/ui-system',
      '/phase-2-design/component-library',
    ],
  },
  {
    id: 'phase-3',
    title: 'Architect',
    color: '#45B7D1',
    pages: [
      '/phase-3-architect/solution-architecture',
      '/phase-3-architect/data-model',
      '/phase-3-architect/api-specification',
      '/phase-3-architect/security',
      '/phase-3-architect/infrastructure',
      '/phase-3-architect/multi-environment',
      '/phase-3-architect/adr-templates',
      '/phase-3-architect/test-strategy',
      '/phase-3-architect/build-contract',
      '/phase-3-architect/dev-environment',
    ],
  },
  {
    id: 'phase-4',
    title: 'Build',
    color: '#96CEB4',
    pages: [
      '/phase-4-build/moai-overview',
      '/phase-4-build/spec-first',
      '/phase-4-build/tdd-workflow',
      '/phase-4-build/quality-gates',
      '/phase-4-build/m1-foundation',
      '/phase-4-build/m2-database',
      '/phase-4-build/m3-api',
      '/phase-4-build/m4-ui-shell',
      '/phase-4-build/checkpoint-1',
      '/phase-4-build/m5-auth',
      '/phase-4-build/m5-implementation',
      '/phase-4-build/m6-core-features',
      '/phase-4-build/m7-admin',
      '/phase-4-build/m7-implementation',
      '/phase-4-build/checkpoint-2',
      '/phase-4-build/m8-advanced',
      '/phase-4-build/m9-payments',
      '/phase-4-build/m10-polish',
      '/phase-4-build/m11-prelaunch',
    ],
  },
  {
    id: 'phase-5',
    title: 'Launch',
    color: '#DDA0DD',
    pages: [
      '/phase-5-launch/qa-deployment',
      '/phase-5-launch/launch-checklist',
    ],
  },
];

interface PhaseStats {
  completed: number;
  total: number;
  percentage: number;
}

function getPhaseStats(pages: string[]): PhaseStats {
  if (typeof window === 'undefined') {
    return { completed: 0, total: pages.length, percentage: 0 };
  }

  let completed = 0;
  for (const page of pages) {
    const key = `prereq-${page}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const checked = JSON.parse(saved);
        const values = Object.values(checked);
        if (values.length > 0 && values.every(Boolean)) {
          completed++;
        }
      } catch {
        // Invalid JSON, skip
      }
    }
  }

  const total = pages.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percentage };
}

function getTotalStats(): PhaseStats {
  const allPages = PHASES.flatMap(p => p.pages);
  return getPhaseStats(allPages);
}

interface ProgressTrackerProps {
  variant?: 'full' | 'compact';
}

export default function ProgressTracker({ variant = 'full' }: ProgressTrackerProps): JSX.Element {
  const [stats, setStats] = useState<Record<string, PhaseStats>>({});
  const [total, setTotal] = useState<PhaseStats>({ completed: 0, total: 0, percentage: 0 });

  useEffect(() => {
    const updateStats = () => {
      const newStats: Record<string, PhaseStats> = {};
      for (const phase of PHASES) {
        newStats[phase.id] = getPhaseStats(phase.pages);
      }
      setStats(newStats);
      setTotal(getTotalStats());
    };

    updateStats();

    // Listen for storage changes (from other tabs or prereq updates)
    window.addEventListener('storage', updateStats);

    // Poll for changes (since same-tab storage events don't fire)
    const interval = setInterval(updateStats, 2000);

    return () => {
      window.removeEventListener('storage', updateStats);
      clearInterval(interval);
    };
  }, []);

  if (variant === 'compact') {
    return (
      <div className={styles.compact}>
        <div className={styles.compactHeader}>
          <span className={styles.compactTitle}>Progress</span>
          <span className={styles.compactPercentage}>{total.percentage}%</span>
        </div>
        <div className={styles.compactBar}>
          <div
            className={styles.compactFill}
            style={{ width: `${total.percentage}%` }}
          />
        </div>
        <div className={styles.compactPhases}>
          {PHASES.map(phase => {
            const phaseStats = stats[phase.id] || { completed: 0, total: 0, percentage: 0 };
            return (
              <div
                key={phase.id}
                className={styles.compactPhase}
                title={`${phase.title}: ${phaseStats.completed}/${phaseStats.total}`}
              >
                <div
                  className={styles.compactDot}
                  style={{
                    backgroundColor: phaseStats.percentage === 100 ? phase.color : 'var(--ifm-color-emphasis-300)',
                    opacity: phaseStats.percentage > 0 ? 1 : 0.4,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tracker}>
      <div className={styles.header}>
        <h3>Your Progress</h3>
        <span className={styles.totalProgress}>{total.percentage}% Complete</span>
      </div>

      <div className={styles.overallBar}>
        <div
          className={styles.overallFill}
          style={{ width: `${total.percentage}%` }}
        />
      </div>

      <div className={styles.phases}>
        {PHASES.map(phase => {
          const phaseStats = stats[phase.id] || { completed: 0, total: 0, percentage: 0 };
          return (
            <div key={phase.id} className={styles.phase}>
              <div className={styles.phaseHeader}>
                <span
                  className={styles.phaseDot}
                  style={{ backgroundColor: phase.color }}
                />
                <span className={styles.phaseTitle}>{phase.title}</span>
                <span className={styles.phaseCount}>
                  {phaseStats.completed}/{phaseStats.total}
                </span>
              </div>
              <div className={styles.phaseBar}>
                <div
                  className={styles.phaseFill}
                  style={{
                    width: `${phaseStats.percentage}%`,
                    backgroundColor: phase.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <p>Progress is tracked via prerequisite checkboxes on each page.</p>
      </div>
    </div>
  );
}
