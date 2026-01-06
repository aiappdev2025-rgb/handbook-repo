import React from 'react';

interface VerificationProps {
  checks?: string[];
}

export default function Verification({ checks = [] }: VerificationProps): JSX.Element {
  return (
    <div className="verification">
      <div className="verification-header">VERIFICATION CHECKLIST</div>
      <div className="verification-list">
        {checks.map((check, i) => (
          <div key={i} className="verification-item">
            <span>[ ]</span>
            <span>{check}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
