import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';
import { MainTabParamList, RootStackParamList } from './types';

// Import screens
import ChatsScreen from '../screens/ChatsScreen';
import StatusScreen from '../screens/StatusScreen';
import CalendarScreen from '../screens/CalendarScreen';
import WalletsScreen from '../screens/WalletsScreen';
import ChatScreen from '../screens/ChatScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AgentsNavigator from './AgentsNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HeaderRight = () => {
    const navigation = useNavigation<NavigationProp>();
    
    return (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Settings')}
            >
                <Icon name="settings-outline" size={24} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    );
};

const HeaderLeft = () => {
    const navigation = useNavigation<NavigationProp>();
    
    return (
        <View style={{ flexDirection: 'row', marginLeft: 15 }}>
            <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate('Profile', { userId: 'current' })}
            >
                <Icon name="person-outline" size={24} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    );
};

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
                headerRight: () => <HeaderRight />,
                headerLeft: () => <HeaderLeft />,
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
                name="Wallets"
                component={WalletsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="wallet-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Agents"
                component={AgentsNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="construct-outline" size={size} color={color} />
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
            <Stack.Screen name="GroupInfo" component={GroupInfoScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;

