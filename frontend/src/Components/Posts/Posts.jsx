import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { getProfilePosts, timelinePosts } from '../../State/Action-Creators/PostActions'
import Post from './Post/Post'

const Posts = ({userId, isProfile}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const posts = useSelector(state=>state.posts)
  const {isLoading}=posts
  const auth = useSelector(state=>state.auth)

 //console.log(posts.timeline)
  const dispatch = useDispatch()
//     // posts.map(p=>console.log(p))
  useEffect(()=>{
    if(isProfile){
      dispatch(getProfilePosts(userId))
    }else{
      dispatch(timelinePosts())
    }

},[dispatch,isProfile,location,userId])

// const [posts,setPosts] = useState([])
//// console.log(posts)
// const getTimelinePosts = async ()=>{
//   const myTimeline = await dispatch(timelinePosts())
//   setPosts(myTimeline.timeline)
// }

// useEffect(()=>{
//   getTimelinePosts()
// },[dispatch,location,auth])


if (!posts && !isLoading) return null;

if(isProfile){
  return (
           posts  &&  posts?.profile_posts.map(post=>(
            <Post key={post._id} post={post}/>
            ))
  )
}else{
  return(
          posts  &&  posts?.timeline.map(post=>(
            <Post key={post._id} post={post} profileId={userId}/>
            ))
  )
}

}

export default Posts