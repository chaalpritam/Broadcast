import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

interface MessageBubbleProps {
    message: string;
    time: string;
    isSent: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    timeStyle?: TextStyle;
}

const MessageBubble = ({
    message,
    time,
    isSent,
    style,
    textStyle,
    timeStyle,
}: MessageBubbleProps) => {
    return (
        <View
            style={[
                styles.container,
                isSent ? styles.sentContainer : styles.receivedContainer,
                style,
            ]}>
            <View
                style={[
                    styles.bubble,
                    isSent ? styles.sentBubble : styles.receivedBubble,
                ]}>
                <Text
                    style={[
                        styles.messageText,
                        isSent ? styles.sentText : styles.receivedText,
                        textStyle,
                    ]}>
                    {message}
                </Text>
                <Text
                    style={[
                        styles.timeText,
                        isSent ? styles.sentTime : styles.receivedTime,
                        timeStyle,
                    ]}>
                    {time}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: SIZES.base,
        maxWidth: '80%',
    },
    sentContainer: {
        alignSelf: 'flex-end',
    },
    receivedContainer: {
        alignSelf: 'flex-start',
    },
    bubble: {
        padding: SIZES.base * 2,
        borderRadius: 20,
        maxWidth: '100%',
    },
    sentBubble: {
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 4,
    },
    receivedBubble: {
        backgroundColor: COLORS.lightGray,
        borderTopLeftRadius: 4,
    },
    messageText: {
        ...FONTS.regular,
        fontSize: SIZES.font,
    },
    sentText: {
        color: COLORS.white,
    },
    receivedText: {
        color: COLORS.text,
    },
    timeText: {
        ...FONTS.regular,
        fontSize: SIZES.small - 2,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    sentTime: {
        color: COLORS.white,
        opacity: 0.8,
    },
    receivedTime: {
        color: COLORS.gray,
    },
});

export default MessageBubble; 