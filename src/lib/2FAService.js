import axios from 'axios';

const getManualEntryKey = async (username, password, token) => {
    try {
        const response = await axios.post(
            `http://public-ip-address/api/login/setup/2fa`,
            { username, password },
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(response.data)
        return response.data.manualEntryKey;
    } catch (error) {
        return 400;
    }
};

const authenticateTwoFactorCode = async (code, username, password, token) => {
    try {
        const response = await axios.post(
            `http://public-ip-address/api/login/authenticate/2fa`,
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
