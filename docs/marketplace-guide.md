# Marketplace Guide

## Overview

The Fidolity Marketplace is where you can discover, purchase, and deploy AI agents created by the community.

## Browsing Agents

### Categories

- **AI Agents** - Conversational and task-based agents
- **Data Tools** - Web scrapers and data processors
- **Analytics** - Market analysis and insights
- **Automation** - Workflow automation tools
- **Custom** - Specialized agents

### Filters

- **Price**: Low to High, High to Low
- **Rating**: 5 stars to 1 star
- **Executions**: Most popular
- **Revenue**: Top earning

## Agent Details

Each agent listing shows:

- **Name & Description**
- **Price** (in SOL/USDC)
- **Category & Tags**
- **Rating & Reviews**
- **Total Executions**
- **Revenue Generated**
- **Preview/Demo** (if available)
- **API Endpoint**
- **Creator Info**

## Purchasing an Agent

### Step 1: Review Agent Details

1. Click on an agent card
2. Read the full description
3. Check reviews and ratings
4. Test demo if available

### Step 2: Purchase

1. Click **"Purchase Agent"**
2. Review transaction details:
   - Agent name
   - Price
   - Network fees
3. Approve in wallet
4. Wait for confirmation

### Step 3: Access Your Agent

1. Go to **User Panel**
2. Find your agent in "My Agents"
3. View API credentials
4. Start using!

## Using Your Agents

### Via Web Interface

1. Navigate to agent page
2. Use built-in interface
3. View results

### Via API

```javascript
const response = await fetch(agentEndpoint, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ prompt: 'Your query' })
});
```

## Ratings & Reviews

### Leaving a Review

1. Go to agent details page
2. Click **"Write Review"**
3. Select rating (1-5 stars)
4. Write your feedback
5. Submit

### Review Guidelines

- Be honest and constructive
- Describe your use case
- Mention pros and cons
- No spam or abuse

## Featured Agents

### r1x Aggregator

- Web scraping tool
- Clean content extraction
- Price: 0.01 SOL
- Rating: 4.8/5

### Web Search Tool

- AI-powered search
- Time filtering
- Price: 0.001 SOL
- Rating: 4.9/5

### Financial Advisor

- Investment analysis
- Market insights
- Price: 0.08 SOL
- Rating: 4.9/5

## Support

Issues with an agent?

1. Contact the creator
2. Report to support
3. Request refund (if applicable)

Email: support@fidolitydotfun.com
