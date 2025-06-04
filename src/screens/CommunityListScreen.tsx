import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCommunities } from '../store/slices/communitySlice';
import {
    selectCommunities,
    selectCommunitiesLoading,
    selectCommunitiesError,
} from '../store/selectors/communitySelectors';
import CommunityCard from '../components/community/CommunityCard';
import FloatingButton from '../components/FloatingButton';
import EmptyState from '../components/EmptyState';

const CommunityListScreen = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const communities = useAppSelector(selectCommunities);
    const isLoading = useAppSelector(selectCommunitiesLoading);
    const error = useAppSelector(selectCommunitiesError);

    const filteredCommunities = communities.filter(community =>
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const loadCommunities = useCallback(async () => {
        await dispatch(fetchCommunities());
    }, [dispatch]);

    useEffect(() => {
        loadCommunities();
    }, [loadCommunities]);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadCommunities();
        setRefreshing(false);
    }, [loadCommunities]);

    const handleCommunityPress = useCallback((communityId: string) => {
        navigation.navigate('Community', { communityId });
    }, [navigation]);

    const handleCreatePress = useCallback(() => {
        navigation.navigate('CreateCommunity');
    }, [navigation]);

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search communities"
                    placeholderTextColor={COLORS.gray}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => setSearchQuery('')}>
                        <Icon name="close-circle" size={20} color={COLORS.gray} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    const renderEmptyList = () => {
        if (isLoading) {
            return (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            );
        }

        if (error) {
            return (
                <EmptyState
                    icon="alert-circle"
                    title="Error Loading Communities"
                    message={error}
                    action={{
                        label: 'Try Again',
                        onPress: loadCommunities,
                    }}
                />
            );
        }

        if (searchQuery) {
            return (
                <EmptyState
                    icon="search"
                    title="No Communities Found"
                    message="Try adjusting your search query"
                />
            );
        }

        return (
            <EmptyState
                icon="people"
                title="No Communities Yet"
                message="Be the first to create a community!"
                action={{
                    label: 'Create Community',
                    onPress: handleCreatePress,
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredCommunities}
                renderItem={({ item }) => (
                    <CommunityCard
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        avatar={item.avatar}
                        memberCount={item.memberCount}
                        onPress={() => handleCommunityPress(item.id)}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmptyList}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]}
                        tintColor={COLORS.primary}
                    />
                }
            />
            <FloatingButton
                icon="add"
                onPress={handleCreatePress}
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
        padding: SIZES.base,
    },
    listContent: {
        flexGrow: 1,
        paddingBottom: SIZES.base * 4,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.base * 4,
    },
    createButton: {
        position: 'absolute',
        right: SIZES.base * 2,
        bottom: SIZES.base * 2,
    },
});

export default CommunityListScreen; 