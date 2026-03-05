'use client';
import { useState } from 'react';
import { useModels } from '@/hooks/useModels';
import ModelCard from '@/components/ModelCard';
import CapBar from '@/components/CapBar';
import { AIModel } from '@/lib/types';
import { fmt } from '@/lib/utils';

const CAP_KEYS = ['coding', 'reasoning', 'multimodal', 'vision', 'speed'] as const;

export default function ComparePage() {
  const { models } = useModels();
  const [selected, setSelected] = useState<AIModel[]>([]);

  const toggle = (m: AIModel) => {
    setSelected((s) =>
      s.find((x) => x.id === m.id)
        ? s.filter((x) => x.id !== m.id)
        : s.length < 3
        ? [...s, m]
        : s
    );
  };

  return (
    <div style={{ padding: '32px 0' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="display" style={{ fontSize: 26, fontWeight: 800 }}>Compare Models</h1>
        <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 14 }}>
          Select up to 3 models to compare side-by-side. Click a card to select.
        </p>
      </div>

      {selected.length > 0 && (
        <div className="glass" style={{ borderRadius: 16, padding: 20, marginBottom: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selected.length}, 1fr)`, gap: 16 }}>
            {selected.map((m) => (
              <div key={m.id} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{m.logo}</div>
                <div className="display" style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>{m.company}</div>

                {[
                  ['Input/1M', fmt.cost(m.input_cost)],
                  ['Output/1M', fmt.cost(m.output_cost)],
                  ['Context', fmt.ctx(m.context_length)],
                  ['Subscription', m.subscription_cost === 0 ? 'Free' : `$${m.subscription_cost}/mo`],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <span style={{ color: 'var(--muted)' }}>{l}</span>
                    <span className="mono">{v}</span>
                  </div>
                ))}

                <div style={{ marginTop: 14, textAlign: 'left' }}>
                  {CAP_KEYS.filter((k) => m.capabilities[k] > 0).map((k) => (
                    <CapBar key={k} label={k} value={m.capabilities[k]} />
                  ))}
                </div>

                {m.benchmarks && (
                  <div style={{ marginTop: 12 }}>
                    {Object.entries(m.benchmarks).map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span style={{ color: 'var(--muted)' }}>{k}</span>
                        <span className="mono" style={{ color: 'var(--accent)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button className="btn btn-ghost" style={{ marginTop: 12, width: '100%', justifyContent: 'center', fontSize: 12 }} onClick={() => toggle(m)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selected.length === 0 && (
        <div className="glass" style={{ borderRadius: 12, padding: '20px 24px', marginBottom: 24, color: 'var(--muted)', fontSize: 14 }}>
          👆 Click any model below to start comparing. Select up to 3.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="grid-3">
        {models.map((m) => (
          <ModelCard
            key={m.id}
            model={m}
            compareMode
            selected={!!selected.find((x) => x.id === m.id)}
            onCompare={toggle}
          />
        ))}
      </div>
    </div>
  );
}
