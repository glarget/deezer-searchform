import React from "react";
import SearchInput from "../";
import { render } from "@testing-library/react";

describe("SearchInput", () => {
  describe("render()", () => {
    it("should render a SearchInput component", () => {
      // Given
      const { getByTestId } = render(<SearchInput onChange={() => {}} />);

      // Then
      expect(getByTestId("searchInput")).toBeInTheDocument();
    });

    it("should render a logo component", () => {
      // Given
      const { getByTestId } = render(<SearchInput onChange={() => {}} />);

      // Then
      expect(getByTestId("logo")).toBeInTheDocument();
    });

    it("should render an input component", () => {
      // Given
      const { getByTestId } = render(<SearchInput onChange={() => {}} />);

      // Then
      expect(getByTestId("input")).toBeInTheDocument();
    });
  });
});
