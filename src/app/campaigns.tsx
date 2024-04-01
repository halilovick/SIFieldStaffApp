import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, useAnimatedValue } from "react-native";
import HorizontalScroll from "@/components/CampaignsList";
import { ScrollView } from "react-native-gesture-handler";
import CampaignsList from "@/components/CampaignsList";
import AsyncStorage from '@react-native-async-storage/async-storage';
const CampaignService = require('../lib/CampaignService.js')

const CampaignsScreen = async ({ navigation }) => {

    const navigateToDetails = async (itemId) => {
        const item = await CampaignService.getCampaignDetails(itemId)
        alert(JSON.stringify(item))
        navigation.navigate('DetailsCampaign')
    }

    const [campaigns, setCampaigns] = useState([]);
    const [acceptedCampaigns, setAcceptedCampaigns] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const userId = JSON.parse(await AsyncStorage.getItem('user')).id;
            const fetchCampaigns = async () => {
                try {
                    const userCampaigns = await CampaignService.getCampaignsForUser(userId);
                    setCampaigns(userCampaigns);
                } catch (error) {
                    console.log('Error fetching campaigns: ', error);
                }
            }

            const fetchAcceptedCampaigns = async () => {
                try {
                    const accepted = await CampaignService.getAcceptedCampaignsForUser(userId);
                    setAcceptedCampaigns(accepted);
                } catch (error) {
                    console.log('Error fetching accepted campaigns:', error);
                }
            }

            fetchCampaigns();
            fetchAcceptedCampaigns();
        }
        fetch()
    }, [])


    return (
        <ScrollView style={styles.campaignsContainer}>
            <Text style={styles.listTitle}>Available campaigns</Text>
            <CampaignsList data={campaigns} handleNavigation={navigateToDetails} />
            <Text style={styles.listTitle}>Accepted campaigns </Text>
            <CampaignsList data={acceptedCampaigns} handleNavigation={navigateToDetails} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    campaignsContainer: {
        flexGrow: 1,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    listTitle: {
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 18
    }
})

export default CampaignsScreen