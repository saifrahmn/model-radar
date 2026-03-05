export interface AIModel {
  id: string;
  name: string;
  company: string;
  logo: string;
  release_date: string;
  model_type: 'text' | 'multimodal' | 'reasoning' | 'image' | 'video' | 'audio';
  open_source: boolean;
  context_length: number;
  description: string;
  input_cost: number;
  output_cost: number;
  subscription_cost: number;
  free_tier: boolean;
  capabilities: {
    coding: number;
    reasoning: number;
    multimodal: number;
    vision: number;
    speed: number;
  };
  benchmarks: Record<string, number>;
  docs_url: string | null;
  repo_url: string | null;
  trending_score: number;
  tags: string[];
  isNew: boolean;
}

export interface NewsItem {
  id: number | string;
  title: string;
  source: string;
  time: string;
  tag: string;
  url: string;
  hot: boolean;
  summary?: string;
  published_at?: string;
}

export interface StatItem {
  label: string;
  value: string;
  delta: string;
}

export type SortOption = 'trending' | 'newest' | 'cheapest' | 'context';
export type FilterOSS = 'all' | 'open' | 'closed';
