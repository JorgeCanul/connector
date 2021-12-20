import { GET_ERRORS, SET_ERRORS, SET_USER } from "./types";
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

/// Register new User
export const registerUser = (userdata, history) => dispatch =>  {
  axios
  .post('/api/users/register', userdata)
  .then(res => history.push('login'))
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  });
};

// Login User
export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
  .then(res => {
    // save token to localstorage
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    //set token to auth header
    setAuthToken(token);
    //decode token
    const decoded = jwt_decode(token);
    //write user info to redux
    dispatch({
      type: SET_USER,
      payload: decoded
    });
  })
  .catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
};

// Logout User
export const logoutUser = () => dispatch => {
  //Remove token from ls
  localStorage.removeItem('jwtToken');
  //Remove token from axios header
  setAuthToken(false);
  //Reset user in the redux store
  dispatch({
    type: SET_USER,
    payload: {},
  });
}
