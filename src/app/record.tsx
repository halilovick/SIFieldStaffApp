import React, { useState } from  "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import styles from '@/styles/recordstyle';
import { SearchBar } from "react-native-screens";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ImageInput from "@/components/ImageInput";
import { ScrollView } from "react-native-gesture-handler";
const LocationService = require('../lib/LocationService.js');



const RecordDataScreen = ({ navigation }) => {
  const [serialNumber,setSerialNumber]=useState('');
  const [inventoryNumber,setInventoryNumber]=useState('');
  const [coordinates,setCoordinates]=useState('');
  const [fullAdress,setFullAdress]=useState('');


  return (
      <ScrollView contentContainerStyle={styles.container}>
        
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
        

       <ImageInput  />

       <View style={styles.buttonsContainer}>
       <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>SAVE</Text>
         <AntDesign name="save" size={24} color="black" />
       </TouchableOpacity>

       <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>CANCEL</Text>
         <MaterialIcons name="cancel" size={24} color="black" />
       </TouchableOpacity>
       </View>

      </ScrollView>
  );
}

export default RecordDataScreen