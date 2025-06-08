export type RootStackParamList = {
    Main: undefined;
    Chat: { chatId: string; name: string };
    Profile: { userId: string };
    Settings: undefined;
    CommunityStack: undefined;
};

export type MainTabParamList = {
    Chats: undefined;
    Status: undefined;
    Calendar: undefined;
    Wallets: undefined;
    Communities: undefined;
};

export type CommunityStackParamList = {
    CommunityList: undefined;
    Community: { communityId: string };
    CreateCommunity: undefined;
    CreatePost: { communityId: string };
    PostComments: { postId: string; communityId: string };
    CommunitySettings: { communityId: string };
    Profile: { userId: string };
};
