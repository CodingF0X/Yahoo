import { Send } from '@mui/icons-material';
import { Box,useTheme, TextField,IconButton, InputBase, Divider, Card } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getSinglePost, updatePost } from '../../../State/Action-Creators/PostActions';
import FlexBetween from '../../FlexBetween'

const UpdatePost = ({editPost,isEditing,setIsEditing,ref}) => {
    const { palette } = useTheme();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // const initialState = {description:''}
    // const [postData,setPostData] = useState(initialState)
  
    const [description, setDescription]=useState(editPost.description)
    const handleSubmit = (e)=>{
        e.preventDefault()
      
        dispatch(updatePost(editPost._id,description))
        //setPostData(null)
        setIsEditing(false)
    }
    

    const handleChange = (e)=>{
      // setPostData({...postData,[e.target.name]: e.target.value})
    }

  //  const handleClick = ()=>{
  //   dispatch(getSinglePost(editPost._id))
  //  }


  return (
    <Card>
    <Box component='form' onSubmit={handleSubmit} ml='10px' mt={'10px'}>
      <FlexBetween gap="1.5rem" >
        
      <InputBase 
        id="outlined-multiline-static"
        multiline
        name='description'
        rows={5}
        fullWidth
        value={description}
        onChange={e=>setDescription(e.target.value)}
        sx={{
          backgroundColor: palette.background.paper,
        }}
       // defaultValue={editPost && editPost.description}
      
        
      />
      </FlexBetween>
      <Divider/>
      <IconButton sx={{marginInlineStart:'400px'}} type='submit' >
        <Send />
      </IconButton>
      
    </Box>
    </Card>
  )
}


export default UpdatePost