const AuthService = require('./AuthService.js')
const PhotoUploadService = require('./PhotoUploadService.js')

/*  Send recorded data to the database.
*   Params: serialNumber,
*           inventoryNumber,
*           gpsCoordinates      
*           fullAddress
*           photo
*/
const recordData = async (serialNumber, inventoryNumber, gpsCoordinates, fullAddress, photoUrl, locationId, userId) => {
    try {
        const name = await PhotoUploadService.uploadImage(locationId, photoUrl)
        const body = {
            serialNumber,
            inventoryNumber,
            gpsCoordinates,
            fullAddress,
            photoUrl: name,
            locationId,
            userId,
            createdAt: new Date().toISOString()
        };
        console.log("UPLOADED:",name)
        const response = await AuthService.makeAuthenticatedRequest(`/location/record`, null, "POST", body);
        return response;
    } catch (error) {
        throw error;
    }
}

/* Update the status of a location for the corresponding user.
*  Params: userId (User ID), 
*          locationId,
*          status(Status of the location, which can be "unreachable" or "visited")
*/
const updateLocationStatus = async (userId, locationId, status) => {
    try {
        const body = { userId, locationId, Status: status };
        const response = await AuthService.makeAuthenticatedRequest(`/LocationStatus/`, null, "PUT", body);
        return response;
    } catch (error) {
        throw error;
    }
}

const getLocationsWithStatus = async (userId, status) => {
    try {
        const response = await AuthService.makeAuthenticatedRequest(`/LocationStatus/${userId}/${status}/`, null, "GET", null);
        return response;
    } catch (error) {
        throw error;
    }
}

export {
    recordData,
    updateLocationStatus,
    getLocationsWithStatus
}