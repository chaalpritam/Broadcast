import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useWalletXMTP } from '../../hooks';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

interface WalletInfoProps {
  onDisconnect?: () => void;
  onRefresh?: () => void;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ onDisconnect, onRefresh }) => {
  const { wallet, disconnectWallet, fetchBalance } = useWalletXMTP();

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      onDisconnect?.();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const handleRefresh = async () => {
    try {
      await fetchBalance();
      onRefresh?.();
    } catch (error) {
      console.error('Error refreshing balance:', error);
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

  if (!wallet.isConnected) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusIndicator}>
          <Icon name="radio-button-on" size={12} color={COLORS.success} />
          <Text style={styles.statusText}>Connected</Text>
        </View>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Icon name="refresh-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.addressSection}>
        <Text style={styles.label}>Address</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{formatAddress(wallet.address!)}</Text>
          <TouchableOpacity style={styles.copyButton}>
            <Icon name="copy-outline" size={16} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>

      {wallet.chainId && (
        <View style={styles.networkSection}>
          <Text style={styles.label}>Network</Text>
          <Text style={styles.network}>{getNetworkName(wallet.chainId)}</Text>
        </View>
      )}

      {wallet.balance && (
        <View style={styles.balanceSection}>
          <Text style={styles.label}>Balance</Text>
          <Text style={styles.balance}>{wallet.balance} ETH</Text>
        </View>
      )}

      <TouchableOpacity onPress={handleDisconnect} style={styles.disconnectButton}>
        <Icon name="log-out-outline" size={20} color={COLORS.error} />
        <Text style={styles.disconnectText}>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SIZES.base * 2,
    borderRadius: SIZES.base * 2,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base * 2,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.base / 2,
  },
  statusText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.small,
    color: COLORS.success,
  },
  refreshButton: {
    padding: SIZES.base / 2,
  },
  addressSection: {
    marginBottom: SIZES.base * 2,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: SIZES.base / 2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  address: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    flex: 1,
  },
  copyButton: {
    padding: SIZES.base / 2,
  },
  networkSection: {
    marginBottom: SIZES.base * 2,
  },
  network: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  balanceSection: {
    marginBottom: SIZES.base * 2,
  },
  balance: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
  },
  disconnectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.base,
    borderRadius: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.error,
    gap: SIZES.base / 2,
  },
  disconnectText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.error,
  },
});

export default WalletInfo; 