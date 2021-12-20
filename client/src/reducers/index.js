import { combineReducers } from "redux";
import postsReducer from './postsReducer';
import errorsReducer from './errorReducer';
import authReducer from './authReducer';
import profileReducer from "./profileReducer";

export default combineReducers({
  posts: postsReducer,
  errors: errorsReducer,
  auth: authReducer,
  profile: profileReducer
});