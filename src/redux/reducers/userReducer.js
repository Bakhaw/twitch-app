const initialState = {
  fetching: false,
  fetched: false,
  error: false,
  user: []
}

export const userReducer = (state = initialState, action) => {
  //
  switch (action.type) {
      case 'FETCH_USER': {
          return { ...state, fetching: true }
          break;
      }
      case 'FETCH_USER_ERROR': {
        return { ...state, fetching: false, error: action.payload }
      }
      case 'FETCH_USER_SUCCESS': {
        return { ...state, fetching: false, fetched: true, user: action.payload }
      }
  }
  return state;
}