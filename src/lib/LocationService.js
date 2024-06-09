import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const AuthService = require('./AuthService.js')
const BASE_URL = "http://public-ip-address/api";

/*  Send recorded data to the database.
*   Params: serialNumber,
*           inventoryNumber,
*           gpsCoordinates      
*           fullAddress
*           photo
*/
const recordData = async (serialNumber, inventoryNumber, gpsCoordinates, fullAddress, photoUrl, locationId, userId) => {
    try {
        var data = new FormData();
        data.append('serialNumber', serialNumber);
        data.append('inventoryNumber', inventoryNumber);
        data.append('gpsCoordinates', gpsCoordinates);
        data.append('fullAddress', fullAddress);
        data.append('locationId', locationId);
        data.append('createdAt', new Date().toISOString())
        data.append('userId', userId);
        data.append('image', {
            uri: photoUrl,
            type: 'image/jpeg',
            name: `record-${locationId}-${new Date().toISOString()}.jpeg`,
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
        console.log(error)
        throw error;
    }
}

/* Update the status of a location for the corresponding user.
*  Params: userId (User ID), 
*          locationId,
*          status(Status of the location, which can be "unreachable" or "visited")
*/
const updateLocationStatus = async (userId, locationId, status) => {
    try {
        const body = { userId, locationId, Status: status };
        const response = await AuthService.makeAuthenticatedRequest(`/LocationStatus/`, null, "PUT", body);
        return response;
    } catch (error) {
        throw error;
    }
}

const getLocationsWithStatus = async (userId, status) => {
    try {
        const response = await AuthService.makeAuthenticatedRequest(`/LocationStatus/${userId}/${status}/`, null, "GET", null);
        return response;
    } catch (error) {
        throw error;
    }
}

export {
    recordData,
    updateLocationStatus,
    getLocationsWithStatus
}