-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 類別
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- 品項
CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slot_limit INT,
  note TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- 認領記錄
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id TEXT REFERENCES items(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  custom_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: 公開讀寫
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "public read items" ON items FOR SELECT USING (true);
CREATE POLICY "public read assignments" ON assignments FOR SELECT USING (true);
CREATE POLICY "public insert assignments" ON assignments FOR INSERT WITH CHECK (true);
CREATE POLICY "public delete assignments" ON assignments FOR DELETE USING (true);

-- Realtime: assignments table is enabled via Supabase Dashboard
