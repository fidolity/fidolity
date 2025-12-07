#!/usr/bin/env node

// Simple script to update contract address in Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://aelnfliqctppyzoyyhkh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlbG5mbGlxY3RwcHl6b3l5aGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTEwNDEsImV4cCI6MjA3ODUyNzA0MX0.lMI117Dll_Hzx_w-2kEuaOMvvZ8y97kAuR7Nn4cgQOM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateContractAddress(newAddress) {
  console.log(`\n🔄 Updating contract address to: "${newAddress}"\n`);
  
  try {
    const { data, error } = await supabase
      .from('token_info')
      .update({ 
        contract_address: newAddress,
        updated_at: new Date().toISOString()
      })
      .eq('token_symbol', 'PARALLY')
      .select();

    if (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }

    if (data && data.length > 0) {
      console.log('✅ Successfully updated!');
      console.log('\nUpdated record:');
      console.log('  Token Symbol:', data[0].token_symbol);
      console.log('  Token Name:', data[0].token_name);
      console.log('  Contract Address:', data[0].contract_address);
      console.log('  Blockchain:', data[0].blockchain);
      console.log('\n✨ Refresh your app to see the changes!\n');
    } else {
      console.log('⚠️  No records were updated. Token might not exist.');
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    process.exit(1);
  }
}

// Get the new address from command line argument, default to "soon"
const newAddress = process.argv[2] || 'soon';
updateContractAddress(newAddress);
