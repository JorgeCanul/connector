import { combineReducers } from "redux";
import postsReducer from './postsReducer';
import errorsReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  posts: postsReducer,
  errors: errorsReducer,
  auth: authReducer
});