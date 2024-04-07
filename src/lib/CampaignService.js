const AuthService = require('./AuthService.js')

/*
    This function makes a server call to retrieve campaigns with the status "None" for the specified user.
    Parameters: userId (User ID of the logged-in user).
*/
const getCampaignsForUser = async (userId) => {
    try {
        const response = await AuthService.makeAuthenticatedRequest(`/user/campaigns/${userId}/none`, null, "GET", null);
        return response;
    } catch (error) {
        throw error;
    }
}

/*
    This function makes a server call to retrieve campaigns with the status "Accepted" for the specified user.
    Parameters: userId (User ID of the logged-in user).
*/
const getAcceptedCampaignsForUser = async (userId) => {
    try {
        const response = await AuthService.makeAuthenticatedRequest(`/user/campaigns/${userId}/accepted`, null, "GET", null);
        return response;
    } catch (error) {
        throw error;
    }
}

/*
    This function makes a server call to retrieve details of a specific campaign.
    Parameters: campaignId (ID of the campaign for which details are requested).
*/
const getCampaignDetails = async (campaignId) => {
    try {
        const response = await AuthService.makeAuthenticatedRequest(`/campaigns/${campaignId}`, null, "GET", null);
        return response;
    } catch (error) {
        throw error;
    }
}

/*
    This function makes a server call to update the status of a campaign, typically invoked when a user accepts or declines a campaign.
    Parameters: userId (User ID of the logged-in user), 
                campaignId (ID of the campaign to update), 
                status (New status to set for the campaign).
*/
const updateCampaignStatus = async (userId, campaignId, status) => {
    try {
        const body = {userId, campaignId, status}
        const response = await AuthService.makeAuthenticatedRequest(`/user/campaigns`, null, "PUT", body);
        console.log(response)
        return response;
    } catch (error) {
        throw error;
    }
}

export {
    getCampaignsForUser,
    getAcceptedCampaignsForUser,
    getCampaignDetails,
    updateCampaignStatus
}
