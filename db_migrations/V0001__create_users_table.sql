CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  avatar TEXT,
  color TEXT DEFAULT 'from-blue-500 to-cyan-500',
  created_at TIMESTAMP DEFAULT NOW()
);