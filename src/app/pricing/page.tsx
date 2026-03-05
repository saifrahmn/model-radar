'use client';
import { useState } from 'react';
import { useModels } from '@/hooks/useModels';
import { fmt } from '@/lib/utils';
import { AIModel } from '@/lib/types';

type PriceSort = 'input' | 'output' | 'sub';

export default function PricingPage() {
  const { models } = useModels();
  const [sort, setSort] = useState<PriceSort>('input');

  const sorted = [...models].sort((a: AIModel, b: AIModel) => {
    if (sort === 'input') return a.input_cost - b.input_cost;
    if (sort === 'output') return a.output_cost - b.output_cost;
    return a.subscription_cost - b.subscription_cost;
  });

  const cheapestInput = models.length ? Math.min(...models.map((m) => m.input_cost)) : 0;
  const cheapestOutput = models.length ? Math.min(...models.map((m) => m.output_cost)) : 0;
  const freeCount = models.filter((m) => m.free_tier).length;
  const ossCount = models.filter((m) => m.open_source).length;
  const maxInput = models.length ? Math.max(...models.map((m) => m.input_cost)) : 1;

  return (
    <div style={{ padding: '32px 0' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="display" style={{ fontSize: 26, fontWeight: 800 }}>API Pricing Dashboard</h1>
        <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 14 }}>
          All prices per 1M tokens unless noted. Updated automatically from official APIs.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }} className="grid-4">
        {[
          { label: 'Cheapest Input', v: `$${cheapestInput.toFixed(3)}/1M`, c: 'var(--green)' },
          { label: 'Cheapest Output', v: `$${cheapestOutput.toFixed(2)}/1M`, c: 'var(--green)' },
          { label: 'Free Plans', v: String(freeCount), c: 'var(--accent2)' },
          { label: 'Open Source', v: String(ossCount), c: 'var(--accent)' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: s.c, marginBottom: 4 }}>{s.v}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Sort */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Sort by:</span>
        {([['input', 'Input Cost'], ['output', 'Output Cost'], ['sub', 'Subscription']] as [PriceSort, string][]).map(([v, l]) => (
          <button key={v} className={`btn btn-ghost${sort === v ? ' active' : ''}`} onClick={() => setSort(v)} style={{ padding: '6px 14px', fontSize: 13 }}>{l}</button>
        ))}
      </div>

      {/* Table */}
      <div className="glass" style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 32 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Company</th>
              <th>Input / 1M</th>
              <th>Output / 1M</th>
              <th>Subscription</th>
              <th>Free Tier</th>
              <th>License</th>
              <th>Context</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((m) => (
              <tr key={m.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{m.logo}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{m.name}</div>
                      {m.isNew && <span className="badge badge-new" style={{ fontSize: 9 }}>New</span>}
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 13, color: 'var(--muted)' }}>{m.company}</td>
                <td className="mono" style={{ color: m.input_cost === 0 ? 'var(--green)' : 'var(--text)', fontSize: 13 }}>
                  {m.input_cost === 0 ? 'Free' : `$${m.input_cost.toFixed(3)}`}
                </td>
                <td className="mono" style={{ fontSize: 13 }}>${m.output_cost.toFixed(2)}</td>
                <td className="mono" style={{ color: m.subscription_cost === 0 ? 'var(--green)' : 'var(--orange)', fontSize: 13 }}>
                  {m.subscription_cost === 0 ? 'Free' : `$${m.subscription_cost}/mo`}
                </td>
                <td>{m.free_tier ? <span className="badge badge-green">Yes</span> : <span className="badge badge-red">No</span>}</td>
                <td>{m.open_source ? <span className="badge badge-green">OSS</span> : <span className="badge badge-purple">Proprietary</span>}</td>
                <td className="mono" style={{ fontSize: 13, color: 'var(--accent2)' }}>{fmt.ctx(m.context_length)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar chart */}
      <div>
        <h2 className="display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Input Cost Comparison (per 1M tokens)</h2>
        <div className="glass" style={{ borderRadius: 16, padding: 24, overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 160, minWidth: 500 }}>
            {[...models].sort((a, b) => a.input_cost - b.input_cost).map((m) => {
              const pct = maxInput === 0 ? 0 : (m.input_cost / maxInput) * 100;
              return (
                <div key={m.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--green)', transform: 'rotate(-45deg)', transformOrigin: 'center', whiteSpace: 'nowrap' }}>
                    ${m.input_cost.toFixed(2)}
                  </div>
                  <div style={{ width: '100%', background: 'linear-gradient(180deg, var(--accent), #3a2fa0)', height: `${Math.max(pct, 4)}%`, borderRadius: '3px 3px 0 0', minHeight: 4 }} />
                  <div style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {m.name.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
