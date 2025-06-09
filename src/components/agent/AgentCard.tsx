import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { getAgentAvatar } from '../../constants/images';

interface AgentCardProps {
    id: string;
    name: string;
    description: string;
    avatar?: string;
    category: string;
    status: 'online' | 'offline' | 'busy';
    onPress: () => void;
    style?: any;
}

const AgentCard = ({
    id,
    name,
    description,
    avatar,
    category,
    status,
    onPress,
    style,
}: AgentCardProps) => {
    const [imageError, setImageError] = useState(false);
    
    // Get default avatar if no avatar provided or if image failed to load
    const avatarUri = avatar && !imageError ? avatar : getAgentAvatar(category, id);

    const getStatusColor = () => {
        switch (status) {
            case 'online':
                return COLORS.success;
            case 'busy':
                return COLORS.warning;
            case 'offline':
                return COLORS.gray;
            default:
                return COLORS.gray;
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'online':
                return 'radio-button-on';
            case 'busy':
                return 'time';
            case 'offline':
                return 'radio-button-off';
            default:
                return 'radio-button-off';
        }
    };

    const getCategoryIcon = () => {
        switch (category.toLowerCase()) {
            case 'wallet':
                return 'wallet';
            case 'transaction':
                return 'swap-horizontal';
            case 'defi':
                return 'trending-up';
            case 'nft':
                return 'images';
            case 'governance':
                return 'people';
            case 'analytics':
                return 'analytics';
            default:
                return 'construct';
        }
    };

    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={onPress}
            activeOpacity={0.7}>
            <View style={styles.avatarContainer}>
                <Image 
                    source={{ uri: avatarUri }} 
                    style={styles.avatar}
                    onError={() => setImageError(true)}
                />
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={1}>
                        {name}
                    </Text>
                    <Icon 
                        name={getStatusIcon()} 
                        size={16} 
                        color={getStatusColor()} 
                        style={styles.statusIcon}
                    />
                </View>
                <Text style={styles.description} numberOfLines={2}>
                    {description}
                </Text>
                <View style={styles.footer}>
                    <Icon name={getCategoryIcon()} size={16} color={COLORS.primary} />
                    <Text style={styles.category}>
                        {category}
                    </Text>
                    <View style={styles.statusContainer}>
                        <Icon name="ellipse" size={8} color={getStatusColor()} />
                        <Text style={[styles.status, { color: getStatusColor() }]}>
                            {status}
                        </Text>
                    </View>
                </View>
            </View>
            <Icon name="chevron-forward" size={24} color={COLORS.gray} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        marginBottom: SIZES.base,
        marginHorizontal: SIZES.base * 2,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.lightGray,
    },
    statusIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    content: {
        flex: 1,
        marginLeft: SIZES.base * 2,
        marginRight: SIZES.base,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    name: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.text,
        flex: 1,
    },
    statusIcon: {
        marginLeft: SIZES.base,
    },
    description: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginBottom: 4,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    category: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small - 2,
        color: COLORS.primary,
        marginLeft: 4,
        flex: 1,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    status: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small - 2,
        marginLeft: 4,
        textTransform: 'capitalize',
    },
});

export default AgentCard; 