import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import AccountScreen from './account';
import CampaignsScreen from "./campaigns";

const Tab = createBottomTabNavigator();

const AppScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Account') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Campaigns') {
            iconName = focused ? 'megaphone' : 'megaphone-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'teal',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Campaigns" component={CampaignsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default AppScreen;
