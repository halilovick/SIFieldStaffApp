import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutView = ({ navigation }) => {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.container}>
        <Text style={styles.text}>Log out</Text>
      </TouchableOpacity>
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
      color: 'blue',
    },
  });

export default LogoutView;