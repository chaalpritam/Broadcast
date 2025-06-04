import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CommunityState, Community, CommunityPost, CommunityComment } from '../../types/community';

// Initial state
const initialState: CommunityState = {
    communities: {},
    posts: {},
    comments: {},
    loading: {
        communities: false,
        posts: false,
        comments: false,
    },
    error: {
        communities: null,
        posts: null,
        comments: null,
    },
    selectedCommunityId: null,
    selectedPostId: null,
};

// Async thunks
export const fetchCommunities = createAsyncThunk(
    'community/fetchCommunities',
    async (_, { rejectWithValue }) => {
        try {
            // TODO: Replace with actual API call
            const response = await new Promise<Community[]>((resolve) =>
                setTimeout(() => resolve([]), 1000)
            );
            return response;
        } catch (error) {
            return rejectWithValue('Failed to fetch communities');
        }
    }
);

export const fetchCommunityPosts = createAsyncThunk(
    'community/fetchCommunityPosts',
    async (communityId: string, { rejectWithValue }) => {
        try {
            // TODO: Replace with actual API call
            const response = await new Promise<CommunityPost[]>((resolve) =>
                setTimeout(() => resolve([]), 1000)
            );
            return { communityId, posts: response };
        } catch (error) {
            return rejectWithValue('Failed to fetch community posts');
        }
    }
);

export const fetchPostComments = createAsyncThunk(
    'community/fetchPostComments',
    async ({ postId, communityId }: { postId: string; communityId: string }, { rejectWithValue }) => {
        try {
            // TODO: Replace with actual API call
            const response = await new Promise<CommunityComment[]>((resolve) =>
                setTimeout(() => resolve([]), 1000)
            );
            return { postId, comments: response };
        } catch (error) {
            return rejectWithValue('Failed to fetch post comments');
        }
    }
);

export const createCommunity = createAsyncThunk(
    'community/createCommunity',
    async (community: Omit<Community, 'id' | 'createdAt' | 'memberCount' | 'members'>, { rejectWithValue }) => {
        try {
            // TODO: Replace with actual API call
            const response = await new Promise<Community>((resolve) =>
                setTimeout(() => resolve({ ...community, id: '1', createdAt: new Date().toISOString(), memberCount: 1, members: [] }), 1000)
            );
            return response;
        } catch (error) {
            return rejectWithValue('Failed to create community');
        }
    }
);

export const createPost = createAsyncThunk(
    'community/createPost',
    async ({ communityId, content, images }: { communityId: string; content: string; images?: string[] }, { rejectWithValue }) => {
        try {
            // TODO: Replace with actual API call
            const response = await new Promise<CommunityPost>((resolve) =>
                setTimeout(() => resolve({
                    id: '1',
                    communityId,
                    content,
                    images,
                    author: { id: '1', name: 'User', role: 'member' },
                    likes: 0,
                    comments: 0,
                    isLiked: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }), 1000)
            );
            return response;
        } catch (error) {
            return rejectWithValue('Failed to create post');
        }
    }
);

// Slice
const communitySlice = createSlice({
    name: 'community',
    initialState,
    reducers: {
        setSelectedCommunity: (state, action: PayloadAction<string | null>) => {
            state.selectedCommunityId = action.payload;
        },
        setSelectedPost: (state, action: PayloadAction<string | null>) => {
            state.selectedPostId = action.payload;
        },
        togglePostLike: (state, action: PayloadAction<string>) => {
            const post = state.posts[action.payload];
            if (post) {
                post.isLiked = !post.isLiked;
                post.likes += post.isLiked ? 1 : -1;
            }
        },
        toggleCommentLike: (state, action: PayloadAction<string>) => {
            const comment = state.comments[action.payload];
            if (comment) {
                comment.isLiked = !comment.isLiked;
                comment.likes += comment.isLiked ? 1 : -1;
            }
        },
    },
    extraReducers: (builder) => {
        // Fetch Communities
        builder
            .addCase(fetchCommunities.pending, (state) => {
                state.loading.communities = true;
                state.error.communities = null;
            })
            .addCase(fetchCommunities.fulfilled, (state, action) => {
                state.loading.communities = false;
                action.payload.forEach((community) => {
                    state.communities[community.id] = community;
                });
            })
            .addCase(fetchCommunities.rejected, (state, action) => {
                state.loading.communities = false;
                state.error.communities = action.payload as string;
            });

        // Fetch Community Posts
        builder
            .addCase(fetchCommunityPosts.pending, (state) => {
                state.loading.posts = true;
                state.error.posts = null;
            })
            .addCase(fetchCommunityPosts.fulfilled, (state, action) => {
                state.loading.posts = false;
                action.payload.posts.forEach((post) => {
                    state.posts[post.id] = post;
                });
            })
            .addCase(fetchCommunityPosts.rejected, (state, action) => {
                state.loading.posts = false;
                state.error.posts = action.payload as string;
            });

        // Fetch Post Comments
        builder
            .addCase(fetchPostComments.pending, (state) => {
                state.loading.comments = true;
                state.error.comments = null;
            })
            .addCase(fetchPostComments.fulfilled, (state, action) => {
                state.loading.comments = false;
                action.payload.comments.forEach((comment) => {
                    state.comments[comment.id] = comment;
                });
            })
            .addCase(fetchPostComments.rejected, (state, action) => {
                state.loading.comments = false;
                state.error.comments = action.payload as string;
            });

        // Create Community
        builder
            .addCase(createCommunity.fulfilled, (state, action) => {
                state.communities[action.payload.id] = action.payload;
            });

        // Create Post
        builder
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts[action.payload.id] = action.payload;
            });
    },
});

export const {
    setSelectedCommunity,
    setSelectedPost,
    togglePostLike,
    toggleCommentLike,
} = communitySlice.actions;

export default communitySlice.reducer; 