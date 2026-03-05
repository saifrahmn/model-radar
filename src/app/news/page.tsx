'use client';
import { useNews } from '@/hooks/useNews';
import LiveBadge from '@/components/LiveBadge';

const TAG_COLORS: Record<string, string> = {
  Release: 'badge-purple',
  Benchmark: 'badge-blue',
  Update: 'badge-green',
  Rumor: 'badge-orange',
  'Open Source': 'badge-green',
  Funding: 'badge-red',
  API: 'badge-blue',
  Trend: 'badge-purple',
  News: 'badge-purple',
};

export default function NewsPage() {
  const { news, isLoading } = useNews();

  return (
    <div style={{ padding: '32px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 800 }}>AI News Feed</h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 14 }}>
            Auto-aggregated from top AI sources · RSS · Research feeds
          </p>
        </div>
        <LiveBadge />
      </div>

      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="grid-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="shimmer" style={{ height: 120, borderRadius: 14 }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="grid-2">
          {news.map((item, i) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="glass glass-hover slide-up" style={{ borderRadius: 14, padding: 20, animationDelay: `${i * 0.06}s`, cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <span className={`badge ${TAG_COLORS[item.tag] ?? 'badge-purple'}`}>{item.tag}</span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {item.hot && <span style={{ fontSize: 14 }}>🔥</span>}
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{item.time}</span>
                  </div>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.5, marginBottom: 8 }}>{item.title}</h3>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.source}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
