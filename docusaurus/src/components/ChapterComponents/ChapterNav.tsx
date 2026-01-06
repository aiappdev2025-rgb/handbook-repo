import React from 'react';

interface ChapterInfo {
  chapter: number;
  title: string;
  path: string;
}

interface ChapterNavProps {
  current: number;
  total: number;
  previous?: ChapterInfo;
  next?: ChapterInfo;
}

export default function ChapterNav({
  current,
  total,
  previous,
  next
}: ChapterNavProps): JSX.Element {
  const progress = (current / total) * 100;

  return (
    <nav className="chapter-nav">
      {previous ? (
        <a href={previous.path} className="chapter-nav__prev">
          <span className="chapter-nav__label">&larr; Chapter {previous.chapter}</span>
          <span className="chapter-nav__title">{previous.title}</span>
        </a>
      ) : (
        <div />
      )}

      <div className="chapter-nav__center">
        <span className="chapter-nav__progress-text">
          {current} / {total}
        </span>
        <div className="chapter-nav__progress-bar">
          <div
            className="chapter-nav__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {next ? (
        <a href={next.path} className="chapter-nav__next">
          <span className="chapter-nav__label">Chapter {next.chapter} &rarr;</span>
          <span className="chapter-nav__title">{next.title}</span>
        </a>
      ) : (
        <div />
      )}
    </nav>
  );
}
