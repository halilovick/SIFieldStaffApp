import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from "@/styles/imageinputstyle";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ImageInput = ({ getImageURL, allowEditing }) => {
  const [image, setImage] = useState(null);

  const selectPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: allowEditing,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      getImageURL(result.assets[0].uri)
    }
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: allowEditing,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      getImageURL(result.assets[0].uri);
    }
  };

  const resetPicture = () => {
    setImage(null);
  }

  return (
    <View style={{ alignItems: 'center' }}>
      {image ? (
        <TouchableOpacity onPress={selectPicture} style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} resizeMode='contain' />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={selectPicture}>
          <View style={[styles.imageContainer, styles.emptyImageContainer]}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Entypo name="image" size={100} color="black" />
            </View>
            <Text style={styles.text}>Select Picture from Gallery</Text>
          </View>
        </TouchableOpacity>
      )}

      {image ? null : (
        <React.Fragment>
          <Text style={styles.text}>OR</Text>
          <TouchableOpacity onPress={takePicture} style={styles.button}>
            <Text style={styles.buttonText}>TAKE PHOTO</Text>
            <AntDesign name="camera" size={24} color="white" />
          </TouchableOpacity>
        </React.Fragment>
      )}
    </View>
  )
}

export default ImageInput;