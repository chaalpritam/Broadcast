export type CommunityRole = 'owner' | 'admin' | 'moderator' | 'member';

export interface CommunityMember {
    userId: string;
    role: CommunityRole;
    joinedAt: string;
    name: string;
    avatar?: string;
}

export interface Community {
    id: string;
    name: string;
    description: string;
    avatar?: string;
    coverImage?: string;
    isPrivate: boolean;
    memberCount: number;
    createdAt: string;
    createdBy: string;
    members: CommunityMember[];
}

export interface CommunityPost {
    id: string;
    communityId: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
        role: CommunityRole;
    };
    content: string;
    images?: string[];
    likes: number;
    comments: number;
    isLiked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CommunityComment {
    id: string;
    postId: string;
    communityId: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
        role: CommunityRole;
    };
    content: string;
    likes: number;
    isLiked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CommunityState {
    communities: {
        [key: string]: Community;
    };
    posts: {
        [key: string]: CommunityPost;
    };
    comments: {
        [key: string]: CommunityComment;
    };
    loading: {
        communities: boolean;
        posts: boolean;
        comments: boolean;
    };
    error: {
        communities: string | null;
        posts: string | null;
        comments: string | null;
    };
    selectedCommunityId: string | null;
    selectedPostId: string | null;
} 