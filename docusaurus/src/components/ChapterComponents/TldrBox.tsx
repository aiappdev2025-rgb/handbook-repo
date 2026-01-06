import React from 'react';

interface TldrItem {
  label: string;
  value: string;
}

interface TldrBoxProps {
  what: string;
  why: string;
  outcome: string;
}

export default function TldrBox({ what, why, outcome }: TldrBoxProps): JSX.Element {
  const items: TldrItem[] = [
    { label: 'What', value: what },
    { label: 'Why', value: why },
    { label: 'Outcome', value: outcome },
  ];

  return (
    <div className="tldr-box">
      <div className="tldr-header">TL;DR</div>
      <div className="tldr-content">
        {items.map((item, i) => (
          <p key={i}>
            <strong>{item.label}:</strong> {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}
