import { Box, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const CommentWidget = () => {
    const [comment, setComment] = useState('')
  return (
    <Box>
        <Box component='form'>
            <TextField
            name='comment'
            id='comment'
            value={comment}
            onChange={e=>setComment(e.target.value)}
            ></TextField>
        </Box>
    </Box>
  )
}

export default CommentWidget