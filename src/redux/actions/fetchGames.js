import axios from 'axios';
import config from '../../key';

export const fetchGames = () => {
  return (dispatch) => {
      dispatch({ type: 'FETCH_GAMES' })
      axios.get('https://api.twitch.tv/helix/games/top', config)
           .then(res => dispatch({ type: 'FETCH_GAMES_SUCCESS', payload: res.data.data }))
           .catch(err => dispatch({ type:'FETCH_GAMES_ERROR', payload: err }))
  }
}
