import React from 'react';
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react-native';
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


describe('CampaignLocationsList', () => {
    it('renders correctly', async () => {
        const route = { params: { locations: [] } };
        const { getByPlaceholderText, getByTestId } = render(<CampaignLocationsList route={route} />);

        const searchInput = getByPlaceholderText('Search locations by description');
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