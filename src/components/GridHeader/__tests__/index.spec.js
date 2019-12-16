import React from "react";
import GridHeader from "../";
import { shallow } from "enzyme";

const defaultProps = {
  onFilterChange: jest.fn(),
  onClickSort: jest.fn(),
  ascendentId: false,
  ascendentRank: false
};

describe("<GridHeader />", () => {
  describe("render()", () => {
    it("should render a header by default", () => {
      // Given
      const tree = shallow(<GridHeader {...defaultProps} />);
      const header = tree.find("[data-test-id='header']");

      // Then
      expect(header).toHaveLength(1);
    });

    it("should display a ChevronUpSvg by default if we have a ascendent rank state to false", () => {
      // Given
      const tree = shallow(<GridHeader {...defaultProps} />);
      const pictoFilter = tree.find(".pictoFilter").at(0);
      const chevronUpSvg = pictoFilter.find("[data-test-id='chevronUpSvg']");

      // Then
      expect(chevronUpSvg).toHaveLength(1);
    });

    it("should display a ChevronDownSvg if we have a ascendentRank state to true", () => {
      // Given
      const props = { ...defaultProps, ascendentRank: true };

      const tree = shallow(<GridHeader {...props} />);
      const pictoFilter = tree.find(".pictoFilter").at(0);
      const chevronDownSvg = pictoFilter.find(
        "[data-test-id='chevronDownSvg']"
      );

      // Then
      expect(chevronDownSvg).toHaveLength(1);
    });

    it("should display a ChevronUpSvg if we have a ascendentId state to false", () => {
      // Given
      const props = { ...defaultProps };

      const tree = shallow(<GridHeader {...props} />);
      const pictoFilter = tree.find(".pictoFilter").at(1);
      const chevronUpSvg = pictoFilter.find("[data-test-id='chevronUpSvg']");

      // Then
      expect(chevronUpSvg).toHaveLength(1);
    });

    it("should display a ChevronDownSvg if we have a ascendentId state to true", () => {
      // Given
      const props = { ...defaultProps, ascendentId: true };

      const tree = shallow(<GridHeader {...props} />);
      const pictoFilter = tree.find(".pictoFilter").at(1);
      const chevronDownSvg = pictoFilter.find(
        "[data-test-id='chevronDownSvg']"
      );

      // Then
      expect(chevronDownSvg).toHaveLength(1);
    });
  });

  describe("handleChange()", () => {
    it("should dispath the onFilterChange props when we change the select", () => {
      // Given
      const spyFilterChange = jest.fn();
      const props = { ...defaultProps, onFilterChange: spyFilterChange };

      const tree = shallow(<GridHeader {...props} />);

      // When
      tree.instance().handleChange({ value: "keane" });

      // Then
      expect(spyFilterChange).toHaveBeenCalledWith("keane");
    });
  });

  describe("handleClickSort()", () => {
    it("should dispath the onClickSort prop when we sort a song by rank", () => {
      // Given
      const spyOnClickSort = jest.fn();
      const props = { ...defaultProps, onClickSort: spyOnClickSort };

      const tree = shallow(<GridHeader {...props} />);

      // When
      tree
        .find(".pictoFilter")
        .at(0)
        .simulate("click");

      // Then
      expect(spyOnClickSort).toHaveBeenCalledWith("rank");
    });
  });

  describe("Select custom styles", () => {
    it("display the select styles correctly", () => {
      // Given
      const tree = shallow(<GridHeader {...defaultProps} />);

      // When
      const selector = tree.find("[data-test-id='selector']");
      const selectorColor = selector
        .prop("styles")
        .option({}, { selectProps: { menuColor: "red" } }).color;

      // Then
      expect(selectorColor).toBe("red");
    });
  });
});
