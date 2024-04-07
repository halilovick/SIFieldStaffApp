import React, { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login';
import AppScreen from './app';
import TwoFactorAuthScreen from "./twofactorauth";
import DetailsCampaign from "./detailscampaign";
import CampaignLocationsList from "./campaignlocationslist";

const Stack = createStackNavigator();

export default function Page() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
      <Stack.Screen name="2 Factor Authentication" component={TwoFactorAuthScreen} options={{ headerShown: false, gestureEnabled: false, headerLeft: null }} />
      <Stack.Screen name="App" component={AppScreen} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="DetailsCampaign" component={DetailsCampaign} options={{headerShown: false, gestureEnabled: false}} />
      <Stack.Screen name="Campaign Locations List" component={CampaignLocationsList} />
    </Stack.Navigator>
  );
}



