import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import FloatingButton from '../components/FloatingButton';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setStatuses, setMyStatus } from '../store/slices/statusSlice';
import type { Status } from '../types/models';
import type { RootState } from '../store';
import { PROFILE_IMAGES, getRandomProfileImage } from '../constants/images';

interface StatusItemData extends Status {
    name: string;
    avatar: string;
    isMyStatus: boolean;
}

const StatusItem = ({ item, onPress }: { item: StatusItemData; onPress: () => void }) => {
    return (
        <TouchableOpacity style={styles.statusItem} onPress={onPress}>
            <Avatar
                uri={item.avatar}
                showBadge={item.isMyStatus}
                badgeIcon="add-circle"
                badgeColor={COLORS.primary}
            />
            <View style={styles.statusInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );
};

const StatusScreen = () => {
    const dispatch = useAppDispatch();
    const { statuses, myStatus, isLoading, error } = useAppSelector((state: RootState) => state.status);
    const currentUser = useAppSelector((state: RootState) => state.chat.user);

    useEffect(() => {
        // TODO: Load statuses from API
        // For now, we'll use mock data
        const mockStatuses: StatusItemData[] = [
            {
                id: '1',
                userId: 'me',
                type: 'text' as const,
                content: 'Tap to add status update',
                time: 'Tap to add status update',
                viewedBy: [],
                name: 'My Status',
                avatar: PROFILE_IMAGES.defaultUser,
                isMyStatus: true,
            },
            {
                id: '2',
                userId: '2',
                type: 'image' as const,
                content: 'https://via.placeholder.com/500',
                time: 'Today, 10:30 AM',
                viewedBy: [],
                name: 'John Doe',
                avatar: PROFILE_IMAGES.users[0],
                isMyStatus: false,
            },
            {
                id: '3',
                userId: '3',
                type: 'video' as const,
                content: 'https://via.placeholder.com/500',
                time: 'Today, 9:45 AM',
                viewedBy: [],
                name: 'Jane Smith',
                avatar: PROFILE_IMAGES.users[1],
                isMyStatus: false,
            },
            {
                id: '4',
                userId: '4',
                type: 'image' as const,
                content: 'https://via.placeholder.com/500',
                time: 'Yesterday, 5:30 PM',
                viewedBy: [],
                name: 'Mike Johnson',
                avatar: PROFILE_IMAGES.users[2],
                isMyStatus: false,
            },
        ];

        dispatch(setStatuses(mockStatuses));
        dispatch(setMyStatus(mockStatuses[0]));
    }, [dispatch]);

    const handleStatusPress = (status: StatusItemData) => {
        if (status.isMyStatus) {
            // Navigate to camera or status creation
            console.log('Create new status');
        } else {
            // View status
            console.log('View status:', status.id);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    const allStatuses = myStatus ? [myStatus as StatusItemData, ...statuses as StatusItemData[]] : statuses as StatusItemData[];

    return (
        <View style={styles.container}>
            <Header title="Status" />
            <FlatList
                data={allStatuses}
                renderItem={({ item }) => (
                    <StatusItem
                        item={item}
                        onPress={() => handleStatusPress(item)}
                    />
                )}
                keyExtractor={item => item.id}
            />
            <FloatingButton
                icon="camera"
                onPress={() => console.log('Open camera')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: SIZES.base * 2,
    },
    errorText: {
        fontFamily: FONTS.regular,
        color: COLORS.error,
        textAlign: 'center',
    },
    statusItem: {
        flexDirection: 'row',
        padding: SIZES.base * 2,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
        backgroundColor: COLORS.white,
    },
    statusInfo: {
        justifyContent: 'center',
        marginLeft: SIZES.base * 2,
    },
    name: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.text,
        marginBottom: 4,
    },
    time: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
});

export default StatusScreen;
