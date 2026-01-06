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
    <div className="template-download">
      <div className="template-download__info">
        <span className="template-download__icon">📋</span>
        <div className="template-download__text">
          <span className="template-download__name">{name}</span>
          {description && (
            <span className="template-download__desc">{description}</span>
          )}
        </div>
      </div>
      <a
        href={`/templates/${file}`}
        download
        className="template-download__button"
      >
        Download
      </a>
    </div>
  );
}
