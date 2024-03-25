import React from "react";
import { Button, Text, View } from "react-native";
import styles from '@/styles';

const TwoFactorAuthScreen = ({ navigation }) => {
  return (
      <View style={styles.container}>
          <Text style={styles.title}>Two Factor Auth Screen</Text>
          <Button title="Go to App (Privremeno)" onPress={() => navigation.navigate('App')} />
      </View>
  );
}

export default TwoFactorAuthScreen