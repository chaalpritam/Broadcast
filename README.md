# Broadcast App

A modern React Native app for group chats, community management, and Web3 integration, designed to enhance the experience of communicating within larger groups. Whether it's for friends, communities, or professional teams, Broadcast provides a comprehensive platform for community engagement with blockchain features.

## 🎯 Why Broadcast

- **WhatsApp Alternative**: Replace WhatsApp for community communication
- **Community-Focused**: Designed specifically for communities that currently rely on WhatsApp
- **Reduced Telegram Dependency**: Avoid the overload and limitations of Telegram
- **Improved UX**: Correct the mistakes made by WhatsApp channels and communities
- **Web3 Integration**: Built with blockchain features for modern communities
- **Wallet Integration**: Seamless MetaMask and WalletConnect support
- **AI Agents**: Intelligent agents for community management and automation

## ✨ Features

### Core Features
- **Community Management**: Create and manage communities like typical web3 communities
- **Role-Based Access**: Assign owners, admins, and moderators with different permissions
- **Threaded Discussions**: Take each messaging into separate threads for focused discussions
- **Disappearing Status**: Status with set time limits and rewards for early watchers
- **Reward System**: Reward watchers with USDC or other on-chain tokens
- **Calendar & Events**: Integrated calendar and events section for community activities
- **Community Rewards**: Make it rewarding for people to be active in communities

### Web3 Features
- **Wallet Integration**: MetaMask and WalletConnect support with deep linking
- **Multi-Chain Support**: Ethereum, Polygon, Mumbai, and Sepolia networks
- **On-chain Integration**: NFTs, swap, payments, and rewards
- **Social Integration**: Sync your Farcaster, Lens, and WhatsApp contacts
- **Developer Tools**: Enable tech to build features for communities

### AI & Automation
- **AI Agents**: Create and manage intelligent agents for community tasks
- **Agent Marketplace**: Browse and use community-created agents
- **Automated Responses**: Set up automated responses and actions
- **Smart Notifications**: AI-powered notification management

## 🚀 Implementation Status

### ✅ Completed Features

#### Core App Structure
- **Tab Navigation**: Chats, Status, Calendar, Wallets, and Agents tabs
- **Responsive Design**: Optimized for both iOS and Android
- **Navigation**: Intuitive tab-based navigation with dedicated sections
- **State Management**: Redux Toolkit integration with async operations

#### Wallet Integration
- **MetaMask Support**: Full MetaMask mobile integration with deep linking
- **WalletConnect Support**: QR code and deep link wallet connections
- **Multi-Chain Support**: Ethereum, Polygon, Mumbai, and Sepolia networks
- **Balance Fetching**: Real-time wallet balance updates
- **Network Switching**: Seamless network switching capabilities
- **Transaction Signing**: Secure transaction signing and sending

#### Community Features
- **Community List**: Browse and search through all available communities
- **Community Details**: View community information, posts, and member interactions
- **Community Creation**: Create new communities with name, description, and privacy settings
- **Post Creation**: Create posts within communities with text and image support

#### AI Agents
- **Agent Creation**: Create custom AI agents for community tasks
- **Agent Marketplace**: Browse and discover community agents
- **Agent Management**: Manage agent settings and permissions
- **Agent Interactions**: Interact with agents through chat interface

#### User Interface
- **Modern UI**: Clean, modern interface with consistent theming
- **Pull-to-Refresh**: Update content with pull-to-refresh gestures
- **Search**: Real-time search functionality for communities and agents
- **Settings**: Comprehensive settings and profile management

### 🔄 In Progress
- **Comment System**: UI ready, backend integration pending
- **Join/Leave Communities**: UI ready, backend integration pending
- **Post Interactions**: Like, share, and report functionality
- **Member Management**: Role-based permissions and member lists
- **XMTP Integration**: Real-time messaging with XMTP protocol

### 📋 Planned Features
- **Post Management**: Edit, delete, and moderate posts
- **On-chain Features**: NFT integration, token rewards, and payments
- **Calendar Integration**: Event creation and management
- **Social Sync**: Import contacts from Farcaster, Lens, and WhatsApp
- **Advanced Agents**: More sophisticated AI agent capabilities

