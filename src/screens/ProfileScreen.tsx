import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { PROFILE_IMAGES } from '../constants/images';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({ navigation }: Props) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: PROFILE_IMAGES.defaultUser }}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.status}>Hey there! I am using BroadcastApp</Text>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="person-outline" size={24} color={COLORS.primary} />
                    <Text style={styles.menuText}>Edit Profile</Text>
                    <Icon name="chevron-forward" size={24} color={COLORS.gray} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="key-outline" size={24} color={COLORS.primary} />
                    <Text style={styles.menuText}>Privacy</Text>
                    <Icon name="chevron-forward" size={24} color={COLORS.gray} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="notifications-outline" size={24} color={COLORS.primary} />
                    <Text style={styles.menuText}>Notifications</Text>
                    <Icon name="chevron-forward" size={24} color={COLORS.gray} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Icon name="settings-outline" size={24} color={COLORS.primary} />
                    <Text style={styles.menuText}>Settings</Text>
                    <Icon name="chevron-forward" size={24} color={COLORS.gray} />
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
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 5,
    },
    status: {
        fontSize: 16,
        color: COLORS.gray,
    },
    section: {
        backgroundColor: COLORS.white,
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
        marginLeft: 15,
    },
});

export default ProfileScreen; 