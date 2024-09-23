const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  const filterReducers = (state = initialState, action) => {
    switch (action.type) {
      case 'FILTER_POST_REQUEST':
        return { ...state, loading: true };
      case 'FILTER_POST_SUCCESS':
        return { ...state, loading: false, data: action.payload.filter };
      case 'FILTER_POST_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default filterReducers;
  