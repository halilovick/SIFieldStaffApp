const axios = require('axios')
const azureConfig = require('../../azureConfig.js')
const FileSystem = require('expo-file-system')

const account = azureConfig.AccountName
const accountKey = azureConfig.AccountKey
const protocol = azureConfig.DefaultEndpointsProtocol
const suffix = azureConfig.EndpointSuffix
const container = azureConfig.ContainerName

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
        const name = `record-${locationId}-${new Date().toISOString()}`
        const response = await axios.put(`${route}/${name}`, fileData, {
            headers: {
                'Authorization': `SharedKey ${account}:${accountKey}`
            }
        });
        console.log(response)
        console.log('File uploaded successfully');
        return name
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

// Playground function
async function main() {
    const res = await uploadImage(0,'file:///Internal storage/DCIM/Screenshots/example.jpg')
    console.log(res)
}


export{
    uploadImage
}
