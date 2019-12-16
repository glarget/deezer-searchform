import { FILTER_ALBUM } from './types'

const filterAlbum = albumList => ({
  type: FILTER_ALBUM,
  payload: albumList
})


export default filterAlbum