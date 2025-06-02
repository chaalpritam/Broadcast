import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import FloatingButton from '../components/FloatingButton';

// Mock calls data
const MOCK_CALLS = [
    {
        id: '1',
        name: 'John Doe',
        time: 'Today, 10:30 AM',
        avatar: 'https://via.placeholder.com/50',
        type: 'outgoing',
        callType: 'video',
    },
    {
        id: '2',
        name: 'Jane Smith',
        time: 'Yesterday, 9:45 AM',
        avatar: 'https://via.placeholder.com/50',
        type: 'incoming',
        callType: 'audio',
    },
    {
        id: '3',
        name: 'Mike Johnson',
        time: 'Yesterday, 2:15 PM',
        avatar: 'https://via.placeholder.com/50',
        type: 'missed',
        callType: 'video',
    },
];

const CallItem = ({ item }: { item: typeof MOCK_CALLS[0] }) => {
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
        <TouchableOpacity style={styles.callItem}>
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
    return (
        <View style={styles.container}>
            <Header title="Calls" />
            <FlatList
                data={MOCK_CALLS}
                renderItem={({ item }) => <CallItem item={item} />}
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
        ...FONTS.medium,
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
        ...FONTS.regular,
        fontSize: SIZES.small,
    },
    callButton: {
        padding: SIZES.base,
    },
});

export default CallsScreen; 