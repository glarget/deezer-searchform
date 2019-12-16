import React from "react";
import LoaderSpinner from "../";
import { shallow } from "enzyme";

describe("LoaderSpinner", () => {
  describe("render", () => {
    it("should render a Loader Spinner", () => {
      // Given
      const tree = shallow(<LoaderSpinner />);

      // Then
      expect(tree.find("Loader")).toHaveLength(1);
    });
  });
});
