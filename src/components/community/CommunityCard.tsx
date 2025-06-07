import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

interface CommunityCardProps {
    id: string;
    name: string;
    description: string;
    avatar: string;
    memberCount: number;
    onPress: () => void;
    style?: any;
}

const CommunityCard = ({
    // id,
    name,
    description,
    avatar,
    memberCount,
    onPress,
    style,
}: CommunityCardProps) => {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={onPress}
            activeOpacity={0.7}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                    {description}
                </Text>
                <View style={styles.footer}>
                    <Icon name="people" size={16} color={COLORS.gray} />
                    <Text style={styles.memberCount}>
                        {memberCount.toLocaleString()} members
                    </Text>
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
        // ...COLORS.shadow,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.lightGray,
    },
    content: {
        flex: 1,
        marginLeft: SIZES.base * 2,
        marginRight: SIZES.base,
    },
    name: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.text,
        marginBottom: 4,
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
    },
    memberCount: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small - 2,
        color: COLORS.gray,
        marginLeft: 4,
    },
});

export default CommunityCard;
