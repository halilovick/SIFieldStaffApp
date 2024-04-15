import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import styles from '@/styles/recordstyle';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ImageInput from "@/components/ImageInput";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';

const LocationService = require('../lib/LocationService.js');

const RecordDataScreen = ({ route, navigation }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [inventoryNumber, setInventoryNumber] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [fullAdress, setFullAdress] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [serialNumberValid, setSerialNumberValid] = useState(true);
  const [inventoryNumberValid, setInventoryNumberValid] = useState(true);
  const [fullAdressValid, setFullAdressValid] = useState(true);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Please grant location permissions');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setCoordinates(`${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}`);
    };
    getPermissions();

  }, [])
  const getImageURL = (url) => {
    setImageURL(url);
  }

  const handleSave = async () => {
    if (serialNumber == '' || inventoryNumber == '' || coordinates == '' || fullAdress == '' || imageURL == '') {
      alert('Please fill all fields and upload an image!');
      return;
    }

    await new Promise(resolve => getImageURL(imageURL => resolve(imageURL)));

    try {
      const response = await LocationService.recordData(serialNumber, inventoryNumber, coordinates, fullAdress, imageURL, route.params.locationId, JSON.parse(await AsyncStorage.getItem('user')).id);
      resetStates();
      alert('Data saved successfully!');
      navigation.navigate('Campaigns');
    } catch (error) {
      alert(error);
    }
  }

  const resetStates = () => {
    setSerialNumber('');
    setFullAdress('');
    setInventoryNumber('');
  }

  const handleCancel = () => {
    navigation.navigate('Campaigns');
  }

  const handleChangeText = (text, setState, setStateValid, regexPattern) => {
    let regex = new RegExp(regexPattern);
    const isValidInput = regex.test(text);

    setState(text);
    setStateValid(isValidInput);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: '700', textAlign: 'center' }}>Record data</Text>
      <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center' }}>Enter data in all fields below</Text>

      <Text style={styles.inputTitle}>Serial Number</Text>
      <TextInput style={[styles.input, !serialNumberValid && styles.invalidInput]} placeholder="e.g. 123456789" value={serialNumber} onChangeText={(text) => handleChangeText(text, setSerialNumber, setSerialNumberValid, "^[a-zA-Z0-9]*$")} />

      <Text style={styles.inputTitle}>Inventory number</Text>
      <TextInput style={[styles.input, !inventoryNumberValid && styles.invalidInput]} placeholder="e.g. 123456789" value={inventoryNumber} onChangeText={(text) => handleChangeText(text, setInventoryNumber, setInventoryNumberValid, "^[a-zA-Z0-9]*$")} />

      <Text style={styles.inputTitle}>Coordinates</Text>
      <TextInput style={styles.input} placeholder="e.g. 46.739, 53.899" value={coordinates} readOnly={true} />

      <Text style={styles.inputTitle}>Full Address</Text>
      <TextInput style={[styles.input, !fullAdressValid && styles.invalidInput]} placeholder="e.g. First Street" value={fullAdress} onChangeText={(text) => handleChangeText(text, setFullAdress, setFullAdressValid, "^[a-zA-Z0-9 ,.]+$")} />

      <Text style={[styles.inputTitle, styles.imageInputTitle]}>Upload location photo</Text>
      <ImageInput getImageURL={getImageURL} />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>SAVE</Text>
          <AntDesign name="save" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>CANCEL</Text>
          <MaterialIcons name="cancel" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default RecordDataScreen