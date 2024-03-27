import { storeToken, getToken, makeAuthenticatedRequest } from '../lib/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Mocking AsyncStorage and axios
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
}));
jest.mock('axios');

describe('AuthService', () => {
    beforeEach(() => {
        // Clears the information and resets the mocks
        AsyncStorage.setItem.mockClear();
        AsyncStorage.getItem.mockClear();
        axios.mockClear();
    });

    describe('storeToken function', () => {
        it('should store a token', async () => {
            const token = 'dummy_token';
            await storeToken(token);
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', token);
        });

    });

    describe('getToken function', () => {
        it('should retrieve a token successfully', async () => {
            const token = 'dummy_token';
            AsyncStorage.getItem.mockResolvedValue(token);
            const retrievedToken = await getToken();
            expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
            expect(retrievedToken).toBe(token);
        });

    });

    describe('makeAuthenticatedRequest function', () => {
        it('should make an authenticated request and return data', async () => {
            const token = 'existing_token';
            const response = { data: 'response data' };
            AsyncStorage.getItem.mockResolvedValue(token);
            axios.mockResolvedValue({ data: response, headers: {} });

            const result = await makeAuthenticatedRequest('/test', {}, 'GET');
            expect(axios).toHaveBeenCalledWith(expect.objectContaining({
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }));
            expect(result).toBe(response);
        });

        it('should return null if token does not exist', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);
            const result = await makeAuthenticatedRequest('/test', {}, 'GET');
            expect(result).toBeNull();
            expect(axios).not.toHaveBeenCalled();
        });

    });
});
