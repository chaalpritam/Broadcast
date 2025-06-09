import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const CreateAgentScreen = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        { id: 'wallet', name: 'Wallet', icon: 'wallet', description: 'Manage wallets and balances' },
        { id: 'transaction', name: 'Transaction', icon: 'swap-horizontal', description: 'Handle transactions and transfers' },
        { id: 'defi', name: 'DeFi', icon: 'trending-up', description: 'DeFi protocol interactions' },
        { id: 'nft', name: 'NFT', icon: 'images', description: 'NFT management and trading' },
        { id: 'governance', name: 'Governance', icon: 'people', description: 'DAO governance and voting' },
        { id: 'analytics', name: 'Analytics', icon: 'analytics', description: 'Blockchain data analysis' },
    ];

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleCreateAgent = () => {
        // In a real app, this would dispatch an action to create the agent
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Add New AI Agent</Text>
                <Text style={styles.subtitle}>
                    Choose an AI agent to enhance your blockchain experience
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select Agent Category</Text>
                <View style={styles.categoriesGrid}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryCard,
                                selectedCategory === category.id && styles.selectedCategory
                            ]}
                            onPress={() => handleCategorySelect(category.id)}
                        >
                            <Icon 
                                name={category.icon} 
                                size={32} 
                                color={selectedCategory === category.id ? COLORS.white : COLORS.primary} 
                            />
                            <Text style={[
                                styles.categoryName,
                                selectedCategory === category.id && styles.selectedCategoryText
                            ]}>
                                {category.name}
                            </Text>
                            <Text style={[
                                styles.categoryDescription,
                                selectedCategory === category.id && styles.selectedCategoryText
                            ]}>
                                {category.description}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {selectedCategory && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Agent Configuration</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Agent Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter agent name"
                            placeholderTextColor={COLORS.gray}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe what this agent will do"
                            placeholderTextColor={COLORS.gray}
                            multiline
                            numberOfLines={3}
                        />
                    </View>
                </View>
            )}

            <View style={styles.actions}>
                <TouchableOpacity 
                    style={[styles.createButton, !selectedCategory && styles.disabledButton]}
                    onPress={handleCreateAgent}
                    disabled={!selectedCategory}
                >
                    <Icon name="add" size={20} color={COLORS.white} />
                    <Text style={styles.createButtonText}>Add Agent</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SIZES.base * 3,
        backgroundColor: COLORS.white,
        marginBottom: SIZES.base,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.h2,
        color: COLORS.text,
        marginBottom: SIZES.base,
    },
    subtitle: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        lineHeight: 22,
    },
    section: {
        backgroundColor: COLORS.white,
        padding: SIZES.base * 2,
        marginBottom: SIZES.base,
    },
    sectionTitle: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.text,
        marginBottom: SIZES.base * 2,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '48%',
        padding: SIZES.base * 2,
        borderRadius: SIZES.base,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    selectedCategory: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryName: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.text,
        marginTop: SIZES.base,
        textAlign: 'center',
    },
    selectedCategoryText: {
        color: COLORS.white,
    },
    categoryDescription: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginTop: SIZES.base / 2,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: SIZES.base * 2,
    },
    inputLabel: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.text,
        marginBottom: SIZES.base,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: SIZES.base,
        padding: SIZES.base * 1.5,
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.text,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    actions: {
        padding: SIZES.base * 2,
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: SIZES.base * 2,
        borderRadius: SIZES.base,
        gap: SIZES.base,
    },
    disabledButton: {
        backgroundColor: COLORS.gray,
    },
    createButtonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.white,
    },
});

export default CreateAgentScreen; 