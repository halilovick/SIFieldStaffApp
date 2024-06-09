import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = "http://public-ip-address/api";

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

const makeAuthenticatedRequest = async (url, params = null, method, body = null) => {
  try {
    const token = await getToken();
    if (!token) {
      // User is not logged in, token doesn't exist
      return null;
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const axiosConfig = {
      baseURL: BASE_URL,
      url: url,
      method: method,
      headers: headers,
      params: params,
      data: body ? JSON.stringify(body) : null,
    };
    const response = await axios(axiosConfig);
    const newToken = response.headers['authorization'].split(' ')[1];
    if (newToken) {
      await storeToken(newToken);
    }
    return response.data;
  } catch (error) {
    console.error('Error making authenticated request:', error);
    return null;
  }
};


export { storeToken, getToken, makeAuthenticatedRequest };
