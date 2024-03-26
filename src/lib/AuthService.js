import {AsyncStorage} from 'react-native';

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
    console.log("Token stored successfully")
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

const makeAuthenticatedRequest = async (url, method, body = null) => {
  try {
    const token = await getToken();
    if (!token) {
      // User is not logged in, token doesnt exist
      return null;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (response.ok) {
      const newToken = response.headers.get('Authorization');
      if (newToken) {
        await storeToken(newToken);
      }
    }

    return response.json();

  } catch (error) {
    console.error('Error making authenticated request:', error);
    return null;
  }
};

export { storeToken, getToken, makeAuthenticatedRequest };
