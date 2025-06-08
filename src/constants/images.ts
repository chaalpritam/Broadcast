// Profile images from Unsplash
export const PROFILE_IMAGES = {
    // Default profile images for users
    users: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', // Woman with brown hair
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', // Man with glasses
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', // Woman with blonde hair
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', // Man with beard
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', // Woman with black hair
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop', // Man with short hair
        'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop', // Man with curly hair
        'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop', // Woman with red hair
    ],
    // Default profile image for communities
    communities: [
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=150&h=150&fit=crop', // Group of people
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop', // Team meeting
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=150&h=150&fit=crop', // Office team
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop', // Team collaboration
    ],
    // Default cover images for communities
    communityCovers: [
        'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&h=200&fit=crop', // Office space
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=200&fit=crop', // Team meeting
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=200&fit=crop', // Modern office
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=200&fit=crop', // Team collaboration
    ],
    // Default profile image for the current user
    defaultUser: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop', // Professional headshot
};

// Helper function to get a random profile image
export const getRandomProfileImage = (type: 'users' | 'communities' = 'users') => {
    const images = PROFILE_IMAGES[type];
    return images[Math.floor(Math.random() * images.length)];
};

// Helper function to get a random community cover image
export const getRandomCommunityCover = () => {
    const images = PROFILE_IMAGES.communityCovers;
    return images[Math.floor(Math.random() * images.length)];
}; 