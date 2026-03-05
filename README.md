<div align="center">

# 🎯 Model Radar

**Real-time AI model intelligence hub — open source, community-driven**

Track pricing, benchmarks, capabilities, and releases across every major AI lab.
Auto-updated every 6 hours from live APIs and RSS feeds.

[![License: MIT](https://img.shields.io/badge/License-MIT-7c6af7.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Live Demo](https://ai-monitor.vercel.app) · [Report Bug](https://github.com/saifrahmn/model-radar/issues/new?template=bug_report.md) · [Request Feature](https://github.com/saifrahmn/model-radar/issues/new?template=feature_request.md) · [Contributing Guide](CONTRIBUTING.md)

</div>

---

## What is Model Radar?

Model Radar is a community-maintained web platform that tracks the AI model landscape in real time. Instead of visiting 10 different company blogs to understand what's available and how much it costs, Model Radar pulls everything together in one place.

**What it tracks:**

- Every major AI model (GPT-4o, Claude, Gemini, Llama, DeepSeek, Grok, Mistral, Qwen, and more)
- API pricing per 1M tokens for both input and output
- Subscription plan costs
- Capability scores (coding, reasoning, vision, multimodal, speed)
- Benchmark results (MMLU, HumanEval, MATH)
- Context window sizes
- Open source vs closed source status
- Release dates and changelogs
- Live AI news aggregated from RSS feeds

---

## Features

| Page            | What it does                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------- |
| 🏠 **Home**     | Hero stats, new releases, trending models, live news ticker, quick pricing table                   |
| 🔍 **Models**   | Searchable/filterable directory — filter by company, type, license, sort by trending/price/context |
| 💰 **Pricing**  | Full API pricing table with visual cost comparison chart                                           |
| ⚡ **Compare**  | Select up to 3 models for side-by-side capability and benchmark comparison                         |
| 📡 **News**     | Auto-aggregated AI news from TechCrunch, VentureBeat, Ars Technica, MIT Tech Review, ArXiv         |
| 📅 **Timeline** | Chronological release history of all tracked models                                                |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/saifrahmn/model-radar.git
cd ai-monitor

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Edit `.env.local` and fill in your keys (see [Environment Variables](#environment-variables) below).

```bash
# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app works immediately with mock data — no database required to get started.

---

## Environment Variables

| Variable                   | Required            | Free?        | Where to get it                                                                             |
| -------------------------- | ------------------- | ------------ | ------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`             | Recommended         | ✅ Yes       | [github.com/settings/tokens](https://github.com/settings/tokens) — no special scopes needed |
| `HUGGINGFACE_TOKEN`        | Recommended         | ✅ Yes       | [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)                    |
| `GOOGLE_AI_KEY`            | Optional            | ✅ Yes       | [aistudio.google.com](https://aistudio.google.com)                                          |
| `CRON_SECRET`              | Required for deploy | ✅ Yes       | Generate any random string                                                                  |
| `DATABASE_URL`             | Optional            | ✅ Free tier | [neon.tech](https://neon.tech) — Serverless Postgres                                        |
| `UPSTASH_REDIS_REST_URL`   | Optional            | ✅ Free tier | [upstash.com](https://upstash.com)                                                          |
| `UPSTASH_REDIS_REST_TOKEN` | Optional            | ✅ Free tier | [upstash.com](https://upstash.com)                                                          |
| `OPENAI_API_KEY`           | Optional            | 💰 Paid      | [platform.openai.com](https://platform.openai.com)                                          |
| `ANTHROPIC_API_KEY`        | Optional            | 💰 Paid      | [console.anthropic.com](https://console.anthropic.com)                                      |

> **You can run the full app for $0/month** using only the free keys (GitHub, HuggingFace, Google AI) plus the free tiers of Neon and Upstash.

---

## Architecture

```
ai-monitor/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home
│   │   ├── models/page.tsx     # Model directory
│   │   ├── pricing/page.tsx    # Pricing dashboard
│   │   ├── compare/page.tsx    # Model comparison
│   │   ├── news/page.tsx       # News feed
│   │   ├── timeline/page.tsx   # Release timeline
│   │   └── api/                # API routes
│   │       ├── models/         # GET /api/models
│   │       ├── news/           # GET /api/news
│   │       └── cron/           # Scheduled sync jobs
│   │
│   ├── components/             # React components
│   │   ├── NavBar.tsx
│   │   ├── Footer.tsx
│   │   ├── ModelCard.tsx
│   │   ├── ModelModal.tsx
│   │   ├── CapBar.tsx
│   │   ├── LiveBadge.tsx
│   │   ├── LiveTicker.tsx
│   │   └── Background.tsx
│   │
│   ├── hooks/
│   │   ├── useModels.ts        # SWR data fetching for models
│   │   └── useNews.ts          # SWR data fetching for news
│   │
│   ├── lib/
│   │   ├── mockData.ts         # ← Seed/fallback data. ADD NEW MODELS HERE
│   │   ├── types.ts            # TypeScript interfaces
│   │   ├── utils.ts            # Formatting helpers
│   │   └── fetcher.ts          # SWR fetcher
│   │
│   └── services/
│       ├── huggingface.ts      # HuggingFace model API
│       ├── github.ts           # GitHub trending repos
│       └── rss.ts              # RSS news aggregation
│
├── schema.sql                  # PostgreSQL database schema
├── vercel.json                 # Cron job configuration
├── CONTRIBUTING.md             # Contribution guide
└── .env.example                # Environment variable template
```

### Data Flow

```
                    ┌─────────────────────────────────┐
                    │         External Sources         │
                    │  HuggingFace · GitHub · RSS ·    │
                    │  OpenAI API · Google AI API      │
                    └──────────────┬──────────────────┘
                                   │ every 6h (cron)
                    ┌──────────────▼──────────────────┐
                    │        /api/cron/sync-*          │
                    │     (secured with CRON_SECRET)   │
                    └──────────────┬──────────────────┘
                                   │ upsert
                    ┌──────────────▼──────────────────┐
                    │       PostgreSQL (Neon)          │
                    │   ai_models · pricing ·          │
                    │   capabilities · news_articles   │
                    └──────────────┬──────────────────┘
                                   │ query
                    ┌──────────────▼──────────────────┐
                    │     /api/models · /api/news      │
                    │     (Redis cache, 5min TTL)      │
                    └──────────────┬──────────────────┘
                                   │ SWR (30s refresh)
                    ┌──────────────▼──────────────────┐
                    │         Next.js Frontend         │
                    │   useModels() · useNews()        │
                    └─────────────────────────────────┘
```

> Without a database configured, the app falls back to `src/lib/mockData.ts` automatically.

---

## Enabling Live Data Sources

The app ships with mock data so it works out of the box. Enabling live sources is a one-step uncomment:

### Live AI News (RSS — completely free, no key)

In `src/app/api/news/route.ts`, uncomment the RSS block:

```ts
// Before:
// try {
//   const { fetchAllNews } = await import('@/services/rss');

// After:
try {
  const { fetchAllNews } = await import('@/services/rss');
```

### Live HuggingFace Models

In `src/app/api/models/route.ts`, uncomment:

```ts
// try {
//   const hfModels = await fetchHuggingFaceModels();
//   models = [...models, ...hfModels] as AIModel[];
// } catch (e) { console.error('HF fetch failed', e); }
```

---

## Connecting a Database (Optional)

The database is optional but enables persistent storage of synced data.

**We recommend [Neon](https://neon.tech) — serverless Postgres with a generous free tier.**

```bash
# 1. Create account at neon.tech and create a project called 'ai-monitor'
# 2. Copy the connection string to .env.local as DATABASE_URL
# 3. Run the schema
psql $DATABASE_URL < schema.sql

# 4. Install the Vercel Postgres client
npm install @vercel/postgres
```

Then in `src/app/api/models/route.ts`, replace the mock data block with:

```ts
import { sql } from "@vercel/postgres";
const { rows } =
  await sql`SELECT * FROM ai_models ORDER BY trending_score DESC`;
```

---

## Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add GITHUB_TOKEN
vercel env add HUGGINGFACE_TOKEN
vercel env add CRON_SECRET
# Add any others you want

# Deploy to production
vercel --prod
```

The `vercel.json` file already configures cron jobs:

- `/api/cron/sync-models` — runs every 6 hours
- `/api/cron/sync-news` — runs every 30 minutes

> Vercel's free Hobby plan includes cron jobs. No paid plan needed.

---

## Adding a New AI Model

The most common contribution. Takes about 2 minutes:

1. Open `src/lib/mockData.ts`
2. Add an entry to the `MOCK_MODELS` array following the template in [CONTRIBUTING.md](CONTRIBUTING.md#adding-models)
3. Open a PR with a link to the official pricing page as proof

---

## Tech Stack

| Layer         | Technology                                                              |
| ------------- | ----------------------------------------------------------------------- |
| Framework     | [Next.js 14](https://nextjs.org/) (App Router)                          |
| Language      | [TypeScript](https://www.typescriptlang.org/)                           |
| Styling       | Custom CSS design system (`globals.css`)                                |
| Data fetching | [SWR](https://swr.vercel.app/) with 30s auto-refresh                    |
| Database      | [PostgreSQL](https://www.postgresql.org/) via [Neon](https://neon.tech) |
| Cache         | [Redis](https://redis.io/) via [Upstash](https://upstash.com)           |
| Cron jobs     | [Vercel Cron](https://vercel.com/docs/cron-jobs)                        |
| Deployment    | [Vercel](https://vercel.com)                                            |

---

## Contributing

Contributions are what make Model Radar useful. Whether it's adding a missing model, fixing wrong pricing, or building a new feature — everything helps.

**Read the full guide: [CONTRIBUTING.md](CONTRIBUTING.md)**

Quick links:

- [Add a model](CONTRIBUTING.md#adding-models)
- [Fix pricing data](CONTRIBUTING.md#fixing-pricing)
- [Report a bug](https://github.com/saifrahmn/model-radar/issues/new?template=bug_report.md)
- [Request a feature](https://github.com/saifrahmn/model-radar/issues/new?template=feature_request.md)
- [Open a PR](https://github.com/saifrahmn/model-radar/pulls)

---

## License

MIT — do whatever you want with it. See [LICENSE](LICENSE) for details.

---

## Acknowledgements

Data sourced from OpenAI, Anthropic, Google AI, Meta AI, HuggingFace, GitHub, and various AI news RSS feeds. This project is not affiliated with any of these organizations.

---

<div align="center">
  <sub>Built with ❤️ by the community · <a href="https://github.com/saifrahmn/model-radar">GitHub</a></sub>
</div>
