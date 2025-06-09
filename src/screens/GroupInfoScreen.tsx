import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import type { RootStackParamList } from '../navigation/types';
import { PROFILE_IMAGES } from '../constants/images';
import Header from '../components/Header';

type GroupInfoRouteProp = RouteProp<RootStackParamList, 'GroupInfo'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock group data
const MOCK_GROUP = {
    id: 'g1',
    name: 'Project Team',
    avatar: PROFILE_IMAGES.users[0],
    description: 'Team chat for the blockchain project development',
    participants: [
        { id: '1', name: 'John Doe', avatar: PROFILE_IMAGES.users[0], role: 'admin' },
        { id: '2', name: 'Jane Smith', avatar: PROFILE_IMAGES.users[1], role: 'member' },
        { id: '3', name: 'Mike Johnson', avatar: PROFILE_IMAGES.users[2], role: 'member' },
        { id: '4', name: 'Sarah Wilson', avatar: PROFILE_IMAGES.users[3], role: 'member' },
        { id: '5', name: 'David Brown', avatar: PROFILE_IMAGES.users[4], role: 'member' },
        { id: '6', name: 'Emily Davis', avatar: PROFILE_IMAGES.users[0], role: 'member' },
        { id: '7', name: 'Chris Lee', avatar: PROFILE_IMAGES.users[1], role: 'member' },
        { id: '8', name: 'Lisa Chen', avatar: PROFILE_IMAGES.users[2], role: 'member' },
    ],
    createdAt: '2024-01-15',
    createdBy: 'John Doe',
};

const ParticipantItem = ({ participant }: { participant: typeof MOCK_GROUP.participants[0] }) => {
    return (
        <View style={styles.participantItem}>
            <Image source={{ uri: participant.avatar }} style={styles.participantAvatar} />
            <View style={styles.participantInfo}>
                <Text style={styles.participantName}>{participant.name}</Text>
                <Text style={styles.participantRole}>{participant.role}</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
                <Icon name="ellipsis-vertical" size={20} color={COLORS.gray} />
            </TouchableOpacity>
        </View>
    );
};

const GroupInfoScreen = () => {
    const route = useRoute<GroupInfoRouteProp>();
    const navigation = useNavigation<NavigationProp>();

    const headerActions = [
        {
            icon: 'share-outline',
            onPress: () => console.log('Share group'),
        },
        {
            icon: 'settings-outline',
            onPress: () => console.log('Group settings'),
        },
    ];

    return (
        <View style={styles.container}>
            <Header
                title="Group Info"
                actions={headerActions}
            />
            <ScrollView style={styles.content}>
                {/* Group Header */}
                <View style={styles.groupHeader}>
                    <Image source={{ uri: MOCK_GROUP.avatar }} style={styles.groupAvatar} />
                    <Text style={styles.groupName}>{MOCK_GROUP.name}</Text>
                    <Text style={styles.groupDescription}>{MOCK_GROUP.description}</Text>
                    <Text style={styles.memberCount}>
                        {MOCK_GROUP.participants.length} members
                    </Text>
                </View>

                {/* Quick Actions */}
                <View style={styles.actionsSection}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="videocam-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.actionText}>Video Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="call-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.actionText}>Voice Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="search-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.actionText}>Search</Text>
                    </TouchableOpacity>
                </View>

                {/* Participants Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Participants</Text>
                        <TouchableOpacity style={styles.addButton}>
                            <Icon name="add" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={MOCK_GROUP.participants}
                        renderItem={({ item }) => <ParticipantItem participant={item} />}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                </View>

                {/* Group Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Group Settings</Text>
                    <TouchableOpacity style={styles.settingItem}>
                        <Icon name="notifications-outline" size={24} color={COLORS.gray} />
                        <Text style={styles.settingText}>Notifications</Text>
                        <Icon name="chevron-forward" size={20} color={COLORS.gray} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Icon name="lock-closed-outline" size={24} color={COLORS.gray} />
                        <Text style={styles.settingText}>Privacy</Text>
                        <Icon name="chevron-forward" size={20} color={COLORS.gray} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Icon name="color-palette-outline" size={24} color={COLORS.gray} />
                        <Text style={styles.settingText}>Theme</Text>
                        <Icon name="chevron-forward" size={20} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>

                {/* Leave Group */}
                <TouchableOpacity style={styles.leaveButton}>
                    <Text style={styles.leaveButtonText}>Leave Group</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
    },
    groupHeader: {
        alignItems: 'center',
        padding: SIZES.base * 3,
        backgroundColor: COLORS.white,
        marginBottom: SIZES.base,
    },
    groupAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: SIZES.base * 2,
    },
    groupName: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.h3,
        color: COLORS.text,
        marginBottom: SIZES.base,
    },
    groupDescription: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        textAlign: 'center',
        marginBottom: SIZES.base,
        paddingHorizontal: SIZES.base * 2,
    },
    memberCount: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
        color: COLORS.primary,
    },
    actionsSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
        marginBottom: SIZES.base,
    },
    actionButton: {
        alignItems: 'center',
        padding: SIZES.base,
    },
    actionText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.text,
        marginTop: SIZES.base / 2,
    },
    section: {
        backgroundColor: COLORS.white,
        marginBottom: SIZES.base,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.base * 2,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    sectionTitle: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.text,
    },
    addButton: {
        padding: SIZES.base,
    },
    participantItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.base * 2,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    participantAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: SIZES.base * 2,
    },
    participantInfo: {
        flex: 1,
    },
    participantName: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.text,
    },
    participantRole: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        textTransform: 'capitalize',
    },
    moreButton: {
        padding: SIZES.base,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.base * 2,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    settingText: {
        flex: 1,
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.text,
        marginLeft: SIZES.base * 2,
    },
    leaveButton: {
        margin: SIZES.base * 2,
        padding: SIZES.base * 2,
        backgroundColor: COLORS.error,
        borderRadius: SIZES.base,
        alignItems: 'center',
    },
    leaveButtonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.white,
    },
});

export default GroupInfoScreen; 