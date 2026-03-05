// =============================================
// RSS Service — No API keys needed, completely free
// Aggregates AI news from major tech publications
// =============================================
import { NewsItem } from '@/lib/types';

const RSS_FEEDS = [
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/' },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
  { name: 'The Verge AI', url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml' },
  { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/' },
  { name: 'ArXiv CS.AI', url: 'https://rss.arxiv.org/rss/cs.AI' },
];

const AI_KEYWORDS = ['AI', 'LLM', 'GPT', 'Claude', 'Gemini', 'model', 'neural', 'machine learning', 'OpenAI', 'Anthropic', 'language model'];

function isAIRelated(title: string, content?: string): boolean {
  return AI_KEYWORDS.some(
    (kw) =>
      title.toLowerCase().includes(kw.toLowerCase()) ||
      content?.toLowerCase().includes(kw.toLowerCase())
  );
}

function classifyTag(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('release') || lower.includes('launch') || lower.includes('announces')) return 'Release';
  if (lower.includes('benchmark') || lower.includes('score') || lower.includes('beats')) return 'Benchmark';
  if (lower.includes('funding') || lower.includes('raises') || lower.includes('valuation')) return 'Funding';
  if (lower.includes('open source') || lower.includes('open-source')) return 'Open Source';
  if (lower.includes('api')) return 'API';
  if (lower.includes('update') || lower.includes('version')) return 'Update';
  return 'News';
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// Simple XML parser — no external dependency needed for basic RSS
function parseRSSItems(xml: string, sourceName: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemMatches = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g));

  for (const match of itemMatches) {
    const item = match[1];
    const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[1] ??
      item.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
    const link = item.match(/<link>(.*?)<\/link>/)?.[1] ??
      item.match(/href="(.*?)"/)?.[1] ?? '#';
    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ??
      item.match(/<published>(.*?)<\/published>/)?.[1] ?? new Date().toISOString();
    const description = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/s)?.[1] ??
      item.match(/<description>(.*?)<\/description>/s)?.[1] ?? '';

    const cleanTitle = title.replace(/<[^>]+>/g, '').trim();
    if (!cleanTitle || !isAIRelated(cleanTitle, description)) continue;

    items.push({
      id: `${sourceName}-${Date.now()}-${Math.random()}`,
      title: cleanTitle,
      source: sourceName,
      time: timeAgo(pubDate),
      tag: classifyTag(cleanTitle),
      url: link.trim(),
      hot: cleanTitle.toLowerCase().includes('gpt-5') ||
        cleanTitle.toLowerCase().includes('breakthrough') ||
        cleanTitle.toLowerCase().includes('beats'),
      published_at: pubDate,
    });
  }

  return items.slice(0, 10);
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      const res = await fetch(feed.url, {
        next: { revalidate: 1800 }, // 30 minutes
        headers: { 'User-Agent': 'AI Monitor/1.0 RSS Reader' },
      });
      if (!res.ok) throw new Error(`RSS fetch failed: ${feed.name}`);
      const xml = await res.text();
      return parseRSSItems(xml, feed.name);
    })
  );

  const allItems: NewsItem[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value);
    }
  }

  // Sort by recency (hot items first, then by time)
  return allItems.sort((a, b) => {
    if (a.hot && !b.hot) return -1;
    if (!a.hot && b.hot) return 1;
    const aTime = a.published_at ? new Date(a.published_at).getTime() : 0;
    const bTime = b.published_at ? new Date(b.published_at).getTime() : 0;
    return bTime - aTime;
  });
}