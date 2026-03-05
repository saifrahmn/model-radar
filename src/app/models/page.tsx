'use client';
import { useState } from 'react';
import { useModels } from '@/hooks/useModels';
import ModelCard from '@/components/ModelCard';
import ModelModal from '@/components/ModelModal';
import LiveBadge from '@/components/LiveBadge';
import { AIModel, SortOption, FilterOSS } from '@/lib/types';

export default function ModelsPage() {
  const [search, setSearch] = useState('');
  const [company, setCompany] = useState('all');
  const [type, setType] = useState('all');
  const [oss, setOss] = useState<FilterOSS>('all');
  const [sort, setSort] = useState<SortOption>('trending');
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);

  const { models, isLoading } = useModels({ company, type, open_source: oss, sort });

  const filtered = models.filter((m) => {
    if (!search) return true;
    return (
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.company.toLowerCase().includes(search.toLowerCase())
    );
  });

  const companies = ['all', ...Array.from(new Set(models.map((m) => m.company)))];
  const types = ['all', ...Array.from(new Set(models.map((m) => m.model_type)))];

  return (
    <div style={{ padding: '32px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 800 }}>AI Models Directory</h1>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
            {filtered.length} models · auto-updated every 6 hours
          </div>
        </div>
        <LiveBadge />
      </div>

      {/* Filters */}
      <div className="glass" style={{ borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          className="input"
          placeholder="🔍  Search models..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: '1 1 200px', minWidth: 180 }}
        />
        <select className="input" value={company} onChange={(e) => setCompany(e.target.value)} style={{ minWidth: 130 }}>
          {companies.map((c) => <option key={c} value={c}>{c === 'all' ? 'All Companies' : c}</option>)}
        </select>
        <select className="input" value={type} onChange={(e) => setType(e.target.value)} style={{ minWidth: 130 }}>
          {types.map((t) => <option key={t} value={t}>{t === 'all' ? 'All Types' : t}</option>)}
        </select>
        <select className="input" value={oss} onChange={(e) => setOss(e.target.value as FilterOSS)} style={{ minWidth: 120 }}>
          <option value="all">All Licenses</option>
          <option value="open">Open Source</option>
          <option value="closed">Closed</option>
        </select>
        <div style={{ display: 'flex', gap: 4, marginLeft: 'auto', flexWrap: 'wrap' }}>
          {([['trending', '🔥 Trending'], ['newest', '🕒 Newest'], ['cheapest', '💸 Cheapest'], ['context', '📏 Context']] as [SortOption, string][]).map(([v, l]) => (
            <button key={v} className={`btn btn-ghost${sort === v ? ' active' : ''}`} onClick={() => setSort(v)} style={{ padding: '8px 12px', fontSize: 12 }}>{l}</button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="grid-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="shimmer" style={{ height: 280, borderRadius: 16 }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="grid-3">
          {filtered.map((m, i) => (
            <div key={m.id} className="slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <ModelCard model={m} onSelect={setSelectedModel} />
            </div>
          ))}
        </div>
      )}

      <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} />
    </div>
  );
}