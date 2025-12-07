import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DocsPage from './pages/DocsPage';
import AgentPage from './pages/AgentPage';
import StakingPage from './pages/StakingPage';
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailPage from './pages/ProductDetailPage';
import EnhancedAgentBuilderPage from './pages/EnhancedAgentBuilderPage';
import BackgroundDemoPage from './pages/BackgroundDemoPage';
import PlatformPanelPage from './pages/PlatformPanelPage';
import UserPanelPage from './pages/UserPanelPage';
import WalletConnectionModal from './components/WalletConnectionModal';

function App() {
  const location = useLocation();
  const [walletState, setWalletState] = useState({
    connected: false,
    address: null as string | null,
  });
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if ('solana' in window) {
      const solana = (window as any).solana;
      if (solana?.isPhantom && solana.isConnected) {
        const publicKey = solana.publicKey.toString();
        setWalletState({
          connected: true,
          address: truncateAddress(publicKey),
        });
      }
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnectWallet = () => {
    setShowWalletModal(true);
  };

  const handleWalletConnect = (connected: boolean, address: string | null) => {
    setWalletState({ connected, address });
  };

  const hideFooterPaths = ['/agent', '/agent/builder', '/dashboard/platform', '/dashboard/user', '/demo/background'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname) && !location.pathname.startsWith('/marketplace/');

  return (
    <div className="min-h-screen bg-white">
      <Header
        walletState={walletState}
        onConnectWallet={handleConnectWallet}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/agent" element={<AgentPage />} />
          <Route path="/agent/builder" element={<EnhancedAgentBuilderPage />} />
          <Route path="/staking" element={<StakingPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/:id" element={<ProductDetailPage />} />
          <Route path="/dashboard/platform" element={<PlatformPanelPage />} />
          <Route path="/dashboard/user" element={<UserPanelPage />} />
          <Route path="/demo/background" element={<BackgroundDemoPage />} />
        </Routes>
      </main>

      {shouldShowFooter && <Footer />}

      <WalletConnectionModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleWalletConnect}
      />
    </div>
  );
}

export default App;
