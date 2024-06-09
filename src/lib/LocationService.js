import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import * as FileSystem from 'expo-file-system';
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

       // const base64 = await FileSystem.readAsStringAsync(photoUrl, { encoding: 'base64' });
        const boundary = "----WebKitFormBoundary" + Math.random().toString(36).substr(2);

        // Construct the form data manually
        let body = '';

        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="serialNumber"\r\n\r\n${serialNumber}\r\n`;

        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="inventoryNumber"\r\n\r\n${inventoryNumber}\r\n`;

        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="gpsCoordinates"\r\n\r\n${gpsCoordinates}\r\n`;

        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="fullAddress"\r\n\r\n${fullAddress}\r\n`;

        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="locationId"\r\n\r\n${locationId}\r\n`;

        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="createdAt"\r\n\r\n${new Date().toISOString()}\r\n`;

        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="userId"\r\n\r\n${userId}\r\n`;

        const photoName = `record-${locationId}-${new Date().toISOString()}.jpeg`;

        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="image"; filename="${photoName}"\r\n`;
        body += `Content-Type: image/jpeg\r\n\r\n`;
        // Here, we would add the binary data of the image, but for simplicity, let's add an empty string.
        body += '' + `\r\n`;

        body += `--${boundary}--\r\n`;

        const token = await AsyncStorage.getItem('token');
        if (!token) {
            return null;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
        };

        const axiosConfig = {
            baseURL: BASE_URL,
            url: '/location/record',
            method: 'POST',
            headers: headers,
            data: body,
        };

        const response = await axios(axiosConfig);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};




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