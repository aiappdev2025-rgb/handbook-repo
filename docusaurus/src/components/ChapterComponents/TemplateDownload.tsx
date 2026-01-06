import React from 'react';

interface TemplateDownloadProps {
  name: string;
  file: string;
  description?: string;
}

export default function TemplateDownload({
  name,
  file,
  description
}: TemplateDownloadProps): JSX.Element {
  return (
    <div style={{
      background: 'var(--gray-900)',
      border: '1px solid var(--gray-700)',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    }}>
      <div>
        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{name}</div>
        {description && (
          <div style={{ fontSize: '0.875rem', color: 'var(--gray-400)' }}>{description}</div>
        )}
      </div>
      <a
        href={`/templates/${file}`}
        download
        style={{
          background: 'var(--accent-blue)',
          color: 'white',
          padding: '0.5rem 1rem',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: 600
        }}
      >
        Download
      </a>
    </div>
  );
}
