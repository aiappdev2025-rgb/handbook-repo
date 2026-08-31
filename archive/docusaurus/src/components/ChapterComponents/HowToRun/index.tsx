import React from 'react';
import styles from './styles.module.css';

interface HowToRunProps {
  platform: 'chat' | 'code' | 'either';
  session: 'new' | 'continue' | 'project';
  children?: React.ReactNode;
}

export default function HowToRun({ platform, session, children }: HowToRunProps) {
  const platformText = {
    chat: { icon: '💬', label: 'Claude Chat', desc: 'Use claude.ai or Claude app' },
    code: { icon: '💻', label: 'Claude Code', desc: 'Use Claude Code CLI in your terminal' },
    either: { icon: '🔀', label: 'Chat or Code', desc: 'Either platform works' },
  };

  const sessionText = {
    new: { icon: '🆕', label: 'New Chat', desc: 'Start a fresh conversation' },
    continue: { icon: '➡️', label: 'Continue', desc: 'Stay in your current conversation' },
    project: { icon: '📁', label: 'Project Session', desc: 'Use dedicated Claude Code project' },
  };

  const p = platformText[platform];
  const s = sessionText[session];

  return (
    <div className={styles.howToRun}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>🎯</span>
        <span className={styles.headerTitle}>How to Run This Prompt</span>
      </div>
      <div className={styles.content}>
        <div className={styles.badges}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>{p.icon}</span>
            <div className={styles.badgeText}>
              <span className={styles.badgeLabel}>{p.label}</span>
              <span className={styles.badgeDesc}>{p.desc}</span>
            </div>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>{s.icon}</span>
            <div className={styles.badgeText}>
              <span className={styles.badgeLabel}>{s.label}</span>
              <span className={styles.badgeDesc}>{s.desc}</span>
            </div>
          </div>
        </div>
        {children && (
          <div className={styles.details}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
