import axios from 'axios';
import config from '../../key';

export const fetchUserFollows = (url) => {
  return (dispatch) => {
      dispatch({ type: 'FETCH_USER_FOLLOWS' })
      axios.get(url, config)
           .then(res => dispatch({ type: 'FETCH_USER_FOLLOWS_SUCCESS', payload: res.data }))
           .catch(err => dispatch({ type:'FETCH_USER_FOLLOWS_ERROR', payload: err }))
  }
}
