'use client';
import { useModels } from '@/hooks/useModels';
import { fmt } from '@/lib/utils';

export default function TimelinePage() {
  const { models } = useModels({ sort: 'newest' });

  return (
    <div style={{ padding: '32px 0' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 className="display" style={{ fontSize: 26, fontWeight: 800 }}>AI Release Timeline</h1>
        <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 14 }}>
          Chronological history of AI model releases
        </p>
      </div>

      <div style={{ position: 'relative', paddingLeft: 32 }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, var(--accent), transparent)' }} />

        {models.map((m, i) => (
          <div key={m.id} className="slide-up" style={{ position: 'relative', marginBottom: 24, animationDelay: `${i * 0.07}s` }}>
            {/* Dot */}
            <div style={{
              position: 'absolute', left: -29, top: 18, width: 12, height: 12, borderRadius: '50%',
              background: m.isNew ? 'var(--accent)' : 'var(--surface2)',
              border: '2px solid var(--border2)',
              boxShadow: m.isNew ? '0 0 12px var(--accent)' : 'none',
            }} />

            <div className="glass glass-hover" style={{ borderRadius: 14, padding: 18 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20 }}>{m.logo}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span className="display" style={{ fontSize: 15, fontWeight: 700 }}>{m.name}</span>
                    {m.isNew && <span className="badge badge-new">New</span>}
                    {m.open_source && <span className="badge badge-green">OSS</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{m.company}</div>
                </div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--accent)', background: 'rgba(124,106,247,0.1)', padding: '4px 10px', borderRadius: 6 }}>
                  {fmt.date(m.release_date)}
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{m.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
