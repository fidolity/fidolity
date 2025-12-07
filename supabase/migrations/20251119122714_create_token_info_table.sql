/*
  # Create Token Info Table

  1. New Tables
    - `token_info`
      - `id` (uuid, primary key) - Unique identifier
      - `token_symbol` (text) - Token symbol (e.g., 'PARALLY')
      - `token_name` (text) - Full token name
      - `contract_address` (text) - Solana token contract address
      - `blockchain` (text) - Blockchain network (default: 'SOLANA')
      - `is_active` (boolean) - Whether this token is currently active
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `token_info` table
    - Add policy for public read access (anyone can view token info)
    - Add policy for authenticated admin updates (future: admin-only writes)

  3. Initial Data
    - Insert PARALLY token placeholder data
*/

CREATE TABLE IF NOT EXISTS token_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_symbol text UNIQUE NOT NULL,
  token_name text NOT NULL,
  contract_address text NOT NULL,
  blockchain text DEFAULT 'SOLANA',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE token_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view token info"
  ON token_info
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can update token info"
  ON token_info
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO token_info (token_symbol, token_name, contract_address, blockchain, is_active)
VALUES ('PARALLY', 'PARALLY Token', 'DevnetTokenPlaceholder', 'SOLANA', true)
ON CONFLICT (token_symbol) DO NOTHING;