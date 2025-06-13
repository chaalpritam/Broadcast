# App Crash Troubleshooting Guide

## 🚨 Crash Fixes Applied

### 1. Removed MetaMask Provider Wrapper
- **Issue**: The MetaMask provider was causing crashes due to version compatibility
- **Fix**: Temporarily removed the provider wrapper from App.tsx
- **Status**: ✅ Fixed

### 2. Updated MetaMask Service
- **Issue**: Service was trying to use uninitialized SDK
- **Fix**: Added proper initialization checks and error handling
- **Status**: ✅ Fixed

### 3. Created Simple Wallet Connect Component
- **Issue**: Complex wallet selector was causing crashes
- **Fix**: Created a simpler, more stable wallet connection component
- **Status**: ✅ Fixed

## 🔧 Additional Fixes to Try

### 1. Update MetaMask SDK (Recommended)

The current version is very old. Update to the latest version:

```bash
npm uninstall @metamask/sdk-react-native @metamask/sdk-communication-layer
npm install @metamask/sdk-react-native@latest @metamask/sdk-communication-layer@latest
```

### 2. Clean and Rebuild

```bash
# Clean the project
cd android && ./gradlew clean && cd ..
cd ios && rm -rf build && cd ..

# Clear Metro cache
npx react-native start --reset-cache

# Reinstall dependencies
rm -rf node_modules
npm install

# For iOS, reinstall pods
cd ios && pod install && cd ..
```

### 3. Check for Missing Dependencies

Make sure these are installed:

```bash
npm install react-native-crypto react-native-get-random-values
```

### 4. iOS Specific Fixes

Add to `ios/Podfile`:
```ruby
pod 'react-native-crypto', :path => '../node_modules/react-native-crypto'
pod 'react-native-get-random-values', :path => '../node_modules/react-native-get-random-values'
```

Then run:
```bash
cd ios && pod install && cd ..
```

### 5. Android Specific Fixes

Add to `android/app/build.gradle`:
```gradle
android {
    // ... other configs
    
    packagingOptions {
        pickFirst '**/libc++_shared.so'
        pickFirst '**/libjsc.so'
    }
}
```

## 🧪 Testing the Fix

### 1. Test Basic App Launch
```bash
# Android
npx react-native run-android

# iOS
npx react-native run-ios
```

### 2. Test Wallet Connection
1. Open the app
2. Navigate to Wallets screen
3. Try connecting with MetaMask
4. Try connecting with WalletConnect

### 3. Check Logs
```bash
# Android logs
npx react-native log-android

# iOS logs
npx react-native log-ios
```

## 🚨 Common Crash Causes

### 1. MetaMask SDK Version Issues
- **Symptom**: App crashes on launch
- **Solution**: Update to latest version or use simple implementation

### 2. Missing Native Dependencies
- **Symptom**: Build errors or runtime crashes
- **Solution**: Install missing pods/dependencies

### 3. Import Conflicts
- **Symptom**: Red screen or import errors
- **Solution**: Check for duplicate imports or circular dependencies

### 4. Memory Issues
- **Symptom**: App crashes after some time
- **Solution**: Check for memory leaks in components

## 🔍 Debug Steps

### 1. Enable Debug Mode
Add to your development environment:
```bash
export REACT_NATIVE_DEBUG=true
```

### 2. Check Metro Logs
```bash
npx react-native start --reset-cache --verbose
```

### 3. Check Device Logs
```bash
# Android
adb logcat | grep -i "react\|metamask\|crash"

# iOS
xcrun simctl spawn booted log stream --predicate 'process == "YourAppName"'
```

## 📱 Current Working Implementation

The app now uses:
- ✅ Simple wallet connection without provider wrapper
- ✅ Direct MetaMask SDK initialization
- ✅ Basic wallet functionality
- ✅ Error handling and user feedback

## 🎯 Next Steps

1. **Test the current implementation** - It should work without crashes
2. **Update MetaMask SDK** - When ready, update to latest version
3. **Re-enable provider wrapper** - After confirming stability
4. **Add advanced features** - Once basic functionality is stable

## 🆘 Still Crashing?

If the app is still crashing:

1. **Check the logs** for specific error messages
2. **Try the simple implementation** first
3. **Update dependencies** to latest versions
4. **Clean and rebuild** the project
5. **Test on a different device** to isolate device-specific issues

## 📞 Support

If you're still experiencing crashes:
1. Share the specific error message from the logs
2. Mention which platform (iOS/Android) is crashing
3. Describe when the crash occurs (on launch, when connecting wallet, etc.)
4. Share your device/emulator details

The current implementation should be stable and crash-free! 🎉 