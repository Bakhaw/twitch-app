import axios from 'axios';
import config from '../../key';

export const fetchUserVideos = (url) => {
  return (dispatch) => {
      dispatch({ type: 'FETCH_USER_VIDEOS' })
      axios.get(url, config)
           .then(res => dispatch({ type: 'FETCH_USER_VIDEOS_SUCCESS', payload: res.data }))
           .catch(err => dispatch({ type:'FETCH_USER_VIDEOS_ERROR', payload: err }))
  }
}
