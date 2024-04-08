import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, useAnimatedValue } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CampaignsList from "@/components/CampaignsList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '@/styles/campaignstyle'
const CampaignService = require('../lib/CampaignService.js')

const CampaignsScreen = ({ route, navigation }) => {
    const [campaigns, setCampaigns] = useState([]);
    const [acceptedCampaigns, setAcceptedCampaigns] = useState([]);
    const [reloadData, setReloadData] = useState(false)

    const fetchData = async () => {
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
        setReloadData(false);
    }

    const navigateToDetails = async (itemId, accepted) => {
        const item = await CampaignService.getCampaignDetails(itemId)
        navigation.navigate('DetailsCampaign', { item, accepted })
    }

    useEffect(() => {
        if (route.params != undefined && route.params != null) {
            setReloadData(true);
        }
    }, [route.params]);

    useEffect(() => {
        fetchData()
    }, [reloadData])

    return (
        <ScrollView style={styles.campaignsContainer}>
            <Text style={styles.listTitle}>Available campaigns</Text>
            <CampaignsList data={campaigns} handleNavigation={(itemId) => navigateToDetails(itemId, false)} />
            <Text style={styles.listTitle}>Accepted campaigns </Text>
            <CampaignsList data={acceptedCampaigns} handleNavigation={(itemId) => navigateToDetails(itemId, true)} />
        </ScrollView>
    );
}

export default CampaignsScreen