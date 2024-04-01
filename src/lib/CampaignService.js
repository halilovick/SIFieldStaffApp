const AuthService = require('./AuthService.js')
/*
    Mock data
*/
const campaigns = [
    {
        "id": 1,
        "name": "Probna 1",
        "description": "Ovo je proba",
        "company_id": 1,
        "start_date": "2024-04-01",
        "end_date": "2024-04-07"
    },
    {
        "id": 2,
        "name": "Probna 2",
        "description": "Ovo je proba",
        "company_id": 1,
        "start_date": "2024-04-08",
        "end_date": "2024-04-14"
    },
    {
        "id": 3,
        "name": "Probna 3",
        "description": "Ovo je proba",
        "company_id": 1,
        "start_date": "2024-04-15",
        "end_date": "2024-04-21"
    }
]

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
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(userId) }, 1000)
    }).then((res) => {
        return { "status": "OK" }
    })
}

export {
    getCampaignsForUser,
    getAcceptedCampaignsForUser,
    getCampaignDetails,
    updateCampaignStatus
}
