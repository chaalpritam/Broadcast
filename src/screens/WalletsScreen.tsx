import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { useWalletXMTP } from '../hooks';
import SimpleWalletConnect from '../components/wallet/SimpleWalletConnect';

const WalletsScreen = () => {
    const { wallet, connectWallet, disconnectWallet, fetchBalance } = useWalletXMTP();
    const [isConnecting, setIsConnecting] = useState(false);
    const [rewards, setRewards] = useState([
        { id: 1, type: 'Daily Login', amount: '0.001 ETH', status: 'Claimed' },
        { id: 2, type: 'First Message', amount: '0.005 ETH', status: 'Available' },
        { id: 3, type: 'Community Contribution', amount: '0.01 ETH', status: 'Available' },
    ]);

    const handleWalletConnect = async (walletType: 'metamask' | 'walletconnect') => {
        setIsConnecting(true);
        try {
            await connectWallet(walletType);
            Alert.alert('Success', 'Wallet connected successfully!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to connect wallet');
        } finally {
            setIsConnecting(false);
        }
    };

    const handleWalletDisconnect = async () => {
        try {
            await disconnectWallet();
            setRewards([]);
            Alert.alert('Success', 'Wallet disconnected successfully!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to disconnect wallet');
        }
    };

    const handleDeposit = () => {
        if (!wallet.isConnected) {
            Alert.alert('Error', 'Please connect your wallet first');
            return;
        }
        Alert.alert('Deposit', 'Deposit functionality coming soon!');
    };

    const handleWithdraw = () => {
        if (!wallet.isConnected) {
            Alert.alert('Error', 'Please connect your wallet first');
            return;
        }
        Alert.alert('Withdraw', 'Withdraw functionality coming soon!');
    };

    const handleSwap = () => {
        if (!wallet.isConnected) {
            Alert.alert('Error', 'Please connect your wallet first');
            return;
        }
        Alert.alert('Swap', 'Swap functionality coming soon!');
    };

    const getConnectionStatus = () => {
        if (isConnecting) return 'Connecting...';
        if (wallet.isConnected) return 'Connected';
        return 'Not Connected';
    };

    const getConnectionColor = () => {
        if (isConnecting) return COLORS.warning;
        if (wallet.isConnected) return COLORS.success;
        return COLORS.error;
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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Simple Wallet Connection Component */}
            <SimpleWalletConnect />

            {/* Balance Section - Only show when connected */}
            {wallet.isConnected && (
                <View style={styles.balanceSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Quick Actions</Text>
                    </View>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.actionButton} onPress={handleDeposit}>
                            <Icon name="arrow-down-circle-outline" size={24} color={COLORS.primary} />
                            <Text style={styles.actionButtonText}>Deposit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw}>
                            <Icon name="arrow-up-circle-outline" size={24} color={COLORS.primary} />
                            <Text style={styles.actionButtonText}>Withdraw</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={handleSwap}>
                            <Icon name="swap-horizontal-outline" size={24} color={COLORS.primary} />
                            <Text style={styles.actionButtonText}>Swap</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Rewards Section - Only show when connected */}
            {wallet.isConnected && (
                <View style={styles.rewardsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Rewards</Text>
                        <Text style={styles.rewardsSubtitle}>Earn rewards for using Broadcast</Text>
                    </View>
                    {rewards.map((reward) => (
                        <View key={reward.id} style={styles.rewardItem}>
                            <View style={styles.rewardInfo}>
                                <Text style={styles.rewardType}>{reward.type}</Text>
                                <Text style={styles.rewardAmount}>{reward.amount}</Text>
                            </View>
                            <View style={[
                                styles.rewardStatus,
                                { backgroundColor: reward.status === 'Claimed' ? COLORS.success : COLORS.primary }
                            ]}>
                                <Text style={styles.rewardStatusText}>{reward.status}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SIZES.padding,
    },
    balanceSection: {
        marginBottom: SIZES.padding * 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    sectionTitle: {
        ...FONTS.h2,
        color: COLORS.black,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: SIZES.padding,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    actionButton: {
        alignItems: 'center',
        flex: 1,
    },
    actionButtonText: {
        ...FONTS.body4,
        color: COLORS.black,
        marginTop: 8,
        textAlign: 'center',
    },
    rewardsSection: {
        marginBottom: SIZES.padding * 2,
    },
    rewardsSubtitle: {
        ...FONTS.body4,
        color: COLORS.gray,
    },
    rewardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: SIZES.padding,
        marginBottom: 8,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    rewardInfo: {
        flex: 1,
    },
    rewardType: {
        ...FONTS.body3,
        color: COLORS.black,
        marginBottom: 2,
    },
    rewardAmount: {
        ...FONTS.body4,
        color: COLORS.primary,
        fontWeight: '600',
    },
    rewardStatus: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    rewardStatusText: {
        ...FONTS.caption,
        color: COLORS.white,
        fontWeight: '600',
    },
});

export default WalletsScreen; 