const initialState = {
  fetching: false,
  fetched: false,
  error: false,
  streams: []
}

export const streamsReducer = (state = initialState, action) => {
  //
  switch (action.type) {
      case 'FETCH_STREAMS': {
          return { ...state, fetching: true }
          break;
      }
      case 'FETCH_STREAMS_ERROR': {
        return { ...state, fetching: false, error: action.payload }
      }
      case 'FETCH_STREAMS_SUCCESS': {
        return { ...state, fetching: false, fetched: true, streams: action.payload }
      }
  }
  return state;
}