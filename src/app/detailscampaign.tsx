import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList, TouchableWithoutFeedback } from 'react-native';
const CampaignService = require('../lib/CampaignService.js')

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
}

const DetailsCampaign = ({ route, navigation }) => {
    const { item } = route.params || {
        item: {
            name: 'Mock Campaign',
            description: 'This is a mock campaign description.',
            start_date: '2024-04-01',
            end_date: '2024-04-30',
            location: {
                type: 'Mock Location Type',
                address: '123 Mock St, Mocktown',
                phone: '123-456-7890',
            }
        }
    };

    const handleAccept = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem('user')).id;
        const res = await CampaignService.updateCampaignStatus(userId, item.id, "accepted")
        const campaignId = item.id
        navigation.navigate('Campaigns', { campaignId })
    };

    const handleDecline = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem('user')).id;
        const res = await CampaignService.updateCampaignStatus(userId, item.id, "declined")
        const campaignId = item.id
        navigation.navigate('Campaigns', { campaignId })
    };

    const data = [
        { key: 'Name', value: item.name },
        { key: 'Description', value: item.description },
        { key: 'Start Date', value: formatDate(item.startDate) },
        { key: 'End Date', value: formatDate(item.endDate) }
    ];

    const locations = item.locations.map(location => ({
        id: location.id,
        address: location.address,
        contactNumber: location.contactNumber,
        description: location.description,
        typeOfLocation: location.typeOfLocation
    }));

    const renderItem = ({ item }) => (
        <View style={styles.detailsContainer}>
            <Text style={styles.label}>{item.key}:</Text>
            <Text style={styles.value}>{item.value}</Text>
        </View>
    );

    const CardItem = ({ item, onPress, expanded }) => {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.card}>
                    <Text style={styles.label}>{item.typeOfLocation}: {item.address}</Text>
                    {expanded && <Text style={styles.value}>{item.contactNumber}</Text>}
                    {expanded && <Text style={styles.value}>{item.description}</Text>}
                </View>
            </TouchableWithoutFeedback>
        );
    };

    const [expandedItem, setExpandedItem] = useState(null);

    const handleItemPress = (itemId) => {
        setExpandedItem(itemId === expandedItem ? null : itemId);
    };

    return (
        <>
            <ImageBackground source={require('assets/detailscampaign_header.jpg')} style={styles.backgroundImage}>
            </ImageBackground>
            <View style={styles.container}>
                <View>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.key}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={locations}
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
            </View>
            {!route.params.accepted ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#007bff' }]} onPress={handleAccept}>
                        <Text style={[styles.buttonText, { color: '#ffffff' }]}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={handleDecline}>
                        <Text style={[styles.buttonText, { color: '#007bff' }]}>Decline</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </>
    );

};

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    backgroundImage: {
        flex: 0.1,
        resizeMode: 'cover',
        justifyContent: 'center',
        height: 300,
    },
    detailsContainer: {
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    value: {
        fontSize: 16,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingRight: 20,
        paddingLeft: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginBottom: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    declineButton: {
        backgroundColor: '#fff',
        borderColor: '#007bff',
        borderWidth: 1,
    },
    card: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    }
});

export default DetailsCampaign;
