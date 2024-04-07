import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '@/styles/detailscampaignstyle';
const CampaignService = require('../lib/CampaignService.js')
import { FontAwesome } from '@expo/vector-icons';

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' } as const;
    return date.toLocaleDateString('en-GB', options);
}

const DetailsCampaign = ({ route, navigation }) => {
    const { item } = route.params

    const [campaignStatus, setCampaignStatus] = useState(item.status || 'Not started');

    const handleStatusChange = async (status) => {
        // TODO: Implement the logic here
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

    const renderItem = ({ item }) => {
        if (item.key === 'Name') {
            return (
                <View style={[styles.detailsContainer, styles.centeredContainer]}>
                    <Text style={styles.nameValue}>{item.value}</Text>
                </View>
            );
        } else if (item.key === 'Start Date' || item.key === 'End Date') {
            return (
                <View style={styles.dateContainer}>
                    <View style={styles.dateLabelContainer}>
                        <Text style={styles.dateLabel}>{item.key}</Text>
                    </View>
                    <View style={styles.dateValueContainer}>
                        <View style={styles.dateContent}>
                            <FontAwesome name="calendar" size={24} color="black" style={styles.calendarIcon} />
                            <Text style={styles.dateValue}>{item.value}</Text>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>{item.key}</Text>
                    <Text style={styles.value}>{item.value}</Text>
                </View>
            );
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
            <ImageBackground source={require('../../assets/detailscampaign_header.jpg')} style={styles.backgroundImage}>
            </ImageBackground>
            <View style={styles.container}>
                <View>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.key}
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
                ) : (
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.label}>Update Progress</Text>
                        <Picker
                            selectedValue={campaignStatus}
                            style={styles.dropdown}
                            onValueChange={(itemValue, itemIndex) => handleStatusChange(itemValue)}
                        >
                            <Picker.Item label="Not started" value="Not started" />
                            <Picker.Item label="Working on it" value="Working on it" />
                            <Picker.Item label="Done" value="Done" />
                        </Picker>
                    </View>
                )}

                <View style={styles.locationsContainer}>
                    <Text style={styles.locationTitle}>Locations</Text>
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

        </>
    );
};

export default DetailsCampaign;
