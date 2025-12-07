from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from typing import List, Optional
from datetime import datetime

from models import (
    ChatMessage, ChatMessageCreate,
    WalletActivity, WalletActivityCreate,
    UserSpending, TokenInfo, TokenInfoUpdate,
    StakingConfig, UserStake, MarketplaceItem, MarketplaceItemCreate,
    MarketplacePurchase, AgentDraft, AgentDraftCreate, AgentReview,
    AIChatRequest, AIChatResponse, TransactionStatus
)

# Load environment
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client.get_database(os.environ.get('DB_NAME', 'parally_db'))

# Create FastAPI app
app = FastAPI(title="Parally API")
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ============ CHAT MESSAGES ============
@api_router.get("/chat/history/{wallet_address}", response_model=List[ChatMessage])
async def get_chat_history(wallet_address: str, limit: int = 50):
    """Get chat history for a wallet address"""
    messages = await db.chat_messages.find(
        {"wallet_address": wallet_address}
    ).sort("created_at", 1).limit(limit).to_list(limit)
    return messages


@api_router.post("/chat/message", response_model=ChatMessage)
async def save_chat_message(message: ChatMessageCreate):
    """Save a new chat message"""
    msg = ChatMessage(**message.dict())
    await db.chat_messages.insert_one(msg.dict())
    return msg


@api_router.delete("/chat/history/{wallet_address}")
async def delete_chat_history(wallet_address: str):
    """Delete chat history for a wallet"""
    result = await db.chat_messages.delete_many({"wallet_address": wallet_address})
    return {"deleted": result.deleted_count}


# ============ WALLET ACTIVITY ============
@api_router.get("/wallet/activity/{wallet_address}", response_model=List[WalletActivity])
async def get_wallet_activity(wallet_address: str, limit: int = 20):
    """Get wallet activity/transaction history"""
    activities = await db.wallet_activity.find(
        {"wallet_address": wallet_address}
    ).sort("created_at", -1).limit(limit).to_list(limit)
    return activities


@api_router.post("/wallet/transaction", response_model=WalletActivity)
async def record_transaction(activity: WalletActivityCreate):
    """Record a new transaction"""
    wallet_activity = WalletActivity(**activity.dict())
    await db.wallet_activity.insert_one(wallet_activity.dict())
    return wallet_activity


