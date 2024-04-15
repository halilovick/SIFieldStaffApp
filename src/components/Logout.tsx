import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from '@/styles/logoutstyle';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoutConfirmation from "./LogoutConfirmation";

const LogoutView = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setModalVisible(false);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.logoutContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.logoutContainer}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
      <LogoutConfirmation
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
}

export default LogoutView;