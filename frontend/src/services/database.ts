import APIClient from './api';

export interface ChatMessage {
  id: string;
  wallet_address: string;
  message_type: 'user' | 'agent';
  content: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface WalletActivity {
  id: string;
  wallet_address: string;
  transaction_signature: string;
  transaction_type: 'payment' | 'service_purchase' | 'transfer' | 'other';
  amount: number;
  token_mint?: string;
  status: 'pending' | 'confirmed' | 'failed';
  service_name?: string;
  metadata?: Record<string, any>;
  created_at: string;
  confirmed_at?: string;
}

export interface UserSpending {
  id: string;
  wallet_address: string;
  total_spent_sol: number;
  total_spent_usdc: number;
  transaction_count: number;
  services_used: number;
  last_activity_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TokenInfo {
  id: string;
  token_symbol: string;
  token_name: string;
  contract_address: string;
  blockchain: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class DatabaseService {
  static async getChatHistory(walletAddress: string, limit = 50): Promise<ChatMessage[]> {
    try {
      return await APIClient.get<ChatMessage[]>(`/chat/history/${walletAddress}?limit=${limit}`);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  }

  static async saveChatMessage(
    walletAddress: string,
    messageType: 'user' | 'agent',
    content: string,
    metadata?: Record<string, any>
  ): Promise<ChatMessage | null> {
    try {
      return await APIClient.post<ChatMessage>('/chat/message', {
        wallet_address: walletAddress,
        message_type: messageType,
        content: content,
        metadata: metadata || {},
      });
    } catch (error) {
      console.error('Error saving chat message:', error);
      return null;
    }
  }

  static async deleteChatHistory(walletAddress: string): Promise<boolean> {
    try {
      await APIClient.delete(`/chat/history/${walletAddress}`);
      return true;
    } catch (error) {
      console.error('Error deleting chat history:', error);
      return false;
    }
  }

  static async getUserSpending(walletAddress: string): Promise<UserSpending | null> {
    try {
      return await APIClient.get<UserSpending>(`/user/spending/${walletAddress}`);
    } catch (error) {
      console.error('Error fetching user spending:', error);
      return null;
    }
  }

  static async getWalletActivity(
    walletAddress: string,
    limit = 20
  ): Promise<WalletActivity[]> {
    try {
      return await APIClient.get<WalletActivity[]>(`/wallet/activity/${walletAddress}?limit=${limit}`);
    } catch (error) {
      console.error('Error fetching wallet activity:', error);
      return [];
    }
  }

  static async recordTransaction(
    walletAddress: string,
    transactionSignature: string,
    transactionType: 'payment' | 'service_purchase' | 'transfer' | 'other',
    amount: number,
    serviceName?: string,
    tokenMint?: string,
    metadata?: Record<string, any>
  ): Promise<WalletActivity | null> {
    try {
      return await APIClient.post<WalletActivity>('/wallet/transaction', {
        wallet_address: walletAddress,
        transaction_signature: transactionSignature,
        transaction_type: transactionType,
        amount: amount,
        token_mint: tokenMint,
        service_name: serviceName,
        metadata: metadata || {},
      });
    } catch (error) {
      console.error('Error recording transaction:', error);
      return null;
    }
  }

  static async updateTransactionStatus(
    transactionSignature: string,
    status: 'confirmed' | 'failed',
    confirmedAt?: string
  ): Promise<boolean> {
    try {
      await APIClient.patch(`/wallet/transaction/${transactionSignature}`, {
        status,
        confirmed_at: confirmedAt || new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error('Error updating transaction status:', error);
      return false;
    }
  }

  static async getRecentPurchases(
    walletAddress: string,
    limit = 5
  ): Promise<WalletActivity[]> {
    try {
      const activities = await this.getWalletActivity(walletAddress, limit);
      return activities.filter(
        (activity) => activity.transaction_type === 'service_purchase' && activity.status === 'confirmed'
      );
    } catch (error) {
      console.error('Error fetching recent purchases:', error);
      return [];
    }
  }

  static async getTokenInfo(symbol?: string): Promise<TokenInfo | TokenInfo[] | null> {
    try {
      if (symbol) {
        return await APIClient.get<TokenInfo>(`/token/info/${symbol}`);
      } else {
        return await APIClient.get<TokenInfo[]>('/token/info');
      }
    } catch (error) {
      console.error('Error fetching token info:', error);
      return null;
    }
  }
}
