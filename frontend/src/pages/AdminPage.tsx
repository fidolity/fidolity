import { useState, useEffect } from 'react';
import { Shield, Save, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { configService } from '../services/config';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentAddress, setCurrentAddress] = useState('');

  // Simple password - you should change this!
  const ADMIN_PASSWORD = 'fidolity2024';

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadCurrentAddress();
    }
  }, []);

  const loadCurrentAddress = async () => {
    try {
      const tokenConfig = await configService.getTokenConfig();
      setCurrentAddress(tokenConfig.contractAddress);
      setContractAddress(tokenConfig.contractAddress);
    } catch (error) {
      console.error('Failed to load current address:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      loadCurrentAddress();
      setMessage({ type: 'success', text: 'Successfully authenticated!' });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: 'Invalid password!' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    setPassword('');
  };

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Store in localStorage (will be used by config service)
      localStorage.setItem('contract_address_override', contractAddress);
      
      // Clear config cache to force reload
      configService.clearCache();
      
      setMessage({ 
        type: 'success', 
        text: 'Contract address updated successfully! Refresh the homepage to see changes.' 
      });
      
      setCurrentAddress(contractAddress);
      
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to update contract address' 
      });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 text-orange-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Admin Access
            </h1>
            <p className="text-zinc-400 text-center mb-6">
              Enter password to manage contract address
            </p>

            {message && (
              <div className={`mb-4 p-3 rounded ${
                message.type === 'success' 
                  ? 'bg-green-500/10 text-green-400' 
                  : 'bg-red-500/10 text-red-400'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Update Contract Address</h2>

          <div className="mb-6 p-4 bg-black rounded-lg border border-zinc-800">
            <p className="text-sm text-zinc-400 mb-2">Current Contract Address</p>
            <p className="text-white font-mono break-all">{currentAddress}</p>
          </div>

          <form onSubmit={handleUpdateAddress}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                New Contract Address
              </label>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white font-mono focus:outline-none focus:border-orange-500"
                placeholder="Enter Solana contract address"
                required
              />
              <p className="mt-2 text-sm text-zinc-500">
                Enter the full Solana contract address or "soon" if not launched yet
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Contract Address
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">📝 Instructions</h3>
            <ul className="text-sm text-blue-300 space-y-1">
              <li>• Paste your Solana token contract address above</li>
              <li>• Click "Update Contract Address"</li>
              <li>• Refresh the homepage to see the updated address</li>
              <li>• Changes persist across browser sessions</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">⚠️ Important</h3>
            <ul className="text-sm text-yellow-300 space-y-1">
              <li>• This only updates the address in your browser's local storage</li>
              <li>• Other users will see the default address from config.json</li>
              <li>• To update for all users, edit frontend/public/config.json in GitHub</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
