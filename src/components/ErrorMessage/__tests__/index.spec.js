import React from "react";
import ErrorMessage from "../";
import { render } from "@testing-library/react";

describe("ErrorMessage", () => {
  test("renders a appropriate  error text message", () => {
    // Given
    const { getByText } = render(<ErrorMessage error="network" />);
    const errorMessage = getByText("Une erreur est survenue : network");

    // Then
    expect(errorMessage).toBeInTheDocument();
  });
});
