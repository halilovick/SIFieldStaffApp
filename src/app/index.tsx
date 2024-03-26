import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login';
import AppScreen from './app';
import TwoFactorAuthScreen from "./twofactorauth";

const Stack = createStackNavigator();

export default function Page() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Field Staff App' }} />
      <Stack.Screen name="2 Factor Authentication" component={TwoFactorAuthScreen} options={{ gestureEnabled: false, headerLeft: null }} />
      <Stack.Screen name="App" component={AppScreen} options={{ headerShown: false, gestureEnabled: false }} />
    </Stack.Navigator>
  );
}