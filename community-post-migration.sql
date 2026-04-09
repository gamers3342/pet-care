-- Create community_post table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.community_post (
  post_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  type TEXT,
  area TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.community_post ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public insert" ON public.community_post
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select" ON public.community_post
  FOR SELECT USING (true);

CREATE POLICY "Allow update" ON public.community_post
  FOR UPDATE USING (true);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_community_post_created_at ON public.community_post(created_at DESC);
