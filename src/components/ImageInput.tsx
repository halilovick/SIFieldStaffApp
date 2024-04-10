import React, { useState, useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity,  Image } from 'react-native';
import styles from "@/styles/imageinputstyle";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const ImageInput=()=>{
    const [image, setImage] = useState('../../assets/photo-placeholder.jp');

    const [cameraPermission, setCameraPermission]=useState(null);
  
    useEffect(() => {
      (async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setCameraPermission(status === 'granted');
      })();
    }, []);
  
  
    const selectPicture = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  
    const takePicture = async () => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
    


   return(
    <View>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity >
        <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>


    </View>
   )
}


export default ImageInput;