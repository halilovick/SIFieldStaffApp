import 'react-native';
import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import CampaignsScreen from '../app/campaigns';
import DetailsCampaign from '../app/detailscampaign';
import CampaignsList from '../components/CampaignsList';

import AsyncStorage from '@react-native-async-storage/async-storage';
// Mock the entire CampaignService module
jest.mock('../lib/CampaignService.js');
const CampaignService = require('../lib/CampaignService.js');

describe('CampaignsScreen', () => {
    it('CampaignsScreen renders available and accepted campaigns for a given user', async () => {
        // Mock AsyncStorage.getItem
        jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => Promise.resolve(JSON.stringify({ id: '123' })));

        // Mock CampaignService.getCampaignsForUser
        jest.spyOn(CampaignService, 'getCampaignsForUser').mockImplementation(() => Promise.resolve([
            // Replace with the campaigns you want for your test
            { id: 'campaign1', name: 'Campaign 1' },
            { id: 'campaign2', name: 'Campaign 2' },
        ]));

        // Mock CampaignService.getAcceptedCampaignsForUser
        jest.spyOn(CampaignService, 'getAcceptedCampaignsForUser').mockImplementation(() => Promise.resolve([
            // Replace with the accepted campaigns you want for your test
            { id: 'acceptedCampaign1', name: 'Accepted Campaign 1' },
            { id: 'acceptedCampaign2', name: 'Accepted Campaign 2' },
        ]));

        // Mocking the route prop
        const route = { params: {userId: '123'} };
        const { getByText } = render(<CampaignsScreen route={route} />);

        // Since fetching data is an asynchronous operation, we need to wait for it to complete
        // before we can assert on the rendered output.
        await waitFor(() => {
            // Check that the campaign names are being rendered
            expect(getByText('Campaign 1')).toBeDefined();
            expect(getByText('Campaign 2')).toBeDefined();
            expect(getByText('Accepted Campaign 1')).toBeDefined();
            expect(getByText('Accepted Campaign 2')).toBeDefined();
        });
    });
});

describe('CampaignsList', () => {
    it('CampaignsList renders correctly with test data', () => {
        const testData = [
            { id: '1', name: 'Campaign 1' },
            { id: '2', name: 'Campaign 2' },
        ];
        const { getByText } = render(<CampaignsList data={testData} />);
        expect(getByText('Campaign 1')).toBeDefined();
        expect(getByText('Campaign 2')).toBeDefined();
    });
});


describe('DetailsCampaign', () => {
    it('DetailsCampaign renders correctly with mock data', async () => {
        const { getByText } = render(<DetailsCampaign route={{ params: { accepted: false, item: { id: '1', name: 'Campaign 1', description: 'Description 1', startDate: '2024-04-01', endDate: '2024-04-30', locations: [] } }}} />);
        expect(getByText('Campaign 1')).toBeDefined();
        expect(getByText('Description 1')).toBeDefined();
        expect(getByText('Start Date:')).toBeDefined();
        expect(getByText('01/04/2024')).toBeDefined();
        expect(getByText('End Date:')).toBeDefined();
        expect(getByText('30/04/2024')).toBeDefined();
    });

    it('calls updateCampaignStatus with "accepted" status when Accept button is pressed', async () => {
        // Create a spy for the updateCampaignStatus function
        const mockUpdateCampaignStatus = jest.spyOn(CampaignService, 'updateCampaignStatus');
        // Mock navigation prop
        const mockNavigation = {
            navigate: jest.fn(),
        };

        const { getByText } = render(<DetailsCampaign route={{ params: { accepted: false, item: { id: '1', name: 'Campaign 1', description: 'Description 1', startDate: '2024-04-01', endDate: '2024-04-30', locations: [] } }}} navigation={mockNavigation} />);
        fireEvent.press(getByText('Accept'));
        await waitFor(() => {
            expect(mockUpdateCampaignStatus).toHaveBeenCalledWith('123', '1', 'accepted');
        });
    });

    it('calls updateCampaignStatus with "declined" status when Decline button is pressed', async () => {
        // Create a spy for the updateCampaignStatus function
        const mockUpdateCampaignStatus = jest.spyOn(CampaignService, 'updateCampaignStatus');
        // Mock navigation prop
        const mockNavigation = {
            navigate: jest.fn(),
        };
        const { getByText } = render(<DetailsCampaign route={{ params: { accepted: false, item: { id: '1', name: 'Campaign 1', description: 'Description 1', startDate: '2024-04-01', endDate: '2024-04-30', locations: [] } }}} navigation={mockNavigation} />);
        fireEvent.press(getByText('Decline'));
        await waitFor(() => {
            expect(mockUpdateCampaignStatus).toHaveBeenCalledWith('123', '1', 'declined');
        });
    });
});
