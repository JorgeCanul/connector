import { GET_ERRORS, SET_USER } from "./types";
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userdata, history) => dispatch =>  {
  axios
  .post('/api/users/register', userdata)
  .then(res => history.push('login'))
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  });
};

export const loginUser = (userData) => dispatch => {
  
};
