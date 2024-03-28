import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import TwoFactorAuthScreen from "../app/twofactorauth";
import SixDigitInput from "../components/SixDigitInput"; // Assuming this is the correct path to the SixDigitInput component

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
});
