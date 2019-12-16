import React from "react";
import GridItem from "../";
import { render } from "@testing-library/react";

const defaultProps = {
  id: 0,
  album: {},
  title: "keane",
  link: "https://www.deezer.com/en/track/2317363",
  rank: 12,
  cover_small: "",
  tracklist: ""
};

describe("GridItem", () => {
  it("should render a grid Item", () => {
    // Given
    const { getAllByTestId } = render(<GridItem {...defaultProps} />);

    // Then
    expect(getAllByTestId("gridItem").length).toBe(4);
  });

  it("should render a given rank", () => {
    // Given
    const { getByTestId } = render(<GridItem {...defaultProps} />);

    // Then
    expect(getByTestId("rank").innerHTML).toBe("12");
  });

  it("renders a given id", () => {
    // Given
    const { getByTestId } = render(<GridItem {...defaultProps} />);

    // Then
    expect(getByTestId("id").innerHTML).toBe("0");
  });

  it("should render a given title", () => {
    // Given
    const { getByTestId } = render(<GridItem {...defaultProps} />);

    // Then
    expect(getByTestId("title")).toHaveTextContent("keane");
  });

  it("should render a given album Title", () => {
    // Given
    const props = { ...defaultProps, title: "", album: { title: "beatle" } };
    const { getByTestId } = render(<GridItem {...props} />);

    // Then
    expect(getByTestId("titleAlbum").innerHTML).toBe("beatle");
  });

  it("should render a list with a tracklist album", () => {
    const expectedTrack = "https://www.deezer.com/en/track/796249272";
    // Given
    const props = {
      ...defaultProps,
      title: "",
      link: "",
      album: { tracklist: expectedTrack }
    };
    const { getByTestId } = render(<GridItem {...props} />);

    // Then
    expect(getByTestId("link")).toHaveAttribute("href", expectedTrack);
  });

  it("should render a given cover_small image", () => {
    // Given
    const expectedCover =
      "http://cdn-images.deezer.com/images/cover/3cd16bca5580ac090db8d72f7dc84b80/56x56-000000-80-0-0.jpg";

    const props = {
      ...defaultProps,
      cover_small: expectedCover
    };
    const { getByTestId } = render(<GridItem {...props} />);

    // Then
    expect(getByTestId("img")).toHaveAttribute("src", expectedCover);
  });
});
