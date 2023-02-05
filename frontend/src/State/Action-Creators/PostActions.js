import axios from 'axios';
import * as api from '../API'
import { COMMENT_POST, CREATE_POST, DELETE_POST, END_LOADING, FETCH_PROFILE_POSTS, FETCH_SINGLE_POST, FETCH_TIMELINE, POST_LIKES, START_LOADING, UPDATE_POST } from "../constants/constants";


export const timelinePosts = (auth)=>async (dispatch)=>{
    
    try{
        console.log('starting loadin')
        dispatch({ type: START_LOADING });

        const res = await api.fetchTimeline()
    
        dispatch({type:FETCH_TIMELINE,payload:res.data})
        console.log('fetching done')
        
        dispatch({ type: END_LOADING });
        console.log('End loading')

        return res.data
        
    }catch(err){
        console.log(err)
    }
}

export const getProfilePosts = (userId)=> async (dispatch)=>{

    try{

        console.log('starting loadin profile')
        dispatch({ type: START_LOADING });

        const res = await api.fetchProfilePosts(userId)
        dispatch({type:FETCH_PROFILE_POSTS, payload:res.data})
        console.log('fetching profile done')


        dispatch({ type: END_LOADING });
        console.log('End loading profile')

        //navigate(`/profile/${userId}`)
       // navigate(0)
       // console.log(res.data)

    }catch(err){
        console.log(err)
    }
}

export const getSinglePost = (id)=> async (dispatch)=>{

    try{

        const res = await api.fetchSinglePost(id)
        dispatch({type:FETCH_SINGLE_POST,payload:res.data})
    }catch(err){
        console.log(err)
    }
}

export const createPost = (newPost) => async (dispatch)=>{
   
    try{
        const res = await api.createPost(newPost)
        dispatch({type:CREATE_POST,payload:res.data})
    }catch(err){
        console.log(err)
    }
}

export const updatePost = (id,postData)=> async (dispatch)=>{

    try{
        const res = await api.updatePost(id,postData)
        dispatch({type:UPDATE_POST,payload:res.data})
        // navigate('/')
        // navigate(0)
    }catch(err){
        console.log(err)
    }
}

export const deletePost = (id)=> async (dispatch)=>{
    try{
        const res = await api.deletePost(id)
        dispatch({type:DELETE_POST, payload:res.data})

    }catch(err){
        console.log(err)
    }
}

export const likePost = (id)=> async (dispatch)=>{

    try{

        const res = await api.likePost(id)
        dispatch({type:POST_LIKES, payload:res.data})
        
    }catch(err){
        console.log(err)
    }
}

export const commentPost = (id,comment)=> async (dispatch)=>{

    try{

        const res = await api.commentPost(id,comment)
        //dispatch({type:COMMENT_POST, payload:res.data})
        dispatch({type:UPDATE_POST,payload:res.data})


    }catch(err){
        console.log(err)
    }
}

export const editComment = (id,commentId,comment)=> async (dispatch)=>{

    try{

        const res = await api.editComment(id,commentId,comment)
        dispatch({type:UPDATE_POST,payload:res.data})

    }catch(err){
        console.log(err)
    }
}

export const likeComment = (id, commentId)=> async (dispatch)=>{

    try{
            //console.log(commentId)
        const res = await api.likeComment(id,commentId)
        dispatch({type:UPDATE_POST,payload:res.data})

    }catch(err){
        console.log(err)
    }
}

export const deleteComment = (id,commentId)=> async (dispatch)=>{
   
    try{

        const res = await api.deleteComment(id,commentId)
        dispatch({type:UPDATE_POST,payload:res.data})

    }catch(err){
        console.log(err)
    }
}


