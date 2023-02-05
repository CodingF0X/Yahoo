import { Avatar, Box, Card, Container, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'
import FlexBetween from '../FlexBetween'
import { Delete, Edit, MoreVert, Report, ThumbUp } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, likeComment } from '../../State/Action-Creators/PostActions'
import { useState } from 'react'

const Comment = ({comment,setEditComment,setComment,post}) => {
    const author = `${comment.author.firstName} ${comment.author.lastName}`
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    const {result} = auth 
    const isAuth = auth.result && result._id === comment.author._id
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    }; 
  
    const handleClose = () => {
        setAnchorEl(null);
      };
    

    const handleEdit = ()=>{
        setEditComment(true)
        setComment(comment)
    }
    
    const handleLikeComment = ()=>{
        comment &&  dispatch(likeComment(post._id,comment._id))    
        }
       
        const handleDelete = ()=>{
        comment && dispatch(deleteComment(post._id,comment._id))
        setComment(comment)
        }

  return (
    <Container>
        
        <Box component='div' display={'flex'} flexDirection='column' mt={1} ml={1}>

            <Box component='div' display={'flex'} flexDirection='row' gap={1} alignItems='center'>
                <Avatar src={`http://localhost:4000/assets/${comment.author.profilePicture}`} sx={{width:'25px',height:'25px'}}></Avatar>
                <Box component='div' display={'flex'} flexDirection='row'>
                
                    <Typography variant='h5'>{author} </Typography>
                    &nbsp; . 
                    <Typography  style={{color:'GrayText'}}>{moment(comment.createdAt).fromNow()} </Typography>
                
                </Box>
            </Box>
            
            <Box component='div'>
                <Box component='div' display={'flex'} flexDirection='row' alignContent={'flex-end'} >
                    <Typography ml='10px' mt='10px' flexBasis='90%'>{comment.text}</Typography>
                    <Box>
                        {/* <IconButton  onClick={()=>{setEditComment(true); setComment(comment)}}><Edit/></IconButton> 
                        <IconButton onClick={()=>{handleDeleteComment();setComment(comment)}}><Delete/></IconButton> */}
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVert />
                        </IconButton>
                     
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            
                            PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 0,
                                '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                                },
                                '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            
                            
                            {isAuth ?
                            <Box>
                            <MenuItem onClick={handleEdit}>
                            <Edit /> &nbsp; Edit
                            </MenuItem>
                            <MenuItem onClick={handleDelete}>
                            <Delete /> &nbsp; Delete
                            </MenuItem>
                            </Box>
                           :
                          (  <MenuItem>
                                <Report /> &nbsp; Report
                            </MenuItem> 
                          )}
                        </Menu>
                    </Box>
                    
                </Box>
                <Box display='flex' flexDirection={'row'} alignItems='center'>
                    <IconButton  sx={{fontSize:'10px', display:'flex', alignContent:'center', gap:'3px'}}  onClick={()=>{handleLikeComment();setComment(comment)}}><ThumbUp sx={{fontSize:'15px'}}/>{comment?.likes?.length}</IconButton> 
                    <Typography variant='h6' color={"#fa0058"} >Reply</Typography>
                </Box>
            </Box>
            <br/>
        </Box>
      
    </Container>
  )
}

export default Comment