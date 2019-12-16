import { FETCH_SONGS_ERROR } from './types'

const fetchSongError = error => ({
  type: FETCH_SONGS_ERROR,
  payload: error
})


export default fetchSongError