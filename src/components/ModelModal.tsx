'use client';
import { AIModel } from '@/lib/types';
import { fmt } from '@/lib/utils';
import CapBar from './CapBar';

interface ModelModalProps {
  model: AIModel | null;
  onClose: () => void;
}

export default function ModelModal({ model, onClose }: ModelModalProps) {
  if (!model) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ fontSize: 36 }}>{model.logo}</span>
              <div>
                <div className="display" style={{ fontSize: 22, fontWeight: 800 }}>{model.name}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>
                  by {model.company} · Released {fmt.date(model.release_date)}
                </div>
              </div>
            </div>
            <button className="btn btn-ghost" onClick={onClose} style={{ padding: '6px 12px' }}>✕</button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            {model.tags.map((t) => <span key={t} className="badge badge-purple">{t}</span>)}
            {model.open_source && <span className="badge badge-green">Open Source</span>}
            {model.free_tier && <span className="badge badge-blue">Free Tier</span>}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px' }}>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24 }}>{model.description}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }} className="grid-2">
            <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12 }}>API Pricing</div>
              {[
                ['Input', `$${model.input_cost.toFixed(2)} / 1M tokens`],
                ['Output', `$${model.output_cost.toFixed(2)} / 1M tokens`],
                ['Subscription', model.subscription_cost === 0 ? 'Free' : `$${model.subscription_cost}/mo`],
                ['Free Tier', model.free_tier ? 'Available' : 'None'],
              ].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>{l}</span>
                  <span className="mono" style={{ fontSize: 13, color: 'var(--text)' }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12 }}>Specs</div>
              {[
                ['Context', fmt.ctx(model.context_length) + ' tokens'],
                ['Type', model.model_type],
                ['Open Source', model.open_source ? 'Yes' : 'No'],
                ['Trend Score', `${model.trending_score}/100`],
              ].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>{l}</span>
                  <span className="mono" style={{ fontSize: 13, color: 'var(--text)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12 }}>Capabilities</div>
            {Object.entries(model.capabilities ?? {})
              .filter(([, v]) => v > 0)
              .map(([k, v]) => (
                <CapBar
                  key={k}
                  label={k.charAt(0).toUpperCase() + k.slice(1)}
                  value={v}
                  color={k === 'reasoning' ? 'var(--accent2)' : k === 'coding' ? 'var(--accent)' : k === 'speed' ? 'var(--green)' : 'var(--accent3)'}
                />
              ))}
          </div>

          {/* Benchmarks */}
          {model.benchmarks && Object.keys(model.benchmarks ?? {}).length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12 }}>Benchmarks</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {Object.entries(model.benchmarks ?? {}).map(([k, v]) => (
                  <div key={k} style={{ background: 'var(--surface2)', borderRadius: 8, padding: '10px 16px', textAlign: 'center', flex: '1 1 80px' }}>
                    <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>{v}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>{k}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div style={{ display: 'flex', gap: 10 }}>
            {model.docs_url && (
              <a href={model.docs_url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}>
                📄 Documentation
              </a>
            )}
            {model.repo_url && (
              <a href={model.repo_url} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}>
                ⚙ Repository
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
