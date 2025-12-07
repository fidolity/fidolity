from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum
import uuid


def generate_uuid():
    return str(uuid.uuid4())


# Enums
class MessageType(str, Enum):
    user = "user"
    agent = "agent"


class TransactionType(str, Enum):
    payment = "payment"
    service_purchase = "service_purchase"
    transfer = "transfer"
    other = "other"


class TransactionStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    failed = "failed"


# Chat Messages
class ChatMessage(BaseModel):
    id: str = Field(default_factory=generate_uuid)
    wallet_address: str
    message_type: MessageType
    content: str
    metadata: Optional[Dict[str, Any]] = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class ChatMessageCreate(BaseModel):
    wallet_address: str
    message_type: MessageType
    content: str
    metadata: Optional[Dict[str, Any]] = {}


# Wallet Activity
class WalletActivity(BaseModel):
    id: str = Field(default_factory=generate_uuid)
    wallet_address: str
    transaction_signature: str
    transaction_type: TransactionType
    amount: float
    token_mint: Optional[str] = None
    status: TransactionStatus = TransactionStatus.pending
    service_name: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    confirmed_at: Optional[datetime] = None


class WalletActivityCreate(BaseModel):
    wallet_address: str
    transaction_signature: str
    transaction_type: TransactionType
    amount: float
    token_mint: Optional[str] = None
    service_name: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = {}


# User Spending
class UserSpending(BaseModel):
    id: str = Field(default_factory=generate_uuid)
    wallet_address: str
    total_spent_sol: float = 0
    total_spent_usdc: float = 0
    transaction_count: int = 0
    services_used: int = 0
    last_activity_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# Token Info
class TokenInfo(BaseModel):
    id: str = Field(default_factory=generate_uuid)
    token_symbol: str
    token_name: str
    contract_address: str
    blockchain: str = "SOLANA"
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class TokenInfoUpdate(BaseModel):
    contract_address: Optional[str] = None
    token_name: Optional[str] = None
    is_active: Optional[bool] = None


# Staking Config
class StakingConfig(BaseModel):
    id: str = Field(default_factory=generate_uuid)
    token_name: str
    token_symbol: str
    token_address: str
    token_decimals: int = 9
    base_apy: float = 0
    boosted_apy: float = 0
    boost_amount: float = 0
    boost_source: str = ""
    campaign_progress: float = 0
    total_value_locked: float = 0
    stake_enabled: bool = True
    unstake_enabled: bool = True
    lock_duration_days: int = 0
    staking_program_address: str = ""
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# User Stakes
class UserStake(BaseModel):
    id: str = Field(default_factory=generate_uuid)
    wallet_address: str
    token_symbol: str
    staked_amount: float = 0
    rewards_earned: float = 0
    stake_date: datetime = Field(default_factory=datetime.utcnow)
    last_claim_date: Optional[datetime] = None
    unstake_date: Optional[datetime] = None
    transaction_signature: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


# Marketplace Items
class MarketplaceItem(BaseModel):
    id: str = Field(default_factory=generate_uuid)
    name: str
    description: str
    full_description: str = ""
    category: str
    type: str = "agent"
    price: float = 0
    currency: str = "USDC (SPL)"
    blockchain: str = "Solana"
    x402_ready: bool = True
    preview_image: Optional[str] = None
    has_preview: bool = False
    api_endpoint: Optional[str] = None
    executions: int = 0
    revenue: float = 0
    score: float = 0
    tags: List[str] = []
    created_by: Optional[str] = None
    is_active: bool = True
    average_rating: float = 0
    review_count: int = 0
    draft_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class MarketplaceItemCreate(BaseModel):
    name: str
    description: str
    full_description: str = ""
    category: str
    price: float = 0.01
    api_endpoint: Optional[str] = None
    tags: List[str] = []
    created_by: Optional[str] = None


# Marketplace Purchases
class MarketplacePurchase(BaseModel):
    id: str = Field(default_factory=generate_uuid)
    item_id: str
    buyer_wallet: str
    amount: float
    transaction_signature: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)


# Agent Drafts
class AgentDraft(BaseModel):
    id: str = Field(default_factory=generate_uuid)
    creator_wallet: str
    name: str = ""
    description: str = ""
    full_description: str = ""
    category: str = "AI Agent"
    price: float = 0.01
    api_endpoint: str = ""
    tags: List[str] = []
    capabilities: List[str] = []
    preview_images: List[str] = []
    last_saved_at: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class AgentDraftCreate(BaseModel):
    creator_wallet: str
    name: str = ""
    description: str = ""
    category: str = "AI Agent"
    price: float = 0.01


# Agent Reviews
class AgentReview(BaseModel):
    id: str = Field(default_factory=generate_uuid)
    item_id: str
    reviewer_wallet: str
    rating: float  # 1-5
    review_text: str = ""
    helpful_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# AI Chat Request/Response
class AIChatRequest(BaseModel):
    message: str
    wallet_address: str
    conversation_history: List[Dict[str, str]] = []


class AIChatResponse(BaseModel):
    success: bool
    response: str
    tokens_used: Optional[int] = 0
    error: Optional[str] = None
