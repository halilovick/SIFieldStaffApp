import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

//This component is going to be used in Campaigns screen, to display 
//lists of campaigns

const CampaignsList=( {data,handleNavigation} )=>{

    return (
            <FlatList
            keyExtractor={(item)=>item.id}
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item})=>{
                return(
                    <View style={styles.card}>
                      <Text style={styles.title}>{item.name}</Text>
                      <TouchableOpacity style={styles.detailsButton} onPress={()=>handleNavigation(item.id)}>
                        <Text>Details</Text>
                      </TouchableOpacity>
                    </View>

                )
            }}
            contentContainerStyle={styles.list}
            />
          
    ); 

}

const styles=StyleSheet.create({
    list:{
        marginBottom:20,
    },
    card:{
        marginHorizontal:15,
        paddingVertical:20,
        paddingHorizontal:40,
        backgroundColor:'white',
        borderRadius:8
    },
    title:{
        color:'black',
        fontSize:22,
        fontWeight:'400',
        marginBottom:32
    },
    detailsButton:{
        backgroundColor:'skyblue',
        paddingHorizontal:20,
        paddingVertical:15,
        marginVertical:8,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsButtonText:{
        fontSize:14,
        fontWeight:'400',
        color:'white'
    }




})

export default CampaignsList;