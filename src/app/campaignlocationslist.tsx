import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native';
import styles from '@/styles/detailscampaignstyle';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationService = require('../lib/LocationService.js')

const CampaignLocationsList = ({ route, navigation }) => {
    const { locations } = route.params;
    const [searchQuery, setSearchQuery] = useState('');
    const filteredLocations = locations.filter(location =>
        location.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [unreachableLocations, setUnreacableLocations] = useState([]);

    const fetchData = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem('user')).id;
        const fetchLocationsWithStatus = async () => {
            try {
                const unreachableLocations = await LocationService.getLocationsWithStatus(userId, 'unreachable');
                setUnreacableLocations(unreachableLocations);
            } catch (error) {
                console.log('Error fetching locations: ', error);
            }
        }

        fetchLocationsWithStatus();
    }

    const containsLocationId = (id) => {
        return unreachableLocations.some(location => location.locationId == id);
    };

    useEffect(() => {
        fetchData()
    }, [])

    const handleRecord = (locationId) => {
        navigation.navigate('Record data', { locationId: locationId })
    };

    const handleUnreachable = async (locationId) => {
        const res = await LocationService.updateLocationStatus(JSON.parse(await AsyncStorage.getItem('user')).id, locationId, "unreachable");
        if (res.locationId == locationId) {
            fetchData();
        }
    };

    const handleReachable = async (locationId) => {
        const res = await LocationService.updateLocationStatus(JSON.parse(await AsyncStorage.getItem('user')).id, locationId, "none");
        if (res.locationId == locationId) {
            fetchData();
        }
    };

    const CardItem = ({ item, onPress, expanded }) => {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>{item.typeOfLocation}</Text>
                        <Text style={styles.cardHeaderText}>{item.address}</Text>
                    </View>
                    {expanded && (
                        <View style={styles.cardBody}>
                            <Text style={[styles.cardBodyText, styles.boldText]}>Contact Number: <Text style={styles.normalText}>{item.contactNumber}</Text></Text>
                            <Text style={[styles.cardBodyText, styles.boldText]}>Description: <Text style={styles.normalText}>{item.description}</Text></Text>
                            {!route.params.accepted || containsLocationId(item.id) ? null :
                                (<View style={styles.buttonContainer}>
                                    <TouchableOpacity style={[styles.recordButton, { backgroundColor: '#007bff' }]} onPress={(itemId) => handleRecord(item.id)}>
                                        <Text style={[styles.buttonText, { color: '#ffffff' }]}>Record data</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={(itemId) => handleUnreachable(item.id)}>
                                        <Text style={[styles.buttonText, { color: '#007bff' }]}>Location is unreachable</Text>
                                    </TouchableOpacity>
                                </View>)}
                            {!containsLocationId(item.id) ? null :
                                (
                                    <View style={styles.button}>
                                        <Text style={[styles.unreachableTitle, styles.boldText]}>Location is marked as unreachable!</Text>
                                        <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={(itemId) => handleReachable(item.id)}>
                                            <Text style={[styles.buttonText, { color: '#007bff' }]}>Set location as reachable</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        );
    };

    const [expandedItem, setExpandedItem] = useState(null);

    const handleItemPress = (itemId) => {
        setExpandedItem(itemId === expandedItem ? null : itemId);
    };

    return (
        <View style={styles.locContainer}>
            <View style={styles.searchInputContainer}>
                <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search locations by name"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
            </View>

            <FlatList
                style={{ flex: 1 }}
                data={filteredLocations}
                renderItem={({ item }) => (
                    <CardItem
                        item={item}
                        onPress={() => handleItemPress(item.id)}
                        expanded={item.id === expandedItem}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default CampaignLocationsList;
