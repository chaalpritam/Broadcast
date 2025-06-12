# WalletConnect Setup Guide

This guide will help you set up WalletConnect for real wallet connections in your Broadcast app.

## 🚀 Quick Setup

### 1. Get a WalletConnect Project ID

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up or log in to your account
3. Create a new project
4. Copy your Project ID

### 2. Update Configuration

Open `src/config/walletConnect.ts` and replace `YOUR_PROJECT_ID` with your actual project ID:

```typescript
export const WALLET_CONNECT_CONFIG = {
  projectId: 'your-actual-project-id-here', // Replace this
  // ... rest of config
};
```

### 3. Test the Integration

The wallet service is now configured to use WalletConnect. When users tap "Connect Wallet", they will see:

- **QR Code**: For desktop wallet connections
- **Deep Link**: For mobile wallet connections
- **Wallet Selection**: Users can choose from supported wallets

## 🔧 Supported Wallets

WalletConnect supports hundreds of wallets including:

- **MetaMask**
- **Rainbow Wallet**
- **Coinbase Wallet**
- **Trust Wallet**
- **Argent**
- **And many more...**

## 🌐 Supported Networks

The app is configured to support:

- **Ethereum Mainnet** (Chain ID: 1)
- **Polygon** (Chain ID: 137)
- **Mumbai Testnet** (Chain ID: 80001)
- **Sepolia Testnet** (Chain ID: 11155111)

## 📱 Features

### Real Wallet Connection
- ✅ Connect to any WalletConnect-compatible wallet
- ✅ Multi-chain support
- ✅ Real balance fetching
- ✅ Network switching
- ✅ Transaction signing

### User Experience
- ✅ QR code scanning for desktop
- ✅ Deep linking for mobile
- ✅ Automatic wallet detection
- ✅ Connection status indicators

## 🛠 Development Notes

### Current Implementation
- Uses WalletConnect v2 Sign Client
- Supports EIP-155 standard
- Includes both required and optional namespaces
- Handles session management

### Mock Fallback
If WalletConnect fails, the app falls back to a mock implementation to prevent crashes.

### Error Handling
- Connection failures
- Network switching errors
- Balance fetching errors
- User rejection handling

## 🔄 Next Steps

1. **Get Project ID**: Complete the WalletConnect Cloud setup
2. **Test Connection**: Try connecting with different wallets
3. **Add XMTP**: Integrate real XMTP messaging
4. **Deploy**: Test on real devices

## 📚 Resources

- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [WalletConnect Cloud](https://cloud.walletconnect.com/)
- [Supported Wallets](https://explorer.walletconnect.com/)
- [React Native SDK](https://github.com/WalletConnect/walletconnect-react-native)

## 🐛 Troubleshooting

### Common Issues

1. **"Project ID not found"**
   - Make sure you've updated the project ID in the config file
   - Verify your WalletConnect Cloud project is active

2. **"No wallets found"**
   - Ensure the user has a WalletConnect-compatible wallet installed
   - Check that the wallet supports the required methods

3. **"Connection failed"**
   - Check network connectivity
   - Verify the wallet app is open and ready to connect

### Debug Mode

Enable debug logging by adding this to your app:

```typescript
// In your app initialization
if (__DEV__) {
  console.log('WalletConnect Debug Mode Enabled');
}
```

## 🎉 Success!

Once configured, your app will have real wallet connectivity with:
- Professional wallet connection flow
- Multi-chain support
- Real-time balance updates
- Secure transaction signing

Users can now connect their real wallets and interact with your app's Web3 features! 