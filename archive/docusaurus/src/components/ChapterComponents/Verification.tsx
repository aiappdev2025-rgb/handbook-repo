import React, { useState, useEffect } from 'react';

interface VerificationProps {
  checks?: string[];
}

export default function Verification({ checks = [] }: VerificationProps): JSX.Element {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const storageKey = typeof window !== 'undefined'
    ? `verify-${window.location.pathname}`
    : 'verify-ssr';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setChecked(JSON.parse(saved));
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
  }, [storageKey]);

  const toggle = (index: number) => {
    const newChecked = { ...checked, [index]: !checked[index] };
    setChecked(newChecked);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(newChecked));
    }
  };

  return (
    <div className="verification">
      <div className="verification-header">VERIFICATION</div>
      <div className="verification-list">
        {checks.map((check, i) => (
          <div key={i} className="verification-item">
            <input
              type="checkbox"
              id={`verify-${i}`}
              checked={checked[i] || false}
              onChange={() => toggle(i)}
            />
            <label htmlFor={`verify-${i}`}>{check}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
