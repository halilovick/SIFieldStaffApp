import React from "react";
import { Text, View } from "react-native";
import styles from '@/styles/styles';
import LogoutView from '../components/Logout';

const AccountScreen = ({ navigation }) => {
  return (
      <View style={styles.container}>
          <LogoutView navigation={navigation}/>
          <Text style={styles.title}>Account Screen</Text>
      </View>
  );
}

export default AccountScreen