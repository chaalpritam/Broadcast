import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import type { RootStackParamList } from '../navigation/types';
import Header from '../components/Header';
import MessageBubble from '../components/MessageBubble';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock messages data
const MOCK_MESSAGES = [
    {
        id: '1',
        text: 'Hey, how are you?',
        time: '10:30 AM',
        isSent: true,
    },
    {
        id: '2',
        text: 'I'm good, thanks! How about you?',
    time: '10:31 AM',
        isSent: false,
    },
    {
        id: '3',
        text: 'Doing great! Just working on this new app.',
        time: '10:32 AM',
        isSent: true,
    },
];

const ChatScreen = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(MOCK_MESSAGES);

    const sendMessage = () => {
        if (message.trim().length === 0) return;

        const newMessage = {
            id: Date.now().toString(),
            text: message.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSent: true,
        };

        setMessages([...messages, newMessage]);
        setMessage('');
    };

    const headerActions = [
        {
            icon: 'videocam-outline',
            onPress: () => console.log('Video call'),
        },
        {
            icon: 'call-outline',
            onPress: () => console.log('Audio call'),
        },
        {
            icon: 'ellipsis-vertical',
            onPress: () => console.log('More options'),
        },
    ];

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
            <Header
                title={route.params.name}
                avatar="https://via.placeholder.com/40"
                actions={headerActions}
            />
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <MessageBubble
                        message={item.text}
                        time={item.time}
                        isSent={item.isSent}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.messagesList}
                inverted={false}
            />
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.attachButton}>
                    <Icon name="happy-outline" size={24} color={COLORS.gray} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.attachButton}>
                    <Icon name="attach" size={24} color={COLORS.gray} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Message"
                    placeholderTextColor={COLORS.gray}
                    multiline
                />
                <TouchableOpacity
                    style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
                    onPress={sendMessage}
                    disabled={!message.trim()}>
                    <Icon
                        name="send"
                        size={24}
                        color={message.trim() ? COLORS.white : COLORS.gray}
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    messagesList: {
        padding: SIZES.base * 2,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.base,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
    },
    attachButton: {
        padding: SIZES.base,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
        borderRadius: 20,
        paddingHorizontal: SIZES.base * 2,
        paddingVertical: SIZES.base,
        marginHorizontal: SIZES.base,
        maxHeight: 100,
        ...FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.text,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: COLORS.lightGray,
    },
});

export default ChatScreen; 