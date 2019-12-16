const songsReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_SONGS":
      return { ...state, songs: [], album: [], isFetching: true };

    case "FETCH_SONGS_SUCCESS":
      return { ...state, songs: action.payload, isFetching: false };

    case "FETCH_SONGS_ERROR":
      return { ...state, error: action.payload, songs: [], isFetching: false };

    case "FILTER_BY_ALBUM":
      const album = action.payload.reduce((acc, song) => {
        return [...acc, song.album];
      }, []);

      return { ...state, songs: [], album };

    case "SONG_SORT_BY_ELEMENT":
      return { ...state, songs: action.payload };

    default:
      return state;
  }
};

export default songsReducer;
