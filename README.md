# 🚀 Fidolity - AI Agent Marketplace on Solana

<div align="center">

![Fidolity Logo](frontend/public/fidolity-logo.png)

**Enabling machines to operate in an autonomous economy**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solana](https://img.shields.io/badge/Solana-Blockchain-blueviolet)](https://solana.com)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF)](https://vitejs.dev/)

[Live Demo](https://fidolity.com) • [Documentation](#documentation) • [Report Bug](https://github.com/fidolity/fidolity/issues) • [Request Feature](https://github.com/fidolity/fidolity/issues)

</div>

---

## 📖 About Fidolity

Fidolity is a decentralized AI agent marketplace built on the Solana blockchain. It enables users to create, deploy, and monetize AI agents in an autonomous economy. From users to AI agents, from AI agents to robots - Fidolity bridges the gap between human intelligence and machine automation.

### ✨ Key Features

- **🤖 AI Agent Marketplace** - Discover, purchase, and deploy AI agents
- **💰 Token Staking** - Stake FDLT tokens and earn rewards from platform fees
- **🏗️ Agent Builder** - Create and customize your own AI agents
- **💳 Solana Integration** - Fast, low-cost transactions on Solana blockchain
- **🔐 Web3 Wallet Support** - Connect with Phantom, Solflare, and other Solana wallets
- **📊 Analytics Dashboard** - Track your agent performance and earnings
- **🎯 X402 Protocol** - Deploy agents as autonomous services

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - Modern UI library
- **TypeScript 5.9** - Type-safe development
- **Vite 5.4** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **Lucide React** - Beautiful icons

### Blockchain
- **Solana Web3.js** - Solana blockchain integration
- **Helius RPC** - High-performance Solana RPC endpoint

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and Yarn
- Git
- A Solana wallet (Phantom recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fidolity/fidolity.git
   cd fidolity
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   VITE_HELIUS_RPC_URL=your_helius_rpc_url
   ```

4. **Run the development server**
   ```bash
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### Building for Production

```bash
cd frontend
yarn build
```

The production-ready files will be in `frontend/dist/`.

### Deploying

Deploy the `dist/` folder to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- IPFS

---

## 📁 Project Structure

```
fidolity/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   ├── fidolity-logo.png
│   │   └── ...
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── TokenAddressDisplay.tsx
│   │   │   └── ...
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── StakingPage.tsx
│   │   │   ├── MarketplacePage.tsx
│   │   │   └── ...
│   │   ├── services/        # Blockchain services
│   │   │   ├── solana.ts
│   │   │   ├── staking.ts
│   │   │   └── ...
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   ├── vite.config.ts       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS config
│   └── package.json
├── docs/                    # Documentation
├── scripts/                 # Utility scripts
└── README.md
```

---

## 🎮 Features

### 🤖 AI Agent Marketplace

Browse and purchase AI agents created by the community. Each agent is:
- Fully autonomous
- Blockchain-verified
- Revenue-generating
- Customizable

### 💰 Staking System

Stake your FDLT tokens to:
- Earn passive income from platform fees
- Access premium features
- Participate in governance
- Current APY: **26.18%** (Boosted: **45.42%**)

### 🏗️ Agent Builder

Create your own AI agents with:
- Visual drag-and-drop interface
- Pre-built templates
- Custom API integrations
- One-click deployment

### 🔐 Web3 Integration

- Connect Solana wallets (Phantom, Solflare, etc.)
- Sign transactions securely
- Track on-chain activity
- View transaction history

---

## 🌐 Utilities

### Fidolity Agent
AI-powered conversational agent for platform assistance.

### Fidolity Marketplace
Browse and purchase AI agents from the community.

### Fidolity Agent Builder
Create and deploy your own AI agents.

### Fidolity SDK
Developer tools for building on Fidolity.

### Fidolity Facilitator
Manage agent deployments and operations.

### Fidolity X402 Creator
Deploy agents as X402 protocol services.

---

## 💎 Token Information

**Token Name:** Fidolity Token  
**Token Symbol:** FDLT  
**Blockchain:** Solana  
**Contract Address:** Coming soon

### 🔄 Updating Token Address

You can update the token address **without redeploying**! Just edit:
```
frontend/public/config.json
```

See the [complete guide](docs/updating-token-address.md) for step-by-step instructions.

---

## 📚 Documentation

### For Users
- [Getting Started Guide](docs/getting-started.md)
- [How to Stake](docs/staking-guide.md)
- [Buying Agents](docs/marketplace-guide.md)
- [Wallet Setup](docs/wallet-setup.md)

### For Developers
- [API Documentation](docs/api.md)
- [Building Agents](docs/building-agents.md)
- [SDK Reference](docs/sdk-reference.md)
- [Contributing Guide](CONTRIBUTING.md)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please [open an issue](https://github.com/fidolity/fidolity/issues).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Website:** [fidolity.com](https://fidolity.com)
- **Twitter:** [@fidolitydotfun](https://x.com/fidolitydotfun)
- **GitHub:** [github.com/fidolity](https://github.com/fidolity)
- **Discord:** [Join our community](https://discord.gg/fidolity)
- **Documentation:** [docs.fidolity.com](https://docs.fidolity.com)

---

## 🙏 Acknowledgments

- Built on [Solana](https://solana.com)
- Powered by [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons by [Lucide](https://lucide.dev)

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/fidolity/fidolity?style=social)
![GitHub forks](https://img.shields.io/github/forks/fidolity/fidolity?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/fidolity/fidolity?style=social)

---

<div align="center">

**Made with ❤️ by the Fidolity Team**

*Enabling machines to operate in an autonomous economy*

</div>
