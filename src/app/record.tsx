import React, { useState } from  "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import styles from '@/styles/recordstyle';
import { SearchBar } from "react-native-screens";
import ImageInput from "@/components/ImageInput";


const RecordDataScreen = ({ navigation }) => {
  const [serialNumber,setSerialNumber]=useState(null);
  const [inventoryNumber,setInventoryNumber]=useState(null);
  const [coordinates,setCoordinates]=useState(null);
  const [fullAdress,setFullAdress]=useState(null);

  return (
      <View>
         <View style={styles.inputContainer}>
        <Text style={styles.title}>Title 1</Text>
        <TextInput
          style={styles.input}
          value={serialNumber}
          onChangeText={setSerialNumber}
          placeholder="Input 1"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Title 2</Text>
        <TextInput
          style={styles.input}
          value={inventoryNumber}
          onChangeText={setInventoryNumber}
          placeholder="Input 2"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Title 3</Text>
        <TextInput
          style={styles.input}
          value={coordinates}
          onChangeText={setCoordinates}
          placeholder="Input 3"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Title 4</Text>
        <TextInput
          style={styles.input}
          value={fullAdress}
          onChangeText={setFullAdress}
          placeholder="Input 4"
        />
      </View>

       <ImageInput />

      </View>
  );
}

export default RecordDataScreen