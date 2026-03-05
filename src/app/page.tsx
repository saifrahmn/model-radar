'use client';
import { useState } from 'react';
import { useModels } from '@/hooks/useModels';
import { useNews } from '@/hooks/useNews';
import { MOCK_STATS } from '@/lib/mockData';
import { fmt } from '@/lib/utils';
import ModelCard from '@/components/ModelCard';
import ModelModal from '@/components/ModelModal';
import LiveBadge from '@/components/LiveBadge';
import LiveTicker from '@/components/LiveTicker';
import { AIModel } from '@/lib/types';

const GITHUB_URL = 'https://github.com/saifrahmn/model-radar';

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function HomePage() {
  const { models } = useModels({ sort: 'trending' });
  const { news } = useNews();
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);

  const newModels = models.filter((m) => m.isNew);
  const topModels = [...models].sort((a, b) => b.trending_score - a.trending_score).slice(0, 3);

  return (
    <>
      <LiveTicker news={news} />

      <div style={{ padding: '40px 0' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '60px 20px 80px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            <LiveBadge />
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Auto-updated every 6 hours</span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="github-pill"
            >
              <GitHubIcon size={13} />
              Open Source · Star on GitHub
            </a>
          </div>

          <h1 className="display gradient-text" style={{ fontSize: 'clamp(36px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 20 }}>
            Model Radar
          </h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Real-time tracking of AI models, pricing, benchmarks, and releases across every major lab. Community-powered and open source.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/models" className="btn btn-primary" style={{ fontSize: 15, padding: '12px 28px', textDecoration: 'none' }}>Browse Models ↗</a>
            <a href="/pricing" className="btn btn-ghost" style={{ fontSize: 15, padding: '12px 28px', textDecoration: 'none' }}>Compare Pricing →</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: 15, padding: '12px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <GitHubIcon size={16} /> Contribute
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 60, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }} className="grid-4">
            {MOCK_STATS.map((s, i) => (
              <div key={i} className="stat-card slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: 'var(--green)' }}>{s.delta}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Source Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,106,247,0.08), rgba(79,195,247,0.06))',
          border: '1px solid rgba(124,106,247,0.2)',
          borderRadius: 16,
          padding: '24px 28px',
          marginBottom: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 32 }}>🌟</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Model Radar is open source</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 480 }}>
                Powered by the community. Add models, fix bugs, improve data sources — every contribution makes the platform better for everyone.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href={`${GITHUB_URL}/issues/new?template=bug_report.md`} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ textDecoration: 'none', fontSize: 13 }}>🐛 Report Bug</a>
            <a href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ textDecoration: 'none', fontSize: 13 }}>📖 How to Contribute</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: 'none', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <GitHubIcon size={14} /> Star on GitHub
            </a>
          </div>
        </div>

        {/* New Releases */}
        {newModels.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <h2 className="display" style={{ fontSize: 22, fontWeight: 700 }}>✦ New Releases</h2>
              <span className="badge badge-new">Hot</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="grid-3">
              {newModels.map((m) => <ModelCard key={m.id} model={m} onSelect={setSelectedModel} />)}
            </div>
          </div>
        )}

        {/* Trending */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <h2 className="display" style={{ fontSize: 22, fontWeight: 700 }}>🔥 Trending Models</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="grid-3">
            {topModels.map((m) => <ModelCard key={m.id} model={m} onSelect={setSelectedModel} />)}
          </div>
        </div>

        {/* News + Quick Pricing */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="grid-2">
          <div className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="display" style={{ fontSize: 16, fontWeight: 700 }}>📡 Latest AI News</span>
              <LiveBadge />
            </div>
            {news.slice(0, 6).map((item) => (
              <div key={item.id} style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {item.hot && <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>🔥</span>}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className="badge badge-purple" style={{ fontSize: 10 }}>{item.tag}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.source} · {item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <span className="display" style={{ fontSize: 16, fontWeight: 700 }}>💰 Quick Pricing</span>
            </div>
            <table className="data-table">
              <thead>
                <tr><th>Model</th><th>Input</th><th>Output</th><th>Plan</th></tr>
              </thead>
              <tbody>
                {models.slice(0, 7).map((m) => (
                  <tr key={m.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedModel(m)}>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span>{m.logo}</span><span style={{ fontSize: 13 }}>{m.name}</span></div></td>
                    <td className="mono" style={{ fontSize: 12, color: 'var(--green)' }}>{fmt.cost(m.input_cost)}</td>
                    <td className="mono" style={{ fontSize: 12, color: 'var(--orange)' }}>{fmt.cost(m.output_cost)}</td>
                    <td className="mono" style={{ fontSize: 12, color: 'var(--accent2)' }}>{m.subscription_cost === 0 ? 'Free' : `$${m.subscription_cost}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} />
    </>
  );
}
