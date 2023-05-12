import {
  DELETE_USER,
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_ADMIN,
  GET_ALL_POSTS_ADMIN,
  TOGGLE_MODERATOR,
} from "../constants/constants";

export const adminDReducer = (
  state = { allUsers: [], allPosts: [] },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_USERS_ADMIN:
      return {
        ...state,
        allUsers: action.payload,
      };

    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => user._id !== action.payload),
      };

    case TOGGLE_MODERATOR:
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user._id === action.payload._id
            ? { ...user, isModerator: action.payload.isModerator }
            : user
        ),
      };

      case GET_ALL_POSTS_ADMIN:
        return{
            ...state,
            allPosts:action.payload
        }

    default:
      return state;
  }
};
