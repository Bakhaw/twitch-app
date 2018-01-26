import axios from 'axios';
import config from '../../key';

export const fetchVideo = (url) => {
  return (dispatch) => {
      dispatch({ type: 'FETCH_VIDEO' })
      axios.get(url, config)
           .then(res => dispatch({ type: 'FETCH_VIDEO_SUCCESS', payload: res.data }))
           .catch(err => dispatch({ type:'FETCH_VIDEO_ERROR', payload: err }))
  }
}
