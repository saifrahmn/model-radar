// =============================================
// HuggingFace Service
// Free API — just needs HUGGINGFACE_TOKEN env var
// Get token at: huggingface.co/settings/tokens
// =============================================
import { AIModel } from '@/lib/types';

const HF_API = 'https://huggingface.co/api';

export async function fetchHuggingFaceModels(): Promise<AIModel[]> {
  const token = process.env.HUGGINGFACE_TOKEN;

  const res = await fetch(
    `${HF_API}/models?sort=downloads&direction=-1&limit=30&filter=text-generation`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      next: { revalidate: 21600 }, // 6 hours
    }
  );

  if (!res.ok) throw new Error(`HuggingFace API error: ${res.status}`);

  const data = await res.json();

  return data.map((model: any): AIModel => ({
    id: model.modelId?.replace('/', '--') ?? model.id,
    name: model.modelId ?? model.id,
    company: model.author ?? 'Community',
    logo: '🤗',
    model_type: 'text',
    open_source: true,
    description: model.description ?? 'Open-source model from HuggingFace.',
    docs_url: null,
    repo_url: `https://huggingface.co/${model.modelId}`,
    // Use createdAt from HF API, fall back to today
    release_date: model.createdAt
      ? model.createdAt.split('T')[0]
      : new Date().toISOString().split('T')[0],
    trending_score: Math.min(100, Math.floor(Math.log10((model.downloads ?? 1) + 1) * 20)),
    tags: ['open-source', 'huggingface'],
    isNew: false,
    input_cost: 0,
    output_cost: 0,
    subscription_cost: 0,
    free_tier: true,
    context_length: model.config?.max_position_embeddings ?? 4096,
    // Always provide these so ModelCard never crashes on Object.entries()
    capabilities: { coding: 0, reasoning: 0, multimodal: 0, vision: 0, speed: 0 },
    benchmarks: {},
  }));
}
