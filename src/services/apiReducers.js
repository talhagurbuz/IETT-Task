const initialState = {
  loading: false,
  data: [],
  error: null,
};

const apiReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'API_POST_REQUEST':
      return { ...state, loading: true };
    case 'API_POST_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'API_POST_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default apiReducers;
