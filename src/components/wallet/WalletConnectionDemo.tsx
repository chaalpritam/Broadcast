import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useWalletXMTP } from '../../hooks/useWalletXMTP';
import WalletSelector from './WalletSelector';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const WalletConnectionDemo: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet, fetchBalance, getWalletType } = useWalletXMTP();
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletConnect = async (walletType: 'metamask' | 'walletconnect') => {
    setIsConnecting(true);
    try {
      await connectWallet(walletType);
      Alert.alert('Success', `Connected to ${walletType}!`);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleWalletDisconnect = async () => {
    try {
      await disconnectWallet();
      Alert.alert('Success', 'Wallet disconnected!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to disconnect wallet');
    }
  };

  const handleRefreshBalance = async () => {
    try {
      await fetchBalance();
      Alert.alert('Success', 'Balance refreshed!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to refresh balance');
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 137:
        return 'Polygon';
      case 80001:
        return 'Mumbai Testnet';
      case 11155111:
        return 'Sepolia Testnet';
      default:
        return `Chain ID: ${chainId}`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet Connection Demo</Text>
      
      {/* Connection Status */}
      <View style={styles.statusSection}>
        <Text style={styles.sectionTitle}>Connection Status</Text>
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Icon 
              name={wallet.isConnected ? "checkmark-circle" : "close-circle"} 
              size={24} 
              color={wallet.isConnected ? COLORS.success : COLORS.error} 
            />
            <Text style={[styles.statusText, { color: wallet.isConnected ? COLORS.success : COLORS.error }]}>
              {wallet.isConnected ? 'Connected' : 'Not Connected'}
            </Text>
          </View>
          
          {wallet.isConnected && (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Wallet Type:</Text>
                <Text style={styles.value}>{getWalletType()}</Text>
              </View>
              
              {wallet.address && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Address:</Text>
                  <Text style={styles.value}>{formatAddress(wallet.address)}</Text>
                </View>
              )}
              
              {wallet.chainId && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Network:</Text>
                  <Text style={styles.value}>{getNetworkName(wallet.chainId)}</Text>
                </View>
              )}
              
              {wallet.balance && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Balance:</Text>
                  <Text style={styles.value}>{wallet.balance} ETH</Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <Text style={styles.sectionTitle}>Actions</Text>
        
        {!wallet.isConnected ? (
          <TouchableOpacity
            style={[styles.button, styles.connectButton]}
            onPress={() => setShowWalletSelector(true)}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Icon name="wallet-outline" size={20} color={COLORS.white} />
            )}
            <Text style={styles.buttonText}>
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.refreshButton]}
              onPress={handleRefreshBalance}
            >
              <Icon name="refresh-outline" size={20} color={COLORS.primary} />
              <Text style={[styles.buttonText, { color: COLORS.primary }]}>
                Refresh Balance
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.disconnectButton]}
              onPress={handleWalletDisconnect}
            >
              <Icon name="log-out-outline" size={20} color={COLORS.error} />
              <Text style={[styles.buttonText, { color: COLORS.error }]}>
                Disconnect
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Error Display */}
      {wallet.error && (
        <View style={styles.errorSection}>
          <Text style={styles.sectionTitle}>Error</Text>
          <View style={styles.errorCard}>
            <Icon name="warning-outline" size={20} color={COLORS.error} />
            <Text style={styles.errorText}>{wallet.error}</Text>
          </View>
        </View>
      )}

      {/* Wallet Selector Modal */}
      <WalletSelector
        isVisible={showWalletSelector}
        onClose={() => setShowWalletSelector(false)}
        onWalletSelect={handleWalletConnect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.background,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
  },
  statusSection: {
    marginBottom: SIZES.padding * 2,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginBottom: SIZES.padding,
  },
  statusCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  statusText: {
    ...FONTS.body2,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  value: {
    ...FONTS.body3,
    color: COLORS.black,
    fontWeight: '500',
  },
  actionSection: {
    marginBottom: SIZES.padding * 2,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: SIZES.padding,
    borderRadius: 8,
    minHeight: 48,
  },
  connectButton: {
    backgroundColor: COLORS.primary,
  },
  buttonGroup: {
    gap: SIZES.padding,
  },
  refreshButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disconnectButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  buttonText: {
    ...FONTS.body2,
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorSection: {
    marginBottom: SIZES.padding,
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.error + '10',
    borderRadius: 8,
    padding: SIZES.padding,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  },
  errorText: {
    ...FONTS.body3,
    color: COLORS.error,
    marginLeft: 8,
    flex: 1,
  },
});

export default WalletConnectionDemo; 