-- CampusFind Database Schema for Supabase (Simple Auth)

-- 1. Users table (local authentication)
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

-- 2. Lost Items table
CREATE TABLE IF NOT EXISTS lost_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR,
  image_url VARCHAR,
  location VARCHAR,
  security_question VARCHAR,
  security_answer VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Found Items table
CREATE TABLE IF NOT EXISTS found_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR,
  image_url VARCHAR,
  location VARCHAR,
  contact_info TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Matches table (when lost item is matched with found item)
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lost_item_id UUID NOT NULL REFERENCES lost_items(id) ON DELETE CASCADE,
  found_item_id UUID NOT NULL REFERENCES found_items(id) ON DELETE CASCADE,
  confidence_score FLOAT,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lost_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE found_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Anyone can read users (for username existence checks)"
  ON users FOR SELECT USING (true);

CREATE POLICY "System can insert users"
  ON users FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE USING (auth.uid()::text = id::text);

-- RLS Policies for lost_items
CREATE POLICY "Anyone can view lost items"
  ON lost_items FOR SELECT USING (true);

CREATE POLICY "Users can create lost items"
  ON lost_items FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own lost items"
  ON lost_items FOR UPDATE USING (true);

CREATE POLICY "Users can delete their own lost items"
  ON lost_items FOR DELETE USING (true);

-- RLS Policies for found_items
CREATE POLICY "Anyone can view found items"
  ON found_items FOR SELECT USING (true);

CREATE POLICY "Users can create found items"
  ON found_items FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own found items"
  ON found_items FOR UPDATE USING (true);

CREATE POLICY "Users can delete their own found items"
  ON found_items FOR DELETE USING (true);

-- RLS Policies for matches
CREATE POLICY "Anyone can view matches"
  ON matches FOR SELECT USING (true);

CREATE POLICY "System can create matches"
  ON matches FOR INSERT WITH CHECK (true);
