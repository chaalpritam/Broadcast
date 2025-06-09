import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, FONTS } from '../constants/theme';

// Screens
import AgentsScreen from '../screens/AgentsScreen';
import AgentScreen from '../screens/AgentScreen';
import CreateAgentScreen from '../screens/CreateAgentScreen';

// Types
export type AgentsStackParamList = {
    AgentsList: undefined;
    Agent: { agentId: string };
    CreateAgent: undefined;
    AgentSettings: { agentId: string };
    Profile: { userId: string };
};

const Stack = createNativeStackNavigator<AgentsStackParamList>();

const AgentsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.white,
                },
                headerTitleStyle: {
                    fontFamily: FONTS.medium,
                    fontSize: 18,
                    color: COLORS.text,
                },
                headerTintColor: COLORS.primary,
            }}>
            <Stack.Screen
                name="AgentsList"
                component={AgentsScreen}
                options={{
                    title: 'AI Agents',
                }}
            />
            <Stack.Screen
                name="Agent"
                component={AgentScreen}
                options={({ route }: { route: any }) => ({
                    title: 'Agent Details',
                })}
            />
            <Stack.Screen
                name="CreateAgent"
                component={CreateAgentScreen}
                options={{
                    title: 'Add Agent',
                    presentation: 'modal',
                }}
            />
            {/* Additional screens will be added here as we create them */}
        </Stack.Navigator>
    );
};

export default AgentsNavigator; 