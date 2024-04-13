import 'react-native';
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import CampaignsScreen from '../app/campaigns';
import CampaignsList from '../components/CampaignsList';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock the entire CampaignService module
jest.mock('../lib/CampaignService.js');
const CampaignService = require('../lib/CampaignService.js');

// Mock AsyncStorage.getItem
jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => Promise.resolve(JSON.stringify({ id: '123' })));

describe('CampaignsScreen', () => {
    it('CampaignsScreen renders available and accepted campaigns for a given user', async () => {
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
        const route = { params: { userId: '123' } };
        const { getByText } = render(<CampaignsScreen route={route} />);

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
