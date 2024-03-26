import axios from 'axios';

const getManualEntryKey = async (username, password) => {
    try {
        const response = await axios.post(
            "https://fieldlogistics-control.azurewebsites.net/api/login/setup/2fa",
            { username, password }
        );
        return response.data.manualEntryKey; // Return the manual entry key from the response data
    } catch (error) {
        throw error; // Throw an error if the request fails
    }
};

const authenticateTwoFactorCode = async (code, username, password) => {
    try {
        const response = await axios.post(
            `https://fieldlogistics-control.azurewebsites.net/api/login/authenticate/2fa?Code=${code}`,
            { username, password }
        );
        return response.data; // Return the response data if successful
    } catch (error) {
        throw error; // Throw an error if the request fails
    }
};

export {
    getManualEntryKey,
    authenticateTwoFactorCode
};
