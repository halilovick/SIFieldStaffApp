import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import DetailsCampaign from '../app/detailscampaign';
import CampaignService from '../lib/CampaignService.js';

// Mock AsyncStorage.getItem to return a valid user object
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn().mockResolvedValue(JSON.stringify({ id: '123' })),
}));

jest.mock('../lib/CampaignService.js', () => ({
    updateCampaignWorkStatus: jest.fn().mockResolvedValue({ status: 'OK' }),
    updateCampaignStatus: jest.fn(),
}));

describe('DetailsCampaign - sprint 3', () => {
    it('DetailsCampaign renders correctly with mock data', async () => {
        const { getByText } = render(<DetailsCampaign route={{ params: { accepted: false, item: { id: '1', name: 'Campaign 1', description: 'Description 1', startDate: '2024-04-01', endDate: '2024-04-30', locations: [] } } }} />);
        expect(getByText('Campaign 1')).toBeDefined();
        expect(getByText('Description 1')).toBeDefined();
        expect(getByText('Start Date')).toBeDefined();
        expect(getByText('01 Apr 2024')).toBeDefined();
        expect(getByText('End Date')).toBeDefined();
        expect(getByText('30 Apr 2024')).toBeDefined();
    });

    it('calls updateCampaignStatus with "accepted" status when Accept button is pressed', async () => {
        // Create a spy for the updateCampaignStatus function
        const mockUpdateCampaignStatus = jest.spyOn(CampaignService, 'updateCampaignStatus');
        // Mock navigation prop
        const mockNavigation = {
            navigate: jest.fn(),
        };

        const { getByText } = render(<DetailsCampaign route={{ params: { accepted: false, item: { id: '1', name: 'Campaign 1', description: 'Description 1', startDate: '2024-04-01', endDate: '2024-04-30', locations: [] } } }} navigation={mockNavigation} />);
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
        const { getByText } = render(<DetailsCampaign route={{ params: { accepted: false, item: { id: '1', name: 'Campaign 1', description: 'Description 1', startDate: '2024-04-01', endDate: '2024-04-30', locations: [] } } }} navigation={mockNavigation} />);
        fireEvent.press(getByText('Decline'));
        await waitFor(() => {
            expect(mockUpdateCampaignStatus).toHaveBeenCalledWith('123', '1', 'declined');
        });
    });
});


describe('DetailsCampaign status - sprint 4', () => {

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

    it('handles status change correctly', async () => {
        const route = { params: { item: {}, accepted: true, workStatus: 'not started' } };
        const { getByTestId } = render(<DetailsCampaign route={route} />);
        const picker = getByTestId('workStatusPicker');

        // Select a different status
        await act(async () => {
            fireEvent(picker, 'onValueChange', 'working on it');
        });

        expect(route.params.workStatus).toBe('working on it');
    });

    it('handles accept correctly', async () => {
        const route = { params: { item: { id: '123' }, accepted: false, workStatus: 'not started' } };
        const navigation = { navigate: jest.fn() };
        const { getByText } = render(<DetailsCampaign route={route} navigation={navigation} />);
        const acceptButton = getByText('Accept');

        fireEvent.press(acceptButton);

        await waitFor(() => {
            expect(navigation.navigate).toHaveBeenCalledWith('Campaigns', { campaignId: '123' });
        });
    });

    it('handles decline correctly', async () => {
        const route = { params: { item: { id: '123' }, accepted: false, workStatus: 'not started' } };
        const navigation = { navigate: jest.fn() };
        const { getByText } = render(<DetailsCampaign route={route} navigation={navigation} />);
        const declineButton = getByText('Decline');

        fireEvent.press(declineButton);
        await waitFor(() => {
            expect(navigation.navigate).toHaveBeenCalledWith('Campaigns', { campaignId: '123' });
        });
    });

    it('handles see locations correctly', async () => {
        const route = { params: { item: { locations: [] }, accepted: true } };
        const navigation = { navigate: jest.fn() };
        const { getByText } = render(<DetailsCampaign route={route} navigation={navigation} />);
        const seeLocationsButton = getByText('View Campaign Locations');

        fireEvent.press(seeLocationsButton);
        await waitFor(() => {
            expect(navigation.navigate).toHaveBeenCalledWith('Campaign Locations List', {
                locations: [],
                accepted: true,
            });
        });
    });

});

