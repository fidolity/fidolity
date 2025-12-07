# Update Token Contract Address to "soon"

## SQL Query to Run in Supabase Dashboard

### For PARALLY Token:
```sql
UPDATE token_info 
SET contract_address = 'soon',
    updated_at = now()
WHERE token_symbol = 'PARALLY';
```

### To Verify the Update:
```sql
SELECT token_symbol, token_name, contract_address, blockchain, is_active
FROM token_info
WHERE token_symbol = 'PARALLY';
```

## Expected Result After Update:
- Token Symbol: PARALLY
- Token Name: PARALLY Token
- Contract Address: **soon** (updated)
- Blockchain: SOLANA
- Is Active: true

## Where This Appears in Your App:
- The contract address is displayed on the homepage via the `TokenAddressDisplay` component
- Users will see "soon" and be able to copy it
- The "View on Explorer" button will be hidden since it's not a valid address

## To Update Later With Real Address:
```sql
UPDATE token_info 
SET contract_address = 'YOUR_REAL_SOLANA_ADDRESS_HERE',
    updated_at = now()
WHERE token_symbol = 'PARALLY';
```

## Steps to Execute:
1. Go to https://supabase.com/dashboard
2. Select your project (aelnfliqctppyzoyyhkh)
3. Click "SQL Editor" in the left sidebar
4. Paste the UPDATE query above
5. Click "Run" button
6. Refresh your Parally app to see the change
