import { CREATE_POST, FETCH_ALL, GET_POST, DELETE_POST, POST_LOADING } from "../actions/types";

const initialState = {
  posts: [],
  posts: {},
  loading: false
};

export default function(state = initialState, action ) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    case FETCH_ALL:
      return {
        ...state,
        loading: false
      }
    case GET_POST:
      return {
        ...state,
        loading: false
      }

    case CREATE_POST:
      return  {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }  
    default:
      return state;
  }
}

