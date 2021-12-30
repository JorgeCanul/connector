import axios from 'axios';
import { CREATE_POST, FETCH_ALL, GET_ERRORS, GET_POSTS, POST_LOADING, GET_POST } from './types';


/// get all posts, Public
// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/post/posts/`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Create post, Private
export const createPost = (post) => dispatch => {
  axios.post('/api/post/posts', post)
  .then(res => dispatch({
    type: CREATE_POST,
    payload: res.data
  }))
  .catch(err => console.log(err));
}

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/post/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};



// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};


