import { NextResponse } from 'next/server';
import { MOCK_NEWS } from '@/lib/mockData';

// =============================================
// GET /api/news
//
// Currently returns mock data.
// Uncomment the live RSS block below once you're
// ready to fetch real news (no API key needed).
// =============================================

export async function GET() {
  // ---- LIVE RSS (uncomment when ready) ----
  // try {
  //   const { fetchAllNews } = await import('@/services/rss');
  //   const news = await fetchAllNews();
  //   return NextResponse.json(news, {
  //     headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' },
  //   });
  // } catch (err) {
  //   console.error('RSS fetch failed, falling back to mock data:', err);
  // }

  // ---- MOCK FALLBACK ----
  return NextResponse.json(MOCK_NEWS, {
    headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' },
  });
}
