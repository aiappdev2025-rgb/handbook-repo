import React from 'react';

interface TldrBoxProps {
  children: React.ReactNode;
}

export default function TldrBox({ children }: TldrBoxProps): JSX.Element {
  return (
    <div className="tldr-box">
      <div className="tldr-header">TL;DR</div>
      <div className="tldr-content">{children}</div>
    </div>
  );
}
