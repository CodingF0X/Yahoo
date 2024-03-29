import axios from 'axios'
import { Token_Google_auth,customToken, user } from '../Tokens/token'

const API = axios.create({baseURL: 'http://localhost:4000'})




API.interceptors.request.use((req)=>{

    //-- CHEKING IF THE LOCALSTORAGE HAS 'result' PROPERTY
    if(user && Object.prototype.hasOwnProperty.call(user,'result')){
        const token = user?.token
        req.headers.authorization = `Bearer ${token}`
        //console.log(customToken)

        // return req
     }
    if(user && Token_Google_auth){
         const token = user?.token
        req.headers.authorization = `Bearer ${token}`
        console.log(token)
     }
        
     return req
    
})

// const url_ = 'http://localhost:4000/api/posts'
// const userUrl_ = 'http://localhost:4000/api/user'

//-- POSTS METHODS --//
//  export const fetchPosts = ()=> API.get(`/api/posts`)
export const fetchTimeline = ()=> API.get(`/api/posts/timeline/all`)
export const fetchSinglePost = (id)=> API.get(`/api/posts/${id}`)
export const fetchProfilePosts = (userId)=>API.get(`/api/posts/profile/${userId}`)
// export const fetchPostsBySearch = (searchQuery) => API.get(`/api/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost)=> API.post('/api/posts',newPost)
export const updatePost = (id,description)=> API.patch(`/api/posts/${id}`,{description})
export const deletePost = (id)=> API.delete(`/api/posts/${id}`)
export const likePost = (id)=> API.patch(`/api/posts/${id}/like`) 
export const commentPost =(id,text)=> API.post(`/api/posts/${id}/comments`,{text})
export const editComment = (id,commentId,text)=> API.put(`/api/posts/${id}/comments/${commentId}`,{text})
export const likeComment = (id,commentId)=> API.put(`/api/posts/${id}/comments/${commentId}/likes`)
export const deleteComment = (id,commentId)=> API.delete(`/api/posts/${id}/comments/${commentId}/delete`)

// export const comment = (id,value) => API.post(`/api/posts/${id}/commentPost`, { value });
//                                                       // carefull about this object//

//-- AUTH METHODS --//
export const signup = (formData)=>API.post(`/api/auth/signup`,formData)
export const signin = (formData)=>API.post(`/api/auth/signin`,formData)

//-- USER METHODS --//
export const fetchAllUsers = ()=>API.get(`/api/user`)
export const fetchFriendsList = (id)=>API.get(`/api/user/${id}/friends`)
export const patchFriends = (id,friendId)=> API.patch(`/api/user/${id}/${friendId}`)
export const fetchSingleUser = (id)=> API.get(`/api/user/${id}`)
export const updateUserDetails = (id,formData)=> API.put(`/api/user/${id}`,formData)
export const updateprofilePicture = (id,profilePicture)=> API.put(`/api/user/${id}`,{profilePicture})
export const updateCoverImage = (id,coverImage)=> API.put(`/api/user/${id}`,{coverImage})

//-- SEARCH METHODS --//
export const searchFilter = (searchTerm)=> API.post(`/api/filter/search`,{searchTerm})