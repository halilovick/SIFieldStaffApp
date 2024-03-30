import React from "react";
import { Text, View, StyleSheet } from "react-native";
import HorizontalScroll from "@/components/CampaignsList";
import { ScrollView } from "react-native-gesture-handler";
import CampaignsList from "@/components/CampaignsList";


const CampaignsScreen = ({ navigation }) => {
    const items=[
        {id:1,
        name:'Campaign',
        description:'Lorem ipsum dolor sit amet, ne tale vidit pri.Nam mucius conceptam incorrupte no, illud saepe alterum an sea.',
        company_id:1,
        start_date:'30-03-2024',
        end_date:'01-04-2024'},
        
        {id:2,
        name:'Campaign',
        description:'Lorem ipsum dolor sit amet, ne tale vidit pri.Nam mucius conceptam incorrupte no, illud saepe alterum an sea.',
        company_id:1,
        start_date:'30-03-2024',
        end_date:'01-04-2024'},
        {id:3,
        name:'Campaign',
        description:'Lorem ipsum dolor sit amet, ne tale vidit pri.Nam mucius conceptam incorrupte no, illud saepe alterum an sea.',
        company_id:1,
        start_date:'30-03-2024',
        end_date:'01-04-2024'},
        {id:4,
        name:'Campaign',
        description:'Lorem ipsum dolor sit amet, ne tale vidit pri.Nam mucius conceptam incorrupte no, illud saepe alterum an sea.',
        company_id:1,
        start_date:'30-03-2024',
        end_date:'01-04-2024'},
        {id:5,
        name:'Campaign',
        description:'Lorem ipsum dolor sit amet, ne tale vidit pri.Nam mucius conceptam incorrupte no, illud saepe alterum an sea.',
        company_id:1,
        start_date:'30-03-2024',
        end_date:'01-04-2024'}
    ]
    return (
        <ScrollView style={styles.campaignsContainer}>
            <Text style={styles.listTitle}>Available campaigns</Text>
            <CampaignsList  data={items}/>
            <Text style={styles.listTitle}>Accepted campaigns </Text>
            <CampaignsList data={items} />
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