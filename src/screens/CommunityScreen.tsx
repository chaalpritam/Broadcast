import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchCommunityPosts,
    fetchPostComments,
    togglePostLike,
    setSelectedCommunity,
} from '../store/slices/communitySlice';
import {
    selectCommunityById,
    selectPostsByCommunityId,
    selectPostsLoading,
    selectPostsError,
    selectCommentsLoading,
} from '../store/selectors/communitySelectors';
import { COLORS, SIZES } from '../constants/theme';
import CommunityHeader from '../components/community/CommunityHeader';
import CommunityPost from '../components/community/CommunityPost';
import FloatingButton from '../components/FloatingButton';
import EmptyState from '../components/EmptyState';

const CommunityScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useAppDispatch();
    const { communityId } = route.params as { communityId: string };

    const [refreshing, setRefreshing] = useState(false);
    const [isJoining, setIsJoining] = useState(false);

    const community = useAppSelector(state => selectCommunityById(state, communityId));
    const posts = useAppSelector(state => selectPostsByCommunityId(state, communityId));
    const isLoading = useAppSelector(selectPostsLoading);
    const error = useAppSelector(selectPostsError);
    const isLoadingComments = useAppSelector(selectCommentsLoading);

    useEffect(() => {
        dispatch(setSelectedCommunity(communityId));
        loadCommunityData();
    }, [communityId, dispatch]);

    const loadCommunityData = useCallback(async () => {
        await Promise.all([
            dispatch(fetchCommunityPosts(communityId)),
            // Load comments for each post
            ...posts.map(post => dispatch(fetchPostComments({ postId: post.id, communityId })),
        ]);
    }, [dispatch, communityId, posts]);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadCommunityData();
        setRefreshing(false);
    }, [loadCommunityData]);

    const handleJoinPress = useCallback(async () => {
        setIsJoining(true);
        try {
            // TODO: Implement join community API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            Alert.alert('Success', 'You have joined the community!');
        } catch (error) {
            Alert.alert('Error', 'Failed to join community. Please try again.');
        } finally {
            setIsJoining(false);
        }
    }, []);

    const handleSharePress = useCallback(() => {
        // TODO: Implement share functionality
        Alert.alert('Coming Soon', 'Share functionality will be implemented soon');
    }, []);

    const handleSettingsPress = useCallback(() => {
        navigation.navigate('CommunitySettings', { communityId });
    }, [navigation, communityId]);

    const handleCreatePost = useCallback(() => {
        navigation.navigate('CreatePost', { communityId });
    }, [navigation, communityId]);

    const handlePostLike = useCallback((postId: string) => {
        dispatch(togglePostLike(postId));
    }, [dispatch]);

    const handlePostComment = useCallback((postId: string) => {
        navigation.navigate('PostComments', { postId, communityId });
    }, [navigation, communityId]);

    const handlePostShare = useCallback((postId: string) => {
        // TODO: Implement post share functionality
        Alert.alert('Coming Soon', 'Post share functionality will be implemented soon');
    }, []);

    const handleAuthorPress = useCallback((userId: string) => {
        navigation.navigate('Profile', { userId });
    }, [navigation]);

    const handlePostOptions = useCallback((postId: string) => {
        // TODO: Implement post options (edit, delete, report)
        Alert.alert('Coming Soon', 'Post options will be implemented soon');
    }, []);

    const renderEmptyList = () => {
        if (isLoading) {
            return (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            );
        }

        if (error) {
            return (
                <EmptyState
                    icon="alert-circle"
                    title="Error Loading Posts"
                    message={error}
                    action={{
                        label: 'Try Again',
                        onPress: loadCommunityData,
                    }}
                />
            );
        }

        return (
            <EmptyState
                icon="chatbubble-ellipses"
                title="No Posts Yet"
                message="Be the first to create a post in this community!"
                action={{
                    label: 'Create Post',
                    onPress: handleCreatePost,
                }}
            />
        );
    };

    if (!community) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item: post }) => (
                    <CommunityPost
                        id={post.id}
                        author={post.author}
                        content={post.content}
                        images={post.images}
                        likes={post.likes}
                        comments={post.comments}
                        timestamp={post.createdAt}
                        isLiked={post.isLiked}
                        onLikePress={() => handlePostLike(post.id)}
                        onCommentPress={() => handlePostComment(post.id)}
                        onSharePress={() => handlePostShare(post.id)}
                        onAuthorPress={() => handleAuthorPress(post.author.id)}
                        onOptionsPress={() => handlePostOptions(post.id)}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <CommunityHeader
                        name={community.name}
                        description={community.description}
                        avatar={community.avatar}
                        coverImage={community.coverImage}
                        memberCount={community.memberCount}
                        isJoined={false} // TODO: Get from Redux state
                        onJoinPress={handleJoinPress}
                        onSharePress={handleSharePress}
                        onSettingsPress={handleSettingsPress}
                        role="member" // TODO: Get from Redux state
                    />
                }
                ListEmptyComponent={renderEmptyList}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing || isLoadingComments}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]}
                        tintColor={COLORS.primary}
                    />
                }
            />
            <FloatingButton
                icon="add"
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
    listContent: {
        flexGrow: 1,
        paddingBottom: SIZES.base * 4,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.base * 4,
    },
    createButton: {
        position: 'absolute',
        right: SIZES.base * 2,
        bottom: SIZES.base * 2,
    },
});

export default CommunityScreen; 