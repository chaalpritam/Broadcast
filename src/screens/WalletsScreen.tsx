import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

interface Reward {
    id: string;
    title: string;
    amount: number;
    date: string;
    type: 'community' | 'referral' | 'task';
    status: 'pending' | 'completed';
    communityName?: string;
}

const RewardItem = ({ item }: { item: Reward }) => {
    const getRewardIcon = () => {
        switch (item.type) {
            case 'community':
                return 'people';
            case 'referral':
                return 'git-branch';
            case 'task':
                return 'checkmark-circle';
            default:
                return 'gift';
        }
    };

    const getRewardColor = () => {
        switch (item.type) {
            case 'community':
                return COLORS.primary;
            case 'referral':
                return COLORS.success;
            case 'task':
                return COLORS.warning;
            default:
                return COLORS.gray;
        }
    };

    const getRewardTypeLabel = () => {
        switch (item.type) {
            case 'community':
                return 'Community Reward';
            case 'referral':
                return 'Referral Bonus';
            case 'task':
                return 'Task Completion';
            default:
                return 'Reward';
        }
    };

    return (
        <TouchableOpacity 
            style={styles.rewardItem}
            activeOpacity={0.7}
        >
            <View style={[styles.rewardIcon, { backgroundColor: getRewardColor() + '15' }]}>
                <Icon name={getRewardIcon()} size={24} color={getRewardColor()} />
            </View>
            <View style={styles.rewardInfo}>
                <View style={styles.rewardHeader}>
                    <Text style={styles.rewardTitle}>{item.title}</Text>
                    <Text style={styles.rewardAmount}>+{item.amount} USDC</Text>
                </View>
                <View style={styles.rewardDetails}>
                    <View style={styles.rewardType}>
                        <Icon name="pricetag-outline" size={14} color={COLORS.gray} />
                        <Text style={styles.rewardTypeText}>{getRewardTypeLabel()}</Text>
                    </View>
                    {item.communityName && (
                        <View style={styles.communityName}>
                            <Icon name="people-outline" size={14} color={COLORS.gray} />
                            <Text style={styles.communityNameText}>{item.communityName}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.rewardFooter}>
                    <Text style={styles.rewardDate}>{item.date}</Text>
                    <View style={[
                        styles.statusBadge,
                        { backgroundColor: item.status === 'completed' ? COLORS.success + '15' : COLORS.warning + '15' }
                    ]}>
                        <Text style={[
                            styles.statusText,
                            { color: item.status === 'completed' ? COLORS.success : COLORS.warning }
                        ]}>
                            {item.status === 'completed' ? 'Completed' : 'Pending'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const WalletsScreen = () => {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [isLoadingRewards, setIsLoadingRewards] = useState(true);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        // Load initial rewards
        loadRewards();
    }, []);

    const loadRewards = async () => {
        setIsLoadingRewards(true);
        try {
            // Mock rewards data
            const mockRewards: Reward[] = [
                {
                    id: '1',
                    title: 'Community Engagement Bonus',
                    amount: 50,
                    date: 'Today, 2:30 PM',
                    type: 'community',
                    status: 'completed',
                    communityName: 'Tech Enthusiasts',
                },
                {
                    id: '2',
                    title: 'Referral Reward',
                    amount: 25,
                    date: 'Yesterday, 5:45 PM',
                    type: 'referral',
                    status: 'completed',
                },
                {
                    id: '3',
                    title: 'Task Completion Bonus',
                    amount: 15,
                    date: 'Mar 15, 2024',
                    type: 'task',
                    status: 'pending',
                    communityName: 'Design Community',
                },
            ];

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            setRewards(mockRewards);
        } catch (error) {
            console.error('Error loading rewards:', error);
            Alert.alert('Error', 'Failed to load rewards');
        } finally {
            setIsLoadingRewards(false);
        }
    };

    const handleWalletConnect = async () => {
        setIsConnecting(true);
        try {
            // Simulate wallet connection
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsWalletConnected(true);
            Alert.alert('Success', 'Wallet connected successfully!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to connect wallet');
        } finally {
            setIsConnecting(false);
        }
    };

    const handleWalletDisconnect = async () => {
        try {
            setIsWalletConnected(false);
            setRewards([]);
            Alert.alert('Success', 'Wallet disconnected successfully!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to disconnect wallet');
        }
    };

    const handleDeposit = () => {
        if (!isWalletConnected) {
            Alert.alert('Error', 'Please connect your wallet first');
            return;
        }
        Alert.alert('Deposit', 'Deposit functionality coming soon!');
    };

    const handleWithdraw = () => {
        if (!isWalletConnected) {
            Alert.alert('Error', 'Please connect your wallet first');
            return;
        }
        Alert.alert('Withdraw', 'Withdraw functionality coming soon!');
    };

    const handleSwap = () => {
        if (!isWalletConnected) {
            Alert.alert('Error', 'Please connect your wallet first');
            return;
        }
        Alert.alert('Swap', 'Swap functionality coming soon!');
    };

    const getConnectionStatus = () => {
        if (isConnecting) return 'Connecting...';
        if (isWalletConnected) return 'Connected';
        return 'Not Connected';
    };

    const getConnectionColor = () => {
        if (isConnecting) return COLORS.warning;
        if (isWalletConnected) return COLORS.success;
        return COLORS.error;
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Wallet Connection Section */}
            <View style={styles.walletSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Wallet Connection</Text>
                    <View style={styles.statusContainer}>
                        <View style={[styles.statusDot, { backgroundColor: getConnectionColor() }]} />
                        <Text style={[styles.statusText, { color: getConnectionColor() }]}>
                            {getConnectionStatus()}
                        </Text>
                    </View>
                </View>

                {!isWalletConnected ? (
                    <View style={styles.connectCard}>
                        <Icon name="wallet-outline" size={48} color={COLORS.gray} />
                        <Text style={styles.connectTitle}>Connect Your Wallet</Text>
                        <Text style={styles.connectDescription}>
                            Connect your wallet to view your balance, manage transactions, and earn rewards.
                        </Text>
                        <TouchableOpacity
                            style={[styles.connectButton, { backgroundColor: isConnecting ? COLORS.gray : COLORS.primary }]}
                            onPress={handleWalletConnect}
                            disabled={isConnecting}
                            activeOpacity={0.7}
                        >
                            {isConnecting ? (
                                <ActivityIndicator size="small" color={COLORS.white} />
                            ) : (
                                <Icon name="wallet-outline" size={20} color={COLORS.white} />
                            )}
                            <Text style={styles.connectButtonText}>
                                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.walletInfoCard}>
                        <View style={styles.walletInfoHeader}>
                            <View style={styles.statusIndicator}>
                                <Icon name="radio-button-on" size={12} color={COLORS.success} />
                                <Text style={styles.statusText}>Connected</Text>
                            </View>
                            <TouchableOpacity style={styles.refreshButton}>
                                <Icon name="refresh-outline" size={20} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.addressSection}>
                            <Text style={styles.label}>Address</Text>
                            <Text style={styles.address}>0x1234...5678</Text>
                        </View>
                        <View style={styles.balanceSection}>
                            <Text style={styles.label}>Balance</Text>
                            <Text style={styles.balance}>0.5000 ETH</Text>
                        </View>
                        <TouchableOpacity onPress={handleWalletDisconnect} style={styles.disconnectButton}>
                            <Icon name="log-out-outline" size={20} color={COLORS.error} />
                            <Text style={styles.disconnectText}>Disconnect</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Balance Section - Only show when connected */}
            {isWalletConnected && (
                <View style={styles.balanceCard}>
                    <View style={styles.balanceHeader}>
                        <Text style={styles.balanceLabel}>Total Balance</Text>
                        <TouchableOpacity style={styles.refreshButton}>
                            <Icon name="refresh-outline" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.balanceAmount}>
                        <Image 
                            source={{ uri: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' }}
                            style={styles.ethIcon}
                        />
                        <Text style={styles.balanceValue}>0.5000 ETH</Text>
                    </View>
                    <View style={styles.balanceActions}>
                        <TouchableOpacity style={styles.actionButton} onPress={handleDeposit}>
                            <Icon name="arrow-down-outline" size={20} color={COLORS.white} />
                            <Text style={styles.actionButtonText}>Deposit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw}>
                            <Icon name="arrow-up-outline" size={20} color={COLORS.white} />
                            <Text style={styles.actionButtonText}>Withdraw</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={handleSwap}>
                            <Icon name="swap-horizontal-outline" size={20} color={COLORS.white} />
                            <Text style={styles.actionButtonText}>Swap</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Rewards Section */}
            <View style={styles.rewardsSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Rewards History</Text>
                    <TouchableOpacity onPress={loadRewards}>
                        <Text style={styles.viewAllText}>Refresh</Text>
                    </TouchableOpacity>
                </View>
                
                {isLoadingRewards ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                        <Text style={styles.loadingText}>Loading rewards...</Text>
                    </View>
                ) : rewards.length > 0 ? (
                    <FlatList
                        data={rewards}
                        renderItem={({ item }) => <RewardItem item={item} />}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.rewardsList}
                        scrollEnabled={false}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Icon name="gift-outline" size={48} color={COLORS.gray} />
                        <Text style={styles.emptyTitle}>No Rewards Yet</Text>
                        <Text style={styles.emptyDescription}>
                            Start participating in communities to earn rewards!
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    walletSection: {
        margin: SIZES.base * 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base * 2,
    },
    sectionTitle: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.large,
        color: COLORS.text,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.base / 2,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
    },
    connectCard: {
        backgroundColor: COLORS.white,
        padding: SIZES.base * 3,
        borderRadius: SIZES.base * 2,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        alignItems: 'center',
    },
    connectTitle: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.large,
        color: COLORS.text,
        marginTop: SIZES.base * 2,
        marginBottom: SIZES.base,
    },
    connectDescription: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        textAlign: 'center',
        marginBottom: SIZES.base * 2,
        lineHeight: 20,
    },
    connectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.base * 2,
        paddingVertical: SIZES.base * 1.5,
        borderRadius: SIZES.base,
        gap: SIZES.base,
        width: '100%',
    },
    connectButtonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.white,
    },
    walletInfoCard: {
        backgroundColor: COLORS.white,
        padding: SIZES.base * 2,
        borderRadius: SIZES.base * 2,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    walletInfoHeader: {
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
    address: {
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
    balanceCard: {
        backgroundColor: COLORS.white,
        margin: SIZES.base * 2,
        padding: SIZES.base * 2,
        borderRadius: SIZES.base * 2,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    balanceLabel: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.gray,
    },
    balanceAmount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base * 2,
    },
    ethIcon: {
        width: 32,
        height: 32,
        marginRight: SIZES.base,
    },
    balanceValue: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.large,
        color: COLORS.text,
    },
    balanceActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.base,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: SIZES.base,
        borderRadius: SIZES.base,
        marginHorizontal: SIZES.base / 2,
    },
    actionButtonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
        color: COLORS.white,
        marginLeft: SIZES.base / 2,
    },
    rewardsSection: {
        margin: SIZES.base * 2,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base * 2,
        paddingTop: SIZES.base * 2,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    viewAllText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
        color: COLORS.primary,
    },
    loadingContainer: {
        padding: SIZES.base * 4,
        alignItems: 'center',
    },
    loadingText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginTop: SIZES.base,
    },
    rewardsList: {
        padding: SIZES.base * 2,
    },
    rewardItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: SIZES.base * 2,
        marginBottom: SIZES.base * 2,
        borderRadius: SIZES.base * 2,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    rewardIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.base * 2,
    },
    rewardInfo: {
        flex: 1,
    },
    rewardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    rewardTitle: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.text,
        flex: 1,
        marginRight: SIZES.base,
    },
    rewardAmount: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.font,
        color: COLORS.success,
    },
    rewardDetails: {
        marginBottom: SIZES.base,
    },
    rewardType: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base / 2,
    },
    rewardTypeText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginLeft: SIZES.base / 2,
    },
    communityName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    communityNameText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginLeft: SIZES.base / 2,
    },
    rewardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rewardDate: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    statusBadge: {
        paddingHorizontal: SIZES.base,
        paddingVertical: SIZES.base / 2,
        borderRadius: SIZES.base,
    },
    statusText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
    },
    emptyContainer: {
        padding: SIZES.base * 4,
        alignItems: 'center',
    },
    emptyTitle: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.large,
        color: COLORS.text,
        marginTop: SIZES.base * 2,
        marginBottom: SIZES.base,
    },
    emptyDescription: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default WalletsScreen; 