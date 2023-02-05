import { Box, Divider} from '@mui/material';
import React, { useState } from 'react'
import Comment from './Comment';
import CommentForm from './CommentForm';

const Comments = ({post,isComments}) => {
    //-- COMMENTS --//
    const [isEditComment, setIsEditComment] = useState(false)
    const [comment, setComment]=useState('')
    const [submitted, setSubmitted] = useState(false)

  return (
    <Box>
      <CommentForm post={post} setEditing ={setIsEditComment} isEditing={isEditComment} commentBody ={comment} setSubmitted={setSubmitted}/>

      {(isComments || submitted) && (
        <Box mt="0.5rem" >
          {post?.comments?.map((comment, i) => (
            <Box key={`${comment}-${i}`}> 
                <Comment post={post} comment={comment} setEditComment={setIsEditComment} setComment={setComment}/> 
              <Divider />
              {/* <br />
                <Box component='div' display={"flex"} sx={{ marginTop:'20px'}}>
                  <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" , flexBasis:'90%'}} >
                    {comment.text} 
                  </Typography>

                  <IconButton  onClick={()=>{setIsEditComment(true); setComment(comment)}}><Edit/></IconButton> 
                  <IconButton onClick={()=>{handleDeleteComment();setComment(comment)}}><Delete/></IconButton>
                </Box>

                <IconButton onClick={()=>{handleLikeComment();setComment(comment)}}><ThumbUp/>{comment?.likes?.length}</IconButton> */}
            </Box>
          ))}
          <Divider />

          <Box component='div'>
            {/* <Comment post={post} setEditing ={setIsEditComment} isEditing={isEditComment} commentBody ={comment} /> */}
          </Box>

        </Box>
      )}

    </Box>
  )
}

export default Comments