const initialState = {
  fetching: false,
  fetched: false,
  error: false,
  video: []
}

export const videoReducer = (state = initialState, action) => {
  //
  switch (action.type) {
      case 'FETCH_VIDEO': {
          return { ...state, fetching: true }
          break;
      }
      case 'FETCH_VIDEO_ERROR': {
        return { ...state, fetching: false, error: action.payload }
      }
      case 'FETCH_VIDEO_SUCCESS': {
        return { ...state, fetching: false, fetched: true, video: action.payload }
      }
  }
  return state;
}