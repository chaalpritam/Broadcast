export type RootStackParamList = {
    Main: undefined;
    Chat: { chatId: string; name: string };
    Profile: { userId: string };
    Settings: undefined;
    AgentStack: undefined;
};

export type MainTabParamList = {
    Chats: undefined;
    Status: undefined;
    Calendar: undefined;
    Wallets: undefined;
    Agents: undefined;
};

export type AgentsStackParamList = {
    AgentsList: undefined;
    Agent: { agentId: string };
    CreateAgent: undefined;
    AgentSettings: { agentId: string };
    Profile: { userId: string };
};
