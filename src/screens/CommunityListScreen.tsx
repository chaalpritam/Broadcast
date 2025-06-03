import React, { useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import CommunityCard from '../components/community/CommunityCard';
import FloatingButton from '../components/FloatingButton';

// Mock data - will be replaced with Redux state
const mockCommunities = [
    {
        id: '1',
        name: 'Tech Enthusiasts',
        description: 'A community for discussing the latest in technology, programming, and innovation.',
        avatar: 'https://picsum.photos/200',
        memberCount: 1234,
    },
    {
        id: '2',
        name: 'Photography Club',
        description: 'Share your photos, learn new techniques, and connect with fellow photographers.',
        avatar: 'https://picsum.photos/201',
        memberCount: 856,
    },
    {
        id: '3',
        name: 'Fitness & Wellness',
        description: 'Join us to discuss fitness tips, healthy living, and motivation for a better lifestyle.',
        avatar: 'https://picsum.photos/202',
        memberCount: 2345,
    },
];

const CommunityListScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredCommunities, setFilteredCommunities] = useState(mockCommunities);

    const handleSearch = useCallback((text: string) => {
        setSearchQuery(text);
        if (text.trim() === '') {
            setFilteredCommunities(mockCommunities);
        } else {
            const filtered = mockCommunities.filter(community =>
                community.name.toLowerCase().includes(text.toLowerCase()) ||
                community.description.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredCommunities(filtered);
        }
    }, []);

    const handleCommunityPress = useCallback((communityId: string) => {
        navigation.navigate('Community', { communityId });
    }, [navigation]);

    const handleCreateCommunity = useCallback(() => {
        navigation.navigate('CreateCommunity');
    }, [navigation]);

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search communities"
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholderTextColor={COLORS.gray}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => handleSearch('')}>
                        <Icon name="close-circle" size={20} color={COLORS.gray} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    const renderEmptyList = () => (
        <View style={styles.emptyContainer}>
            <Icon name="people-outline" size={48} color={COLORS.gray} />
            <Text style={styles.emptyText}>
                {searchQuery
                    ? 'No communities found matching your search'
                    : 'No communities available'}
            </Text>
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredCommunities}
                renderItem={({ item }) => (
                    <CommunityCard
                        {...item}
                        onPress={() => handleCommunityPress(item.id)}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmptyList}
            />
            <FloatingButton
                icon="add"
                onPress={handleCreateCommunity}
                style={styles.createButton}
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
    header: {
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
    },
    searchIcon: {
        marginRight: SIZES.base,
    },
    searchInput: {
        flex: 1,
        height: 40,
        ...FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.text,
    },
    clearButton: {
        padding: SIZES.base / 2,
    },
    listContent: {
        padding: SIZES.base * 2,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.base * 4,
    },
    emptyText: {
        ...FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        textAlign: 'center',
        marginTop: SIZES.base,
    },
    createButton: {
        position: 'absolute',
        right: SIZES.base * 2,
        bottom: SIZES.base * 2,
    },
});

export default CommunityListScreen; 