import { FETCH_ALL_USERS, FETCH_FRIENDS_LIST, FETCH_FRIENDS_OTHER_PROFILE, FOLLOW_FRIEND, GET_USER, UPDATE_COVER_IMG, UPDATE_PROFILE_PICTURE, UPDATE_USER_DETAILS, USER_SIGNIN, USER_SIGNOUT, USER_SIGNUP } from '../constants/constants'

export const userSignInReducer = (state={}, action)=>{
    switch(action.type){

        case USER_SIGNIN:
            console.log(action.payload)
            localStorage.setItem('user',JSON.stringify(action?.payload))
            return action?.payload

        case USER_SIGNUP:
            console.log(action.payload)
            localStorage.setItem('user',JSON.stringify(action?.payload))
            return action?.payload


        case USER_SIGNOUT:
            localStorage.removeItem('user') 
            return {}

        default :
            return state
    }
}

export const usersReducer = (state={allUsers:[],friends:[],user:{}},action)=>{
    switch(action.type){
        case FETCH_ALL_USERS:
            return{
                ...state,
                allUsers:action.payload
            }

        case FETCH_FRIENDS_LIST:
            return{
                ...state,
                friends:action.payload
            }
        
        case GET_USER:
            return{
                ...state,
                user:action.payload
            }
        
        case UPDATE_USER_DETAILS:
            //localStorage.setItem('user',JSON.stringify(action?.payload))
            return{
                ...state,
                user:action.payload

            }
        
        case UPDATE_PROFILE_PICTURE:
            return {
                ...state,
                user:action.payload
            }

        case UPDATE_COVER_IMG:
            return{
                ...state,
                user:action.payload
            }
   
        default:
            return state
    }
}

     // case FOLLOW_FRIEND:
        //     const updatedList = state.friends.map((f) =>action?.payload.map(friend=>f._id === friend._id ? action.payload : state.friends))
        //     //const shakr = state.friends.map(friend=>friend._id === action.payload.map(i=>i===friend._id)? action.payload:friend)
                
        //     console.log(updatedList )
        //     return{
        //         ...state,
        //         friends:state.friends.filter(friend=>friend._id === updatedList ? action.payload:state.friends)
                
        //     }
            
        // case FOLLOW_FRIEND:
        //     const target=state.friends.map(friend=>action.payload.map(user=>user.findIndex(id=>id===friend._id)))
        //     return{
        //         ...state, 
        //         friends:state.friends.map()
        //     }
