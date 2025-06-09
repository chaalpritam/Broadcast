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
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchAgents } from '../store/slices/agentSlice';
import {
    selectAgents,
    selectAgentsLoading,
    selectAgentsError,
} from '../store/selectors/agentSelectors';
import AgentCard from '../components/agent/AgentCard';
import FloatingButton from '../components/FloatingButton';
import EmptyState from '../components/EmptyState';

type RootStackParamList = {
    Agent: { agentId: string };
    CreateAgent: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AgentsScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const agents = useAppSelector(selectAgents);
    const isLoading = useAppSelector(selectAgentsLoading);
    const error = useAppSelector(selectAgentsError);

    const filteredAgents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const loadAgents = useCallback(async () => {
        await dispatch(fetchAgents());
    }, [dispatch]);

    useEffect(() => {
        loadAgents();
    }, [loadAgents]);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadAgents();
        setRefreshing(false);
    }, [loadAgents]);

    const handleAgentPress = useCallback((agentId: string) => {
        navigation.navigate('Agent', { agentId });
    }, [navigation]);

    const handleCreatePress = useCallback(() => {
        navigation.navigate('CreateAgent');
    }, [navigation]);

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search agents"
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
                    title="Error Loading Agents"
                    message={error}
                    action={{
                        label: 'Try Again',
                        onPress: loadAgents,
                    }}
                />
            );
        }

        if (searchQuery) {
            return (
                <EmptyState
                    icon="search"
                    title="No Agents Found"
                    message="Try adjusting your search query"
                />
            );
        }

        return (
            <EmptyState
                icon="construct"
                title="No Agents Available"
                message="Connect with AI agents to enhance your blockchain experience!"
                action={{
                    label: 'Add Agent',
                    onPress: handleCreatePress,
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredAgents}
                renderItem={({ item }) => (
                    <AgentCard
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        avatar={item.avatar || ''}
                        category={item.category}
                        status={item.status}
                        onPress={() => handleAgentPress(item.id)}
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
        borderRadius: SIZES.base,
        paddingHorizontal: SIZES.base,
    },
    searchIcon: {
        marginRight: SIZES.base,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontFamily: FONTS.regular,
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

export default AgentsScreen; 