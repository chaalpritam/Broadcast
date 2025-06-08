import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
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

    const getEventTypeLabel = () => {
        switch (item.type) {
            case 'meeting':
                return 'Meeting';
            case 'call':
                return 'Call';
            case 'reminder':
                return 'Reminder';
            default:
                return 'Event';
        }
    };

    return (
        <TouchableOpacity 
            style={styles.eventItem} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.eventHeader}>
                <View style={[styles.eventType, { backgroundColor: getEventColor() + '15' }]}>
                    <Icon name={getEventIcon()} size={16} color={getEventColor()} />
                    <Text style={[styles.eventTypeText, { color: getEventColor() }]}>
                        {getEventTypeLabel()}
                    </Text>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <View style={styles.eventContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>

                <View style={styles.timeLocationContainer}>
                    <View style={styles.timeLocationItem}>
                        <Icon name="time-outline" size={16} color={COLORS.gray} />
                        <Text style={styles.timeLocationText}>{item.time}</Text>
                    </View>
                    <View style={styles.timeLocationItem}>
                        <Icon name="location-outline" size={16} color={COLORS.gray} />
                        <Text style={styles.timeLocationText} numberOfLines={1}>
                            {item.location}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.eventFooter}>
                    <View style={styles.organizerContainer}>
                        <Icon name="person-outline" size={16} color={COLORS.gray} />
                        <Text style={styles.organizerText}>{item.organizer.name}</Text>
                    </View>
                    <View style={styles.participantsContainer}>
                        <Icon name="people-outline" size={16} color={COLORS.gray} />
                        <Text style={styles.participantsText}>{item.participants} attending</Text>
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
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base * 2,
        marginBottom: SIZES.base * 2,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    eventHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.base * 2,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
        backgroundColor: COLORS.background,
    },
    eventType: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.base,
        paddingVertical: SIZES.base / 2,
        borderRadius: SIZES.base,
    },
    eventTypeText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
        marginLeft: SIZES.base / 2,
    },
    dateText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    eventContent: {
        padding: SIZES.base * 2,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.medium,
        color: COLORS.text,
        marginBottom: SIZES.base,
    },
    description: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginBottom: SIZES.base * 1.5,
        lineHeight: SIZES.font * 1.5,
    },
    timeLocationContainer: {
        marginBottom: SIZES.base * 1.5,
    },
    timeLocationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base / 2,
    },
    timeLocationText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginLeft: SIZES.base,
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.lightGray,
        marginVertical: SIZES.base * 1.5,
    },
    eventFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    organizerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    organizerText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
        color: COLORS.text,
        marginLeft: SIZES.base,
    },
    participantsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    participantsText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginLeft: SIZES.base,
    },
});

export default CalendarScreen; 