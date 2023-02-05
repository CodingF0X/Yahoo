import { useTheme } from '@emotion/react'
import { Send } from '@mui/icons-material'
import { Box, IconButton, TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentPost, editComment } from '../../../../State/Action-Creators/PostActions'
import FlexBetween from '../../../FlexBetween'

const Comment = ({post,setEditing,isEditing,commentBody}) => {
    const { palette } = useTheme();     
    const dispatch = useDispatch()
    // const commentValue = isEditing ? commentBody.text : ''
    //console.log(commentBody)
    const [comment, setComment]=useState('')

    const handleSubmit = (e)=>{
      e.preventDefault()
      if(isEditing){
        dispatch(editComment(post._id,commentBody._id,comment))
        setComment('')
         setEditing(false)
      
      }else{
       !isEditing && dispatch(commentPost(post._id,comment))
        setComment('')
      }
    }
    
    useEffect(()=>{
      if(isEditing==true){
        setComment(commentBody.text)
        // setEditing(false)
      }
        
    },[commentBody,isEditing,dispatch])

  return (
    <Box component='form' onSubmit={handleSubmit}>
        <FlexBetween>
            <TextField
               id="outlined-multiline-static"
               multiline
               name='comment'
               rows={2}
               placeholder='Write comment...'
               fullWidth
               value={comment}
               onChange={e=>setComment(e.target.value)}
               sx={{
                 backgroundColor: palette.background.paper,
               }}
            >

            </TextField>
          
        </FlexBetween>

        <IconButton sx={{marginInlineStart:'400px'}} type='submit'  >
        <Send />
      </IconButton>
    </Box>
    
  )
}

export default Comment