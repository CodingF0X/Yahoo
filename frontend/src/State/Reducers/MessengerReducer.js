import { FETCH_ALL_CHATS, FETCH_ALL_MESSAGES, GET_SINGLE_CHAT, SEND_MESSAGE } from "../constants/constants";

export const messengerReducer = (state = { chats: [], allMessages:[], chat:{} }, action) => {
  switch (action.type) {
    case FETCH_ALL_CHATS:
      return {
        ...state,
        chats: action.payload,
      };

      case GET_SINGLE_CHAT:
        return {
          ...state,
          chat: action.payload,
        };

      case FETCH_ALL_MESSAGES:
        return {
          ...state,
          allMessages: action.payload,
        };

      case SEND_MESSAGE:
        return{
            ...state,
            allMessages:[...state.allMessages,action.payload]

        }

    default:
      return state;
  }
};
