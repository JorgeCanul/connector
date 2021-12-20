import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING } from "./types";


///Get Current Profile
export const getCurrentProfile = () => dispatch => {
  dispatch( setProfile());
  axios.get('api/profile')
  .then(res => {
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  })
}

//Profile Loading
export const setProfile = () => {
  return {
    type: PROFILE_LOADING
  }
};