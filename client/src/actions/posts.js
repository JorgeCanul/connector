import axios from 'axios';
import { CREATE_POST, FETCH_ALL, GET_ERRORS } from './types';


/// get all posts, Public
export const getPosts = (data) => dispatch => {
  axios.get('/api/posts', data)
  .then(res => dispatch({
    type: FETCH_ALL,
    payload: res.data
  }))
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  });
}

// Create post, Private
export const createPost = (post) => dispatch => {
  axios.post('/api/posts', post)
  .then(res => dispatch({
    type: CREATE_POST,
    payload: res.data
  }))
  .catch(err => console.log(err));
}