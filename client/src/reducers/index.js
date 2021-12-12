import { combineReducers } from "redux";
import posts from './posts';
import errors from './errorReducer';

export default combineReducers({
  posts,
  errors
});