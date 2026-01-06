import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ProgressTracker from '@site/src/components/ProgressTracker';

import styles from './index.module.css';

const phases = [
  { phase: 1, title: 'Validate', description: 'Research, planning, and business validation', link: '/phase-1-validate', color: '#3b82f6' },
  { phase: 2, title: 'Design', description: 'UX/UI design and component specification', link: '/phase-2-design', color: '#ec4899' },
  { phase: 3, title: 'Architect', description: 'Technical architecture and build preparation', link: '/phase-3-architect', color: '#22c55e' },
  { phase: 4, title: 'Build', description: 'MOAI-powered implementation with TDD', link: '/phase-4-build', color: '#a855f7' },
  { phase: 5, title: 'Launch', description: 'QA, deployment, and launch', link: '/phase-5-launch', color: '#f59e0b' },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.heroStats}>
            <span className={styles.statItem}>43 Chapters</span>
            <span className={styles.statDivider}>•</span>
            <span className={styles.statItem}>5 Templates</span>
            <span className={styles.statDivider}>•</span>
            <span className={styles.statItem}>3 Tools</span>
          </div>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--lg', styles.ctaPrimary)}
              to="/getting-started/quick-start">
              Start Here
            </Link>
            <Link
              className={clsx('button button--lg button--outline', styles.ctaSecondary)}
              to="/getting-started/quick-reference">
              Quick Reference
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function PhaseOverview() {
  return (
    <section className={styles.phaseOverview}>
      <div className="container">
        <h2 className={styles.sectionTitle}>The MOAI Framework</h2>
        <p className={styles.sectionSubtitle}>
          Five phases to transform your idea into a production-ready SaaS product
        </p>
        <div className={styles.phaseFlow}>
          {phases.map((phase, index) => (
            <div key={phase.phase} className={styles.phaseFlowItem}>
              <PhaseCard {...phase} />
              {index < phases.length - 1 && (
                <div className={styles.phaseArrow}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhaseCard({phase, title, description, link, color}: {
  phase: number;
  title: string;
  description: string;
  link: string;
  color: string;
}) {
  return (
    <Link to={link} className={styles.phaseCard}>
      <div
        className={styles.phaseCardInner}
        style={{'--phase-color': color} as React.CSSProperties}
      >
        <div className={styles.phaseNumber}>
          Phase {phase}
        </div>
        <div className={styles.phaseTitle}>
          {title}
        </div>
        <div className={styles.phaseDescription}>
          {description}
        </div>
      </div>
    </Link>
  );
}

function QuickAccess() {
  return (
    <section className={styles.quickAccess}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Quick Access</h2>
        <div className={styles.quickGrid}>
          <Link to="/tools/prompt-builder" className={styles.quickCard}>
            <div className={styles.quickIcon}>⚡</div>
            <div className={styles.quickLabel}>Prompt Builder</div>
            <div className={styles.quickDesc}>Generate EARS-format prompts</div>
          </Link>
          <Link to="/reference/workflow-guide" className={styles.quickCard}>
            <div className={styles.quickIcon}>🔄</div>
            <div className={styles.quickLabel}>Workflow</div>
            <div className={styles.quickDesc}>MOAI workflow guide</div>
          </Link>
          <Link to="/getting-started/quick-reference" className={styles.quickCard}>
            <div className={styles.quickIcon}>📋</div>
            <div className={styles.quickLabel}>Quick Reference</div>
            <div className={styles.quickDesc}>Commands and patterns</div>
          </Link>
          <Link to="/templates/spec-template" className={styles.quickCard}>
            <div className={styles.quickIcon}>📄</div>
            <div className={styles.quickLabel}>Templates</div>
            <div className={styles.quickDesc}>SPEC, Build Contract, and more</div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProgressSection() {
  return (
    <section className={styles.progressSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Track Your Progress</h2>
        <div className={styles.progressWrapper}>
          <ProgressTracker />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Home"
      description="Complete Methodology for Building Production-Quality SaaS with AI">
      <HomepageHeader />
      <main>
        <PhaseOverview />
        <QuickAccess />
        <ProgressSection />
      </main>
    </Layout>
  );
}
