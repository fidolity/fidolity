// Dynamic configuration service
// This fetches config from a JSON file that can be updated without redeploying

export interface TokenConfig {
  symbol: string;
  name: string;
  contractAddress: string;
  blockchain: string;
  decimals: number;
}

export interface AppConfig {
  token: TokenConfig;
  links: {
    website: string;
    twitter: string;
    github: string;
    discord: string;
    docs: string;
  };
  staking: {
    enabled: boolean;
    baseAPY: number;
    boostedAPY: number;
  };
}

class ConfigService {
  private config: AppConfig | null = null;
  private configUrl = '/config.json';

  async getConfig(): Promise<AppConfig> {
    // Return cached config if available
    if (this.config) {
      return this.config;
    }

    try {
      // Fetch config with cache busting
      const timestamp = new Date().getTime();
      const response = await fetch(`${this.configUrl}?t=${timestamp}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch config');
      }

      this.config = await response.json();
      return this.config!;
    } catch (error) {
      console.error('Error loading config:', error);
      // Return default fallback config
      return this.getDefaultConfig();
    }
  }

  async getTokenConfig(): Promise<TokenConfig> {
    const config = await this.getConfig();
    return config.token;
  }

  // Clear cache to force refresh
  clearCache(): void {
    this.config = null;
  }

  private getDefaultConfig(): AppConfig {
    return {
      token: {
        symbol: 'FDLT',
        name: 'Fidolity Token',
        contractAddress: 'soon',
        blockchain: 'SOLANA',
        decimals: 9,
      },
      links: {
        website: 'https://fidolity.com',
        twitter: 'https://x.com/fidolity',
        github: 'https://github.com/fidolity',
        discord: 'https://discord.gg/fidolity',
        docs: 'https://docs.fidolity.com',
      },
      staking: {
        enabled: false,
        baseAPY: 26.18,
        boostedAPY: 45.42,
      },
    };
  }
}

export const configService = new ConfigService();
