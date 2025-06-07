import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

interface EmptyStateProps {
    icon: string;
    title: string;
    message: string;
    action?: {
        label: string;
        onPress: () => void;
    };
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message, action }) => {
    return (
        <View style={styles.container}>
            <Icon name={icon} size={48} color={COLORS.gray} style={styles.icon} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            {action && (
                <TouchableOpacity style={styles.button} onPress={action.onPress}>
                    <Text style={styles.buttonText}>{action.label}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.base * 4,
    },
    icon: {
        marginBottom: SIZES.base * 2,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.h3,
        color: COLORS.text,
        marginBottom: SIZES.base,
        textAlign: 'center',
    },
    message: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        textAlign: 'center',
        marginBottom: SIZES.base * 2,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.base * 2,
        paddingVertical: SIZES.base,
        borderRadius: SIZES.base,
    },
    buttonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.white,
    },
});

export default EmptyState; 