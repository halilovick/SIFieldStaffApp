import React from "react";
import { Text, View } from "react-native";
import styles from '@/styles/styles';
import LogoutView from '../components/Logout';

const RecordDataScreen = ({ navigation }) => {
  return (
      <View style={styles.container}>
        <LogoutView navigation={navigation}/>
          <Text style={styles.title}>Record Data Screen</Text>
      </View>
  );
}

export default RecordDataScreen