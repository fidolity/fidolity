# 🎯 Simple Way to Update Contract Address to "soon"

## The Problem
Your Supabase table has Row Level Security (RLS) that prevents updates from the anon key used in your app.

## The Solution (2 Options)

### Option 1: Quick SQL Update (30 seconds)
1. Click this link: https://supabase.com/dashboard/project/aelnfliqctppyzoyyhkh/editor
2. Log in to your Supabase account
3. In the SQL Editor, paste this:
   ```sql
   UPDATE token_info 
   SET contract_address = 'soon'
   WHERE token_symbol = 'PARALLY';
   ```
4. Click "Run"
5. Done! Refresh your app

### Option 2: Use the Visual Editor (No SQL needed)
1. Go to: https://supabase.com/dashboard/project/aelnfliqctppyzoyyhkh/editor
2. Click on "token_info" table
3. Find the PARALLY row
4. Click on the contract_address cell
5. Type "soon"
6. Press Enter
7. Done!

## Current Value
- Current address: `G2YsjEzadEXZLNryVH2XVnKhS9msRVgE2tw6Xhfbpump`
- Will be changed to: `soon`

## Alternative: Update RLS Policy (For Future Updates)
If you want to be able to update from scripts in the future, you can modify the RLS policy:

```sql
-- Add this policy to allow anonymous updates
CREATE POLICY "Allow anonymous updates on token_info"
  ON token_info
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
```

Then you can use the web interface I created:
- Visit: http://localhost:3000/update-address.html
- Or: https://minimal-migrate.preview.emergentagent.com/update-address.html

But for now, the quickest way is just Option 1 or 2 above!
