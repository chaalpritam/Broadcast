import React from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../constants/theme';

interface AvatarProps {
    uri: string;
    size?: number;
    showBadge?: boolean;
    badgeIcon?: string;
    badgeColor?: string;
    style?: ViewStyle;
    imageStyle?: ImageStyle;
}

const Avatar = ({
    uri,
    size = 50,
    showBadge = false,
    badgeIcon,
    badgeColor = COLORS.primary,
    style,
    imageStyle,
}: AvatarProps) => {
    return (
        <View style={[styles.container, { width: size, height: size }, style]}>
            <Image
                source={{ uri }}
                style={[
                    styles.image,
                    { width: size, height: size, borderRadius: size / 2 },
                    imageStyle,
                ]}
            />
            {showBadge && (
                <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                    {badgeIcon ? (
                        <Icon name={badgeIcon} size={size * 0.3} color={COLORS.white} />
                    ) : null}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        backgroundColor: COLORS.lightGray,
    },
    badge: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.white,
    },
});

export default Avatar; 