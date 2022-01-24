import { CREATE_POST, GET_POST, DELETE_POST, POST_LOADING, GET_POSTS, INDIVIDUAL_POSTS } from "../actions/types";

const initialState = {
  posts: [],
  indiPosts: [],
  loading: false
};

export default function(state = initialState, action ) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_POST:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
      case INDIVIDUAL_POSTS:
        return {
          ...state,
          indiPosts: action.payload,
          loading: false
        }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
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

