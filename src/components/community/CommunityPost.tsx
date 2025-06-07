import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Avatar from '../Avatar';

interface CommunityPostProps {
    id: string;
    author: {
        id: string;
        name: string;
        avatar: string;
        role?: 'owner' | 'admin' | 'moderator' | 'member';
    };
    content: string;
    images?: string[];
    likes: number;
    comments: number;
    timestamp: string;
    isLiked: boolean;
    onLikePress: () => void;
    onCommentPress: () => void;
    onSharePress: () => void;
    onAuthorPress: () => void;
    onOptionsPress: () => void;
}

const { width } = Dimensions.get('window');
const imageSize = (width - SIZES.base * 4) / 2;

const CommunityPost = ({
    author,
    content,
    images,
    likes,
    comments,
    timestamp,
    isLiked,
    onLikePress,
    onCommentPress,
    onSharePress,
    onAuthorPress,
    onOptionsPress,
}: CommunityPostProps) => {
    const getRoleColor = () => {
        switch (author.role) {
            case 'owner':
                return COLORS.primary;
            case 'admin':
                return COLORS.success;
            case 'moderator':
                return COLORS.warning;
            default:
                return COLORS.gray;
        }
    };

    const renderImages = () => {
        if (!images || images.length === 0) {return null;}

        if (images.length === 1) {
            return (
                <Image
                    source={{ uri: images[0] }}
                    style={styles.singleImage}
                    resizeMode="cover"
                />
            );
        }

        return (
            <View style={styles.imageGrid}>
                {images.slice(0, 4).map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        style={[
                            styles.gridImage,
                            index === 0 && images.length > 2 && styles.gridImageLarge,
                        ]}
                        resizeMode="cover"
                    />
                ))}
                {images.length > 4 && (
                    <View style={styles.moreImagesOverlay}>
                        <Text style={styles.moreImagesText}>+{images.length - 4}</Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.authorInfo}
                    onPress={onAuthorPress}>
                    <Avatar
                        uri={author.avatar}
                        size={40}
                        style={styles.avatar}
                    />
                    <View style={styles.authorDetails}>
                        <View style={styles.nameRow}>
                            <Text style={styles.authorName}>{author.name}</Text>
                            {author.role && (
                                <View style={[styles.roleBadge, { backgroundColor: getRoleColor() }]}>
                                    <Text style={styles.roleText}>{author.role}</Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.timestamp}>{timestamp}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionsButton}
                    onPress={onOptionsPress}>
                    <Icon name="ellipsis-horizontal" size={20} color={COLORS.gray} />
                </TouchableOpacity>
            </View>

            <Text style={styles.content}>{content}</Text>
            {renderImages()}

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onLikePress}>
                    <Icon
                        name={isLiked ? 'heart' : 'heart-outline'}
                        size={24}
                        color={isLiked ? COLORS.error : COLORS.gray}
                    />
                    <Text style={[styles.actionText, isLiked && styles.likedText]}>
                        {likes.toLocaleString()}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onCommentPress}>
                    <Icon name="chatbubble-outline" size={24} color={COLORS.gray} />
                    <Text style={styles.actionText}>
                        {comments.toLocaleString()}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onSharePress}>
                    <Icon name="share-outline" size={24} color={COLORS.gray} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        padding: SIZES.base * 2,
        marginBottom: SIZES.base,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    authorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        marginRight: SIZES.base,
    },
    authorDetails: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorName: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.text,
        marginRight: SIZES.base,
    },
    roleBadge: {
        paddingHorizontal: SIZES.base,
        paddingVertical: 2,
        borderRadius: 12,
    },
    roleText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small - 2,
        color: COLORS.white,
        textTransform: 'capitalize',
    },
    timestamp: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    optionsButton: {
        padding: SIZES.base,
    },
    content: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.text,
        marginBottom: SIZES.base,
    },
    singleImage: {
        width: '100%',
        height: 200,
        borderRadius: SIZES.base,
        marginBottom: SIZES.base,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -SIZES.base / 2,
        marginBottom: SIZES.base,
    },
    gridImage: {
        width: imageSize,
        height: imageSize,
        margin: SIZES.base / 2,
        borderRadius: SIZES.base,
    },
    gridImageLarge: {
        width: '100%',
        height: imageSize * 1.5,
    },
    moreImagesOverlay: {
        position: 'absolute',
        right: SIZES.base / 2,
        bottom: SIZES.base / 2,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: SIZES.base,
        borderRadius: SIZES.base,
    },
    moreImagesText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.white,
    },
    actions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
        paddingTop: SIZES.base,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SIZES.base * 2,
    },
    actionText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginLeft: 4,
    },
    likedText: {
        color: COLORS.error,
    },
});

export default CommunityPost;
