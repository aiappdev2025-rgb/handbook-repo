import React from 'react';

interface NextChapter {
  chapter: number;
  title: string;
  path: string;
}

interface RelatedLink {
  title: string;
  path: string;
}

interface NextStepsProps {
  next?: NextChapter;
  related?: RelatedLink[];
}

export default function NextSteps({ next, related = [] }: NextStepsProps): JSX.Element {
  return (
    <div className="next-steps">
      <div className="next-steps-header">NEXT STEPS</div>
      {next && (
        <a href={next.path} className="next-steps-main">
          <span>Chapter {next.chapter}: {next.title}</span>
          <span>→</span>
        </a>
      )}
      {related.length > 0 && (
        <div className="next-steps-related">
          <div className="next-steps-related-title">Related:</div>
          {related.map((item, i) => (
            <a key={i} href={item.path} style={{ display: 'block', color: 'var(--accent-blue)', marginBottom: '0.25rem' }}>
              {item.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
