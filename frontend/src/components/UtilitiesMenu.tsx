import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface UtilitiesMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UtilitiesMenu({ isOpen, onClose }: UtilitiesMenuProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    let clickListenerAttached = false;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.getElementById('utilities-menu');
      const target = e.target as Node;

      if (menu && !menu.contains(target)) {
        const isUtilitiesButton = (target as Element).closest('[aria-label="Open utilities menu"]');
        if (!isUtilitiesButton) {
          onClose();
        }
      }
    };

    // Attach keyboard listener immediately
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    // Delay attaching click listener using requestAnimationFrame for better timing
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
        clickListenerAttached = true;
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('keydown', handleEscape);
      if (clickListenerAttached) {
        document.removeEventListener('mousedown', handleClickOutside, true);
      }
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const menuItems = [
    { name: 'FDLT AGENT', color: '#FF4D00', path: '/agent' },
    { name: 'FDLT MARKETPLACE', color: '#FF4D00', path: '/marketplace' },
    { name: 'FDLT AGENT BUILDER', color: '#FF4D00', path: '/agent/builder' },
    { name: 'FDLT STAKING', color: '#FF4D00', path: '/staking' },
    { name: 'FDLT PLUG', color: '#000000', path: null },
    { name: 'FDLT SDK', color: '#000000', path: null },
    { name: 'FDLT FACILITATOR', color: '#000000', path: null },
    { name: 'FDLT X402 CREATOR', color: '#000000', path: null },
  ];

  const panelItems = [
    { name: 'USER PANEL', color: '#FF4D00', path: '/dashboard/user' },
    { name: 'PLATFORM PANEL', color: '#FF4D00', path: '/dashboard/platform' },
  ];

  const handleNavigateClick = (path: string | null) => {
    if (path) {
      navigate(path);
      setTimeout(() => {
        onClose();
      }, 50);
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Slide-in menu */}
      <div
        id="utilities-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="utilities-menu-title"
        className={`fixed top-0 right-0 h-full bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '370px', maxWidth: '90vw' }}
      >
        {/* Menu content */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2
                id="utilities-menu-title"
                className="text-lg font-everett-mono tracking-wide"
              >
                Fidolity Utilities
              </h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-black transition-colors p-1"
                aria-label="Close utilities menu"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Menu items */}
          <nav className="flex-1 overflow-y-auto py-8">
            <ul className="space-y-6 px-8">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigateClick(item.path)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNavigateClick(item.path);
                      }
                    }}
                    className="block text-sm font-everett-mono tracking-wide hover:opacity-80 transition-opacity text-left w-full"
                    style={{ color: item.color, cursor: item.path ? 'pointer' : 'default' }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-8 px-8">
              <hr className="border-t border-gray-900" />
            </div>

            {/* Panel items */}
            <ul className="space-y-6 px-8">
              {panelItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigateClick(item.path)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNavigateClick(item.path);
                      }
                    }}
                    className="block text-sm font-everett-mono tracking-wide hover:opacity-80 transition-opacity text-left w-full"
                    style={{ color: item.color, cursor: item.path ? 'pointer' : 'default' }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
