import React from 'react';
import { View, Text, FlatList, TouchableOpacity,  Image } from 'react-native';
import styles from '@/styles/campaignsliststyles';

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



export default CampaignsList;
