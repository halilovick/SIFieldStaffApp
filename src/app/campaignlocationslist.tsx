import React , { useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import styles from '@/styles/detailscampaignstyle';

const CampaignLocationsList = ({ route }) => {
    const { locations } = route.params;

    const CardItem = ({ item, onPress, expanded }) => {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>{item.typeOfLocation}</Text>
                        <Text style={styles.cardHeaderText}>{item.address}</Text>
                    </View>
                    {expanded && (
                        <View style={styles.cardBody}>
                            <Text style={[styles.cardBodyText, styles.boldText]}>Contact Number: <Text style={styles.normalText}>{item.contactNumber}</Text></Text>
                            <Text style={[styles.cardBodyText, styles.boldText]}>Description: <Text style={styles.normalText}>{item.description}</Text></Text>
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        );
    };

    const [expandedItem, setExpandedItem] = useState(null);

    const handleItemPress = (itemId) => {
        setExpandedItem(itemId === expandedItem ? null : itemId);
    };

    return (
        <View style={styles.locContainer}>
           <FlatList
                        style={{ flex: 1 }}
                        data={locations}
                        renderItem={({ item }) => (
                            <CardItem
                                item={item}
                                onPress={() => handleItemPress(item.id)}
                                expanded={item.id === expandedItem}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
        </View>
    );
};

export default CampaignLocationsList;
