import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CampaignsList = ({ data, handleNavigation }) => {

    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                return (
                    <View style={styles.card}>
                        <Image
                            source={require('assets/detailscampaign_header.jpg')}
                            style={styles.cardImage} />
                        <Text style={styles.title}>{item.name}</Text>
                        <TouchableOpacity style={styles.detailsButton} onPress={() => handleNavigation(item.id)}>
                            <Text>Details</Text>
                        </TouchableOpacity>
                    </View>
                )
            }}
            contentContainerStyle={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        paddingBottom: 20,
        alignItems: 'flex-start', 
    },
    card: {
        marginHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        width: 220,
        height:300
    },
    title: {
        color: 'black',
        fontSize: 22,
        fontWeight: '400',
        marginBottom: 10,
        marginHorizontal: 20,
        marginTop: 10
    },
    detailsButton: {
        backgroundColor: 'skyblue',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginHorizontal: 20,
        marginBottom: 20, 
        marginTop: 'auto', 
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
   
    },
    detailsButtonText: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white',
       
    },
    cardImage: {
        width: '100%',
        height: 150
    }
})

export default CampaignsList;
