'use client';
import { useState, useEffect } from 'react';

interface CapBarProps {
  label: string;
  value: number;
  color?: string;
}

export default function CapBar({ label, value, color = 'var(--accent)' }: CapBarProps) {
  const [w, setW] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setW(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{label}</span>
        <span className="mono" style={{ fontSize: 12, color }}>{value}%</span>
      </div>
      <div className="prog-bar">
        <div
          className="prog-fill"
          style={{ width: `${w}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
    </div>
  );
}
