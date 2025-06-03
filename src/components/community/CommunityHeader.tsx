import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

interface CommunityHeaderProps {
    name: string;
    description: string;
    avatar: string;
    coverImage: string;
    memberCount: number;
    isJoined: boolean;
    onJoinPress: () => void;
    onSharePress: () => void;
    onSettingsPress: () => void;
    role?: 'owner' | 'admin' | 'moderator' | 'member';
}

const { width } = Dimensions.get('window');

const CommunityHeader = ({
    name,
    description,
    avatar,
    coverImage,
    memberCount,
    isJoined,
    onJoinPress,
    onSharePress,
    onSettingsPress,
    role,
}: CommunityHeaderProps) => {
    const getRoleColor = () => {
        switch (role) {
            case 'owner':
                return COLORS.primary;
            case 'admin':
                return COLORS.success;
            case 'moderator':
                return COLORS.warning;
            default:
                return COLORS.gray;
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: coverImage }} style={styles.coverImage} />
            <View style={styles.content}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <View style={styles.info}>
                    <View style={styles.titleRow}>
                        <Text style={styles.name}>{name}</Text>
                        {role && (
                            <View style={[styles.roleBadge, { backgroundColor: getRoleColor() }]}>
                                <Text style={styles.roleText}>{role}</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.memberCount}>
                        {memberCount.toLocaleString()} members
                    </Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {description}
                    </Text>
                </View>
                <View style={styles.actions}>
                    {!isJoined ? (
                        <TouchableOpacity
                            style={styles.joinButton}
                            onPress={onJoinPress}>
                            <Text style={styles.joinButtonText}>Join</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={onSharePress}>
                                <Icon name="share-outline" size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={onSettingsPress}>
                                <Icon name="settings-outline" size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
    },
    coverImage: {
        width: width,
        height: 150,
        backgroundColor: COLORS.lightGray,
    },
    content: {
        padding: SIZES.base * 2,
        marginTop: -30,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: COLORS.white,
        backgroundColor: COLORS.lightGray,
    },
    info: {
        marginTop: SIZES.base,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        ...FONTS.bold,
        fontSize: SIZES.large,
        color: COLORS.text,
        marginRight: SIZES.base,
    },
    roleBadge: {
        paddingHorizontal: SIZES.base,
        paddingVertical: 2,
        borderRadius: 12,
    },
    roleText: {
        ...FONTS.regular,
        fontSize: SIZES.small - 2,
        color: COLORS.white,
        textTransform: 'capitalize',
    },
    memberCount: {
        ...FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginBottom: 4,
    },
    description: {
        ...FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.text,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: SIZES.base * 2,
    },
    joinButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.base * 3,
        paddingVertical: SIZES.base,
        borderRadius: 20,
    },
    joinButtonText: {
        ...FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.white,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SIZES.base,
    },
});

export default CommunityHeader; 