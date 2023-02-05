import { COMMENT_POST, CREATE_POST,  DELETE_POST, END_LOADING, FETCH_PROFILE_POSTS, FETCH_SINGLE_POST, FETCH_TIMELINE, POST_LIKES, START_LOADING, UPDATE_POST } from "../constants/constants";


export const postsReducer = (state={timeline:[],profile_posts:[],post_:{},isLoading: true}, action)=>{
    switch(action.type){
        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
            return { ...state, isLoading: false };

        case FETCH_TIMELINE:
            return{
                ...state,
                timeline:action.payload.timeline,
                
            }

        case FETCH_PROFILE_POSTS:
            return{
                ...state,
                profile_posts:action.payload
            }

        case FETCH_SINGLE_POST:
            return{
                ...state,
                post_:action.payload
            }
        case CREATE_POST:
            return{
                ...state,
                timeline:[...state.timeline,action.payload],
                profile_posts:[...state.profile_posts,action.payload]
            }

        case UPDATE_POST:
            return{
                ...state,
                timeline:state.timeline.map(post=>post._id === action.payload._id?action.payload :post),
                profile_posts:state.profile_posts.map(post=>post._id === action.payload._id?action.payload :post)
            }

        case DELETE_POST:
            return{
                ...state,
                timeline:state.timeline.filter(post=>post._id !== action.payload._id),
                profile_posts:state.profile_posts.filter(post=>post._id !== action.payload._id)
                
            }

        case POST_LIKES:
            return{
                ...state,
                timeline:state.timeline.map(post=>post._id === action.payload._id ? action.payload : post),
                profile_posts:state.profile_posts.map(post=>post._id === action.payload._id ? action.payload : post)
            }

        // case COMMENT_POST:
        //     return{
        //         ...state,
        //         timeline:state.timeline.map(post=>post._id === action.payload._id ? action.payload : post),
        //         profile_posts:state.profile_posts.map(post=>post._id === action.payload._id ? action.payload : post)

        //     }

        default:
            return state
    }
}