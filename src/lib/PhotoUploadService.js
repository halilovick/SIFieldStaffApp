/*
* Initial version
* Not ready for integration
*/

const process = require('dotenv').config()
const fs = require('fs')

const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const account = process.parsed.AccountName
const accountKey = process.parsed.AccountKey

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
);
const containerName = "locationimages";

async function downloadImage(blobName) {

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)

    return await saveBlobToFile(downloaded, `${blobName}.jpeg`)

    async function streamToBuffer(readableStream) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            readableStream.on("data", (data) => {
                chunks.push(data instanceof Buffer ? data : Buffer.from(data));
            });
            readableStream.on("end", () => {
                resolve(Buffer.concat(chunks));
            });
            readableStream.on("error", reject);
        });
    }

    async function saveBlobToFile(blob, fileName) {
        const filePath = `assets/blobtest/${fileName}`;
        const buffer = Buffer.from(blob, 'base64');
        fs.writeFile(filePath, buffer, err => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File saved successfully.');
            }
        });

    }
}

async function uploadImage(recordId, photoUri){
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const content = await fs.promises.readFile('assets/blobtest/test.jpeg') //(photoUri);
    const blobName = "test2" // `record-${recordId}`
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    console.log(`Upload block blob ${blobName} successfully`);
}


async function main() {
    await downloadImage('test')
    await uploadImage(0,'test') // dummy call
    await downloadImage('test2')
    console.log("Done")
}

main()
