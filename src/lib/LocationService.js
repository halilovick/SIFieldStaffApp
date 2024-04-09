const AuthService = require('./AuthService.js')

/* Update the user's status for a specific campaign.
*  Params:  userId (User ID), 
*           campaignId (Campaign ID),
*           status (Status of the campaign, which can be "not started," "working on it," or "done").
*/
const updateCampaignStatus = async (userId, campaignId, status) => {
    try {

    } catch (error) {
        throw error;
    }
}

/*  Send recorded data to the database.
*   Params: serialNumber,
*           inventoryNumber,
*           gpsCoordinates      
*           fullAddress
*           photo
*/
const recordData = async (serialNumber, inventoryNumber, gpsCoordinates, fullAddress, photoUri) => {
    try {

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

    } catch (error) {
        throw error;
    }
}

export {
    updateCampaignStatus,
    recordData,
    updateLocationStatus
}