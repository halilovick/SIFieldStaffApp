import React from "react";
import renderer from "react-test-renderer";

import LoginScreen from "../app/login";

describe("<LoginScreen />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree.children.length).toBe(5);
  });
});
