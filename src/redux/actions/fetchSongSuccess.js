import { FETCH_SONGS_SUCCESS } from './types'

const fetchSongSuccess = data => ({
  type: FETCH_SONGS_SUCCESS,
  payload: data
})


export default fetchSongSuccess