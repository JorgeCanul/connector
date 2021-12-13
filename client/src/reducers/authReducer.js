import isEmpty from '../validation/isEmpty';
import { SET_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  usr: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state;
  }
}