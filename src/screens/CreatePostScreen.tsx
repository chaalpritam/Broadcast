import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Header from '../components/Header';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CreatePostScreen = () => {
    const navigation = useNavigation();
    // const route = useRoute();
    // const { communityId } = route.params as { communityId: string };

    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
    const [images, setImages] = useState<string[]>([]);

    const handleSelectImages = useCallback(() => {
        // TODO: Implement image picker
        Alert.alert('Coming Soon', 'Image picker will be implemented soon');
    }, []);

    const handleRemoveImage = useCallback((index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    }, []);

    const handleCreate = useCallback(async () => {
        if (!content.trim()) {
            Alert.alert('Error', 'Please enter some content for your post');
            return;
        }

        setIsLoading(true);
        try {
            // TODO: Implement post creation API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to create post. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [content, navigation]);

    const renderImageGrid = () => {
        if (images.length === 0) {return null;}

        return (
            <View style={styles.imageGrid}>
                {images.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} />
                        <TouchableOpacity
                            style={styles.removeImageButton}
                            onPress={() => handleRemoveImage(index)}>
                            <Icon name="close-circle" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                ))}
                {images.length < 4 && (
                    <TouchableOpacity
                        style={styles.addImageButton}
                        onPress={handleSelectImages}>
                        <Icon name="add" size={32} color={COLORS.primary} />
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Header
                title="Create Post"
                actions={[
                    {
                        icon: 'checkmark',
                        onPress: handleCreate,
                        color: COLORS.primary,
                    },
                ]}
            />
            <ScrollView style={styles.content}>
                <TextInput
                    style={styles.input}
                    value={content}
                    onChangeText={setContent}
                    placeholder="What's on your mind?"
                    placeholderTextColor={COLORS.gray}
                    multiline
                    textAlignVertical="top"
                />

                {renderImageGrid()}

                <TouchableOpacity
                    style={styles.attachButton}
                    onPress={handleSelectImages}>
                    <Icon name="image-outline" size={24} color={COLORS.primary} />
                    <Text style={styles.attachButtonText}>Add Photos</Text>
                </TouchableOpacity>
            </ScrollView>

            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        padding: SIZES.base * 2,
    },
    input: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        padding: SIZES.base * 1.5,
        minHeight: 120,
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.text,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: SIZES.base * 2,
        gap: SIZES.base,
    },
    imageContainer: {
        width: (SCREEN_WIDTH - SIZES.base * 6) / 2,
        aspectRatio: 1,
        borderRadius: SIZES.base,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    removeImageButton: {
        position: 'absolute',
        top: SIZES.base,
        right: SIZES.base,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 12,
    },
    addImageButton: {
        width: (SCREEN_WIDTH - SIZES.base * 6) / 2,
        aspectRatio: 1,
        borderRadius: SIZES.base,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    attachButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.base * 2,
        padding: SIZES.base * 1.5,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
    },
    attachButtonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.primary,
        marginLeft: SIZES.base,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CreatePostScreen;
