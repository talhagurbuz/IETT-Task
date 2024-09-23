const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  const tableReducers = (state = initialState, action) => {
    switch (action.type) {
      case 'TABLE_POST_REQUEST':
        return { ...state, loading: true };
      case 'TABLE_POST_SUCCESS':
        return { ...state, loading: false, data: action.payload.tables };
      case 'TABLE_POST_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default tableReducers;
  