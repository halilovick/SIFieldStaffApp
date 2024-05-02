import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthService = require('./AuthService.js');
const BASE_URL = "https://fieldlogistics-control.azurewebsites.net/api";

const uploadImage = async (locationId, fileUri) => {
    try {
        var data = new FormData();
        data.append('DestinationLanguage', destinationLanguage);
        data.append('Image', {
            uri: fileUri,
            type: 'image/jpeg',
            name: 'image.jpeg',
        });
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            return null;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        };

        const axiosConfig = {
            baseURL: BASE_URL,
            url: '/location/record',
            method: 'POST',
            headers: headers,
            data: data,
        };
        const response = await axios(axiosConfig);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export {
    uploadImage
}