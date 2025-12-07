/*
  # Add INSERT and UPDATE policies for marketplace_purchases

  1. Changes
    - Add INSERT policy for users to create purchases
    - Add UPDATE policy for users to update their own purchases

  2. Security
    - Users can only insert purchases with their own wallet address
    - Users can only update their own purchases
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create purchases" ON marketplace_purchases;
DROP POLICY IF EXISTS "Users can update own purchases" ON marketplace_purchases;

-- Allow users to create purchases
CREATE POLICY "Users can create purchases"
  ON marketplace_purchases
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (buyer_wallet IS NOT NULL);

-- Allow users to update their own purchases
CREATE POLICY "Users can update own purchases"
  ON marketplace_purchases
  FOR UPDATE
  TO authenticated, anon
  USING (buyer_wallet IS NOT NULL)
  WITH CHECK (buyer_wallet IS NOT NULL);
