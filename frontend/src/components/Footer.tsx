import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Fidolity</h3>
            <p className="text-sm text-gray-600">
              Enabling machines to operate in an autonomous economy.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase">Fidolity Utilities</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  to="/agent"
                  className="hover:text-gray-900 transition-colors"
                >
                  Fidolity Agent
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace"
                  className="hover:text-gray-900 transition-colors"
                >
                  Fidolity Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to="/agent/builder"
                  className="hover:text-gray-900 transition-colors"
                >
                  Fidolity Agent Builder
                </Link>
              </li>
              <li>Fidolity SDK</li>
              <li>Fidolity Facilitator</li>
              <li>Fidolity X402 Creator</li>
              <li>
                <Link
                  to="/dashboard/user"
                  className="hover:text-gray-900 transition-colors"
                >
                  User Panel
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/platform"
                  className="hover:text-gray-900 transition-colors"
                >
                  Platform Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <a
                href="https://x.com/fidolity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com/fidolity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github size={20} />
              </a>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>© 2024 Fidolity</span>
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
