import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useWalletXMTP } from '../../hooks';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

interface WalletConnectButtonProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
  style?: any;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  onConnect,
  onDisconnect,
  style,
}) => {
  const { wallet, connectWallet, disconnectWallet } = useWalletXMTP();

  const handlePress = async () => {
    try {
      if (wallet.isConnected) {
        await disconnectWallet();
        onDisconnect?.();
      } else {
        await connectWallet();
        onConnect?.();
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  const getButtonText = () => {
    if (wallet.isConnecting) return 'Connecting...';
    if (wallet.isConnected) return 'Disconnect Wallet';
    return 'Connect Wallet';
  };

  const getButtonIcon = () => {
    if (wallet.isConnecting) return 'hourglass-outline';
    if (wallet.isConnected) return 'wallet';
    return 'wallet-outline';
  };

  const getButtonColor = () => {
    if (wallet.isConnecting) return COLORS.gray;
    if (wallet.isConnected) return COLORS.success;
    return COLORS.primary;
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: getButtonColor() }, style]}
      onPress={handlePress}
      disabled={wallet.isConnecting}
      activeOpacity={0.7}
    >
      {wallet.isConnecting ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <Icon name={getButtonIcon()} size={20} color={COLORS.white} />
      )}
      <Text style={styles.buttonText}>{getButtonText()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.base * 1.5,
    borderRadius: SIZES.base,
    gap: SIZES.base,
  },
  buttonText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.white,
  },
});

export default WalletConnectButton; 