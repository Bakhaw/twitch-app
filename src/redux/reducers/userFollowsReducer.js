const initialState = {
  fetching: false,
  fetched: false,
  error: false,
  userFollows: []
}

export const userFollowsReducer = (state = initialState, action) => {
  //
  switch (action.type) {
      case 'FETCH_USER_FOLLOWS': {
          return { ...state, fetching: true }
          break;
      }
      case 'FETCH_USER_FOLLOWS_ERROR': {
        return { ...state, fetching: false, error: action.payload }
      }
      case 'FETCH_USER_FOLLOWS_SUCCESS': {
        return { ...state, fetching: false, fetched: true, userFollows: action.payload }
      }
  }
  return state;
}