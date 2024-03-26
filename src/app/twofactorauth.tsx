import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import styles from '@/styles';
import SixDigitInput from '../components/SixDigitInput'; // Assuming SixDigitInput is in the same directory

const TwoFactorAuthScreen = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleVerification = () => {
    console.log("Verification code:", code);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Two Factor Auth Screen</Text>
      <SixDigitInput value={code} onChangeText={setCode} />
      <Button title="Verify" onPress={handleVerification} />
      <Button title="Go to App (Privremeno)" onPress={() => navigation.navigate('App')} />
    </View>
  );
}

export default TwoFactorAuthScreen;