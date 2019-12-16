import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { throttle } from "throttle-debounce";

import styles from "./App.module.scss";
import { fetchSongs, sortSongs, filterByAlbum } from "./redux/actions";

import { ReactComponent as DeezerLogo } from "./assets/icons/logo.svg";

import GridHeader from "./components/GridHeader";
import GridItem from "./components/GridItem";
import SearchInput from "./components/SearchInput";
import ErrorMessage from "./components/ErrorMessage";
import LoaderSpinner from "./components/LoaderSpinner";

export class App extends Component {
  constructor(props) {
    super(props);
    this.autocompleteSearchThrottled = throttle(300, this.fetchSongs);
  }

  state = {
    ascendentId: false,
    ascendentRank: false
  };

  fetchSongs = value => {
    this.props.fetchSongs(value);
  };

  handleChangeInput = ({ target }) => {
    const value = target.value;
    this.autocompleteSearchThrottled(value);
  };

  renderGridItem = dataElement => (
    <div className={styles.SuggestContainer}>
      {dataElement.map((data, index) => {
        return <GridItem key={index} {...data} />;
      })}
    </div>
  );

  handleSort = type => {
    if (type === "id") {
      this.setState({ ascendentId: !this.state.ascendentId });
    }

    if (type === "rank") {
      this.setState({ ascendentRank: !this.state.ascendentRank });
    }

    const { songs, album } = this.props;

    switch (type) {
      case "id":
        songs &&
          songs.length > 0 &&
          this.props.sortSongs(songs, "id", this.state.ascendentId);
        album &&
          album.length > 0 &&
          this.props.sortSongs(album, "id", this.state.ascendentId);
        break;
      case "rank":
        songs && this.props.sortSongs(songs, "rank", this.state.ascendentRank);
        break;
      default:
        break;
    }
  };

  handleFilterChange = () => {
    this.props.filterByAlbum(this.props.songs);
  };

  render() {
    const { songs, error, isFetching, album } = this.props;
    const { ascendentId, ascendentRank } = this.state;

    const hasSongs = songs && songs.length > 0;
    const hasAlbum = album && album.length > 0;

    const displayHeader = hasSongs || hasAlbum;

    return (
      <div className={styles.App} data-test-id="app">
        <div className={styles.logo}>
          <DeezerLogo />
        </div>

        <SearchInput onChange={this.handleChangeInput} />

        {hasSongs && (
          <div className={styles.results}> {songs.length} résultats </div>
        )}

        {error && <ErrorMessage data-test-id="errorMessage" error={error} />}

        {displayHeader && (
          <GridHeader
            data-test-id="gridHeader"
            onFilterChange={this.handleFilterChange}
            ascendentId={ascendentId}
            ascendentRank={ascendentRank}
            onClickSort={this.handleSort}
            songs={songs}
          />
        )}

        {isFetching && <LoaderSpinner data-test-id="loaderSpinner" />}

        {songs && songs.length > 0 && this.renderGridItem(songs)}

        {album && album.length > 0 && this.renderGridItem(album)}
      </div>
    );
  }
}

App.propTypes = {
  fetchSongs: PropTypes.func,
  filterByAlbum: PropTypes.func,
  songs: PropTypes.array,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  album: PropTypes.array,
  artist: PropTypes.array
};

export const mapStateToProps = state => {
  return {
    songs: state.songsReducer.songs,
    error: state.songsReducer.error,
    isFetching: state.songsReducer.isFetching,
    album: state.songsReducer.album
  };
};

const mapDispatchToProps = {
  fetchSongs,
  sortSongs,
  filterByAlbum
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
