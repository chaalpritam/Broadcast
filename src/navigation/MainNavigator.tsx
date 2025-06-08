import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';
import { MainTabParamList, RootStackParamList } from './types';

// Import screens
import ChatsScreen from '../screens/ChatsScreen';
import StatusScreen from '../screens/StatusScreen';
import CalendarScreen from '../screens/CalendarScreen';
import CameraScreen from '../screens/CameraScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CommunityNavigator from './CommunityNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.background,
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 60,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.gray,
                headerStyle: {
                    backgroundColor: COLORS.primary,
                },
                headerTintColor: COLORS.white,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Tab.Screen
                name="Chats"
                component={ChatsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="chatbubbles-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Status"
                component={StatusScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="camera-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="calendar-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Camera"
                component={CameraScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="camera" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Communities"
                component={CommunityNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="people-outline" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

const MainNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.primary,
                },
                headerTintColor: COLORS.white,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen
                name="Main"
                component={MainTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;

