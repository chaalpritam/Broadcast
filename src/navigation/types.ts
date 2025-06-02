export type RootStackParamList = {
    Main: undefined;
    Chat: { chatId: string; name: string };
    Profile: { userId: string };
    Settings: undefined;
};

export type MainTabParamList = {
    Chats: undefined;
    Status: undefined;
    Calls: undefined;
    Camera: undefined;
}; 