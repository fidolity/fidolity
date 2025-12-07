import { useState, useEffect } from 'react';
import { Copy, ExternalLink, Check } from 'lucide-react';
import { DatabaseService } from '../services/database';

interface TokenInfo {
  token_symbol: string;
  token_name: string;
  contract_address: string;
  blockchain: string;
}

export default function TokenAddressDisplay() {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTokenInfo();
  }, []);

  const loadTokenInfo = async () => {
    try {
      const data = await DatabaseService.getTokenInfo('FDLT');
      if (data && !Array.isArray(data)) {
        setTokenInfo(data);
      }
    } catch (error) {
      console.error('Failed to load token info:', error);
      // Fallback for static deployment
      setTokenInfo({
        token_symbol: 'FDLT',
        token_name: 'Fidolity Token',
        contract_address: 'soon',
        blockchain: 'SOLANA',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!tokenInfo) return;

    try {
      await navigator.clipboard.writeText(tokenInfo.contract_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const truncateAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const handleViewExplorer = () => {
    if (!tokenInfo) return;

    const explorerUrl = tokenInfo.blockchain === 'SOLANA'
      ? `https://solscan.io/token/${tokenInfo.contract_address}`
      : '';

    if (explorerUrl) {
      window.open(explorerUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 animate-pulse">
        <div className="h-6 bg-gray-800 rounded w-48"></div>
      </div>
    );
  }

  if (!tokenInfo) return null;

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-everett-mono text-sm text-white mb-1">
            {truncateAddress(tokenInfo.contract_address)}
          </div>
          <p className="text-xs text-gray-500 font-everett-mono">
            Contract Address
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-800 rounded transition-all group"
            title="Copy address"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400 group-hover:text-white" />
            )}
          </button>
          {tokenInfo.blockchain === 'SOLANA' && tokenInfo.contract_address !== 'DevnetTokenPlaceholder' && (
            <button
              onClick={handleViewExplorer}
              className="p-2 hover:bg-gray-800 rounded transition-all group"
              title="View on explorer"
            >
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
