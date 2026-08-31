import React from 'react';

interface OutputItem {
  type: 'Artifact' | 'State' | 'Capability';
  description: string;
}

interface ExpectedOutputProps {
  items: OutputItem[];
  intro?: string;
}

export default function ExpectedOutput({
  items,
  intro = 'After completing this chapter, you should have:'
}: ExpectedOutputProps): JSX.Element {
  return (
    <div className="expected-output">
      <div className="expected-output-header">EXPECTED OUTPUT</div>
      <div className="expected-output-content">
        <p>{intro}</p>
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              <strong>{item.type}:</strong>
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