@api_router.patch("/wallet/transaction/{signature}")
async def update_transaction_status(
    signature: str,
    status: TransactionStatus,
    confirmed_at: Optional[str] = None
):
    """Update transaction status"""
    update_data = {"status": status}
    if confirmed_at:
        update_data["confirmed_at"] = confirmed_at
    
    result = await db.wallet_activity.update_one(
        {"transaction_signature": signature},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    return {"success": True}


# ============ USER SPENDING ============
@api_router.get("/user/spending/{wallet_address}", response_model=UserSpending)
async def get_user_spending(wallet_address: str):
    """Get spending stats for a user"""
    spending = await db.user_spending.find_one({"wallet_address": wallet_address})
    
    if not spending:
        # Create new record
        new_spending = UserSpending(wallet_address=wallet_address)
        await db.user_spending.insert_one(new_spending.dict())
        return new_spending
    
    return spending


# ============ TOKEN INFO ============
@api_router.get("/token/info", response_model=List[TokenInfo])
async def get_token_info(is_active: bool = True):
    """Get active token information"""
    tokens = await db.token_info.find({"is_active": is_active}).to_list(100)
    return tokens


@api_router.get("/token/info/{symbol}", response_model=TokenInfo)
async def get_token_by_symbol(symbol: str):
    """Get token info by symbol"""
    token = await db.token_info.find_one({"token_symbol": symbol})
    if not token:
        raise HTTPException(status_code=404, detail="Token not found")
    return token


@api_router.patch("/token/info/{symbol}", response_model=TokenInfo)
async def update_token_info(symbol: str, update: TokenInfoUpdate):
    """Update token information (e.g., contract address)"""
    update_data = {k: v for k, v in update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.token_info.update_one(
        {"token_symbol": symbol},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Token not found")
    
    updated_token = await db.token_info.find_one({"token_symbol": symbol})
    return updated_token


@api_router.post("/token/info", response_model=TokenInfo)
async def create_token_info(token: TokenInfo):
    """Create new token info"""
    await db.token_info.insert_one(token.dict())
    return token


# ============ STAKING ============
@api_router.get("/staking/config", response_model=List[StakingConfig])
async def get_staking_config():
    """Get staking configuration"""
    configs = await db.staking_config.find({}).to_list(100)
    return configs


@api_router.get("/staking/stakes/{wallet_address}", response_model=List[UserStake])
async def get_user_stakes(wallet_address: str):
    """Get user staking positions"""
    stakes = await db.user_stakes.find({"wallet_address": wallet_address}).to_list(100)
    return stakes


# ============ MARKETPLACE ============
@api_router.get("/marketplace/items", response_model=List[MarketplaceItem])
async def get_marketplace_items(is_active: bool = True, limit: int = 100):
    """Get marketplace items"""
    items = await db.marketplace_items.find(
        {"is_active": is_active}
    ).limit(limit).to_list(limit)
    return items


@api_router.get("/marketplace/items/{item_id}", response_model=MarketplaceItem)
async def get_marketplace_item(item_id: str):
    """Get single marketplace item"""
    item = await db.marketplace_items.find_one({"id": item_id})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@api_router.post("/marketplace/items", response_model=MarketplaceItem)
async def create_marketplace_item(item: MarketplaceItemCreate):
    """Create new marketplace item"""
    marketplace_item = MarketplaceItem(**item.dict())
    await db.marketplace_items.insert_one(marketplace_item.dict())
    return marketplace_item


@api_router.get("/marketplace/purchases/{wallet_address}", response_model=List[MarketplacePurchase])
async def get_user_purchases(wallet_address: str):
    """Get user's marketplace purchases"""
    purchases = await db.marketplace_purchases.find(
        {"buyer_wallet": wallet_address}
    ).to_list(100)
    return purchases


# ============ AGENT BUILDER ============
@api_router.get("/agents/drafts/{wallet_address}", response_model=List[AgentDraft])
async def get_agent_drafts(wallet_address: str):
    """Get user's agent drafts"""
    drafts = await db.agent_drafts.find(
        {"creator_wallet": wallet_address}
    ).to_list(100)
    return drafts


@api_router.post("/agents/drafts", response_model=AgentDraft)
async def create_agent_draft(draft: AgentDraftCreate):
    """Create new agent draft"""
    agent_draft = AgentDraft(**draft.dict())
    await db.agent_drafts.insert_one(agent_draft.dict())
    return agent_draft


@api_router.get("/agents/reviews/{item_id}", response_model=List[AgentReview])
async def get_agent_reviews(item_id: str):
    """Get reviews for an agent"""
    reviews = await db.agent_reviews.find({"item_id": item_id}).to_list(100)
    return reviews


# ============ AI CHAT ============
def generate_mock_response(message: str) -> str:
    """Generate mock AI response"""
    message_lower = message.lower()
    
    if 'parally' in message_lower or 'what' in message_lower:
        return "Parally is a decentralized AI agent marketplace built on Solana blockchain. It enables users to create, deploy, and monetize AI agents through a comprehensive marketplace ecosystem with staking mechanisms and wallet integration."
    
    if 'marketplace' in message_lower:
        return "The Parally Marketplace is where you can discover and purchase AI agents from the community. Browse agents, check their ratings, and integrate them into your applications seamlessly."
    
    if 'staking' in message_lower:
        return "Parally Staking allows you to stake PARALLY tokens to earn rewards and access premium features. Stake your tokens to participate in platform governance and earn passive income."
    
    if 'hello' in message_lower or 'hi' in message_lower:
        return "Hello! I'm the Parally AI assistant. I can help you understand our platform, navigate the marketplace, and answer questions about AI agents and staking. What would you like to know?"
    
    return "I'm here to help you with Parally! You can ask me about the marketplace, staking, creating agents, or any other features. What would you like to know more about?"


@api_router.post("/ai/chat", response_model=AIChatResponse)
async def ai_chat(request: AIChatRequest):
    """AI chat endpoint (mock for now)"""
    try:
        # Save user message
        user_msg = ChatMessage(
            wallet_address=request.wallet_address,
            message_type="user",
            content=request.message
        )
        await db.chat_messages.insert_one(user_msg.dict())
        
        # Generate response
        response_text = generate_mock_response(request.message)
        
        # Save agent message
        agent_msg = ChatMessage(
            wallet_address=request.wallet_address,
            message_type="agent",
            content=response_text
        )
        await db.chat_messages.insert_one(agent_msg.dict())
        
        return AIChatResponse(
            success=True,
            response=response_text,
            tokens_used=len(response_text.split())
        )
    except Exception as e:
        logger.error(f"AI chat error: {e}")
        return AIChatResponse(
            success=False,
            response="",
            error=str(e)
        )


# ============ ADMIN / UTILITY ============
@api_router.get("/")
async def root():
    return {"message": "Parally API", "version": "1.0.0"}


@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        await db.command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}


# Include router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Shutdown
@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
