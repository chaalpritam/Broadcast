import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import FloatingButton from '../components/FloatingButton';

// Mock status data
const MOCK_STATUS = [
    {
        id: '1',
        name: 'My Status',
        time: 'Tap to add status update',
        avatar: 'https://via.placeholder.com/50',
        isMyStatus: true,
    },
    {
        id: '2',
        name: 'John Doe',
        time: 'Today, 10:30 AM',
        avatar: 'https://via.placeholder.com/50',
        isMyStatus: false,
    },
    {
        id: '3',
        name: 'Jane Smith',
        time: 'Today, 9:45 AM',
        avatar: 'https://via.placeholder.com/50',
        isMyStatus: false,
    },
];

const StatusItem = ({ item }: { item: typeof MOCK_STATUS[0] }) => {
    return (
        <TouchableOpacity style={styles.statusItem}>
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
    return (
        <View style={styles.container}>
            <Header title="Status" />
            <FlatList
                data={MOCK_STATUS}
                renderItem={({ item }) => <StatusItem item={item} />}
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
        ...FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.text,
        marginBottom: 4,
    },
    time: {
        ...FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
});

export default StatusScreen; 