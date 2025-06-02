import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock data for chats
const MOCK_CHATS = [
    {
        id: '1',
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
        avatar: 'https://via.placeholder.com/50',
        unreadCount: 2,
    },
    {
        id: '2',
        name: 'Jane Smith',
        lastMessage: 'See you tomorrow!',
        time: '9:45 AM',
        avatar: 'https://via.placeholder.com/50',
        unreadCount: 0,
    },
    // Add more mock chats as needed
];

const ChatItem = ({ item }: { item: typeof MOCK_CHATS[0] }) => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('Chat', { chatId: item.id, name: item.name })}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.chatFooter}>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {item.lastMessage}
                    </Text>
                    {item.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const ChatsScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={MOCK_CHATS}
                renderItem={({ item }) => <ChatItem item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    chatItem: {
        flexDirection: 'row',
        padding: SIZES.base * 2,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
        backgroundColor: COLORS.white,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: SIZES.base * 2,
    },
    chatInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    name: {
        ...FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.text,
    },
    time: {
        ...FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    chatFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        ...FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        flex: 1,
        marginRight: SIZES.base,
    },
    unreadBadge: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.base,
    },
    unreadCount: {
        ...FONTS.medium,
        fontSize: SIZES.small,
        color: COLORS.white,
    },
});

export default ChatsScreen; 