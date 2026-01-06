import React, { useState, useEffect } from 'react';

interface PrerequisiteItem {
  text: string;
  link?: string;
}

interface PrerequisitesProps {
  items?: PrerequisiteItem[];
  gate?: boolean;
}

export default function Prerequisites({
  items = [],
  gate = false
}: PrerequisitesProps): JSX.Element {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const storageKey = `prereq-${typeof window !== 'undefined' ? window.location.pathname : ''}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setChecked(JSON.parse(saved));
        } catch (e) {
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

  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className={`prerequisites ${gate ? 'prerequisites-gate' : ''}`}>
      <div className="prereq-header">
        <span className="prereq-title">
          {gate ? 'GATE: Complete all items' : 'PREREQUISITES'}
        </span>
        <span className="prereq-count">[{completedCount}/{items.length}]</span>
      </div>
      <div className="prereq-list">
        {items.map((item, i) => (
          <div key={i} className="prereq-item">
            <label className="prereq-checkbox">
              <input
                type="checkbox"
                checked={checked[i] || false}
                onChange={() => toggle(i)}
              />
              <span style={{ textDecoration: checked[i] ? 'line-through' : 'none' }}>
                {item.text}
              </span>
            </label>
            {item.link && <a href={item.link} className="prereq-link">→</a>}
          </div>
        ))}
      </div>
    </div>
  );
}
