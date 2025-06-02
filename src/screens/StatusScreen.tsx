import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

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
            <View style={styles.avatarContainer}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                {item.isMyStatus && (
                    <View style={styles.addButton}>
                        <Icon name="add-circle" size={24} color={COLORS.primary} />
                    </View>
                )}
            </View>
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
            <FlatList
                data={MOCK_STATUS}
                renderItem={({ item }) => <StatusItem item={item} />}
                keyExtractor={item => item.id}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Status</Text>
                    </View>
                }
            />
            <TouchableOpacity style={styles.cameraButton}>
                <Icon name="camera" size={24} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SIZES.base * 2,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    headerTitle: {
        ...FONTS.medium,
        fontSize: SIZES.large,
        color: COLORS.text,
    },
    statusItem: {
        flexDirection: 'row',
        padding: SIZES.base * 2,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
        backgroundColor: COLORS.white,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: SIZES.base * 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    addButton: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: COLORS.white,
        borderRadius: 12,
    },
    statusInfo: {
        justifyContent: 'center',
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
    cameraButton: {
        position: 'absolute',
        bottom: SIZES.base * 3,
        right: SIZES.base * 3,
        backgroundColor: COLORS.primary,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
    },
});

export default StatusScreen; 