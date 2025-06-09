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
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import type { RootStackParamList } from '../navigation/types';
import { PROFILE_IMAGES, getRandomProfileImage } from '../constants/images';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type ChatItem = {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    avatar: string;
    unreadCount: number;
    isGroup: boolean;
    participantCount?: number;
};

// Mock data for individual chats
const MOCK_CHATS = [
    {
        id: '1',
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
        avatar: PROFILE_IMAGES.users[0],
        unreadCount: 2,
        isGroup: false,
    },
    {
        id: '2',
        name: 'Jane Smith',
        lastMessage: 'See you tomorrow!',
        time: '9:45 AM',
        avatar: PROFILE_IMAGES.users[1],
        unreadCount: 0,
        isGroup: false,
    },
    {
        id: '3',
        name: 'Mike Johnson',
        lastMessage: 'The meeting is at 2 PM',
        time: 'Yesterday',
        avatar: PROFILE_IMAGES.users[2],
        unreadCount: 1,
        isGroup: false,
    },
    {
        id: '4',
        name: 'Sarah Wilson',
        lastMessage: 'Thanks for your help!',
        time: 'Yesterday',
        avatar: PROFILE_IMAGES.users[3],
        unreadCount: 0,
        isGroup: false,
    },
    {
        id: '5',
        name: 'David Brown',
        lastMessage: 'Can you review the document?',
        time: 'Monday',
        avatar: PROFILE_IMAGES.users[4],
        unreadCount: 3,
        isGroup: false,
    },
];

// Mock data for group chats
const MOCK_GROUPS = [
    {
        id: 'g1',
        name: 'Project Team',
        lastMessage: 'Meeting scheduled for tomorrow',
        time: '11:30 AM',
        avatar: PROFILE_IMAGES.users[0],
        unreadCount: 5,
        isGroup: true,
        participantCount: 8,
    },
    {
        id: 'g2',
        name: 'Family Group',
        lastMessage: 'Happy birthday! 🎉',
        time: '9:15 AM',
        avatar: PROFILE_IMAGES.users[1],
        unreadCount: 0,
        isGroup: true,
        participantCount: 12,
    },
    {
        id: 'g3',
        name: 'Book Club',
        lastMessage: 'Great discussion today!',
        time: 'Yesterday',
        avatar: PROFILE_IMAGES.users[2],
        unreadCount: 2,
        isGroup: true,
        participantCount: 6,
    },
    {
        id: 'g4',
        name: 'Gaming Squad',
        lastMessage: 'Who\'s up for a game tonight?',
        time: 'Yesterday',
        avatar: PROFILE_IMAGES.users[3],
        unreadCount: 0,
        isGroup: true,
        participantCount: 4,
    },
];

// Combine individual chats and groups
const ALL_CHATS = [...MOCK_CHATS, ...MOCK_GROUPS];

const ChatItem = ({ item }: { item: ChatItem }) => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('Chat', { 
                chatId: item.id, 
                name: item.name,
                isGroup: item.isGroup 
            })}>
            <View style={styles.avatarContainer}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                {item.isGroup && (
                    <View style={styles.groupIndicator}>
                        <Icon name="people" size={12} color={COLORS.white} />
                    </View>
                )}
            </View>
            <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        {item.isGroup && (
                            <Text style={styles.participantCount}>
                                {item.participantCount} members
                            </Text>
                        )}
                    </View>
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
                data={ALL_CHATS}
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
    avatarContainer: {
        position: 'relative',
        marginRight: SIZES.base * 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    groupIndicator: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    chatInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SIZES.base,
    },
    nameContainer: {
        flex: 1,
        marginRight: SIZES.base,
    },
    name: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.text,
    },
    participantCount: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small - 1,
        color: COLORS.gray,
        marginTop: 2,
    },
    time: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    chatFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        fontFamily: FONTS.regular,
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
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
        color: COLORS.white,
    },
});

export default ChatsScreen; 