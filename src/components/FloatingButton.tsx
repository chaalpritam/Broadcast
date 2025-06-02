import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

interface FloatingButtonProps {
    icon: string;
    onPress: () => void;
    color?: string;
    backgroundColor?: string;
    size?: number;
    style?: ViewStyle;
    iconSize?: number;
}

const FloatingButton = ({
    icon,
    onPress,
    color = COLORS.white,
    backgroundColor = COLORS.primary,
    size = 56,
    style,
    iconSize = 24,
}: FloatingButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor,
                },
                style,
            ]}
            onPress={onPress}>
            <Icon name={icon} size={iconSize} color={color} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: SIZES.base * 3,
        right: SIZES.base * 3,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
    },
});

export default FloatingButton; 