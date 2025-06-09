import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { getAgentAvatar } from '../constants/images';

type RouteParams = {
    agentId: string;
};

const AgentScreen = () => {
    const route = useRoute<RouteProp<{ Agent: RouteParams }, 'Agent'>>();
    const navigation = useNavigation();
    const { agentId } = route.params;

    // Mock agent data - in real app, this would come from Redux store
    const agent = {
        id: agentId,
        name: 'Transaction Agent',
        description: 'AI agent specialized in handling blockchain transactions, wallet management, and balance tracking.',
        avatar: getAgentAvatar('transaction', agentId),
        category: 'Transaction',
        status: 'online' as const,
        capabilities: [
            'Send and receive transactions',
            'Wallet balance monitoring',
            'Transaction history tracking',
            'Gas fee optimization',
            'Multi-chain support'
        ],
        blockchain: 'Ethereum, Polygon, BSC',
        lastActive: '2 minutes ago'
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: agent.avatar }} style={styles.avatar} />
                    <View style={[styles.statusIndicator, { backgroundColor: COLORS.success }]} />
                </View>
                <Text style={styles.name}>{agent.name}</Text>
                <Text style={styles.category}>{agent.category}</Text>
                <Text style={styles.description}>{agent.description}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Capabilities</Text>
                {agent.capabilities.map((capability, index) => (
                    <View key={index} style={styles.capabilityItem}>
                        <Icon name="checkmark-circle" size={20} color={COLORS.success} />
                        <Text style={styles.capabilityText}>{capability}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Blockchain Support</Text>
                <Text style={styles.blockchainText}>{agent.blockchain}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Status</Text>
                <View style={styles.statusContainer}>
                    <Icon name="radio-button-on" size={20} color={COLORS.success} />
                    <Text style={styles.statusText}>Online</Text>
                    <Text style={styles.lastActiveText}>Last active: {agent.lastActive}</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.primaryButton}>
                    <Icon name="chatbubbles" size={20} color={COLORS.white} />
                    <Text style={styles.primaryButtonText}>Start Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton}>
                    <Icon name="settings" size={20} color={COLORS.primary} />
                    <Text style={styles.secondaryButtonText}>Configure</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
    },
    header: {
        alignItems: 'center',
        padding: SIZES.base * 3,
        backgroundColor: COLORS.white,
        marginBottom: SIZES.base,
        ...SHADOWS.light,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: SIZES.base * 2,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.lightGray,
    },
    statusIndicator: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: COLORS.white,
    },
    name: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.h3,
        color: COLORS.text,
        marginBottom: SIZES.base,
    },
    category: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.primary,
        marginBottom: SIZES.base * 2,
    },
    description: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        textAlign: 'center',
        lineHeight: 22,
    },
    section: {
        backgroundColor: COLORS.white,
        padding: SIZES.base * 2,
        marginBottom: SIZES.base,
        marginHorizontal: SIZES.base,
        borderRadius: SIZES.base,
        ...SHADOWS.light,
    },
    sectionTitle: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.text,
        marginBottom: SIZES.base * 2,
    },
    capabilityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    capabilityText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.text,
        marginLeft: SIZES.base,
    },
    blockchainText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.success,
        marginLeft: SIZES.base,
    },
    lastActiveText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginLeft: 'auto',
    },
    actions: {
        padding: SIZES.base * 2,
        gap: SIZES.base,
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: SIZES.base * 2,
        borderRadius: SIZES.base,
        gap: SIZES.base,
        ...SHADOWS.medium,
    },
    primaryButtonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.white,
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        padding: SIZES.base * 2,
        borderRadius: SIZES.base,
        borderWidth: 1,
        borderColor: COLORS.primary,
        gap: SIZES.base,
        ...SHADOWS.light,
    },
    secondaryButtonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.primary,
    },
});

export default AgentScreen; 