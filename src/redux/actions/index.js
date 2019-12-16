import axios from "axios";
import fetchSong from "./fetchSong";
import fetchSongSuccess from "./fetchSongSuccess";
import fetchSongError from "./fetchSongError";
import sortSongByElement from "./sortSongByElement";
import filterAlbum from "./filterAlbum";

export const fetchSongs = query => dispatch => {
  dispatch(fetchSong());

  return axios
    .get("/search/track?q=" + query)
    .then(res => {
      dispatch(fetchSongSuccess(res.data.data));
    })
    .catch(err => {
      dispatch(fetchSongError(err.message));
    });
};

export const sortSongs = (songs, type, ascendent) => dispatch => {
  let sortedSongs;

  if (type === "id" || type === "rank")
    sortedSongs = songs.sort((a, b) => {
      return ascendent ? a[type] - b[type] : b[type] - a[type];
    });

  dispatch(sortSongByElement(sortedSongs));
};

export const filterByAlbum = songs => dispatch => {
  dispatch(filterAlbum(songs));
};
