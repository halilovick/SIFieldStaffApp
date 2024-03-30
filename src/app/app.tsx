import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountScreen from './account';
import RecordDataScreen from "./record";
import CampaignsScreen from "./campaigns";

const Tab = createBottomTabNavigator();

const AppScreen = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Record Data" component={RecordDataScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Campaigns" component={CampaignsScreen}/>
    </Tab.Navigator>
  );
}

export default AppScreen;
