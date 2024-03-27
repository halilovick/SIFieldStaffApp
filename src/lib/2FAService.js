import { makeAuthenticatedRequest } from "./AuthService"; // Import makeAuthenticatedRequest function
import axios from 'axios';

const getManualEntryKey = async (username, password) => {
    try {
        const response = await makeAuthenticatedRequest("/login/setup/2fa", null, "POST", { username, password });
        return response.manualEntryKey;
    } catch (error) {
        throw error;
    }
};

const authenticateTwoFactorCode = async (code, username, password, token) => {
    try {
        const response = await axios.post(
            `https://fieldlogistics-control.azurewebsites.net/api/login/authenticate/2fa`,
            { username, password },
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                params: {
                    code
                }
            }
        );
        return response.status;
    } catch (error) {
        return 400;
    }
};

export {
    getManualEntryKey,
    authenticateTwoFactorCode
};
