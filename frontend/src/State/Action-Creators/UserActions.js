import * as api from'../API'
import { FETCH_ALL_USERS, FETCH_FRIENDS_LIST, FETCH_FRIENDS_OTHER_PROFILE, FOLLOW_FRIEND, GET_USER, UPDATE_COVER_IMG, UPDATE_PROFILE_PICTURE, UPDATE_USER_DETAILS, USER_SIGNIN, USER_SIGNOUT, USER_SIGNUP } from '../constants/constants'

export const signUp = (formData,navigate)=>async (dispatch)=>{

    try{
        //console.log(formData)
        const res = await api.signup(formData)
        //console.log(res.data)
        dispatch({type:USER_SIGNUP,payload:res.data})
        dispatch({type:USER_SIGNIN,payload:res.data})
        navigate('/')
        navigate(0)

    }catch(err){
        console.log(err)
    }

}


export const signIn = (formData,navigate) => async (dispatch)=>{

      try{

        const res = await api.signin(formData)
        // console.log(res.data)
        dispatch({type:USER_SIGNIN,payload:res.data})
        navigate('/')
        navigate(0)
      }catch(err){
        console.log(err)
    }
}


export const getAllUsers = ()=> async (dispatch)=>{

    try{

        const res = await api.fetchAllUsers()
        dispatch({type:FETCH_ALL_USERS, payload:res.data})

    }catch(err){
        console.log(err)
    }
}

export const getFriendsList = (id)=> async (dispatch)=>{
    try{

        const res = await api.fetchFriendsList(id)
        dispatch({type:FETCH_FRIENDS_LIST,payload:res.data})
        // console.log(res.data)

        return res?.data
    }catch(err){
        console.log(err)
    }
}

export const updateFriendsList = (id,friendId)=> async (dispatch)=>{

    try{

        const res = await api.patchFriends(id,friendId)
       // dispatch({type:FOLLOW_FRIEND,payload:res.data})
        dispatch({type:FETCH_FRIENDS_LIST,payload:res.data})
        console.log(res.data)
     

    }catch(err){
        console.log(err)
    }
}


export const getUser = (id)=> async (dispatch)=>{

    try{

        const res = await api.fetchSingleUser(id)
        dispatch({type:GET_USER,payload:res.data})
        return res.data
    }catch(err){
        console.log(err)
    }
}

export const updateUserDetails = (id,formData)=> async (dispatch)=>{

    try{

        const res = await api.updateUserDetails(id,formData)
        dispatch({type:UPDATE_USER_DETAILS,payload:res.data})

    }catch(err){
        console.log(err)
    }
}

export const profilePicture = (id,picture)=> async (dispatch)=>{

    try{

        const res = await api.updateprofilePicture(id,picture)
        dispatch({type:UPDATE_PROFILE_PICTURE, payload:res.data})
        //dispatch({type:GET_USER,payload:res.data})

        //console.log(res.data)
    }catch(err){
        console.log(err)
    }
}

export const coverImage = (id,cover)=> async (dispatch)=>{

    try{

        const res = await api.updateCoverImage(id,cover)
        dispatch({type:UPDATE_COVER_IMG, payload:res.data})

    }catch(err){
        console.log(err)
    }
}



export const logout = (navigate)=> async (dispatch)=>{
    dispatch({type:USER_SIGNOUT})
    navigate('/signin')
    navigate(0)
}