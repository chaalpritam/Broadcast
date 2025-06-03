import React, { useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import CommunityHeader from '../components/community/CommunityHeader';
import CommunityPost from '../components/community/CommunityPost';
import FloatingButton from '../components/FloatingButton';

// Mock data - will be replaced with Redux state
const mockCommunity = {
    id: '1',
    name: 'Tech Enthusiasts',
    description: 'A community for discussing the latest in technology, programming, and innovation. Join us to share knowledge, ask questions, and connect with fellow tech enthusiasts.',
    avatar: 'https://picsum.photos/200',
    coverImage: 'https://picsum.photos/800/400',
    memberCount: 1234,
    isJoined: true,
    role: 'member' as const,
};

const mockPosts = [
    {
        id: '1',
        author: {
            id: '101',
            name: 'John Doe',
            avatar: 'https://picsum.photos/201',
            role: 'admin' as const,
        },
        content: 'Just released a new open-source project! Check it out and let me know what you think. #opensource #programming',
        images: ['https://picsum.photos/400/300'],
        likes: 42,
        comments: 12,
        timestamp: '2 hours ago',
        isLiked: false,
    },
    {
        id: '2',
        author: {
            id: '102',
            name: 'Jane Smith',
            avatar: 'https://picsum.photos/202',
            role: 'member' as const,
        },
        content: 'What are your thoughts on the latest React Native update? I\'ve been testing it out and would love to hear your experiences.',
        likes: 28,
        comments: 15,
        timestamp: '5 hours ago',
        isLiked: true,
    },
];

const CommunityScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [posts, setPosts] = useState(mockPosts);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        // TODO: Fetch fresh data from API
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    }, []);

    const handleJoinPress = useCallback(() => {
        // TODO: Implement join community logic
        console.log('Join community');
    }, []);

    const handleSharePress = useCallback(() => {
        // TODO: Implement share community logic
        console.log('Share community');
    }, []);

    const handleSettingsPress = useCallback(() => {
        navigation.navigate('CommunitySettings', { communityId: mockCommunity.id });
    }, [navigation]);

    const handleCreatePost = useCallback(() => {
        navigation.navigate('CreatePost', { communityId: mockCommunity.id });
    }, [navigation]);

    const handlePostLike = useCallback((postId: string) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        isLiked: !post.isLiked,
                        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    }
                    : post
            )
        );
    }, []);

    const handlePostComment = useCallback((postId: string) => {
        navigation.navigate('PostComments', { postId, communityId: mockCommunity.id });
    }, [navigation]);

    const handlePostShare = useCallback((postId: string) => {
        // TODO: Implement share post logic
        console.log('Share post:', postId);
    }, []);

    const handleAuthorPress = useCallback((authorId: string) => {
        navigation.navigate('Profile', { userId: authorId });
    }, [navigation]);

    const handlePostOptions = useCallback((postId: string) => {
        // TODO: Show post options menu
        console.log('Post options:', postId);
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <CommunityPost
                        {...item}
                        onLikePress={() => handlePostLike(item.id)}
                        onCommentPress={() => handlePostComment(item.id)}
                        onSharePress={() => handlePostShare(item.id)}
                        onAuthorPress={() => handleAuthorPress(item.author.id)}
                        onOptionsPress={() => handlePostOptions(item.id)}
                    />
                )}
                keyExtractor={item => item.id}
                ListHeaderComponent={
                    <CommunityHeader
                        {...mockCommunity}
                        onJoinPress={handleJoinPress}
                        onSharePress={handleSharePress}
                        onSettingsPress={handleSettingsPress}
                    />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]}
                    />
                }
                contentContainerStyle={styles.listContent}
            />
            <FloatingButton
                icon="create-outline"
                onPress={handleCreatePost}
                style={styles.createButton}
            />
        </View>
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
    listContent: {
        paddingBottom: SIZES.base * 4,
    },
    createButton: {
        position: 'absolute',
        right: SIZES.base * 2,
        bottom: SIZES.base * 2,
    },
});

export default CommunityScreen; 