# Contributing to Model Radar

First off — thank you for taking the time to contribute! 🎉

Model Radar is community-driven. Every contribution, no matter how small, makes the platform more useful for everyone tracking the AI landscape.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Adding a New Model](#adding-models)
- [Fixing or Updating Pricing Data](#fixing-pricing)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## Code of Conduct

Be kind, be constructive, be welcoming. We follow the [Contributor Covenant](https://www.contributor-covenant.org/). In short: treat others the way you'd want to be treated.

---

## Ways to Contribute

You don't need to write code to contribute. Here's everything that helps:

| Type                 | How                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| 🐛 Found a bug       | [Open a bug report](https://github.com/saifrahmn/model-radar/issues/new?template=bug_report.md)           |
| ✨ Have an idea      | [Open a feature request](https://github.com/saifrahmn/model-radar/issues/new?template=feature_request.md) |
| ➕ New AI model      | Edit `src/lib/mockData.ts` and open a PR                                                                  |
| 💰 Pricing is wrong  | Edit `src/lib/mockData.ts` and open a PR                                                                  |
| 📖 Improve docs      | Edit `README.md` or `CONTRIBUTING.md`                                                                     |
| 🔌 New data source   | Add a service in `src/services/`                                                                          |
| 🎨 UI improvement    | Submit a PR with screenshots                                                                              |
| ⭐ Just want to help | Star the repo and spread the word                                                                         |

---

## Adding Models

The fastest and most impactful contribution is keeping the model list current.

### Step 1 — Open `src/lib/mockData.ts`

Find the `MOCK_MODELS` array at the top of the file.

### Step 2 — Add your model entry

Copy an existing entry and modify it. Every field matters:

```ts
{
  id: 'your-model-id',          // Lowercase, hyphenated, unique. E.g. 'gpt-4o-mini'
  name: 'Your Model Name',      // Official name as shown on the provider's website
  company: 'Company Name',      // Exact company name. E.g. 'OpenAI', 'Anthropic'
  logo: '🟢',                   // An emoji that represents the company/model
  release_date: '2025-01-15',   // YYYY-MM-DD format. Use the public announcement date
  model_type: 'text',           // One of: 'text' | 'multimodal' | 'reasoning' | 'image' | 'video' | 'audio'
  open_source: false,           // true only if weights are publicly available
  context_length: 128000,       // Max context window in tokens
  description: '...',           // 1-2 sentence description. Be factual, not promotional
  input_cost: 0.15,             // Per 1M input tokens in USD. Use 0 if free/open-source
  output_cost: 0.60,            // Per 1M output tokens in USD
  subscription_cost: 0,         // Monthly subscription in USD. 0 if no paid plan
  free_tier: true,              // true if there's any free usage available
  capabilities: {
    coding: 85,                 // 0-100 score. Use 0 if capability doesn't apply
    reasoning: 80,
    multimodal: 0,
    vision: 0,
    speed: 90,
  },
  benchmarks: {                 // Include only benchmarks you can verify with a source URL
    MMLU: 82.0,
    HumanEval: 87.2,
  },
  docs_url: 'https://...',      // Official API docs. null if none
  repo_url: null,               // GitHub/HuggingFace repo. null if closed source
  trending_score: 75,           // Your best estimate of 0-100 based on community interest
  tags: ['fast', 'efficient'],  // 2-4 descriptive tags, lowercase
  isNew: true,                  // Set to true only if released in the last 30 days
},
```

### Step 3 — Verify your data

Before submitting, please double-check:

- [ ] Pricing matches the official pricing page (include a link in your PR description)
- [ ] Release date is correct (link to the announcement)
- [ ] `open_source: true` only if model weights are actually downloadable
- [ ] Benchmarks cite a real source (paper, leaderboard, official blog post)
- [ ] `context_length` is the **input** context limit in tokens

### Step 4 — Open a PR

Title format: `feat: add [Model Name] by [Company]`

Example: `feat: add Llama 3.2 90B by Meta`

---

## Fixing Pricing

Pricing changes frequently. If you spot incorrect pricing:

1. Find the model in `src/lib/mockData.ts`
2. Update `input_cost`, `output_cost`, or `subscription_cost`
3. In your PR description, paste a link to the official pricing page as proof

PR title format: `fix: update [Model Name] pricing`

---

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Steps

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/ai-monitor.git
cd ai-monitor

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# At minimum, fill in GITHUB_TOKEN (free) to avoid rate limits

# 4. Start the dev server
npm run dev
# Open http://localhost:3000
```

### Running with live data

Uncomment the RSS block in `src/app/api/news/route.ts` to pull real news. No key needed.

For HuggingFace models, uncomment the block in `src/app/api/models/route.ts` and add `HUGGINGFACE_TOKEN` to `.env.local`.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── models/page.tsx       # Model directory with filters
│   ├── pricing/page.tsx      # API pricing dashboard
│   ├── compare/page.tsx      # Side-by-side model comparison
│   ├── news/page.tsx         # AI news feed
│   ├── timeline/page.tsx     # Release timeline
│   └── api/
│       ├── models/route.ts   # GET /api/models — returns model list
│       ├── news/route.ts     # GET /api/news — returns news feed
│       └── cron/             # Scheduled jobs (runs on Vercel Cron)
│
├── components/
│   ├── NavBar.tsx            # Top navigation + GitHub link
│   ├── Footer.tsx            # Footer with contribute links
│   ├── ModelCard.tsx         # Individual model card
│   ├── ModelModal.tsx        # Full model detail popup
│   ├── CapBar.tsx            # Animated capability progress bar
│   ├── LiveBadge.tsx         # Green "LIVE" indicator
│   ├── LiveTicker.tsx        # Scrolling news ticker
│   └── Background.tsx        # Animated orbs + grid
│
├── hooks/
│   ├── useModels.ts          # SWR hook — fetches /api/models
│   └── useNews.ts            # SWR hook — fetches /api/news
│
├── lib/
│   ├── mockData.ts           # ← ADD NEW MODELS HERE
│   ├── types.ts              # TypeScript interfaces
│   ├── utils.ts              # Formatting helpers (fmt.cost, fmt.ctx, etc.)
│   └── fetcher.ts            # SWR fetch helper
│
└── services/
    ├── huggingface.ts        # HuggingFace API integration
    ├── github.ts             # GitHub trending repos
    └── rss.ts                # RSS news aggregation
```

---

## Submitting a Pull Request

1. **Fork** the repo and create a branch: `git checkout -b feat/your-feature`
2. **Make your changes** and test locally with `npm run dev`
3. **Keep PRs focused** — one feature or fix per PR
4. **Write a clear description** — what changed, why, and how to test it
5. **Add screenshots** if you changed the UI
6. **Open the PR** against the `main` branch

### PR title conventions

| Prefix      | When to use                                 |
| ----------- | ------------------------------------------- |
| `feat:`     | Adding a new model, feature, or data source |
| `fix:`      | Bug fix or incorrect data correction        |
| `docs:`     | README, CONTRIBUTING, or code comments      |
| `style:`    | CSS or UI changes (no logic changes)        |
| `refactor:` | Code restructuring with no behavior change  |
| `chore:`    | Dependency updates, config changes          |

---

## Reporting Bugs

Open an issue using the [bug report template](https://github.com/saifrahmn/model-radar/issues/new?template=bug_report.md).

Please include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser and OS (for UI bugs)
- Console errors if any

---

## Requesting Features

Open an issue using the [feature request template](https://github.com/saifrahmn/model-radar/issues/new?template=feature_request.md).

Tell us:

- What problem it solves
- Who would benefit
- Any rough ideas for how it could work

---

## Questions?

Open a [GitHub Discussion](https://github.com/saifrahmn/model-radar/discussions) for anything that isn't a bug or feature request.

---

Thank you for making Model Radar better. 🚀
