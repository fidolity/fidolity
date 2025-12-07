import APIClient from './api';

export interface AgentDraft {
  id?: string;
  creator_wallet: string;
  name: string;
  description: string;
  full_description: string;
  category: string;
  price: number;
  api_endpoint: string;
  tags: string[];
  capabilities: string[];
  preview_images: string[];
  last_saved_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AgentReview {
  id?: string;
  item_id: string;
  reviewer_wallet: string;
  rating: number;
  review_text: string;
  helpful_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ListingFee {
  id?: string;
  item_id?: string;
  creator_wallet: string;
  fee_amount: number;
  transaction_signature: string;
  recipient_address: string;
  status: 'pending' | 'confirmed' | 'failed';
  created_at?: string;
  confirmed_at?: string;
}

export class AgentBuilderService {
  static async createDraft(walletAddress: string): Promise<AgentDraft | null> {
    try {
      return await APIClient.post<AgentDraft>('/agents/drafts', {
        creator_wallet: walletAddress,
        name: '',
        description: '',
        category: 'AI Agent',
        price: 0.01,
      });
    } catch (error) {
      console.error('Error creating draft:', error);
      return null;
    }
  }

  static async getUserDrafts(walletAddress: string): Promise<AgentDraft[]> {
    try {
      return await APIClient.get<AgentDraft[]>(`/agents/drafts/${walletAddress}`);
    } catch (error) {
      console.error('Error fetching drafts:', error);
      return [];
    }
  }

  static async getMarketplaceItems(): Promise<any[]> {
    try {
      return await APIClient.get<any[]>('/marketplace/items');
    } catch (error) {
      console.error('Error fetching marketplace items:', error);
      return [];
    }
  }

  static async getMarketplaceItem(itemId: string): Promise<any | null> {
    try {
      return await APIClient.get<any>(`/marketplace/items/${itemId}`);
    } catch (error) {
      console.error('Error fetching marketplace item:', error);
      return null;
    }
  }

  static async getItemReviews(itemId: string): Promise<AgentReview[]> {
    try {
      return await APIClient.get<AgentReview[]>(`/agents/reviews/${itemId}`);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }
}
