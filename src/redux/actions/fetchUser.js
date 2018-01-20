import axios from 'axios';
import config from '../../key';

export const fetchUser = (url) => {
  return (dispatch) => {
      dispatch({ type: 'FETCH_USER' })
      axios.get(url, config)
           .then(res => dispatch({ type: 'FETCH_USER_SUCCESS', payload: res.data }))
           .catch(err => dispatch({ type:'FETCH_USER_ERROR', payload: err }))
  }
}
