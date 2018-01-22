import axios from 'axios';
import config from '../../key';
import { fetchUserFollows } from './fetchUserFollows'


export const fetchUser = (url) => {
  return (dispatch) => {
      dispatch({ type: 'FETCH_USER' })
      axios.get(url, config)
           .then(res =>  dispatch({ type: 'FETCH_USER_SUCCESS', payload: res.data }))
           .catch(err => dispatch({ type:'FETCH_USER_ERROR', payload: err }))
           .then(res => dispatch(fetchUserFollows(`https://api.twitch.tv/helix/users/follows?to_id=${res.payload.data[0].id}`)))
  }
}

