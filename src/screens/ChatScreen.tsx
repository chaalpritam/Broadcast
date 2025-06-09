import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Text,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import type { RootStackParamList } from '../navigation/types';
import Header from '../components/Header';
import MessageBubble from '../components/MessageBubble';
import { useAppSelector, useAppDispatch } from '../hooks';
import {
    setActiveChat,
    addMessage,
    markChatAsRead,
    setMessages,
} from '../store/slices/chatsSlice';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ChatScreen = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState('');

    // Get chat data from Redux store
    const { activeChat, messages, isLoading, error } = useAppSelector(state => state.chat);
    const currentUser = useAppSelector(state => state.chat.user); // Changed from state.auth.user to state.chat.user
    const chatMessages = messages[route.params.chatId] || [];
    const chat = useAppSelector(state =>
        state.chat.chats.find(c => c.id === route.params.chatId)
    );

    useEffect(() => {
        // Set active chat when component mounts
        dispatch(setActiveChat(route.params.chatId));

        // Mark chat as read
        dispatch(markChatAsRead(route.params.chatId));

        // TODO: Load messages from API
        // For now, we'll use mock data
        const mockMessages = [
            {
                id: '1',
                text: 'Hey, how are you?',
                time: '10:30 AM',
                isSent: true,
                senderId: currentUser?.id || 'me',
                senderName: currentUser?.name || 'You',
                chatId: route.params.chatId,
            },
            {
                id: '2',
                text: "I'm good, thanks! How about you?",
                time: '10:31 AM',
                isSent: false,
                senderId: route.params.chatId,
                senderName: route.params.isGroup ? 'John Doe' : route.params.name,
                chatId: route.params.chatId,
            },
        ];
        dispatch(setMessages({ chatId: route.params.chatId, messages: mockMessages }));

        return () => {
            // Clear active chat when component unmounts
            dispatch(setActiveChat(''));
        };
    }, [dispatch, route.params.chatId, currentUser?.id]);

    const sendMessage = () => {
        if (message.trim().length === 0 || !currentUser) return;

        const newMessage = {
            id: Date.now().toString(),
            text: message.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSent: true,
            senderId: currentUser.id,
            senderName: currentUser.name || 'You',
            chatId: route.params.chatId,
        };

        dispatch(addMessage(newMessage));
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
            icon: route.params.isGroup ? 'people-outline' : 'ellipsis-vertical',
            onPress: () => {
                if (route.params.isGroup) {
                    navigation.navigate('GroupInfo', { 
                        groupId: route.params.chatId, 
                        groupName: route.params.name 
                    });
                } else {
                    console.log('More options');
                }
            },
        },
    ];

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
            <Header
                title={route.params.name}
                avatar={chat?.participants[0]?.avatar}
                actions={headerActions}
                subtitle={route.params.isGroup ? 'Group' : undefined}
            />
            <FlatList
                data={chatMessages}
                renderItem={({ item }) => (
                    <MessageBubble
                        message={item.text}
                        time={item.time}
                        isSent={item.isSent}
                        senderName={item.senderName}
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
                    placeholder={route.params.isGroup ? "Message to group" : "Message"}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: SIZES.base * 2,
    },
    errorText: {
        fontFamily: FONTS.regular,
        color: COLORS.error,
        textAlign: 'center',
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
        fontFamily: FONTS.regular,
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