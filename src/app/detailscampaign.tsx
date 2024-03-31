import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from 'react-native';

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

    const handleAccept = () => {

    };

    const handleDecline = () => {

    };

    const data = [
        { key: 'Name', value: item.name },
        { key: 'Description', value: item.description },
        { key: 'Start Date', value: item.start_date },
        { key: 'End Date', value: item.end_date },
        { key: 'Location Type', value: item.location.type },
        { key: 'Address', value: item.location.address },
        { key: 'Phone Number', value: item.location.phone },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.detailsContainer}>
            <Text style={styles.label}>{item.key}:</Text>
            <Text style={styles.value}>{item.value}</Text>
        </View>
    );

    return (
        <>
            <ImageBackground source={require('assets/detailscampaign_header.jpg')} style={styles.backgroundImage}>
            </ImageBackground>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#007bff' }]} onPress={handleAccept}>
                        <Text style={[styles.buttonText, { color: '#ffffff' }]}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={handleDecline}>
                        <Text style={[styles.buttonText, { color: '#007bff' }]}>Decline</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        flex: 0.4,
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
});

export default DetailsCampaign;
