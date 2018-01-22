import axios from 'axios';
import config from '../../key';
import { fetchUserVideos } from './fetchUserVideos'

export const fetchUserFollows = (url) => {
  return (dispatch) => {
      dispatch({ type: 'FETCH_USER_FOLLOWS' })
      axios.get(url, config)
           .then(res => dispatch({ type: 'FETCH_USER_FOLLOWS_SUCCESS', payload: res.data }))
           .catch(err => dispatch({ type:'FETCH_USER_FOLLOWS_ERROR', payload: err }))
           .then(res => dispatch(fetchUserVideos(`https://api.twitch.tv/helix/videos?user_id=${res.payload.data[0].to_id}`)))
  }
}
