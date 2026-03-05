'use client';
import { NewsItem } from '@/lib/types';

interface LiveTickerProps {
  news: NewsItem[];
}

export default function LiveTicker({ news }: LiveTickerProps) {
  const items = [...news, ...news].map((n) => `${n.title}  •  `);

  return (
    <div
      style={{
        background: 'rgba(124,106,247,0.08)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '8px 0',
        overflow: 'hidden',
      }}
    >
      <div className="ticker-inner" style={{ fontSize: 12, color: 'var(--muted)' }}>
        {items.map((t, i) => (
          <span key={i} style={{ paddingRight: 24 }}>
            <span style={{ color: 'var(--accent)', marginRight: 8 }}>▶</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
