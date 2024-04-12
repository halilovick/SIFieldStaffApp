import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '@/styles/detailscampaignstyle';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const CampaignService = require('../lib/CampaignService.js')

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' } as const;
    return date.toLocaleDateString('en-GB', options);
}

const DetailsCampaign = ({ route, navigation }) => {
    const { item } = route.params

    const [campaignStatus, setCampaignStatus] = useState(route.params.workStatus);

    const handleStatusChange = async (status) => {
        const res = await CampaignService.updateCampaignWorkStatus(JSON.parse(await AsyncStorage.getItem('user')).id, item.id, status.toLowerCase());
        if (res.status == "OK") {
            setCampaignStatus(status);
            route.params.workStatus = status;
        }
    };

    useEffect(() => {
        setCampaignStatus(route.params.workStatus);
    }, [])

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

    const handleSeeLocations = () => {
        const accepted = route.params.accepted;
        navigation.navigate('Campaign Locations List', { locations: item.locations, accepted });
    };

    const data = [
        { key: 'Name', value: item.name },
        { key: 'Description', value: item.description },
        { key: 'Start Date', value: formatDate(item.startDate) },
        { key: 'End Date', value: formatDate(item.endDate) }
    ];

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
                <View style={styles.locationsContainer}>
                    <TouchableOpacity style={styles.locationButton} onPress={handleSeeLocations}>
                        <Text style={styles.locationText}>View Campaign Locations</Text>
                        <Ionicons name="arrow-forward-outline" size={26} color="#333" />
                    </TouchableOpacity>
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
                            <Picker.Item label="Not started" value="not started" />
                            <Picker.Item label="Working on it" value="working on it" />
                            <Picker.Item label="Done" value="done" />
                        </Picker>
                    </View>
                )}
            </View>
        </>
    );
};

export default DetailsCampaign;
