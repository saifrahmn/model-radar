import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { AIModel, SortOption, FilterOSS } from '@/lib/types';

interface UseModelsOptions {
  company?: string;
  type?: string;
  open_source?: FilterOSS;
  sort?: SortOption;
}

export function useModels(options: UseModelsOptions = {}) {
  const params = new URLSearchParams();
  if (options.company && options.company !== 'all') params.set('company', options.company);
  if (options.type && options.type !== 'all') params.set('type', options.type);
  if (options.open_source && options.open_source !== 'all') params.set('open_source', options.open_source);
  if (options.sort) params.set('sort', options.sort);

  const query = params.toString();
  const url = `/api/models${query ? `?${query}` : ''}`;

  const { data, error, isLoading, mutate } = useSWR<AIModel[]>(url, fetcher, {
    refreshInterval: 30_000, // auto-refresh every 30 seconds
    revalidateOnFocus: true,
  });

  return {
    models: data ?? [],
    error,
    isLoading,
    refresh: mutate,
  };
}
