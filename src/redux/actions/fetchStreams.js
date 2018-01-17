import axios from 'axios';
import config from '../../key';

export const fetchStreams = (url) => {
  return (dispatch) => {
      dispatch({ type: 'FETCH_STREAMS' })
      axios.get(url, config)
           .then(res => dispatch({ type: 'FETCH_STREAMS_SUCCESS', payload: res.data }))
           .catch(err => dispatch({ type:'FETCH_STREAMS_ERROR', payload: err }))
  }
}
