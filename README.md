# Broadcast App

A modern React Native app for group chats and community management, designed to enhance the experience of communicating within larger groups. Whether it's for friends, communities, or professional teams, Broadcast provides a comprehensive platform for community engagement.

## 🎯 Why Broadcast

- **WhatsApp Alternative**: Replace WhatsApp for community communication
- **Community-Focused**: Designed specifically for communities that currently rely on WhatsApp
- **Reduced Telegram Dependency**: Avoid the overload and limitations of Telegram
- **Improved UX**: Correct the mistakes made by WhatsApp channels and communities
- **Web3 Integration**: Built with blockchain features for modern communities

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
- **On-chain Integration**: NFTs, swap, payments, and rewards
- **Social Integration**: Sync your Farcaster, Lens, and WhatsApp contacts
- **Wallet Support**: Embedded wallets or import existing Farcaster & Lens wallets
- **Developer Tools**: Enable tech to build features for communities

## 🚀 Implementation Status

### ✅ Completed Features

#### Community Management
- **Community List**: Browse and search through all available communities
- **Community Details**: View community information, posts, and member interactions
- **Community Creation**: Create new communities with name, description, and privacy settings
- **Post Creation**: Create posts within communities with text and image support

#### User Interface
- **Responsive Design**: Optimized for both iOS and Android
- **Navigation**: Intuitive tab-based navigation with dedicated community section
- **Search**: Real-time search functionality for communities
- **Pull-to-Refresh**: Update content with pull-to-refresh gestures

#### State Management
- **Redux Integration**: Centralized state management with Redux Toolkit
- **Async Operations**: Efficient data fetching with async thunks
- **Caching**: Smart caching for better performance

### 🔄 In Progress
- **Comment System**: UI ready, backend integration pending
- **Join/Leave Communities**: UI ready, backend integration pending
- **Post Interactions**: Like, share, and report functionality
- **Member Management**: Role-based permissions and member lists

### 📋 Planned Features
- **Post Management**: Edit, delete, and moderate posts
- **On-chain Features**: NFT integration, token rewards, and payments
- **Calendar Integration**: Event creation and management
- **Wallet Integration**: Embedded wallet and external wallet support
- **Social Sync**: Import contacts from Farcaster, Lens, and WhatsApp

## 🛠 Tech Stack

### Core Technologies
- **React Native** (0.79.3) - Cross-platform mobile development
- **TypeScript** (5.0.4) - Type-safe development
- **Redux Toolkit** (2.8.2) - State management
- **React Navigation** (7.x) - Navigation and routing

### Key Dependencies
- **@xmtp/react-native-sdk** (4.2.2) - Web3 messaging
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
├── screens/        # Screen components
├── navigation/     # Navigation configuration
├── store/          # Redux store and slices
├── types/          # TypeScript type definitions
├── hooks/          # Custom React hooks
└── constants/      # App constants and configuration
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
