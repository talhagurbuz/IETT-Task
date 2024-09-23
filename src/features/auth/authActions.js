import axiosInstance from '../../services/axiosConfig';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = () => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await axiosInstance.post('/token/', {});
      const { access_token, token_type } = response.data;

      dispatch({ 
        type: LOGIN_SUCCESS, 
        payload: { access_token, token_type }
      });

      localStorage.setItem('authToken', access_token);
      localStorage.setItem('authType', token_type);
    } catch (error) {
      console.error('Login Error:', error);
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};
