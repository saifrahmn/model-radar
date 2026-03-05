import { NextRequest, NextResponse } from 'next/server';

// =============================================
// Cron: /api/cron/sync-news
// Runs every 30 minutes via vercel.json
// =============================================

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { fetchAllNews } = await import('@/services/rss');
    const articles = await fetchAllNews();

    // TODO: upsert articles to your database here
    // await upsertNewsArticles(articles);

    return NextResponse.json({
      success: true,
      synced_at: new Date().toISOString(),
      articles_fetched: articles.length,
    });
  } catch (err) {
    console.error('News sync failed:', err);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
