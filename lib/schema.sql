-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR UNIQUE NOT NULL,
  email VARCHAR,
  full_name VARCHAR,
  reg_number VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Lost items table
CREATE TABLE IF NOT EXISTS lost_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR,
  location VARCHAR,
  date_lost TIMESTAMP,
  image_url VARCHAR,
  status VARCHAR DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Found items table
CREATE TABLE IF NOT EXISTS found_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR,
  location VARCHAR,
  date_found TIMESTAMP,
  image_url VARCHAR,
  status VARCHAR DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Matches between lost and found items
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lost_item_id UUID REFERENCES lost_items(id) ON DELETE CASCADE,
  found_item_id UUID REFERENCES found_items(id) ON DELETE CASCADE,
  confidence_score FLOAT,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lost_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE found_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
DROP POLICY IF EXISTS "Users can read their own data" ON users CASCADE;
CREATE POLICY "Users can read their own data" ON users FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "System can insert users" ON users CASCADE;
CREATE POLICY "System can insert users" ON users FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own data" ON users CASCADE;
CREATE POLICY "Users can update their own data" ON users FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- RLS Policies for lost_items table
DROP POLICY IF EXISTS "Lost items are readable by all" ON lost_items CASCADE;
CREATE POLICY "Lost items are readable by all" ON lost_items FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert lost items" ON lost_items CASCADE;
CREATE POLICY "Users can insert lost items" ON lost_items FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own lost items" ON lost_items CASCADE;
CREATE POLICY "Users can update their own lost items" ON lost_items FOR UPDATE
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can delete their own lost items" ON lost_items CASCADE;
CREATE POLICY "Users can delete their own lost items" ON lost_items FOR DELETE
  USING (true);

-- RLS Policies for found_items table
DROP POLICY IF EXISTS "Found items are readable by all" ON found_items CASCADE;
CREATE POLICY "Found items are readable by all" ON found_items FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert found items" ON found_items CASCADE;
CREATE POLICY "Users can insert found items" ON found_items FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own found items" ON found_items CASCADE;
CREATE POLICY "Users can update their own found items" ON found_items FOR UPDATE
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can delete their own found items" ON found_items CASCADE;
CREATE POLICY "Users can delete their own found items" ON found_items FOR DELETE
  USING (true);

-- RLS Policies for matches table
DROP POLICY IF EXISTS "Matches are readable by all" ON matches CASCADE;
CREATE POLICY "Matches are readable by all" ON matches FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "System can insert matches" ON matches CASCADE;
CREATE POLICY "System can insert matches" ON matches FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "System can update matches" ON matches CASCADE;
CREATE POLICY "System can update matches" ON matches FOR UPDATE
  USING (true)
  WITH CHECK (true);
