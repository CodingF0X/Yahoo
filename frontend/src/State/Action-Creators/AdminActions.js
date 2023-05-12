import * as api from "../API";
import {
  DELETE_USER,
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_ADMIN,
  GET_ALL_POSTS_ADMIN,
  TOGGLE_MODERATOR,
} from "../constants/constants";

export const deleteUser = (id) => async (dispatch) => {
  try {
    console.log("req : " + id);
    const res = await api.deleteUser(id);
    dispatch({ type: DELETE_USER, payload: res.data });
    console.log("response : " + res.data);
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsersAdmin = () => async (dispatch) => {
  try {
    const res = await api.fetchAllUsersAdmin();
    dispatch({ type: FETCH_ALL_USERS_ADMIN, payload: res.data });
    console.log(res.data);
  } catch (err) {
    // console.log(err);
  }
};

export const toggleModerator = (id, isModerator) => async (dispatch) => {
  try {
    console.log(isModerator)
    const res = await api.toggleModerator(id, isModerator);
    dispatch({ type: TOGGLE_MODERATOR , payload:res.data});
    // console.log(res.data)
  } catch (err) {}
};


export const getAllPostsAdmin = () => async (dispatch) => {
    try {
      const res = await api.getAllPostsAdmin();
      dispatch({ type: GET_ALL_POSTS_ADMIN, payload: res.data });
      console.log(res.data);
    } catch (err) {
      // console.log(err);
    }
  };