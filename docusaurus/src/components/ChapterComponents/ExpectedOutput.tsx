import React from 'react';

interface ExpectedOutputProps {
  children: React.ReactNode;
}

export default function ExpectedOutput({ children }: ExpectedOutputProps): JSX.Element {
  return (
    <div className="expected-output">
      <div className="expected-output-header">EXPECTED OUTPUT</div>
      <div className="expected-output-content">{children}</div>
    </div>
  );
}
