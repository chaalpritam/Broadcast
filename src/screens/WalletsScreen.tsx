import React, { useState } from 'react';
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

const WalletsScreen = () => {
    const { wallet, connectWallet, disconnectWallet, fetchBalance } = useWalletXMTP();
    const [isConnecting, setIsConnecting] = useState(false);
    const [rewards] = useState([
        { id: 1, type: 'Daily Login', amount: '0.001 ETH', status: 'Claimed' },
        { id: 2, type: 'First Message', amount: '0.005 ETH', status: 'Available' },
        { id: 3, type: 'Community Contribution', amount: '0.01 ETH', status: 'Available' },
    ]);

    const [transactions] = useState([
        { id: 1, type: 'Received', amount: '0.05 ETH', from: '0x1234...5678', timestamp: '2 hours ago', status: 'Completed' },
        { id: 2, type: 'Sent', amount: '0.02 ETH', to: '0x8765...4321', timestamp: '1 day ago', status: 'Completed' },
        { id: 3, type: 'Swap', amount: '0.1 ETH → 150 USDC', from: 'Uniswap', timestamp: '3 days ago', status: 'Completed' },
        { id: 4, type: 'Received', amount: '0.025 ETH', from: '0xabcd...efgh', timestamp: '1 week ago', status: 'Completed' },
    ]);

    const handleConnectMetaMask = async () => {
        setIsConnecting(true);
        try {
            await connectWallet('metamask');
            Alert.alert('Success', 'Connected to MetaMask!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to connect to MetaMask');
        } finally {
            setIsConnecting(false);
        }
    };

    const handleConnectWalletConnect = async () => {
        setIsConnecting(true);
        try {
            await connectWallet('walletconnect');
            Alert.alert('Success', 'Connected to WalletConnect!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to connect to WalletConnect');
        } finally {
            setIsConnecting(false);
        }
    };

    const handleDisconnect = async () => {
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

    const formatAddress = (address: string) => {
        if (!address || address.length < 8) return 'Invalid Address';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'Received':
                return 'arrow-down-circle';
            case 'Sent':
                return 'arrow-up-circle';
            case 'Swap':
                return 'swap-horizontal';
            default:
                return 'help-circle';
        }
    };

    const getTransactionColor = (type: string) => {
        switch (type) {
            case 'Received':
                return COLORS.success;
            case 'Sent':
                return COLORS.error;
            case 'Swap':
                return COLORS.primary;
            default:
                return COLORS.gray;
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Small Rectangular Connect Buttons - Top Right */}
            <View style={styles.connectButtonsContainer}>
                <TouchableOpacity
                    style={[styles.rectConnectButton, styles.metamaskRectButton]}
                    onPress={handleConnectMetaMask}
                    disabled={isConnecting || wallet.isConnected}
                >
                    <Icon name="wallet-outline" size={16} color={COLORS.white} />
                    <Text style={styles.rectButtonText}>MetaMask</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={[styles.rectConnectButton, styles.walletconnectRectButton]}
                    onPress={handleConnectWalletConnect}
                    disabled={isConnecting || wallet.isConnected}
                >
                    <Icon name="qr-code-outline" size={16} color={COLORS.white} />
                    <Text style={styles.rectButtonText}>WalletConnect</Text>
                </TouchableOpacity>
            </View>

            {/* Small Wallet Status Bar */}
            <View style={styles.statusBar}>
                <View style={styles.statusBarLeft}>
                    <Icon 
                        name={wallet.isConnected ? "checkmark-circle" : "close-circle"} 
                        size={16} 
                        color={wallet.isConnected ? COLORS.success : COLORS.error} 
                    />
                    <Text style={[styles.statusBarText, { color: wallet.isConnected ? COLORS.success : COLORS.error }]}>
                        {wallet.isConnected ? 'Connected' : 'Not Connected'}
                    </Text>
                </View>
                
                {wallet.isConnected && (
                    <View style={styles.statusBarRight}>
                        {wallet.balance && (
                            <Text style={styles.statusBarBalance}>
                                {wallet.balance} ETH
                            </Text>
                        )}
                        <TouchableOpacity
                            style={styles.statusBarRefreshButton}
                            onPress={handleRefreshBalance}
                        >
                            <Icon name="refresh-outline" size={14} color={COLORS.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.statusBarDisconnectButton}
                            onPress={handleDisconnect}
                        >
                            <Icon name="log-out-outline" size={14} color={COLORS.error} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Error Display */}
            {wallet.error && (
                <View style={styles.errorCard}>
                    <Icon name="warning-outline" size={16} color={COLORS.error} />
                    <Text style={styles.errorText}>{wallet.error}</Text>
                </View>
            )}

            {/* Quick Actions Section */}
            <View style={styles.actionsSection}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
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

            {/* Rewards Section */}
            <View style={styles.rewardsSection}>
                <Text style={styles.sectionTitle}>Rewards</Text>
                <Text style={styles.rewardsSubtitle}>Earn rewards for using Broadcast</Text>
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

            {/* Transaction History Section */}
            <View style={styles.transactionsSection}>
                <Text style={styles.sectionTitle}>Recent Transactions</Text>
                {transactions.map((transaction) => (
                    <View key={transaction.id} style={styles.transactionItem}>
                        <View style={styles.transactionIcon}>
                            <Icon 
                                name={getTransactionIcon(transaction.type)} 
                                size={24} 
                                color={getTransactionColor(transaction.type)} 
                            />
                        </View>
                        <View style={styles.transactionInfo}>
                            <Text style={styles.transactionType}>{transaction.type}</Text>
                            <Text style={styles.transactionAmount}>{transaction.amount}</Text>
                            <Text style={styles.transactionAddress}>
                                {transaction.from ? `From: ${transaction.from}` : `To: ${transaction.to}`}
                            </Text>
                            <Text style={styles.transactionTime}>{transaction.timestamp}</Text>
                        </View>
                        <View style={styles.transactionStatus}>
                            <View style={[styles.statusBadge, { backgroundColor: COLORS.success }]}>
                                <Text style={styles.statusBadgeText}>{transaction.status}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SIZES.padding,
    },
    connectButtonsContainer: {
        position: 'absolute',
        top: 20,
        // right: 20,
        flexDirection: 'row',
        gap: 8,
        zIndex: 1000,
    },
    rectConnectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 6,
        minWidth: 178,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    metamaskRectButton: {
        backgroundColor: COLORS.primary,
    },
    walletconnectRectButton: {
        backgroundColor: COLORS.success,
    },
    rectButtonText: {
        fontSize: 10,
        color: COLORS.white,
        fontWeight: '600',
        marginLeft: 4,
    },
    statusBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginTop: 80,
        marginBottom: SIZES.padding,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    statusBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusBarText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    statusBarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statusBarBalance: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '600',
    },
    statusBarRefreshButton: {
        padding: 4,
    },
    statusBarDisconnectButton: {
        padding: 4,
    },
    errorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.error + '10',
        borderRadius: 8,
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.error,
    },
    errorText: {
        fontSize: 12,
        color: COLORS.error,
        marginLeft: 8,
        flex: 1,
    },
    actionsSection: {
        marginBottom: SIZES.padding * 2,
    },
    rewardsSection: {
        marginBottom: SIZES.padding * 2,
    },
    transactionsSection: {
        marginBottom: SIZES.padding * 2,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: SIZES.padding,
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
        fontSize: 10,
        color: COLORS.black,
        marginTop: 8,
        textAlign: 'center',
    },
    rewardsSubtitle: {
        fontSize: 10,
        color: COLORS.gray,
        marginBottom: SIZES.padding,
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
        fontSize: 12,
        color: COLORS.black,
        marginBottom: 2,
    },
    rewardAmount: {
        fontSize: 10,
        color: COLORS.primary,
        fontWeight: '600',
    },
    rewardStatus: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    rewardStatusText: {
        fontSize: 10,
        color: COLORS.white,
        fontWeight: '600',
    },
    transactionItem: {
        flexDirection: 'row',
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
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.padding,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionType: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: 2,
    },
    transactionAmount: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '600',
        marginBottom: 2,
    },
    transactionAddress: {
        fontSize: 10,
        color: COLORS.gray,
        marginBottom: 2,
    },
    transactionTime: {
        fontSize: 10,
        color: COLORS.gray,
    },
    transactionStatus: {
        alignItems: 'flex-end',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusBadgeText: {
        fontSize: 10,
        color: COLORS.white,
        fontWeight: '600',
    },
});

export default WalletsScreen; 