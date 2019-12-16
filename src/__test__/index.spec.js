import React from "react";
import { shallow } from "enzyme";
import { App as PureApp, mapStateToProps } from "../App";

const defaultProps = {
  fetchSongs: jest.fn(),
  filterByAlbum: jest.fn(),
  songs: [],
  error: "",
  isFetching: false,
  album: [],
  artist: []
};

describe("<App>", () => {
  describe("render()", () => {
    it("should render by default", () => {
      // Given
      const tree = shallow(<PureApp {...defaultProps} />);

      // When
      const App = tree.find("[data-test-id='app']");

      // Then
      expect(App).toHaveLength(1);
    });

    it("should render with an error message when we have a API request error", () => {
      // Given
      const props = { ...defaultProps, error: "network error" };
      const tree = shallow(<PureApp {...props} />);

      // When
      const ErrorMessage = tree.find("[data-test-id='errorMessage']");

      // Then
      expect(ErrorMessage).toHaveLength(1);
    });

    it("should render with an header when we have songs data", () => {
      // Given
      const props = { ...defaultProps, songs: [{ id: 1, name: "keane" }] };
      const tree = shallow(<PureApp {...props} />);

      // When
      const gridHeader = tree.find("[data-test-id='gridHeader']");

      // Then
      expect(gridHeader).toHaveLength(1);
    });

    it("should render a spinner when the songs data are fetching", () => {
      // Given
      const props = { ...defaultProps, isFetching: true };
      const tree = shallow(<PureApp {...props} />);

      // When
      const loaderSpinner = tree.find("[data-test-id='loaderSpinner']");

      // Then
      expect(loaderSpinner).toHaveLength(1);
    });

    it("should render a grid item when we filter by album", () => {
      // Given
      const props = {
        ...defaultProps,
        album: [{ id: 1, link: "Hopes And Fears" }]
      };
      const tree = shallow(<PureApp {...props} />);

      // Then
      expect(tree.exists(".SuggestContainer")).toBeTruthy();
    });
  });

  describe("handleFilterChange()", () => {
    it("should dispatch the filterByAlbum prop", () => {
      // Given
      const spyFilterByAlbum = jest.fn();
      const expectedSongs = [{ id: 1, name: "keane" }];
      const props = {
        ...defaultProps,
        songs: expectedSongs,
        filterByAlbum: spyFilterByAlbum
      };
      const tree = shallow(<PureApp {...props} />);

      // When
      tree.instance().handleFilterChange();

      // Then
      expect(spyFilterByAlbum).toHaveBeenNthCalledWith(1, expectedSongs);
      spyFilterByAlbum.mockRestore();
    });
  });

  describe("handleSort()", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    const spySortSongs = jest.fn();
    const expectedSongs = [{ id: 1, name: "keane" }];
    const props = {
      ...defaultProps,
      songs: expectedSongs,
      sortSongs: spySortSongs
    };

    it("should change the ascendentId state to true when we sort the songs by id", () => {
      // Given
      const tree = shallow(<PureApp {...props} />);

      // When
      tree.instance().handleSort("id");

      // Then
      expect(tree.state().ascendentId).toBe(true);
    });

    it("should not change the ascendentId state to true when we sort the songs by something else", () => {
      // Given
      const tree = shallow(<PureApp {...props} />);

      // When
      tree.instance().handleSort("link");

      // Then
      expect(tree.state().ascendentId).toBe(false);
    });

    it("should change the ascendentRank state to true when we sort the songs by rank", () => {
      // Given
      const tree = shallow(<PureApp {...props} />);

      // When
      tree.instance().handleSort("rank");

      // Then
      expect(tree.state().ascendentRank).toBe(true);
    });

    it("should not change the ascendentRank state to true when we sort the songs by something else ", () => {
      // Given
      const tree = shallow(<PureApp {...props} />);

      // When
      tree.instance().handleSort("link");

      // Then
      expect(tree.state().ascendentRank).toBe(false);
    });

    describe("dispatching sortSongs", () => {
      it("should dispatch the sortSongs prop when we sort by id and we have songs", () => {
        // Given
        const tree = shallow(<PureApp {...props} />);

        // When
        tree.instance().handleSort("id");

        // Then
        expect(spySortSongs).toHaveBeenNthCalledWith(
          1,
          expectedSongs,
          "id",
          true
        );
      });

      it("should dispatch the sortSongs prop when we sort by id and we have albums", () => {
        // Given
        const spySortSongs = jest.fn();
        const expectedAlbum = [{ id: 7069140 }];

        const props = {
          ...defaultProps,
          sortSongs: spySortSongs,
          album: expectedAlbum
        };
        const tree = shallow(<PureApp {...props} />);

        // When
        tree.instance().handleSort("id");

        // Then
        expect(spySortSongs).toHaveBeenNthCalledWith(
          1,
          expectedAlbum,
          "id",
          true
        );
      });

      it("should dispatch the sortSongs prop when we sort by rank", () => {
        // Given
        const tree = shallow(<PureApp {...props} />);

        // When
        tree.instance().handleSort("rank");

        // Then
        expect(spySortSongs).toHaveBeenNthCalledWith(
          1,
          expectedSongs,
          "rank",
          true
        );
      });
    });
  });

  describe("fetchSongs", () => {
    it("should dispatch the fetchSongs props when we search a song", () => {
      // Given
      const spyFetchSongs = jest.fn();
      const props = { ...defaultProps, fetchSongs: spyFetchSongs };
      const tree = shallow(<PureApp {...props} />);

      // When
      tree.instance().fetchSongs("keane");

      // Then

      expect(spyFetchSongs).toHaveBeenCalledWith("keane");
    });
  });

  describe("handleChangeInput", () => {
    it("should dispatch the fetchSongs prop when do a search", () => {
      // Given
      const tree = shallow(<PureApp {...defaultProps} />);

      const spyFetchSongs = jest.spyOn(
        tree.instance(),
        "autocompleteSearchThrottled"
      );

      // When
      tree.instance().handleChangeInput({ target: { value: "keane" } });

      // Then
      expect(spyFetchSongs).toHaveBeenCalledWith("keane");
    });
  });

  describe("mapStateToProps", () => {
    it("should show the good state from the store", () => {
      const initialState = {
        songsReducer: {
          songs: [],
          error: "",
          isFetching: false,
          album: []
        }
      };

      expect(mapStateToProps(initialState)).toEqual(
        expect.objectContaining({
          album: [],
          error: "",
          isFetching: false,
          songs: []
        })
      );
    });
  });
});
