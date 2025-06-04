import { RootState } from '../index';
import { Community, CommunityPost, CommunityComment } from '../../types/community';

// Community selectors
export const selectCommunities = (state: RootState) => Object.values(state.community.communities);
export const selectCommunityById = (state: RootState, communityId: string) => state.community.communities[communityId];
export const selectSelectedCommunity = (state: RootState) =>
    state.community.selectedCommunityId ? state.community.communities[state.community.selectedCommunityId] : null;

// Post selectors
export const selectPostsByCommunityId = (state: RootState, communityId: string) =>
    Object.values(state.community.posts).filter((post) => post.communityId === communityId);
export const selectPostById = (state: RootState, postId: string) => state.community.posts[postId];
export const selectSelectedPost = (state: RootState) =>
    state.community.selectedPostId ? state.community.posts[state.community.selectedPostId] : null;

// Comment selectors
export const selectCommentsByPostId = (state: RootState, postId: string) =>
    Object.values(state.community.comments).filter((comment) => comment.postId === postId);
export const selectCommentById = (state: RootState, commentId: string) => state.community.comments[commentId];

// Loading state selectors
export const selectCommunitiesLoading = (state: RootState) => state.community.loading.communities;
export const selectPostsLoading = (state: RootState) => state.community.loading.posts;
export const selectCommentsLoading = (state: RootState) => state.community.loading.comments;

// Error state selectors
export const selectCommunitiesError = (state: RootState) => state.community.error.communities;
export const selectPostsError = (state: RootState) => state.community.error.posts;
export const selectCommentsError = (state: RootState) => state.community.error.comments;

// Derived selectors
export const selectCommunityMembers = (state: RootState, communityId: string) => {
    const community = selectCommunityById(state, communityId);
    return community?.members || [];
};

export const selectCommunityMemberRole = (state: RootState, communityId: string, userId: string) => {
    const members = selectCommunityMembers(state, communityId);
    const member = members.find((m) => m.userId === userId);
    return member?.role || null;
};

export const selectCommunityPostsWithComments = (state: RootState, communityId: string) => {
    const posts = selectPostsByCommunityId(state, communityId);
    return posts.map((post) => ({
        ...post,
        comments: selectCommentsByPostId(state, post.id),
    }));
}; 