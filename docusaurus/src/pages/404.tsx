import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import SearchBar from '@theme/SearchBar';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    padding: '2rem',
    textAlign: 'center' as const,
  },
  errorCode: {
    fontSize: '6rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, var(--ifm-color-primary) 0%, #a855f7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
    lineHeight: 1,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'var(--ifm-heading-color)',
    marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  message: {
    fontSize: '1rem',
    color: 'var(--ifm-color-content-secondary)',
    marginBottom: '2rem',
    maxWidth: '400px',
  },
  searchWrapper: {
    marginBottom: '2rem',
    width: '100%',
    maxWidth: '400px',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
  link: {
    padding: '0.75rem 1.5rem',
    border: '1px solid var(--ifm-toc-border-color)',
    background: 'var(--ifm-background-surface-color)',
    color: 'var(--ifm-color-content)',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
};

export default function NotFound(): ReactNode {
  return (
    <Layout title="Page Not Found">
      <main style={styles.container}>
        <div style={styles.errorCode}>404</div>
        <h1 style={styles.title}>Page Not Found</h1>
        <p style={styles.message}>
          Looks like this page doesn't exist. Try searching for what you need or start from the beginning.
        </p>
        <div style={styles.searchWrapper}>
          <SearchBar />
        </div>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/getting-started/quick-start" style={styles.link}>
            Quick Start
          </Link>
          <Link to="/getting-started/quick-reference" style={styles.link}>
            Quick Reference
          </Link>
        </div>
      </main>
    </Layout>
  );
}
