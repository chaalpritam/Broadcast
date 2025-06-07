import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [readReceipts, setReadReceipts] = useState(true);
    const [enterToSend, setEnterToSend] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Icon name="notifications-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.settingText}>Notifications</Text>
                    </View>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
                        thumbColor={COLORS.white}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Appearance</Text>
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Icon name="moon-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.settingText}>Dark Mode</Text>
                    </View>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
                        thumbColor={COLORS.white}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Chat Settings</Text>
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Icon name="checkmark-done-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.settingText}>Read Receipts</Text>
                    </View>
                    <Switch
                        value={readReceipts}
                        onValueChange={setReadReceipts}
                        trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
                        thumbColor={COLORS.white}
                    />
                </View>
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Icon name="return-down-back-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.settingText}>Enter to Send</Text>
                    </View>
                    <Switch
                        value={enterToSend}
                        onValueChange={setEnterToSend}
                        trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
                        thumbColor={COLORS.white}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <TouchableOpacity style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Icon name="information-circle-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.settingText}>App Version</Text>
                    </View>
                    <Text style={styles.settingValue}>1.0.0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Icon name="document-text-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.settingText}>Terms of Service</Text>
                    </View>
                    <Icon name="chevron-forward" size={24} color={COLORS.gray} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Icon name="shield-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.settingText}>Privacy Policy</Text>
                    </View>
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
    section: {
        backgroundColor: COLORS.white,
        marginTop: 20,
        paddingVertical: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.gray,
        marginLeft: 15,
        marginBottom: 10,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 16,
        color: COLORS.text,
        marginLeft: 15,
    },
    settingValue: {
        fontSize: 16,
        color: COLORS.gray,
    },
});

export default SettingsScreen; 