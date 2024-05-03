import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOCRFromImage } from '../lib/OCRService';

// Mock AsyncStorage.getItem
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));

// Mock axios
jest.mock('axios');

describe('OCRService', () => {
    describe('getOCRFromImage', () => {
        it('should fetch OCR data correctly', async () => {
            // Mock data
            const destinationLanguage = 'en';
            const image = {
                uri: 'image_uri',
                type: 'image/jpeg',
                name: 'image.jpeg',
            };
            const token = 'token';
            const responseData = { ocrData: 'some_data' };

            // Mock AsyncStorage.getItem to return token
            AsyncStorage.getItem.mockResolvedValue(token);

            // Mock axios to return response data
            axios.mockResolvedValue({ data: responseData });

            // Call the function
            const result = await getOCRFromImage(destinationLanguage, image);

            // Assert the axios call
            expect(axios).toHaveBeenCalledWith({
                baseURL: 'https://fieldlogistics-control.azurewebsites.net/api',
                url: '/ocr/',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                data: expect.any(FormData),
            });

            // Assert the response
            expect(result).toEqual(responseData);
        });

        it('should handle error correctly', async () => {
            // Mock data
            const destinationLanguage = 'en';
            const image = {
                uri: 'image_uri',
                type: 'image/jpeg',
                name: 'image.jpeg',
            };
            const error = new Error('Test error');

            // Mock AsyncStorage.getItem to return token
            AsyncStorage.getItem.mockResolvedValue('token');

            // Mock axios to throw error
            axios.mockRejectedValue(error);

            // Call the function
            await expect(getOCRFromImage(destinationLanguage, image)).rejects.toThrow(error);
        });

        it('should return null if token is not available', async () => {
            // Mock data
            const destinationLanguage = 'en';
            const image = {
                uri: 'image_uri',
                type: 'image/jpeg',
                name: 'image.jpeg',
            };

            // Mock AsyncStorage.getItem to return null
            AsyncStorage.getItem.mockResolvedValue(null);

            // Call the function
            const result = await getOCRFromImage(destinationLanguage, image);

            // Assert the result
            expect(result).toBeNull();
        });
    });
});
