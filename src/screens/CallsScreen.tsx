import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import FloatingButton from '../components/FloatingButton';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setCalls } from '../store/slices/callsSlice';
import type { Call } from '../types/models';
import type { RootState } from '../store';

interface CallItemData extends Call {
    name: string;
    avatar: string;
}

const CallItem = ({ item, onPress }: { item: CallItemData; onPress: () => void }) => {
    const getCallIcon = () => {
        if (item.type === 'missed') {
            return item.callType === 'video' ? 'videocam-off' : 'call-off';
        }
        return item.callType === 'video' ? 'videocam' : 'call';
    };

    const getCallColor = () => {
        switch (item.type) {
            case 'missed':
                return COLORS.error;
            case 'outgoing':
                return COLORS.success;
            default:
                return COLORS.gray;
        }
    };

    return (
        <TouchableOpacity style={styles.callItem} onPress={onPress}>
            <Avatar uri={item.avatar} />
            <View style={styles.callInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.callDetails}>
                    <Icon
                        name={getCallIcon()}
                        size={16}
                        color={getCallColor()}
                        style={styles.callIcon}
                    />
                    <Text style={[styles.time, { color: getCallColor() }]}>
                        {item.time}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.callButton}>
                <Icon
                    name={item.callType === 'video' ? 'videocam' : 'call'}
                    size={24}
                    color={COLORS.primary}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const CallsScreen = () => {
    const dispatch = useAppDispatch();
    const { calls, isLoading, error } = useAppSelector((state: RootState) => state.calls);

    useEffect(() => {
        // TODO: Load calls from API
        // For now, we'll use mock data
        const mockCalls: CallItemData[] = [
            {
                id: '1',
                userId: '1',
                name: 'John Doe',
                time: 'Today, 10:30 AM',
                avatar: 'https://via.placeholder.com/50',
                type: 'outgoing',
                callType: 'video',
            },
            {
                id: '2',
                userId: '2',
                name: 'Jane Smith',
                time: 'Yesterday, 9:45 AM',
                avatar: 'https://via.placeholder.com/50',
                type: 'incoming',
                callType: 'audio',
            },
            {
                id: '3',
                userId: '3',
                name: 'Mike Johnson',
                time: 'Yesterday, 2:15 PM',
                avatar: 'https://via.placeholder.com/50',
                type: 'missed',
                callType: 'video',
            },
        ];

        dispatch(setCalls(mockCalls));
    }, [dispatch]);

    const handleCallPress = (call: CallItemData) => {
        console.log('Call pressed:', call.id);
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

    return (
        <View style={styles.container}>
            <Header title="Calls" />
            <FlatList
                data={calls as CallItemData[]}
                renderItem={({ item }) => (
                    <CallItem
                        item={item}
                        onPress={() => handleCallPress(item)}
                    />
                )}
                keyExtractor={item => item.id}
            />
            <FloatingButton
                icon="call"
                onPress={() => console.log('New call')}
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
    callItem: {
        flexDirection: 'row',
        padding: SIZES.base * 2,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
        backgroundColor: COLORS.white,
        alignItems: 'center',
    },
    callInfo: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: SIZES.base * 2,
    },
    name: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.text,
        marginBottom: 4,
    },
    callDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    callIcon: {
        marginRight: 4,
    },
    time: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
    },
    callButton: {
        padding: SIZES.base,
    },
});

export default CallsScreen;
