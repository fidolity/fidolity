#!/usr/bin/env node
/**
 * Generate config.json at build time using environment variables
 * This allows updating the contract address without code changes
 */

const fs = require('fs');
const path = require('path');

const config = {
  token: {
    symbol: process.env.VITE_TOKEN_SYMBOL || 'FDLT',
    name: process.env.VITE_TOKEN_NAME || 'Fidolity Token',
    contractAddress: process.env.VITE_CONTRACT_ADDRESS || 'soon',
    blockchain: process.env.VITE_BLOCKCHAIN || 'SOLANA',
    decimals: parseInt(process.env.VITE_TOKEN_DECIMALS || '9'),
  },
  links: {
    website: process.env.VITE_WEBSITE_URL || 'https://fidolity.com',
    twitter: process.env.VITE_TWITTER_URL || 'https://x.com/fidolity',
    github: process.env.VITE_GITHUB_URL || 'https://github.com/fidolity',
    discord: process.env.VITE_DISCORD_URL || 'https://discord.gg/fidolity',
    docs: process.env.VITE_DOCS_URL || 'https://docs.fidolity.com',
  },
  staking: {
    enabled: process.env.VITE_STAKING_ENABLED === 'true',
    baseAPY: parseFloat(process.env.VITE_BASE_APY || '26.18'),
    boostedAPY: parseFloat(process.env.VITE_BOOSTED_APY || '45.42'),
  },
};

const configPath = path.join(__dirname, '..', 'public', 'config.json');

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

console.log('✅ Config generated successfully!');
console.log(`Contract Address: ${config.token.contractAddress}`);
