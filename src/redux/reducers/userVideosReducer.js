const initialState = {
  fetching: false,
  fetched: false,
  error: false,
  userVideos: []
}

export const userVideosReducer = (state = initialState, action) => {
  //
  switch (action.type) {
      case 'FETCH_USER_VIDEOS': {
          return { ...state, fetching: true }
          break;
      }
      case 'FETCH_USER_VIDEOS_ERROR': {
        return { ...state, fetching: false, error: action.payload }
      }
      case 'FETCH_USER_VIDEOS_SUCCESS': {
        return { ...state, fetching: false, fetched: true, userVideos: action.payload }
      }
  }
  return state;
}