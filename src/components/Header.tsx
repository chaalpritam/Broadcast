import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Avatar from './Avatar';

interface HeaderAction {
    icon: string;
    onPress: () => void;
    color?: string;
}

interface HeaderProps {
    title?: string;
    subtitle?: string;
    avatar?: string;
    actions?: HeaderAction[];
    style?: ViewStyle;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
}

const Header = ({
    title,
    subtitle,
    avatar,
    actions = [],
    style,
    titleStyle,
    subtitleStyle,
}: HeaderProps) => {
    return (
        <View style={[styles.container, style]}>
            {avatar ? (
                <View style={styles.titleContainer}>
                    <Avatar uri={avatar} size={40} style={styles.avatar} />
                    <View style={styles.titleWrapper}>
                        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
                        {subtitle && (
                            <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
                        )}
                    </View>
                </View>
            ) : (
                title && <Text style={[styles.title, titleStyle]}>{title}</Text>
            )}
            <View style={styles.actions}>
                {actions.map((action, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.actionButton}
                        onPress={action.onPress}>
                        <Icon
                            name={action.icon}
                            size={24}
                            color={action.color || COLORS.white}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.base * 2,
        backgroundColor: COLORS.primary,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    titleWrapper: {
        marginLeft: SIZES.base * 2,
    },
    avatar: {
        marginRight: SIZES.base,
    },
    title: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.white,
    },
    subtitle: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.white,
        opacity: 0.8,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        marginLeft: SIZES.base * 2,
    },
});

export default Header;
