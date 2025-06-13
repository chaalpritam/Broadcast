import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/store';
// import { MetaMaskProvider } from './src/components/wallet/MetaMaskProvider';
import { linking } from './src/config/deepLinking';
// import DummyScreen from './src/screens/DummyScreen';
import MainNavigator from './src/navigation/MainNavigator';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      {/* Temporarily removed MetaMaskProvider to fix crash */}
      {/* <MetaMaskProvider> */}
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <NavigationContainer linking={linking}>
              <MainNavigator />
              {/* <DummyScreen /> */}
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      {/* </MetaMaskProvider> */}
    </Provider>
  );
}

export default App;
