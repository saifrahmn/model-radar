-- =============================================
-- AI Monitor — PostgreSQL Schema
-- Run this against your Neon database:
--   psql $DATABASE_URL < schema.sql
-- =============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE ai_models (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug           VARCHAR(100) UNIQUE NOT NULL,
  name           VARCHAR(200) NOT NULL,
  company        VARCHAR(100) NOT NULL,
  logo           VARCHAR(10) DEFAULT '🤖',
  release_date   DATE,
  model_type     VARCHAR(50),
  open_source    BOOLEAN DEFAULT FALSE,
  context_length INTEGER,
  description    TEXT,
  docs_url       TEXT,
  repo_url       TEXT,
  trending_score INTEGER DEFAULT 0,
  is_new         BOOLEAN DEFAULT FALSE,
  tags           TEXT[],
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pricing (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_id          UUID REFERENCES ai_models(id) ON DELETE CASCADE,
  input_cost        DECIMAL(12,6),
  output_cost       DECIMAL(12,6),
  subscription_cost DECIMAL(10,2),
  free_tier         BOOLEAN DEFAULT FALSE,
  free_tier_limit   TEXT,
  currency          CHAR(3) DEFAULT 'USD',
  effective_date    DATE DEFAULT CURRENT_DATE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE capabilities (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_id         UUID REFERENCES ai_models(id) ON DELETE CASCADE,
  coding           SMALLINT CHECK (coding BETWEEN 0 AND 100),
  reasoning        SMALLINT CHECK (reasoning BETWEEN 0 AND 100),
  multimodal       SMALLINT CHECK (multimodal BETWEEN 0 AND 100),
  vision           SMALLINT CHECK (vision BETWEEN 0 AND 100),
  speed            SMALLINT CHECK (speed BETWEEN 0 AND 100),
  image_gen        BOOLEAN DEFAULT FALSE,
  video_gen        BOOLEAN DEFAULT FALSE,
  function_calling BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE benchmarks (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_id   UUID REFERENCES ai_models(id) ON DELETE CASCADE,
  name       VARCHAR(100),
  score      DECIMAL(6,2),
  source_url TEXT,
  tested_at  DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE news_articles (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  summary      TEXT,
  url          TEXT UNIQUE NOT NULL,
  source_name  VARCHAR(100),
  tag          VARCHAR(50),
  is_hot       BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_models_company   ON ai_models(company);
CREATE INDEX idx_models_oss       ON ai_models(open_source);
CREATE INDEX idx_models_type      ON ai_models(model_type);
CREATE INDEX idx_models_trending  ON ai_models(trending_score DESC);
CREATE INDEX idx_news_published   ON news_articles(published_at DESC);
CREATE INDEX idx_pricing_model    ON pricing(model_id);
