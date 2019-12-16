import { SONG_SORT_BY_ELEMENT } from './types'

const sortSongByElement = data => {
  return ({
    type: SONG_SORT_BY_ELEMENT,
    payload: data
  })
} 


export default sortSongByElement