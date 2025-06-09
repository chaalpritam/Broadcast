import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image,
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
    const [balance, setBalance] = useState(0);
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // TODO: Load wallet data from API
        // For now, we'll use mock data
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
            {
                id: '4',
                title: 'Community Contribution',
                amount: 30,
                date: 'Mar 14, 2024',
                type: 'community',
                status: 'completed',
                communityName: 'Crypto Traders',
            },
            {
                id: '5',
                title: 'New Member Referral',
                amount: 20,
                date: 'Mar 13, 2024',
                type: 'referral',
                status: 'pending',
            },
        ];

        // Simulate API call
        setTimeout(() => {
            setBalance(1250.75);
            setRewards(mockRewards);
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.balanceCard}>
                <View style={styles.balanceHeader}>
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    <TouchableOpacity style={styles.refreshButton}>
                        <Icon name="refresh-outline" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.balanceAmount}>
                    <Image 
                        source={{ uri: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png' }}
                        style={styles.usdcIcon}
                    />
                    <Text style={styles.balanceValue}>{balance.toLocaleString()} USDC</Text>
                </View>
                <View style={styles.balanceActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="arrow-down-outline" size={20} color={COLORS.white} />
                        <Text style={styles.actionButtonText}>Deposit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="arrow-up-outline" size={20} color={COLORS.white} />
                        <Text style={styles.actionButtonText}>Withdraw</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="swap-horizontal-outline" size={20} color={COLORS.white} />
                        <Text style={styles.actionButtonText}>Swap</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.rewardsSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Rewards History</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={rewards}
                    renderItem={({ item }) => <RewardItem item={item} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.rewardsList}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: SIZES.base * 2,
    },
    errorText: {
        fontFamily: FONTS.regular,
        color: COLORS.error,
        textAlign: 'center',
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
    refreshButton: {
        padding: SIZES.base,
    },
    balanceAmount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base * 2,
    },
    usdcIcon: {
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
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: SIZES.base * 2,
        borderTopRightRadius: SIZES.base * 2,
        paddingTop: SIZES.base * 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.base * 2,
        marginBottom: SIZES.base,
    },
    sectionTitle: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.medium,
        color: COLORS.text,
    },
    viewAllText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
        color: COLORS.primary,
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
});

export default WalletsScreen; 