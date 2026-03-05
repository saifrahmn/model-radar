'use client';
import { AIModel } from '@/lib/types';
import { fmt } from '@/lib/utils';

interface ModelCardProps {
  model: AIModel;
  onSelect?: (model: AIModel) => void;
  selected?: boolean;
  compareMode?: boolean;
  onCompare?: (model: AIModel) => void;
}

const CAP_COLORS: Record<string, string> = {
  coding: '#7c6af7',
  reasoning: '#4fc3f7',
  multimodal: '#f06292',
  vision: '#ffcc80',
  speed: '#4caf82',
};

export default function ModelCard({
  model,
  onSelect,
  selected = false,
  compareMode = false,
  onCompare,
}: ModelCardProps) {
  const handleClick = () => {
    if (compareMode && onCompare) onCompare(model);
    else if (onSelect) onSelect(model);
  };

  return (
    <div
      className={`glass glass-hover compare-card${selected ? ' selected' : ''}`}
      style={{ borderRadius: 16, padding: 20, cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}
      onClick={handleClick}
    >
      {model.isNew && (
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <span className="badge badge-new">✦ New</span>
        </div>
      )}
      {compareMode && (
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <div style={{
            width: 18, height: 18, borderRadius: 4,
            border: `2px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
            background: selected ? 'var(--accent)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {selected && <span style={{ fontSize: 10, color: 'white' }}>✓</span>}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, paddingTop: compareMode ? 8 : 0 }}>
        <div style={{ fontSize: 28, lineHeight: 1 }}>{model.logo}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
            <span className="display" style={{ fontSize: 15, fontWeight: 700 }}>{model.name}</span>
            {model.open_source && <span className="badge badge-green">OSS</span>}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{model.company} · {fmt.ago(model.release_date)}</div>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {model.description}
      </p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {model.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[
          { l: 'Context', v: fmt.ctx(model.context_length), c: 'var(--accent2)' },
          { l: 'Input/1M', v: fmt.cost(model.input_cost), c: 'var(--green)' },
          { l: 'Output/1M', v: fmt.cost(model.output_cost), c: 'var(--orange)' },
        ].map(({ l, v, c }) => (
          <div key={l} style={{ background: 'var(--surface2)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: c }}>{v}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {Object.entries(model.capabilities ?? {})
            .filter(([, v]) => v > 0)
            .slice(0, 3)
            .map(([k, v]) => (
              <div
                key={k}
                className="tooltip"
                data-tip={`${k}: ${v}%`}
                style={{ width: 6, height: 6, borderRadius: '50%', background: CAP_COLORS[k] || 'var(--accent)', opacity: 0.7 + v / 1000 }}
              />
            ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>Trending</div>
          <div className="mono" style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700 }}>{model.trending_score}</div>
        </div>
      </div>
    </div>
  );
}
