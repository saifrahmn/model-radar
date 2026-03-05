import { NextRequest, NextResponse } from 'next/server';
import { MOCK_MODELS } from '@/lib/mockData';
import { AIModel, SortOption } from '@/lib/types';
import { fetchHuggingFaceModels } from '@/services/huggingface';

// =============================================
// GET /api/models
// Supports query params: company, type, open_source, sort
//
// Currently returns mock data.
// To connect to a real database:
// 1. Set up Neon at neon.tech
// 2. Add DATABASE_URL to .env.local
// 3. Run: npm install @vercel/postgres
// 4. Replace the mock return below with a real SQL query
// =============================================

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const company = searchParams.get('company');
  const type = searchParams.get('type');
  const openSource = searchParams.get('open_source');
  const sort = (searchParams.get('sort') ?? 'trending') as SortOption;

  // ---- SWAP THIS BLOCK FOR A REAL DB QUERY ----
  let models: AIModel[] = [...MOCK_MODELS];

  // Optionally merge in live HuggingFace data:
  try {
    const hfModels = await fetchHuggingFaceModels();
    models = [...models, ...hfModels] as AIModel[];
  } catch (e) { console.error('HF fetch failed', e); }

  // Filter
  if (company) models = models.filter((m) => m.company === company);
  if (type) models = models.filter((m) => m.model_type === type);
  if (openSource === 'open') models = models.filter((m) => m.open_source);
  if (openSource === 'closed') models = models.filter((m) => !m.open_source);

  // Sort
  const sortMap: Record<SortOption, (a: AIModel, b: AIModel) => number> = {
    trending: (a, b) => b.trending_score - a.trending_score,
    newest: (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
    cheapest: (a, b) => a.input_cost - b.input_cost,
    context: (a, b) => b.context_length - a.context_length,
  };
  models.sort(sortMap[sort] ?? sortMap.trending);
  // ---- END SWAP BLOCK ----

  return NextResponse.json(models, {
    headers: {
      // Cache for 5 minutes on CDN, serve stale for up to 10 minutes while revalidating
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
