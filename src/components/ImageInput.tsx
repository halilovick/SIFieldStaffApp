import React, { useState, useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity,  Image } from 'react-native';
import styles from "@/styles/imageinputstyle";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const ImageInput=({getImageURL})=>{
    const [image, setImage] = useState(null);

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
        getImageURL(result.assets[0].uri)
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
        getImageURL(result.assets[0].uri);
      }
    };

    const resetPicture=()=>{
      setImage(null);
    }
    


   return(
    <View style={{ alignItems: 'center' }}>

    {image ? (
      <TouchableOpacity onPress={selectPicture} style={styles.imageContainer}>
        <Image source={{ uri: image }}  style={styles.image} resizeMode='cover'/>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={selectPicture}>
        <View style={[styles.imageContainer,styles.emptyImageContainer]}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
           <Entypo name="image" size={100} color="black" />
          </View>
          <Text style={styles.text}>Select Picture from Gallery</Text>
         </View>
      </TouchableOpacity>
    )}

        <Text style={styles.text}>OR</Text>
        <TouchableOpacity onPress={takePicture} style={styles.button}>
          <Text style={styles.buttonText}>TAKE PHOTO</Text>
          <AntDesign name="camera" size={24} color="white" />
        </TouchableOpacity>
  </View>
   )
}


export default ImageInput;