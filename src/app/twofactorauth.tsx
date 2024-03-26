import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import styles from '@/styles';
import SixDigitInput from '../components/SixDigitInput'; // Assuming SixDigitInput is in the same directory
import AsyncStorage from "@react-native-async-storage/async-storage";

const TwoFactorAuthService = require('../lib/2FAService.js');

const TwoFactorAuthScreen = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleVerification = async () => {
    alert(code)
    const user = await AsyncStorage.getItem('username'); 
    let password = await AsyncStorage.getItem('password');
    try{
      let result = await TwoFactorAuthService.authenticateTwoFactorCode(code, user, password);
      alert(result)

    }
    catch(err){
      alert("error")
    }
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