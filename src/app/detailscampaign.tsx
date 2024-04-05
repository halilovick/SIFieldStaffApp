import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, FlatList, TouchableWithoutFeedback } from 'react-native';
import styles from '@/styles/detailscampaignstyle';
const CampaignService = require('../lib/CampaignService.js')

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
}

const DetailsCampaign = ({ route, navigation }) => {
    const { item } = route.params
    
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
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>{item.typeOfLocation}</Text>
                        <Text style={styles.cardHeaderText}>{item.address}</Text>
                    </View>
                    {expanded && (
                        <View style={styles.cardBody}>
                            <Text style={[styles.cardBodyText, styles.boldText]}>Contact Number: <Text style={styles.normalText}>{item.contactNumber}</Text></Text>
                            <Text style={[styles.cardBodyText, styles.boldText]}>Description: <Text style={styles.normalText}>{item.description}</Text></Text>
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
                <View style={styles.locationsContainer}>
                    <Text style={styles.locationTitle}>Locations:</Text>
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
            </View>
        </>
    );

};




export default DetailsCampaign;
