import { Favorite, FavoriteBorder, MoreVert, ShareOutlined,Edit,Bookmark,Delete,ThumbUpAlt,ChatBubbleOutlineOutlined,Send, ThumbUp } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  useTheme,
  TextField

  
  
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import { deleteComment, deletePost, getSinglePost, likeComment, likePost, updatePost } from "../../../State/Action-Creators/PostActions";
import UpdatePost from "./UpdatePost";
import FlexBetween from "../../FlexBetween";
import { useRef } from "react";
import UserImage from "../../UserImage";
import Comment from "./Comments/Comment";
import Comments from "../../Comments/Comments";
import CommentForm from "../../Comments/CommentForm";



const Post = ({post,profileId}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dispatch = useDispatch()
  const [isComments, setIsComments] = useState(false);

  const {friends,user} = useSelector(state=>state.users)
  const auth = useSelector(state=>state.auth)
  const {result} = auth
  const isAuth = auth.result && result._id === post.userId

 // const userId = result
//  const GoogleToken = token && JWT_decoded(token.token)
//  const isUserExist = ((customToken && (token?.result?._id === post.creator)) || (Token_Google_auth && (GoogleToken?.sub === post.creator) )) 

//-- AVATAR ON POST --//
  const postAvatar =friends?.find(friend=>friend._id  === post.userId)?.profilePicture
  //const profilePostAvatar = user && user.profilePicture
  const ownPostAvatar = isAuth && result.profilePicture

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

//-- HANDLE EDIT POST --//
const refOne = useRef(null)
const [isEditing,setIsEditing]=useState(false)

const handleClickOutside = (e)=>{
  if(!refOne.current?.contains(e.target)){
    setIsEditing(false)
  }
}

useEffect(()=>{
  document.addEventListener('click',handleClickOutside,true)
},[])
//////////////////////////////

  const handleClose = () => {
    setAnchorEl(null);
  };



  const handleEdit = ()=>{
    // setIsEditing((prev)=>!prev)
    setIsEditing(true)
  }

  const handleDelete = ()=>{
    dispatch(deletePost(post._id))
  }


//-- LIKES --//
  const handleLike =()=>{
    dispatch(likePost(post._id))
    console.log(post._id)
  }

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find((like) => like === auth?.result ? result?._id : 0)
        ? (
          <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }else if(post?.likes?.length === 0){
      
       return ( 
            <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length} </>
            )    
    }
  }

  //-- COMMENTS --//
  const [isEditComment, setIsEditComment] = useState(false)
  const [comment, setComment]=useState('')
  
  const handleLikeComment = ()=>{
   comment &&  dispatch(likeComment(post._id,comment._id))    
  }

  const handleDeleteComment = ()=>{
    comment && dispatch(deleteComment(post._id,comment._id))
  }

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={
            isAuth ? `http://localhost:4000/assets/${ownPostAvatar}` : `http://localhost:4000/assets/${postAvatar}` 
            
            }>
            
          </Avatar >
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVert />
          </IconButton>
        }
        title={post.name}
        subheader={moment(post.createdAt).fromNow()}

      />
  
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
        
        
          {isAuth &&
          <Box>
        <MenuItem onClick={handleEdit}>
        <Edit /> &nbsp; Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Delete /> &nbsp; Delete
        </MenuItem>
        </Box>
      } 
        <MenuItem>
          <Bookmark /> &nbsp; Bookmark
        </MenuItem>
        
      </Menu>
      {post.image &&
      <CardMedia
        component="img"
        height="20%"
        image= {`http://localhost:4000/assets/${post.image}`}
        alt='post image'
      />
     }
      <CardContent>
      {!isEditing || !isAuth? 
        <Typography variant="body2" color="text.secondary">
            {post.description }
        </Typography>
         :
         ( 
          <Box component='div' ref={refOne}>
          <UpdatePost isEditing={isEditing} setIsEditing={setIsEditing} editPost={post} />
          </Box>
         )
      } 
      </CardContent>
  
        <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">

          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleLike}>
              <Likes/>
            </IconButton>
          
          </FlexBetween>
          <IconButton onClick={() => setIsComments(prev=>!prev)}sx={{display:'flex', alignItems:'center', gap:'5px'}} >
              <ChatBubbleOutlineOutlined />
              {post?.comments?.length}
            </IconButton>
          

         </FlexBetween>
            <IconButton>
              <ShareOutlined />
            </IconButton>
        </FlexBetween>
        <Divider/>  
        <Comments post={post} isComments={isComments}/>
    </Card>
  );
};

export default Post