# MetaMask Integration Setup Guide

This guide will help you set up MetaMask integration in the Broadcast React Native app.

## Prerequisites

1. **MetaMask Mobile App**: Users need to have the MetaMask mobile app installed on their device
2. **React Native Environment**: Make sure you have React Native development environment set up
3. **Dependencies**: The following packages should be installed:

```bash
npm install @metamask/sdk-react-native @metamask/sdk-communication-layer react-native-crypto react-native-get-random-values
```

## Installation Steps

### 1. Install Dependencies

```bash
npm install @metamask/sdk-react-native @metamask/sdk-communication-layer react-native-crypto react-native-get-random-values --save
```

### 2. iOS Setup

For iOS, you need to add the following to your `ios/Podfile`:

```ruby
pod 'react-native-crypto', :path => '../node_modules/react-native-crypto'
pod 'react-native-get-random-values', :path => '../node_modules/react-native-get-random-values'
```

Then run:
```bash
cd ios && pod install
```

### 3. Android Setup

For Android, add the following to your `android/app/build.gradle`:

```gradle
android {
    // ... other configs
    
    packagingOptions {
        pickFirst '**/libc++_shared.so'
        pickFirst '**/libjsc.so'
    }
}
```

### 4. Configure Deep Linking

#### iOS (Info.plist)
Add the following to your `ios/YourApp/Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>metamask</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>metamask</string>
        </array>
    </dict>
</array>
```

#### Android (AndroidManifest.xml)
Add the following to your `android/app/src/main/AndroidManifest.xml`:

```xml
<activity>
    <!-- ... other activity attributes -->
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="metamask" />
    </intent-filter>
</activity>
```

## Usage

### 1. Wrap Your App with MetaMask Provider

In your main App component:

```tsx
import { MetaMaskProvider } from './src/components/wallet/MetaMaskProvider';

const App = () => {
  return (
    <MetaMaskProvider>
      {/* Your app components */}
    </MetaMaskProvider>
  );
};
```

### 2. Use the Wallet Hook

```tsx
import { useWalletXMTP } from './src/hooks/useWalletXMTP';

const MyComponent = () => {
  const { wallet, connectWallet, disconnectWallet } = useWalletXMTP();

  const handleConnect = async () => {
    try {
      await connectWallet('metamask'); // or 'walletconnect'
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  return (
    <View>
      {wallet.isConnected ? (
        <Text>Connected: {wallet.address}</Text>
      ) : (
        <Button title="Connect MetaMask" onPress={handleConnect} />
      )}
    </View>
  );
};
```

### 3. Use the Wallet Selector

```tsx
import WalletSelector from './src/components/wallet/WalletSelector';

const WalletScreen = () => {
  const [showSelector, setShowSelector] = useState(false);
  const { connectWallet } = useWalletXMTP();

  const handleWalletSelect = (walletType: 'metamask' | 'walletconnect') => {
    connectWallet(walletType);
  };

  return (
    <View>
      <Button title="Connect Wallet" onPress={() => setShowSelector(true)} />
      <WalletSelector
        isVisible={showSelector}
        onClose={() => setShowSelector(false)}
        onWalletSelect={handleWalletSelect}
      />
    </View>
  );
};
```

## Features

### Supported Networks
- Ethereum Mainnet (Chain ID: 1)
- Polygon (Chain ID: 137)
- Mumbai Testnet (Chain ID: 80001)
- Sepolia Testnet (Chain ID: 11155111)

### Available Methods
- `connectWallet(walletType)`: Connect to MetaMask or WalletConnect
- `disconnectWallet()`: Disconnect from wallet
- `getBalance(address)`: Get wallet balance
- `switchNetwork(chainId)`: Switch to different network
- `signMessage(message)`: Sign a message
- `sendTransaction(transaction)`: Send a transaction

### Event Listeners
- `onAccountsChanged`: Listen for account changes
- `onChainChanged`: Listen for network changes

## Configuration

### MetaMask Configuration

The MetaMask configuration is located in `src/config/metamask.ts`:

```typescript
export const METAMASK_CONFIG = {
  sdkOptions: {
    dappMetadata: {
      name: 'Broadcast App',
      url: 'https://broadcast.app',
      iconUrl: 'https://broadcast.app/icon.png',
    },
    logging: __DEV__ ? 'debug' : 'error',
    communicationLayerPreference: 'socket',
    enableDebug: __DEV__,
  },
  // ... network configurations
};
```

### Customizing Networks

To add or modify supported networks, update the `supportedNetworks` array in the configuration:

```typescript
supportedNetworks: [
  {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://your-rpc-url.com'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  // Add more networks...
]
```

## Troubleshooting

### Common Issues

1. **"MetaMask not installed" error**
   - Ensure MetaMask mobile app is installed on the device
   - Check that deep linking is properly configured

2. **Connection fails**
   - Verify MetaMask app is unlocked
   - Check network connectivity
   - Ensure the app has proper permissions

3. **Deep linking not working**
   - Verify URL schemes are correctly configured
   - Test with a simple deep link first
   - Check device logs for errors

4. **Build errors**
   - Clean and rebuild the project
   - Check that all dependencies are properly linked
   - Verify pod installation for iOS

### Debug Mode

Enable debug mode by setting `enableDebug: true` in the MetaMask configuration. This will provide additional logging information.

## Security Considerations

1. **Never store private keys**: The app never has access to private keys
2. **Use secure RPC endpoints**: Configure your own RPC endpoints for production
3. **Validate transactions**: Always validate transaction details before signing
4. **Handle errors gracefully**: Implement proper error handling for all wallet operations

## Testing

### Test Networks
- Use Mumbai testnet for Polygon testing
- Use Sepolia testnet for Ethereum testing
- Get test tokens from faucets

### Test Scenarios
1. Connect/disconnect wallet
2. Switch networks
3. Sign messages
4. Send transactions
5. Handle connection errors
6. Test deep linking

## Support

For issues related to:
- **MetaMask SDK**: Check the [official documentation](https://docs.metamask.io/guide/metamask-sdk.html)
- **React Native**: Check the [React Native documentation](https://reactnative.dev/)
- **Broadcast App**: Check the app's documentation or create an issue

## Next Steps

1. Implement transaction history
2. Add support for more networks
3. Implement token transfers
4. Add wallet backup/restore functionality
5. Implement multi-signature support 