## 🛠 Tech Stack

### Core Technologies
- **React Native** (0.79.3) - Cross-platform mobile development
- **TypeScript** (5.0.4) - Type-safe development
- **Redux Toolkit** (2.8.2) - State management
- **React Navigation** (7.x) - Navigation and routing

### Web3 & Wallet Integration
- **@metamask/sdk-react-native** (0.3.12) - MetaMask mobile SDK
- **@walletconnect/modal-react-native** (1.1.0) - WalletConnect integration
- **@xmtp/react-native-sdk** (4.2.2) - Web3 messaging
- **ethers** (6.14.3) - Ethereum library
- **react-native-crypto** (2.2.0) - Cryptographic functions
- **react-native-get-random-values** (1.11.0) - Random value generation

### Key Dependencies
- **@react-native-async-storage/async-storage** (2.1.2) - Local storage
- **react-native-gesture-handler** (2.25.0) - Touch gestures
- **react-native-reanimated** (3.18.0) - Animations
- **react-native-svg** (15.12.0) - Vector graphics
- **react-native-vector-icons** (10.2.0) - Icon library

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Metro** - Bundler

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- React Native CLI
- iOS: Xcode (for iOS development)
- Android: Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Broadcast
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run the app**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

### Wallet Setup

#### MetaMask Integration
1. Follow the [MetaMask Setup Guide](METAMASK_SETUP.md)
2. Configure deep linking for iOS and Android
3. Test wallet connection in the Wallets tab

#### WalletConnect Setup
1. Follow the [WalletConnect Setup Guide](WALLETCONNECT_SETUP.md)
2. Get a Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)
3. Update the configuration in `src/config/walletConnect.ts`

#### Deep Linking Configuration
1. Follow the [Deep Linking Setup Guide](DEEP_LINKING_SETUP.md)
2. Configure URL schemes for iOS and Android
3. Test deep linking functionality

### Development Scripts

```bash
# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run tests
npm test

# Lint code
npm run lint
```

## 📱 App Structure

```
src/
├── components/     # Reusable UI components
│   └── wallet/    # Wallet-related components
├── screens/        # Screen components
│   ├── ChatsScreen.tsx
│   ├── StatusScreen.tsx
│   ├── CalendarScreen.tsx
│   ├── WalletsScreen.tsx
│   ├── AgentsScreen.tsx
│   └── ...        # Other screens
├── navigation/     # Navigation configuration
├── store/          # Redux store and slices
├── types/          # TypeScript type definitions
├── hooks/          # Custom React hooks
├── services/       # API and service functions
├── config/         # App configuration
└── constants/      # App constants and theme
```

## 🔧 Configuration

### Wallet Configuration
- **MetaMask**: Configured in `src/config/metamask.ts`
- **WalletConnect**: Configured in `src/config/walletConnect.ts`
- **Deep Linking**: Configured in `src/config/deepLinking.ts`

### Supported Networks
- **Ethereum Mainnet** (Chain ID: 1)
- **Polygon** (Chain ID: 137)
- **Mumbai Testnet** (Chain ID: 80001)
- **Sepolia Testnet** (Chain ID: 11155111)

## 🐛 Troubleshooting

### Common Issues
- **Wallet Connection Issues**: Check the [Troubleshooting Guide](TROUBLESHOOTING_CRASH.md)
- **Deep Linking Problems**: Verify URL schemes in iOS and Android configs
- **Build Errors**: Ensure all dependencies are properly installed

### Debug Mode
Enable debug logging for wallet connections and deep linking:
```typescript
// In your app initialization
if (__DEV__) {
  console.log('Debug Mode Enabled');
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [React Native Documentation](https://reactnative.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [MetaMask SDK Documentation](https://docs.metamask.io/guide/metamask-sdk.html)
- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [XMTP Documentation](https://xmtp.org/docs)

## 📚 Additional Documentation

- [MetaMask Setup Guide](METAMASK_SETUP.md)
- [WalletConnect Setup Guide](WALLETCONNECT_SETUP.md)
- [Deep Linking Setup Guide](DEEP_LINKING_SETUP.md)
- [Troubleshooting Guide](TROUBLESHOOTING_CRASH.md)
