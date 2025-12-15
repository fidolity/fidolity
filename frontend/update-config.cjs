#!/usr/bin/env node
/**
 * Config Update Script
 * Run this after deployment to update config.json with your token address
 */

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'dist', 'config.json');

// Check if dist exists
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.error('❌ Error: dist/ folder not found. Run "yarn build" first.');
  process.exit(1);
}

// Get contract address from command line or environment variable
const contractAddress = process.argv[2] || process.env.CONTRACT_ADDRESS;

if (!contractAddress) {
  console.log('ℹ️  No CONTRACT_ADDRESS provided, keeping default config');
  process.exit(0);
}

// Read current config
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Update contract address
config.token.contractAddress = contractAddress;

// Write back
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

console.log('✅ Config updated successfully!');
console.log(`Contract Address: ${contractAddress}`);
console.log(`Updated file: ${configPath}`);
