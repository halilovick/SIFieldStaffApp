import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import styles from '@/styles/recordstyle';
import { SearchBar } from "react-native-screens";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ImageInput from "@/components/ImageInput";
import { ScrollView } from "react-native-gesture-handler";

const LocationService = require('../lib/LocationService.js');

const RecordDataScreen = ({ route, navigation }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [inventoryNumber, setInventoryNumber] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [fullAdress, setFullAdress] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [serialNumberValid, setSerialNumberValid] = useState(true);
  const [inventoryNumberValid, setInventoryNumberValid] = useState(true);
  const [coordinatesValid, setCoordinatesValid] = useState(true);
  const [fullAdressValid, setFullAdressValid] = useState(true);

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
      const response = await LocationService.recordData(serialNumber, inventoryNumber, coordinates, fullAdress, imageURL);
      resetStates();
      alert('Data saved successfully!')
      navigation.navigate('Campaigns');
    } catch (error) {
      alert(error);
    }
  }

  const resetStates = () => {
    setSerialNumber('');
    setCoordinates('');
    setFullAdress('');
    setInventoryNumber('');
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
      <TextInput style={[styles.input, !serialNumberValid && styles.invalidInput]} required placeholder="e.g. 123456789" value={serialNumber} onChangeText={(text) => handleChangeText(text, setSerialNumber, setSerialNumberValid, "^[a-zA-Z0-9]*$")} />

      <Text style={styles.inputTitle}>Inventory number</Text>
      <TextInput style={[styles.input, !inventoryNumberValid && styles.invalidInput]} placeholder="e.g. 123456789" value={inventoryNumber} onChangeText={(text) => handleChangeText(text, setInventoryNumber, setInventoryNumberValid, "^[a-zA-Z0-9]*$")} />

      <Text style={styles.inputTitle}>Coordinates</Text>
      <TextInput style={[styles.input, !coordinatesValid && styles.invalidInput]} placeholder="e.g. 46.739, 53.899" value={coordinates} onChangeText={(text) => handleChangeText(text, setCoordinates, setCoordinatesValid, "^[a-zA-Z0-9 ,.]+$")} />

      <Text style={styles.inputTitle}>Full Address</Text>
      <TextInput style={[styles.input, !fullAdressValid && styles.invalidInput]} placeholder="e.g. First Street" value={fullAdress} onChangeText={(text) => handleChangeText(text, setFullAdress, setFullAdressValid, "^[a-zA-Z0-9 ,.]+$")} />

      <Text style={[styles.inputTitle, styles.imageInputTitle]}>Upload location photo</Text>
      <ImageInput getImageURL={getImageURL} />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>SAVE</Text>
          <AntDesign name="save" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={resetStates}>
          <Text style={styles.buttonText}>CANCEL</Text>
          <MaterialIcons name="cancel" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default RecordDataScreen