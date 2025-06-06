import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, FONTS } from '../constants/theme';

// Screens
import CommunityListScreen from '../screens/CommunityListScreen';
import CommunityScreen from '../screens/CommunityScreen';
import CreateCommunityScreen from '../screens/CreateCommunityScreen';
import CreatePostScreen from '../screens/CreatePostScreen';

// Types
export type CommunityStackParamList = {
    CommunityList: undefined;
    Community: { communityId: string };
    CreateCommunity: undefined;
    CreatePost: { communityId: string };
    PostComments: { postId: string; communityId: string };
    CommunitySettings: { communityId: string };
    Profile: { userId: string };
};

const Stack = createNativeStackNavigator<CommunityStackParamList>();

const CommunityNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.white,
                    // elevation: 0,
                    // shadowOpacity: 0,
                },
                headerTitleStyle: {
                    fontFamily: FONTS.medium,
                    fontSize: 18,
                    color: COLORS.text,
                },
                // headerBackTitleVisible: false,
                headerTintColor: COLORS.primary,
            }}>
            <Stack.Screen
                name="CommunityList"
                component={CommunityListScreen}
                options={{
                    title: 'Communities',
                }}
            />
            <Stack.Screen
                name="Community"
                component={CommunityScreen}
                options={({ route }: { route: any }) => ({
                    title: 'Community',
                    // We'll update this dynamically based on the community name
                    // once we have the Redux state
                })}
            />
            <Stack.Screen
                name="CreateCommunity"
                component={CreateCommunityScreen}
                options={{
                    title: 'Create Community',
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="CreatePost"
                component={CreatePostScreen}
                options={{
                    title: 'Create Post',
                    presentation: 'modal',
                }}
            />
            {/* Additional screens will be added here as we create them */}
        </Stack.Navigator>
    );
};

export default CommunityNavigator;
