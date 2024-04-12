const FileSystem = require('expo-file-system')

async function uploadImage(locationId, fileUri) {
    try {
        const fileData = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
        return fileData
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

export {
    uploadImage
}
