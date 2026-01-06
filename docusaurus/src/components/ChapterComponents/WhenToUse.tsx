import React from 'react';

interface WhenToUseProps {
  useWhen?: string[];
  notYetIf?: string[];
  skipIf?: string;
}

export default function WhenToUse({
  useWhen = [],
  notYetIf = [],
  skipIf = ''
}: WhenToUseProps): JSX.Element {
  return (
    <div className="when-to-use">
      <div className="when-header">WHEN TO USE</div>
      <div className="when-grid">
        <div className="when-column">
          <div className="when-title" style={{ color: '#22c55e' }}>USE WHEN</div>
          <ul className="when-list">
            {useWhen.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="when-column">
          <div className="when-title" style={{ color: '#f59e0b' }}>NOT YET IF</div>
          <ul className="when-list">
            {notYetIf.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
      {skipIf && (
        <div className="when-skip">
          <span className="when-skip-label">SKIP IF:</span> {skipIf}
        </div>
      )}
    </div>
  );
}
