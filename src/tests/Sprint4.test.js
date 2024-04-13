import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailsCampaign from '../app/detailscampaign';
//import CampaignLocationsList from '../app/campaignlocationslist';

// Mock AsyncStorage.getItem to return a valid user object
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn().mockResolvedValue(JSON.stringify({ id: '123' })),
}));

  jest.mock('../lib/LocationService.js', () => ({
    getLocationsWithStatus: jest.fn().mockResolvedValue([]),
}));

jest.mock('../lib/CampaignService.js', () => ({
    updateCampaignWorkStatus: jest.fn().mockResolvedValue({ status: 'OK' }),
}));

describe('DetailsCampaign status', () => {
    
    it('renders correctly with the Picker when accepted is true', async () => {
        const route = { params: { item: {}, accepted: true, workStatus: 'not started' }, userId: '123' };
        const { getByTestId, getByText } = render(<DetailsCampaign route={route} />);

        // Check that the "Update Progress" label is rendered
        expect(getByText('Update Progress')).toBeDefined();

        // Get the Picker component by its testID
        const picker = getByTestId('workStatusPicker');
        expect(picker).toBeDefined();

        // Select a different status
        await act(async () => {
            fireEvent(picker, 'onValueChange', 'working on it');
        });
    });

    it('does not render the Picker when accepted is false', async () => {
        const route = { params: { item: {}, accepted: false, workStatus: 'not started' } };
        const { queryByTestId } = render(<DetailsCampaign route={route} />);

        // Check that the Picker is not rendered
        const picker = queryByTestId('workStatusPicker');
        expect(picker).toBeNull();
    });
});

