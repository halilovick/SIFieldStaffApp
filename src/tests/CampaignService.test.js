const CampaignService = require('../lib/CampaignService');
const AuthService = require('../lib/AuthService');

jest.mock('../lib/AuthService');

describe('CampaignService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCampaignsForUser', () => {
        it('should make a server call to retrieve campaigns with status "None"', async () => {
            const userId = 'user123';
            const expectedResponse = { data: 'campaigns' };
            AuthService.makeAuthenticatedRequest.mockResolvedValue(expectedResponse);

            const response = await CampaignService.getCampaignsForUser(userId);

            expect(AuthService.makeAuthenticatedRequest).toHaveBeenCalledWith(`/user/campaigns/${userId}/none`, null, "GET", null);
            expect(response).toEqual(expectedResponse);
        });

        it('should throw an error if server call fails', async () => {
            const userId = 'user123';
            const error = new Error('Server error');
            AuthService.makeAuthenticatedRequest.mockRejectedValue(error);

            await expect(CampaignService.getCampaignsForUser(userId)).rejects.toThrow(error);
        });
    });

    describe('getAcceptedCampaignsForUser', () => {
        it('should make a server call to retrieve campaigns with status "Accepted"', async () => {
            const userId = 'user123';
            const expectedResponse = { data: 'campaigns' };
            AuthService.makeAuthenticatedRequest.mockResolvedValue(expectedResponse);

            const response = await CampaignService.getAcceptedCampaignsForUser(userId);

            expect(AuthService.makeAuthenticatedRequest).toHaveBeenCalledWith(`/user/campaigns/${userId}/accepted`, null, "GET", null);
            expect(response).toEqual(expectedResponse);
        });

        it('should throw an error if server call fails', async () => {
            const userId = 'user123';
            const error = new Error('Server error');
            AuthService.makeAuthenticatedRequest.mockRejectedValue(error);

            await expect(CampaignService.getAcceptedCampaignsForUser(userId)).rejects.toThrow(error);
        });
    });

    describe('getCampaignDetails', () => {
        it('should make a server call to retrieve details of a specific campaign', async () => {
            const campaignId = 'campaign123';
            const expectedResponse = { data: 'campaignDetails' };
            AuthService.makeAuthenticatedRequest.mockResolvedValue(expectedResponse);

            const response = await CampaignService.getCampaignDetails(campaignId);

            expect(AuthService.makeAuthenticatedRequest).toHaveBeenCalledWith(`/campaigns/${campaignId}`, null, "GET", null);
            expect(response).toEqual(expectedResponse);
        });

        it('should throw an error if server call fails', async () => {
            const campaignId = 'campaign123';
            const error = new Error('Server error');
            AuthService.makeAuthenticatedRequest.mockRejectedValue(error);

            await expect(CampaignService.getCampaignDetails(campaignId)).rejects.toThrow(error);
        });
    });

    describe('updateCampaignStatus', () => {
        it('should make a server call to update the status of a campaign', async () => {
            const userId = 'user123';
            const campaignId = 'campaign123';
            const status = 'accepted';
            const expectedResponse = { data: 'statusUpdated' };
            const expectedBody = { userId, campaignId, status };
            AuthService.makeAuthenticatedRequest.mockResolvedValue(expectedResponse);

            const response = await CampaignService.updateCampaignStatus(userId, campaignId, status);

            expect(AuthService.makeAuthenticatedRequest).toHaveBeenCalledWith(`/user/campaigns`, null, "PUT", expectedBody);
            expect(response).toEqual(expectedResponse);
        });

        it('should throw an error if server call fails', async () => {
            const userId = 'user123';
            const campaignId = 'campaign123';
            const status = 'accepted';
            const error = new Error('Server error');
            AuthService.makeAuthenticatedRequest.mockRejectedValue(error);

            await expect(CampaignService.updateCampaignStatus(userId, campaignId, status)).rejects.toThrow(error);
        });
    });
});
