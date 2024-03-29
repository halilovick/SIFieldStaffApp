import React from 'react';
import { render, fireEvent, waitFor  } from '@testing-library/react-native';
import LoginScreen from '../app/login';

global.alert = jest.fn();// Mocking the alert function

describe('LoginScreen', () => {
  test('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    
    expect(getByPlaceholderText('Username or Phone Number')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  test('should update username and password fields', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);

    const usernameInput = getByPlaceholderText('Username or Phone Number');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(usernameInput, 'testUser');
    fireEvent.changeText(passwordInput, 'testPassword');

    expect(usernameInput.props.value).toBe('testUser');
    expect(passwordInput.props.value).toBe('testPassword');
  });

});