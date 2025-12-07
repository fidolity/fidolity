-- Create agent_drafts table
CREATE TABLE IF NOT EXISTS agent_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_wallet text NOT NULL,
  name text DEFAULT '',
  description text DEFAULT '',
  full_description text DEFAULT '',
  category text DEFAULT 'AI Agent',
  price numeric DEFAULT 0.01,
  api_endpoint text DEFAULT '',
  tags text[] DEFAULT '{}',
  capabilities text[] DEFAULT '{}',
  preview_images text[] DEFAULT '{}',
  last_saved_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create agent_reviews table
CREATE TABLE IF NOT EXISTS agent_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES marketplace_items(id) ON DELETE CASCADE,
  reviewer_wallet text NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text DEFAULT '',
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(item_id, reviewer_wallet)
);

-- Create listing_fees table
CREATE TABLE IF NOT EXISTS listing_fees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES marketplace_items(id),
  creator_wallet text NOT NULL,
  fee_amount numeric NOT NULL DEFAULT 0.01,
  transaction_signature text,
  recipient_address text NOT NULL DEFAULT '6rmN7SW2CnTWcFXn2Y2PQZfRBfVXovH3gMiQ2W9a8PsE',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  confirmed_at timestamptz
);

-- Add columns to marketplace_items if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'marketplace_items' AND column_name = 'average_rating'
  ) THEN
    ALTER TABLE marketplace_items ADD COLUMN average_rating numeric DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'marketplace_items' AND column_name = 'review_count'
  ) THEN
    ALTER TABLE marketplace_items ADD COLUMN review_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'marketplace_items' AND column_name = 'draft_id'
  ) THEN
    ALTER TABLE marketplace_items ADD COLUMN draft_id uuid REFERENCES agent_drafts(id);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE agent_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_fees ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agent_drafts
CREATE POLICY "Users can view their own drafts"
  ON agent_drafts FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can insert their own drafts"
  ON agent_drafts FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Users can update their own drafts"
  ON agent_drafts FOR UPDATE
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete their own drafts"
  ON agent_drafts FOR DELETE
  TO authenticated, anon
  USING (true);

-- RLS Policies for agent_reviews
CREATE POLICY "Anyone can read reviews"
  ON agent_reviews FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON agent_reviews FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Users can update their own reviews"
  ON agent_reviews FOR UPDATE
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete their own reviews"
  ON agent_reviews FOR DELETE
  TO authenticated, anon
  USING (true);

-- RLS Policies for listing_fees
CREATE POLICY "Users can read listing fees"
  ON listing_fees FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Anyone can create listing fees"
  ON listing_fees FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update listing fees"
  ON listing_fees FOR UPDATE
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can manage listing fees"
  ON listing_fees FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_agent_drafts_creator ON agent_drafts(creator_wallet);
CREATE INDEX IF NOT EXISTS idx_agent_reviews_item ON agent_reviews(item_id);
CREATE INDEX IF NOT EXISTS idx_agent_reviews_rating ON agent_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_listing_fees_creator ON listing_fees(creator_wallet);
CREATE INDEX IF NOT EXISTS idx_listing_fees_status ON listing_fees(status);
