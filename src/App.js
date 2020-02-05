import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { throttle } from "throttle-debounce";
import {Helmet} from "react-helmet";

import styles from "./App.module.scss";
import { fetchSongs, sortSongs, filterByAlbum } from "./redux/actions";

import { ReactComponent as DeezerLogo } from "./assets/icons/logo.svg";

import GridHeader from "./components/GridHeader";
import SearchInput from "./components/SearchInput";
import ErrorMessage from "./components/ErrorMessage";
import LoaderSpinner from "./components/LoaderSpinner";

export const LazyGridItem = lazy(() => import('./components/GridItem'))

export class App extends Component {
  componentDidMount() {
    this.autocompleteSearchThrottled = throttle(300, this.fetchSongs);
  };

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
    <Suspense fallback={<h3>loading...</h3>}>
      <div className={styles.SuggestContainer}>
        {dataElement.map((data, index) => {
          return <LazyGridItem key={index} {...data} />
        })}
      </div>
    </Suspense>
  );

  handleSort = type => {
    if (type === "id") {
      this.setState({ ascendentId: !this.state.ascendentId });
    }

    if (type === "rank") {
      this.setState({ ascendentRank: !this.state.ascendentRank });
    }

    const { songs, album, sortSongs } = this.props;

    switch (type) {
      case "id":
          songs?.length > 0 &&
          this.props.sortSongs(songs, "id", this.state.ascendentId);
          album?.length > 0 &&
          this.props.sortSongs(album, "id", this.state.ascendentId);
        break;
      case "rank":
        songs && sortSongs(songs, "rank", this.state.ascendentRank);
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
        <Helmet>
          <title>Deezer - music streaming | Try Flow, download &amp; listen to free music</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
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
