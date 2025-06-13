import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

interface WalletSelectorProps {
  onWalletSelect: (walletType: 'metamask' | 'walletconnect') => void;
  isVisible: boolean;
  onClose: () => void;
}

const WalletSelector: React.FC<WalletSelectorProps> = ({
  onWalletSelect,
  isVisible,
  onClose,
}) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletSelect = async (walletType: 'metamask' | 'walletconnect') => {
    setIsConnecting(true);
    try {
      onWalletSelect(walletType);
      onClose();
    } catch (error) {
      Alert.alert(
        'Connection Error',
        error instanceof Error ? error.message : 'Failed to connect wallet'
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const WalletOption = ({
    title,
    description,
    icon,
    walletType,
    isRecommended = false,
  }: {
    title: string;
    description: string;
    icon: string;
    walletType: 'metamask' | 'walletconnect';
    isRecommended?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.walletOption, isRecommended && styles.recommendedOption]}
      onPress={() => handleWalletSelect(walletType)}
      disabled={isConnecting}
      activeOpacity={0.7}
    >
      <View style={styles.walletOptionContent}>
        <View style={styles.walletIconContainer}>
          <Icon name={icon} size={32} color={COLORS.primary} />
        </View>
        <View style={styles.walletInfo}>
          <View style={styles.walletHeader}>
            <Text style={styles.walletTitle}>{title}</Text>
            {isRecommended && (
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>Recommended</Text>
              </View>
            )}
          </View>
          <Text style={styles.walletDescription}>{description}</Text>
        </View>
        <Icon
          name="chevron-forward"
          size={24}
          color={COLORS.gray}
          style={styles.chevron}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choose Your Wallet</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={COLORS.gray} />
            </TouchableOpacity>
          </View>

          <View style={styles.walletOptions}>
            <WalletOption
              title="MetaMask"
              description="Connect with MetaMask mobile app for secure transactions and messaging"
              icon="wallet"
              walletType="metamask"
              isRecommended={true}
            />

            <WalletOption
              title="WalletConnect"
              description="Connect with any wallet that supports WalletConnect protocol"
              icon="qr-code"
              walletType="walletconnect"
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Your wallet connection is secure and private. We never store your private keys.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  closeButton: {
    padding: 5,
  },
  walletOptions: {
    paddingHorizontal: 20,
  },
  walletOption: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  recommendedOption: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  walletOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  walletIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  walletInfo: {
    flex: 1,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  walletTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginRight: 8,
  },
  recommendedBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  recommendedText: {
    ...FONTS.caption,
    color: COLORS.white,
    fontSize: 10,
  },
  walletDescription: {
    ...FONTS.body4,
    color: COLORS.gray,
    lineHeight: 18,
  },
  chevron: {
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    marginTop: 20,
  },
  footerText: {
    ...FONTS.caption,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default WalletSelector; 