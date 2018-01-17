const initialState = {
  fetching: false,
  fetched: false,
  error: false,
  games: []
}

export const gamesReducer = (state = initialState, action) => {
  //
  switch (action.type) {
      case 'FETCH_GAMES': {
          return { ...state, fetching: true }
          break;
      }
      case 'FETCH_GAMES_ERROR': {
        return { ...state, fetching: false, error: action.payload }
      }
      case 'FETCH_GAMES_SUCCESS': {
        return { ...state, fetching: false, fetched: true, games: action.payload }
      }
  }
  return state;
}