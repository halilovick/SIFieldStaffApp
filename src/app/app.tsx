import React from "react";
import styles from '@/styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountScreen from './account';
import RecordDataScreen from "./record";

const Tab = createBottomTabNavigator();

const AppScreen = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Record Data" component={RecordDataScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default AppScreen;
