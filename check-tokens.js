#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://aelnfliqctppyzoyyhkh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlbG5mbGlxY3RwcHl6b3l5aGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTEwNDEsImV4cCI6MjA3ODUyNzA0MX0.lMI117Dll_Hzx_w-2kEuaOMvvZ8y97kAuR7Nn4cgQOM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTokens() {
  console.log('\n📋 Checking token_info table...\n');
  
  try {
    const { data, error } = await supabase
      .from('token_info')
      .select('*');

    if (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }

    if (data && data.length > 0) {
      console.log(`✅ Found ${data.length} token(s):\n`);
      data.forEach((token, index) => {
        console.log(`Token ${index + 1}:`);
        console.log('  Symbol:', token.token_symbol);
        console.log('  Name:', token.token_name);
        console.log('  Contract Address:', token.contract_address);
        console.log('  Blockchain:', token.blockchain);
        console.log('  Is Active:', token.is_active);
        console.log('');
      });
    } else {
      console.log('⚠️  No tokens found in database. The table might be empty or doesn\'t exist yet.');
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    process.exit(1);
  }
}

checkTokens();
