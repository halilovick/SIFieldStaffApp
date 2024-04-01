import React, { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View, Image, Linking } from "react-native";
import styles from '@/styles/styles';
import SixDigitInput from '../components/SixDigitInput'; // Assuming SixDigitInput is in the same directory
import AsyncStorage from "@react-native-async-storage/async-storage";

const TwoFactorAuthService = require('../lib/2FAService.js');

const TwoFactorAuthScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [has2fa, set2fa] = useState(true);

  useEffect(() => {
    const setup = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        set2fa(user.secretKey.length > 0);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    setup()
  }, []);

  const handleVerification = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    try {
      let result = await TwoFactorAuthService.authenticateTwoFactorCode(code, user.username, user.password, user.token);
      if (result == 200) {
        navigation.navigate('App');
      } else {
        alert("Incorrect code");
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  const openAuthApp = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"))
    const secret = await TwoFactorAuthService.getManualEntryKey(user.username, user.password, user.token);
    const appName = 'SIWeb-App';

    console.log("SECRET", secret)

    const url = `otpauth://totp/${user.username}?secret=${secret}&issuer=${appName}`;

    await Linking.openURL(url)
      .then(() => console.log('Google Authenticator opened'))
      .catch((err) => console.error('An error occurred: ', err));

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your authentication code</Text>
      <SixDigitInput value={code} onChangeText={setCode}></SixDigitInput>
      <TouchableOpacity style={styles.loginButton} onPress={handleVerification}>
        <Text style={styles.loginButtonText}>Authenticate</Text>
      </TouchableOpacity>
      {!has2fa && <View>
        <Text style={{ fontSize: 16, marginBottom: 20, marginTop: 40 }}>Looks like you're logging in for the first time. Set up two-factor authentication:</Text>
        <TouchableOpacity style={styles.openAuthAppButton} onPress={openAuthApp} testID="openAuthAppButton">
          <Text style={styles.openAuthAppButtonText}>Open Authenticator App</Text>
          <Image source={require('../../assets/googleauth.webp')} resizeMode='contain' style={styles.authAppIcon} />
        </TouchableOpacity>
      </View>
      }
    </View>
  );
}

export default TwoFactorAuthScreen;