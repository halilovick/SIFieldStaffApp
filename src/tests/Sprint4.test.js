import React from 'react';
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react-native';
import DetailsCampaign from '../app/detailscampaign';
import CampaignLocationsList from '../app/campaignlocationslist';
import LocationService from '../lib/LocationService';

// Mock AsyncStorage.getItem to return a valid user object
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn().mockResolvedValue(JSON.stringify({ id: '123' })),
}));

jest.mock('../lib/LocationService.js', () => ({
    getLocationsWithStatus: jest.fn().mockResolvedValue([]),
    updateLocationStatus: jest.fn().mockResolvedValue({}),
}));

jest.mock('../lib/CampaignService.js', () => ({
    updateCampaignWorkStatus: jest.fn().mockResolvedValue({ status: 'OK' }),
    updateCampaignStatus: jest.fn(),
}));

jest.mock('../lib/AuthService.js', () => ({
    makeAuthenticatedRequest: jest.fn().mockImplementation(async (url, params, method, body) => {
        // Custom implementation based on the URL, method, and body
        if (url === '/user/campaigns' && method === 'PUT') {
            // Return a mock response for this specific URL and method
            return { status: 'OK' };
        } else {
            // Return a default mock response for other URLs and methods
            return { status: 'DEFAULT' };
        }
    }),
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
        const seeLocationsButton = getByText('See Campaign Locations');

        fireEvent.press(seeLocationsButton);
        await waitFor(() => {
            expect(navigation.navigate).toHaveBeenCalledWith('Campaign Locations List', {
                locations: [],
                accepted: true,
            });
        });

    });
});


describe('CampaignLocationsList', () => {
    it('renders correctly', async () => {
        const route = { params: { locations: [] } };
        const { getByPlaceholderText, getByTestId } = render(<CampaignLocationsList route={route} />);

        const searchInput = getByPlaceholderText('Search locations by name');
        expect(searchInput).toBeDefined();

        const flatList = getByTestId('flatList');
        expect(flatList).toBeDefined();
    });

    it('renders correctly with locations', async () => {
        const locations = [
            { id: '1', typeOfLocation: 'Type 1', address: 'Address 1', contactNumber: '123456789', description: 'Description 1' },
            { id: '2', typeOfLocation: 'Type 2', address: 'Address 2', contactNumber: '987654321', description: 'Description 2' },
        ];
        const route = { params: { locations: locations } };
        const { getByText } = render(<CampaignLocationsList route={route} />);

        // Check that the locations are rendered
        locations.forEach(location => {
            expect(getByText(location.typeOfLocation)).toBeDefined();
            expect(getByText(location.address)).toBeDefined();
        });
    });

    it('handles item press correctly', async () => {
        const locations = [
            { id: '1', typeOfLocation: 'Type 1', address: 'Address 1', contactNumber: '123456789', description: 'Description 1' },
            { id: '2', typeOfLocation: 'Type 2', address: 'Address 2', contactNumber: '987654321', description: 'Description 2' },
        ];
        const route = { params: { locations: locations } };
        const { getByText } = render(<CampaignLocationsList route={route} />);

        // Click on the first location item
        act(() => {
            fireEvent.press(getByText('Type 1'));
        });

        // Check that the item is expanded
        expect(getByText('Contact Number: 123456789')).toBeDefined();
        expect(getByText('Description: Description 1')).toBeDefined();

        // Click on the same location item to collapse it
        act(() => {
            fireEvent.press(getByText('Type 1'));
        });

        // Check that the item is collapsed
        expect(screen.queryByText('Contact Number: 123456789')).toBeNull();
        expect(screen.queryByText('Description: Description 1')).toBeNull();
    });

    it('handles unreachable button press correctly', async () => {
        const mockUnreachableLocations = [
            { id: '1', typeOfLocation: 'Type 1', address: 'Address 1', contactNumber: '123456789', description: 'Description 1' },
        ];
        LocationService.getLocationsWithStatus.mockResolvedValue(mockUnreachableLocations);
        const route = { params: { locations: mockUnreachableLocations, accepted: true } };
        const { getByText } = render(<CampaignLocationsList route={route} />);

        // Find the item and expand it
        act(() => {
            fireEvent.press(getByText('Type 1'));
        });

        act(() => {
            fireEvent.press(getByText('Location is unreachable'));
        });

        // Wait for the state to update
        await waitFor(() => {
            // Assert that the handleUnreachable function was called
            expect(LocationService.updateLocationStatus).toHaveBeenCalledWith(expect.anything(), '1', 'unreachable');
        });
    });

});