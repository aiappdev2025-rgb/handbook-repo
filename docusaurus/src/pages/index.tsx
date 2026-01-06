import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/getting-started/quick-start">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Complete Methodology for Building Production-Quality SaaS with AI">
      <HomepageHeader />
      <main>
        <div className="container" style={{padding: '2rem'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem'}}>
            <PhaseCard
              phase={1}
              title="Validate"
              description="Research, planning, and business validation"
              link="/phase-1-validate"
              color="#3b82f6"
            />
            <PhaseCard
              phase={2}
              title="Design"
              description="UX/UI design and component specification"
              link="/phase-2-design"
              color="#ec4899"
            />
            <PhaseCard
              phase={3}
              title="Architect"
              description="Technical architecture and build preparation"
              link="/phase-3-architect"
              color="#22c55e"
            />
            <PhaseCard
              phase={4}
              title="Build"
              description="MOAI-powered implementation with TDD"
              link="/phase-4-build"
              color="#a855f7"
            />
            <PhaseCard
              phase={5}
              title="Launch"
              description="QA, deployment, and launch"
              link="/phase-5-launch"
              color="#f59e0b"
            />
          </div>
        </div>
      </main>
    </Layout>
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
    <Link to={link} style={{textDecoration: 'none'}}>
      <div style={{
        background: 'var(--ifm-background-surface-color)',
        border: '1px solid var(--ifm-toc-border-color)',
        borderLeft: `4px solid ${color}`,
        padding: '1.5rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: color,
          marginBottom: '0.5rem',
        }}>
          Phase {phase}
        </div>
        <div style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--ifm-heading-color)',
          marginBottom: '0.5rem',
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '0.875rem',
          color: 'var(--ifm-color-content-secondary)',
        }}>
          {description}
        </div>
      </div>
    </Link>
  );
}
