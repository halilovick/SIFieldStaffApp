import { uploadImage } from '../lib/PhotoUploadService';
import * as FileSystem from 'expo-file-system';

// Mock FileSystem.readAsStringAsync
jest.mock('expo-file-system', () => ({
    readAsStringAsync: jest.fn(),
    EncodingType: {
        Base64: 'base64',
    },
}));

describe('PhotoUploadService', () => {
    describe('uploadImage', () => {
        it('should upload image correctly', async () => {
            // Mock data
            const locationId = 'location123';
            const fileUri = 'file_uri';
            const fileData = 'file_data';

            // Mock FileSystem.readAsStringAsync to return file data
            FileSystem.readAsStringAsync.mockResolvedValue(fileData);

            // Call the function
            const result = await uploadImage(locationId, fileUri);

            // Assert the FileSystem.readAsStringAsync call
            expect(FileSystem.readAsStringAsync).toHaveBeenCalledWith(fileUri, { encoding: FileSystem.EncodingType.Base64 });

            // Assert the result
            expect(result).toEqual(fileData);
        });

        it('should handle error correctly', async () => {
            // Mock data
            const locationId = 'location123';
            const fileUri = 'file_uri';
            const error = new Error('Test error');

            // Mock FileSystem.readAsStringAsync to throw error
            FileSystem.readAsStringAsync.mockRejectedValue(error);

            // Call the function
            await expect(uploadImage(locationId, fileUri)).rejects.toThrow(error);

            // Assert the FileSystem.readAsStringAsync call
            expect(FileSystem.readAsStringAsync).toHaveBeenCalledWith(fileUri, { encoding: FileSystem.EncodingType.Base64 });
        });
    });
});
