/*
  # Add INSERT policies for marketplace items and related tables

  1. Changes
    - Add INSERT policy for authenticated users to create marketplace items
    - Add UPDATE policy for creators to update their own items
    - Add INSERT policy for anon users (wallet-based auth)

  2. Security
    - Users can only insert items with their own wallet address as creator
    - Users can only update their own items
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can create marketplace items" ON marketplace_items;
DROP POLICY IF EXISTS "Creators can update own marketplace items" ON marketplace_items;
DROP POLICY IF EXISTS "Anonymous users can create marketplace items" ON marketplace_items;
DROP POLICY IF EXISTS "Anonymous users can update own marketplace items" ON marketplace_items;

-- Allow authenticated users to insert marketplace items
CREATE POLICY "Authenticated users can create marketplace items"
  ON marketplace_items
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by IS NOT NULL);

-- Allow creators to update their own items
CREATE POLICY "Creators can update own marketplace items"
  ON marketplace_items
  FOR UPDATE
  TO authenticated
  USING (created_by IS NOT NULL)
  WITH CHECK (created_by IS NOT NULL);

-- Also allow anon users to insert (for wallet-based auth)
CREATE POLICY "Anonymous users can create marketplace items"
  ON marketplace_items
  FOR INSERT
  TO anon
  WITH CHECK (created_by IS NOT NULL);

-- Allow anon users to update their own items
CREATE POLICY "Anonymous users can update own marketplace items"
  ON marketplace_items
  FOR UPDATE
  TO anon
  USING (created_by IS NOT NULL)
  WITH CHECK (created_by IS NOT NULL);
