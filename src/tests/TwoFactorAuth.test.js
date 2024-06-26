import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import TwoFactorAuthScreen from "../app/twofactorauth";
import SixDigitInput from "../components/SixDigitInput";
import { handleVerification } from "../app/twofactorauth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TwoFactorAuthService = require("../lib/2FAService.js");

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve("")),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));
jest.mock("../lib/2FAService", () => ({
  authenticateTwoFactorCode: jest.fn(),
}));

describe("<TwoFactorAuthScreen />", () => {
  it("has SixDigitInput component for authentication key", () => {
    const component = renderer.create(<TwoFactorAuthScreen />);
    const rootInstance = component.root;

    const sixDigitInputs = rootInstance.findAllByType(SixDigitInput);

    expect(sixDigitInputs.length).toBeGreaterThan(0);
  });

  it("has Authenticate button", () => {
    const { getByText } = render(<TwoFactorAuthScreen />);
    const authenticateButton = getByText("Authenticate");
    expect(authenticateButton).toBeDefined();
  });

  it("calls handleVerification function when Authenticate button is pressed", async () => {
    // Mock AsyncStorage.getItem to return user data

    const mockedHandleVerification = jest.fn();

    AsyncStorage.getItem.mockResolvedValue(
      JSON.stringify({ username: "test", password: "test", token: "token" })
    );

    // Render the component
    const { getByText } = render(<TwoFactorAuthScreen />);

    // Find the Authenticate button and simulate a press event
    const authenticateButton = getByText("Authenticate");
    fireEvent.press(authenticateButton);

    // Wait for asynchronous tasks to complete
    await waitFor(() => { });

    // Expect handleVerification to be called
    expect(TwoFactorAuthService.authenticateTwoFactorCode).toHaveBeenCalled();
  });
});
