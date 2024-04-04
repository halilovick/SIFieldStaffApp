import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.container}>
        <Text style={styles.text}>Log out</Text>
      </TouchableOpacity>
      <LogoutConfirmation
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: 5,
    paddingRight: 10,
  },
  text: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default LogoutView;