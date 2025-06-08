import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Header from '../components/Header';
import FloatingButton from '../components/FloatingButton';
import { PROFILE_IMAGES } from '../constants/images';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    organizer: {
        name: string;
        avatar: string;
    };
    participants: number;
    type: 'meeting' | 'call' | 'reminder';
}

const EventItem = ({ item, onPress }: { item: Event; onPress: () => void }) => {
    const getEventIcon = () => {
        switch (item.type) {
            case 'meeting':
                return 'people';
            case 'call':
                return 'call';
            case 'reminder':
                return 'alarm';
            default:
                return 'calendar';
        }
    };

    const getEventColor = () => {
        switch (item.type) {
            case 'meeting':
                return COLORS.primary;
            case 'call':
                return COLORS.success;
            case 'reminder':
                return COLORS.warning;
            default:
                return COLORS.gray;
        }
    };

    return (
        <TouchableOpacity style={styles.eventItem} onPress={onPress}>
            <View style={[styles.eventIcon, { backgroundColor: getEventColor() }]}>
                <Icon name={getEventIcon()} size={24} color={COLORS.white} />
            </View>
            <View style={styles.eventInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>
                <View style={styles.eventDetails}>
                    <View style={styles.detailItem}>
                        <Icon name="calendar" size={16} color={COLORS.gray} />
                        <Text style={styles.detailText}>{item.date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Icon name="time" size={16} color={COLORS.gray} />
                        <Text style={styles.detailText}>{item.time}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Icon name="location" size={16} color={COLORS.gray} />
                        <Text style={styles.detailText}>{item.location}</Text>
                    </View>
                </View>
                <View style={styles.eventFooter}>
                    <View style={styles.organizer}>
                        <Icon name="person" size={16} color={COLORS.gray} />
                        <Text style={styles.organizerText}>{item.organizer.name}</Text>
                    </View>
                    <View style={styles.participants}>
                        <Icon name="people" size={16} color={COLORS.gray} />
                        <Text style={styles.participantsText}>{item.participants}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const CalendarScreen = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // TODO: Load events from API
        // For now, we'll use mock data
        const mockEvents: Event[] = [
            {
                id: '1',
                title: 'Team Standup Meeting',
                description: 'Daily standup meeting to discuss progress and blockers',
                date: 'Today',
                time: '10:00 AM',
                location: 'Conference Room A',
                organizer: {
                    name: 'John Doe',
                    avatar: PROFILE_IMAGES.users[0],
                },
                participants: 8,
                type: 'meeting',
            },
            {
                id: '2',
                title: 'Client Call',
                description: 'Discussion about the new project requirements',
                date: 'Today',
                time: '2:30 PM',
                location: 'Zoom Meeting',
                organizer: {
                    name: 'Jane Smith',
                    avatar: PROFILE_IMAGES.users[1],
                },
                participants: 4,
                type: 'call',
            },
            {
                id: '3',
                title: 'Project Deadline',
                description: 'Submit final deliverables for the current sprint',
                date: 'Tomorrow',
                time: '5:00 PM',
                location: 'Office',
                organizer: {
                    name: 'Mike Johnson',
                    avatar: PROFILE_IMAGES.users[2],
                },
                participants: 12,
                type: 'reminder',
            },
            {
                id: '4',
                title: 'Team Building Event',
                description: 'Quarterly team building activity and dinner',
                date: 'Friday',
                time: '6:00 PM',
                location: 'Downtown Restaurant',
                organizer: {
                    name: 'Sarah Wilson',
                    avatar: PROFILE_IMAGES.users[3],
                },
                participants: 15,
                type: 'meeting',
            },
        ];

        // Simulate API call
        setTimeout(() => {
            setEvents(mockEvents);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleEventPress = (event: Event) => {
        console.log('Event pressed:', event.id);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header title="Calendar" />
            <FlatList
                data={events}
                renderItem={({ item }) => (
                    <EventItem
                        item={item}
                        onPress={() => handleEventPress(item)}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
            <FloatingButton
                icon="add"
                onPress={() => console.log('Add new event')}
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: SIZES.base * 2,
    },
    errorText: {
        fontFamily: FONTS.regular,
        color: COLORS.error,
        textAlign: 'center',
    },
    listContainer: {
        padding: SIZES.base * 2,
    },
    eventItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        padding: SIZES.base * 2,
        marginBottom: SIZES.base * 2,
        // ...SHADOWS.small,
    },
    eventIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.base * 2,
    },
    eventInfo: {
        flex: 1,
    },
    title: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.text,
        marginBottom: 4,
    },
    description: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginBottom: SIZES.base,
    },
    eventDetails: {
        marginBottom: SIZES.base,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    detailText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginLeft: 8,
    },
    eventFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    organizer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    organizerText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginLeft: 8,
    },
    participants: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    participantsText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginLeft: 8,
    },
});

export default CalendarScreen; 