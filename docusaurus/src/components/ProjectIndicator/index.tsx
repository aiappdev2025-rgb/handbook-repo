import React from 'react';
import {useProject} from '../../context/ProjectContext';
import styles from './styles.module.css';

export default function ProjectIndicator(): JSX.Element {
  const {activeProject} = useProject();

  if (!activeProject) {
    return (
      <a href="/my-project" className={styles.indicator}>
        <span className={styles.icon}>&#9673;</span>
        <span className={styles.noProject}>No project</span>
      </a>
    );
  }

  const displayName = activeProject.phase1?.productName || activeProject.name;

  return (
    <a href="/my-project" className={styles.indicator}>
      <span className={styles.activeIcon}>&#9679;</span>
      <span className={styles.projectName}>{displayName}</span>
    </a>
  );
}
