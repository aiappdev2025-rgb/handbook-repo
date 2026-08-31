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
  previous?: NextChapter;
  related?: RelatedLink[];
}

export default function NextSteps({
  next,
  previous,
  related = []
}: NextStepsProps): JSX.Element {
  return (
    <div className="next-steps">
      <div className="next-steps-header">NEXT STEPS</div>
      <div className="next-steps-content">
        {next && (
          <a href={next.path} className="next-steps-main">
            <div className="next-steps-main-info">
              <span className="next-steps-main-label">Next Chapter &rarr;</span>
              <span className="next-steps-main-title">
                Chapter {next.chapter}: {next.title}
              </span>
            </div>
            <span>&rarr;</span>
          </a>
        )}

        {previous && (
          <a
            href={previous.path}
            className="next-steps-main"
            style={{ opacity: 0.7 }}
          >
            <div className="next-steps-main-info">
              <span className="next-steps-main-label">&larr; Previous Chapter</span>
              <span className="next-steps-main-title">
                Chapter {previous.chapter}: {previous.title}
              </span>
            </div>
          </a>
        )}

        {related.length > 0 && (
          <div className="next-steps-related">
            <div className="next-steps-related-title">Related</div>
            {related.map((item, i) => (
              <a key={i} href={item.path}>
                {item.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
