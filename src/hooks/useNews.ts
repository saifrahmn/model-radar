import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { NewsItem } from '@/lib/types';

export function useNews() {
  const { data, error, isLoading, mutate } = useSWR<NewsItem[]>(
    '/api/news',
    fetcher,
    {
      refreshInterval: 60_000, // refresh every 60 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    news: data ?? [],
    error,
    isLoading,
    refresh: mutate,
  };
}
