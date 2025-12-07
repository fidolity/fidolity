"""
Seed database with initial data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
from models import TokenInfo, StakingConfig, MarketplaceItem

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client.get_database(os.environ.get('DB_NAME', 'parally_db'))


async def seed_token_info():
    """Seed token info"""
    existing = await db.token_info.find_one({"token_symbol": "PARALLY"})
    if not existing:
        token = TokenInfo(
            token_symbol="PARALLY",
            token_name="PARALLY Token",
            contract_address="soon",  # Start with "soon"
            blockchain="SOLANA",
            is_active=True
        )
        await db.token_info.insert_one(token.dict())
        print("✅ Token info seeded")
    else:
        print("ℹ️  Token info already exists")


async def seed_staking_config():
    """Seed staking configuration"""
    existing = await db.staking_config.find_one({"token_symbol": "R1X"})
    if not existing:
        config = StakingConfig(
            token_name="R1X Token",
            token_symbol="R1X",
            token_address="R1XTokenAddressPlaceholder",
            token_decimals=9,
            base_apy=26.18,
            boosted_apy=45.42,
            boost_amount=15000,
            boost_source="15k USDC rewards campaign",
            campaign_progress=75.4,
            total_value_locked=59456732.43,
            stake_enabled=False,
            unstake_enabled=True,
            lock_duration_days=0,
            staking_program_address="StakingProgramAddressPlaceholder"
        )
        await db.staking_config.insert_one(config.dict())
        print("✅ Staking config seeded")
    else:
        print("ℹ️  Staking config already exists")


async def seed_marketplace_items():
    """Seed some marketplace items"""
    count = await db.marketplace_items.count_documents({})
    if count == 0:
        items = [
            MarketplaceItem(
                name="r1x Aggregator",
                description="Scrape full contents from a specific URL. Returns clean and summarized web contents.",
                full_description="The r1x Aggregator is a powerful web scraping tool that extracts complete content from any URL.",
                category="AI Agent",
                price=0.01,
                blockchain="Solana",
                executions=1245,
                revenue=12.45,
                score=4.8,
                has_preview=True
            ),
            MarketplaceItem(
                name="Web Search Tool",
                description="Search the web for any topics with AI-powered summarization.",
                full_description="Comprehensive web search tool with time filtering and domain filtering capabilities.",
                category="AI",
                price=0.001,
                blockchain="Solana",
                executions=4532,
                revenue=4.53,
                score=4.9,
                has_preview=False
            ),
            MarketplaceItem(
                name="Financial Advisor Agent",
                description="AI-powered financial analysis and investment recommendation agent.",
                full_description="Comprehensive financial advisory service powered by advanced AI.",
                category="AI Agent",
                price=0.08,
                blockchain="Solana",
                executions=201,
                revenue=16.08,
                score=4.9,
                has_preview=False
            )
        ]
        
        for item in items:
            await db.marketplace_items.insert_one(item.dict())
        
        print(f"✅ {len(items)} marketplace items seeded")
    else:
        print(f"ℹ️  Marketplace already has {count} items")


async def main():
    print("🌱 Seeding database...")
    
    await seed_token_info()
    await seed_staking_config()
    await seed_marketplace_items()
    
    print("✅ Database seeding complete!")
    client.close()


if __name__ == "__main__":
    asyncio.run(main())
