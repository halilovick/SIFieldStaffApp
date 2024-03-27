import React, { useState } from "react";
import { Button, Text, TouchableOpacity, View, Image, Linking } from "react-native";
import styles from '@/styles';
import SixDigitInput from '../components/SixDigitInput'; // Assuming SixDigitInput is in the same directory
import AsyncStorage from "@react-native-async-storage/async-storage";

const TwoFactorAuthService = require('../lib/2FAService.js');

const TwoFactorAuthScreen = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleVerification = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    console.log("User from storage:", user.username, user.password)

    try {
      let result = await TwoFactorAuthService.authenticateTwoFactorCode(code, user.username, user.password, user.token);
      console.log(result)
      // navigation.navigate('App');
    }
    catch (err) {
      console.log(err)
    }
  };
  const handleAutofill = async() => {
    const user = JSON.parse(await AsyncStorage.getItem("user")) 
    const secret = await TwoFactorAuthService.getManualEntryKey(user.username, user.password);
    console.log("SECRET", user)
    const appName = 'SIWeb-App'; 

    const url = `otpauth://totp/${user.username}?secret=${secret}&issuer=${appName}`;

    await Linking.openURL(url)
      .then(() => console.log('Google Authenticator opened'))
      .catch((err) => console.error('An error occurred: ', err));

    handleVerification();
     
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Two Factor Auth Screen</Text>
      <SixDigitInput value={code} onChangeText={setCode}></SixDigitInput>
      <TouchableOpacity style={styles.loginButton} onPress={handleVerification}>
        <Text style={styles.loginButtonText}>Authenticate</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 12, marginBottom: 20, marginTop: 20}}>or</Text>
      <TouchableOpacity style={styles.googleAuthButton} onPress={handleAutofill}>
        <Text style={{flex:.8}}>Autofill with Google Authenticator</Text>
        <Image source={require('../../assets/googleauth.webp')} resizeMode='contain' style={{flex:.2 }}></Image>
      </TouchableOpacity>
    </View>
  );
}

export default TwoFactorAuthScreen;