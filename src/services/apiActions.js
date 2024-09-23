import axiosInstance from '../features/axiosConfig';

export const API_POST_REQUEST = 'API_POST_REQUEST';
export const API_POST_SUCCESS = 'API_POST_SUCCESS';
export const API_POST_FAILURE = 'API_POST_FAILURE';

export const postRequest = (endpoint, data) => {
  return async (dispatch) => {
    dispatch({ type: API_POST_REQUEST });

    try {
      const response = await axiosInstance.post(endpoint, data);

      dispatch({
        type: API_POST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: API_POST_FAILURE,
        payload: error.message,
      });
    }
  };
};