import React, { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login';
import AppScreen from './app';
import TwoFactorAuthScreen from "./twofactorauth";
import { authenticateTwoFactorCode } from "@/lib/2FAService";

const Stack = createStackNavigator();

export default function Page() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleAuthenticate = async (code) => {
    // Call the authentication function from the service
    const isAuthenticated = await authenticateTwoFactorCode(code);
    if (isAuthenticated) {
      console.log("Authentication successful");
      setIsPopupVisible(false);
      // Continue with logic after successful authentication
    } else {
      console.log("Authentication failed");
      // Handle authentication failure
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Field Staff App' }} />
      <Stack.Screen name="2 Factor Authentication" component={TwoFactorAuthScreen} options={{ gestureEnabled: false, headerLeft: null }} />
      <Stack.Screen name="App" component={AppScreen} options={{ headerShown: false, gestureEnabled: false }} />
    </Stack.Navigator>
  );
}