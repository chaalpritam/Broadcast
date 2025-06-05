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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Header from '../components/Header';

const CreateCommunityScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [isPrivate, setIsPrivate] = useState(false);

    const handleSelectAvatar = useCallback(() => {
        // TODO: Implement image picker
        Alert.alert('Coming Soon', 'Image picker will be implemented soon');
    }, []);

    const handleSelectCoverImage = useCallback(() => {
        // TODO: Implement image picker
        Alert.alert('Coming Soon', 'Image picker will be implemented soon');
    }, []);

    const handleCreate = useCallback(async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter a community name');
            return;
        }

        if (!description.trim()) {
            Alert.alert('Error', 'Please enter a community description');
            return;
        }

        setIsLoading(true);
        try {
            // TODO: Implement community creation API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to create community. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [name, description, navigation]);

    const renderImagePicker = (
        label: string,
        image: string | null,
        onPress: () => void,
        style?: any
    ) => (
        <TouchableOpacity
            style={[styles.imagePicker, style]}
            onPress={onPress}>
            {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
            ) : (
                <View style={styles.placeholderContainer}>
                    <Icon name="add-circle-outline" size={32} color={COLORS.gray} />
                    <Text style={styles.placeholderText}>{label}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header
                title="Create Community"
                actions={[
                    {
                        icon: 'checkmark',
                        onPress: handleCreate,
                        color: COLORS.primary,
                    },
                ]}
            />
            <ScrollView style={styles.content}>
                {renderImagePicker(
                    'Add Cover Image',
                    coverImage,
                    handleSelectCoverImage,
                    styles.coverImagePicker
                )}
                {renderImagePicker(
                    'Add Community Avatar',
                    avatar,
                    handleSelectAvatar,
                    styles.avatarPicker
                )}

                <View style={styles.form}>
                    <Text style={styles.label}>Community Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter community name"
                        placeholderTextColor={COLORS.gray}
                        maxLength={50}
                    />

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Describe your community"
                        placeholderTextColor={COLORS.gray}
                        multiline
                        numberOfLines={4}
                        maxLength={500}
                    />

                    <TouchableOpacity
                        style={styles.privacyToggle}
                        onPress={() => setIsPrivate(!isPrivate)}>
                        <View style={styles.privacyInfo}>
                            <Icon
                                name={isPrivate ? 'lock-closed' : 'globe'}
                                size={24}
                                color={COLORS.text}
                            />
                            <View style={styles.privacyText}>
                                <Text style={styles.privacyTitle}>
                                    {isPrivate ? 'Private Community' : 'Public Community'}
                                </Text>
                                <Text style={styles.privacyDescription}>
                                    {isPrivate
                                        ? 'Only approved members can join'
                                        : 'Anyone can join this community'}
                                </Text>
                            </View>
                        </View>
                        <Icon
                            name={isPrivate ? 'toggle' : 'toggle-outline'}
                            size={24}
                            color={COLORS.primary}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
    },
    imagePicker: {
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.base,
        overflow: 'hidden',
    },
    coverImagePicker: {
        height: 150,
        margin: SIZES.base * 2,
    },
    avatarPicker: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: -50,
        marginLeft: SIZES.base * 2,
        borderWidth: 4,
        borderColor: COLORS.white,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginTop: SIZES.base,
    },
    form: {
        padding: SIZES.base * 2,
    },
    label: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.text,
        marginBottom: SIZES.base,
    },
    input: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        padding: SIZES.base * 1.5,
        marginBottom: SIZES.base * 2,
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.text,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    privacyToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        padding: SIZES.base * 1.5,
        borderRadius: SIZES.base,
        marginTop: SIZES.base,
    },
    privacyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    privacyText: {
        marginLeft: SIZES.base * 1.5,
    },
    privacyTitle: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.text,
    },
    privacyDescription: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginTop: 2,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CreateCommunityScreen; 