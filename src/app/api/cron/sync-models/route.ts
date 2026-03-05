import { NextRequest, NextResponse } from 'next/server';

// =============================================
// Cron: /api/cron/sync-models
// Runs every 6 hours via vercel.json cron config
//
// Secured with CRON_SECRET env var so only
// Vercel's scheduler (or you) can trigger it.
// =============================================

export async function GET(req: NextRequest) {
  // Verify the request is from Vercel Cron or you
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // --- Add your sync logic here ---
    // Example: fetch HuggingFace models and upsert to DB
    // const { fetchHuggingFaceModels } = await import('@/services/huggingface');
    // const models = await fetchHuggingFaceModels();
    // await upsertModels(models); // your DB upsert function

    console.log(`[${new Date().toISOString()}] Model sync completed`);

    return NextResponse.json({
      success: true,
      synced_at: new Date().toISOString(),
      message: 'Model sync complete. Add your DB upsert logic here.',
    });
  } catch (err) {
    console.error('Model sync failed:', err);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
