import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

//This component is going to be used in Campaigns screen, to display 
//lists of campaigns

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
                            source={require('../../assets/detailscampaign_header.jpg')}
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
        marginBottom: 20,
    },
    card: {
        marginHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        width: 250
    },
    title: {
        color: 'black',
        fontSize: 22,
        fontWeight: '400',
        marginBottom: 32,
        marginHorizontal: 20,
        marginTop: 10
    },
    detailsButton: {
        backgroundColor: 'skyblue',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 8,
        marginBottom: 18,
        marginHorizontal: 20,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsButtonText: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white'
    },
    cardImage: {
        width: '100%',
        height: 200,
    }
})

export default CampaignsList;