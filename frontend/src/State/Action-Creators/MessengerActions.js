import * as api from "../API";
import { FETCH_ALL_CHATS, FETCH_ALL_MESSAGES, GET_SINGLE_CHAT, SEND_MESSAGE } from "../constants/constants";


export const getAllChats = () => async (dispatch) => {
    try {
      const res = await api.fetchAllChats();
      dispatch({ type: FETCH_ALL_CHATS, payload: res.data });
      console.log(res.data);
    } catch (err) {
      // console.log(err);
    }
  };

  export const getAllMessages = (chatId) => async (dispatch) => {
    try {
      const res = await api.fetchAllMessages(chatId);
      dispatch({ type: FETCH_ALL_MESSAGES, payload: res.data });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  export const getSingleChat = (userId)=> async (dispatch)=>{
    try {
        const res = await api.fetchSingleChat(userId);
        dispatch({ type: GET_SINGLE_CHAT, payload: res.data });
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
  }

  export const sendMessage = (content,chatId)=> async(dispatch)=>{
    try {
        const res = await api.sendMessage(content,chatId);
        dispatch({ type: SEND_MESSAGE, payload: res.data });
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
  }