import React, { useState } from  "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import styles from '@/styles/recordstyle';
import { SearchBar } from "react-native-screens";
import ImageInput from "@/components/ImageInput";


const RecordDataScreen = ({ navigation }) => {
  const [serialNumber,setSerialNumber]=useState('');
  const [inventoryNumber,setInventoryNumber]=useState('');
  const [coordinates,setCoordinates]=useState('');
  const [fullAdress,setFullAdress]=useState('');


  return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.row}>
          <TextInput style={styles.input} placeholder="Serial number" value={serialNumber} onChangeText={setSerialNumber}/>
          <TextInput style={styles.input} placeholder="Inventory number" value={inventoryNumber} onChangeText={setInventoryNumber}/>
        </View>
        <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Coordinates" value={coordinates} onChangeText={setCoordinates}/>
        <TextInput style={styles.input} placeholder="Full address" value={fullAdress} onChangeText={setFullAdress}/>
        </View>
       </View>
     

       <ImageInput />

       <View style={styles.buttonsContainer}>
       <TouchableOpacity style={styles.saveButton}>
         <Text>Save</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.cancelButton}>
         <Text>Cancel</Text>
       </TouchableOpacity>
       </View>

      </View>
  );
}

export default RecordDataScreen