import React, {useEffect, useState} from 'react';
import {useLocation, useHistory} from '@docusaurus/router';
import {ProjectProvider} from '../context/ProjectContext';

// Reading progress bar styles
const progressBarStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '3px',
  background: 'linear-gradient(90deg, var(--ifm-color-primary) 0%, #a855f7 100%)',
  zIndex: 9999,
  transition: 'width 0.1s ease-out',
};

// Back to top button styles
const backToTopStyles: React.CSSProperties = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  width: '48px',
  height: '48px',
  background: 'var(--ifm-background-surface-color)',
  border: '1px solid var(--ifm-toc-border-color)',
  color: 'var(--ifm-color-content)',
  fontSize: '1.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  zIndex: 1000,
};

// Navigation hint styles
const navHintStyles: React.CSSProperties = {
  position: 'fixed',
  bottom: '1rem',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '0.75rem',
  color: 'var(--ifm-color-content-secondary)',
  fontFamily: 'var(--ifm-font-family-monospace)',
  background: 'var(--ifm-background-surface-color)',
  padding: '0.25rem 0.75rem',
  border: '1px solid var(--ifm-toc-border-color)',
  zIndex: 1000,
  opacity: 0.7,
};

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [location.pathname]);

  // Only show on doc pages
  if (!location.pathname.includes('/phase-') &&
      !location.pathname.includes('/getting-started') &&
      !location.pathname.includes('/reference') &&
      !location.pathname.includes('/templates') &&
      !location.pathname.includes('/tools')) {
    return null;
  }

  return <div style={{...progressBarStyles, width: `${progress}%`}} />;
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={backToTopStyles}
      aria-label="Back to top"
      title="Back to top"
    >
      ↑
    </button>
  );
}

function KeyboardNavigation() {
  const history = useHistory();
  const location = useLocation();
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show hint briefly on first doc page visit
    const hasSeenHint = sessionStorage.getItem('keyboard-nav-hint');
    if (!hasSeenHint && (
      location.pathname.includes('/phase-') ||
      location.pathname.includes('/getting-started')
    )) {
      setShowHint(true);
      sessionStorage.setItem('keyboard-nav-hint', 'true');
      setTimeout(() => setShowHint(false), 5000);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Find pagination links
      const prevLink = document.querySelector('.pagination-nav__link--prev') as HTMLAnchorElement;
      const nextLink = document.querySelector('.pagination-nav__link--next') as HTMLAnchorElement;

      if (e.key === 'ArrowLeft' && prevLink?.href) {
        e.preventDefault();
        history.push(new URL(prevLink.href).pathname);
      } else if (e.key === 'ArrowRight' && nextLink?.href) {
        e.preventDefault();
        history.push(new URL(nextLink.href).pathname);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history]);

  if (!showHint) return null;

  return <div style={navHintStyles}>Use ← → to navigate chapters</div>;
}

export default function Root({children}: {children: React.ReactNode}): JSX.Element {
  return (
    <ProjectProvider>
      <a href="#__docusaurus" className="skip-link">
        Skip to content
      </a>
      <ReadingProgressBar />
      {children}
      <BackToTopButton />
      <KeyboardNavigation />
    </ProjectProvider>
  );
}
