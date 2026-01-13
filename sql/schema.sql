-- Database Schema for Gossip Gazette (PostgreSQL/Neon)

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  author_id TEXT,
  author_name TEXT,
  category_id TEXT REFERENCES categories(id),
  category_name TEXT, -- Denormalized for simpler querying
  tags TEXT[], -- Array of strings
  status TEXT DEFAULT 'draft', -- 'draft', 'published', 'archived'
  published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  views INTEGER DEFAULT 0,
  source TEXT
);

-- Comments Table
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  article_id TEXT REFERENCES articles(id) ON DELETE CASCADE,
  user_id TEXT,
  user_name TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  parent_id TEXT, -- For threaded replies
  status TEXT DEFAULT 'pending' -- 'pending', 'approved', 'rejected'
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(article_id);

-- Settings Table (Key-Value Store)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
