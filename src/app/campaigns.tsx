import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, useAnimatedValue } from "react-native"; 
import HorizontalScroll from "@/components/CampaignsList";
import { ScrollView } from "react-native-gesture-handler";
import CampaignsList from "@/components/CampaignsList";
import { getCampaignsForUser, getAcceptedCampaignsForUser } from '../lib/CampaignService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CampaignsScreen = async ({ navigation }) => {

    const navigateToDetails=(itemId)=>{
        navigation.navigate('DetailsCampaign')
    }

    const [campaigns,setCampaigns]=useState([]);
    const [acceptedCampaigns,setAcceptedCampaigns]=useState([]);
    const user = JSON.parse(await AsyncStorage.getItem('user'));

    useEffect(()=>{
        const fetchCampaigns=async()=>{
            try{
                const userCampaigns=await getCampaignsForUser(user.id);
                console.log(userCampaigns)
                setCampaigns(userCampaigns);
            }catch(error){
                console.log('Error fetching campaigns: ',error);
            }
         }

        const fetchAcceptedCampaigns=async()=>{
                try {
                    const accepted = await getAcceptedCampaignsForUser(user.id); 
                    setAcceptedCampaigns([accepted]); //Since method currently returns a single object, I had to put accepted in an array when passing it to set
                } catch (error) {
                    console.log('Error fetching accepted campaigns:', error);
                }
            }

        fetchCampaigns();
        fetchAcceptedCampaigns();
    },[])

    
    return (
        <ScrollView style={styles.campaignsContainer}>
            <Text style={styles.listTitle}>Available campaigns</Text>
            <CampaignsList  data={campaigns} handleNavigation={navigateToDetails}/>
            <Text style={styles.listTitle}>Accepted campaigns </Text>
            <CampaignsList data={acceptedCampaigns} handleNavigation={navigateToDetails} />
        </ScrollView>
    );
  }

  const styles=StyleSheet.create({
    campaignsContainer:{
        flexGrow:1,
        paddingVertical:10,
        paddingHorizontal:10
    },
    listTitle:{
        fontSize:30,
        fontWeight:'500',
        marginBottom:18
    }
  })
  
  export default CampaignsScreen