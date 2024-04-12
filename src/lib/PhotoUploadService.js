const axios = require('axios')
const FileSystem = require('expo-file-system')

const route = `${protocol}://${account}.blob.${suffix}/${container}`

async function downloadImage(image) {
    try {
        const response = await axios.get(`${route}/${image}`,
            { params: { "sasToken": accountKey } }
        );
        console.log(response)
        console.log("DATA", response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function uploadImage(locationId, fileUri) {
    try {
        const fileData = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
        return fileData
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

// Playground function
async function main() {
    const res = await uploadImage(0, 'file:///Internal storage/DCIM/Screenshots/example.jpg')
    console.log(res)
}

export {
    uploadImage
}
