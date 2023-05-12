import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  ShareOutlined,
  Edit,
  Bookmark,
  Delete,
  ThumbUpAlt,
  ChatBubbleOutlineOutlined,
  Send,
  ThumbUp,
  Reply,
} from "@mui/icons-material";
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
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deleteComment,
  deletePost,
  getSinglePost,
  likeComment,
  likePost,
  updatePost,
} from "../../../State/Action-Creators/PostActions";
import UpdatePost from "./UpdatePost";
import FlexBetween from "../../FlexBetween";
import { useRef } from "react";
import UserImage from "../../UserImage";
import Comment from "./Comments/Comment";
import Comments from "../../Comments/Comments";
import CommentForm from "../../Comments/CommentForm";
import { Link } from "react-router-dom";

const Post = ({ post, profileId }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dispatch = useDispatch();
  const [isComments, setIsComments] = useState(false);

  const { friends, user, allUsers } = useSelector((state) => state.users);
  const auth = useSelector((state) => state.auth);
  const { result } = auth;
  const isAuth = auth.result && result._id === post.userId;

  let isAdmin = null;
  let isModerator = null;
  allUsers.map((user) => {
    if (user.isAdmin) {
      isAdmin = user;
    } else if (user.isModerator) {
      isModerator = user;
    }
  });

  //-- AVATAR ON POST --//
  const postAvatar = friends?.find(
    (friend) => friend._id === post.userId
  )?.profilePicture;
  //const profilePostAvatar = user && user.profilePicture
  const ownPostAvatar = isAuth && result.profilePicture;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //-- HANDLE EDIT POST --//
  const refOne = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleClickOutside = (e) => {
    if (!refOne.current?.contains(e.target)) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);
  //////////////////////////////

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // setIsEditing((prev)=>!prev)
    setIsEditing(true);
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  //-- LIKES --//
  const handleLike = () => {
    dispatch(likePost(post._id));
    console.log(post._id);
  };

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find((like) =>
        like === auth?.result ? result?._id : 0
      ) ? (
        <>
          <ThumbUpAlt fontSize="medium" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAlt fontSize="meduim" />
          &nbsp;<Typography variant="h5">{post.likes.length} </Typography>
          {/* {post.likes.length === 1 ? "Like" : "Likes"} */}
        </>
      );
    } else if (post?.likes?.length === 0) {
      return (
        <>
          <ThumbUpAlt fontSize="medium" />
          &nbsp;{post.likes.length}{" "}
        </>
      );
    }
  };

  //-- COMMENTS --//
  const [isEditComment, setIsEditComment] = useState(false);
  const [comment, setComment] = useState("");

  const handleLikeComment = () => {
    comment && dispatch(likeComment(post._id, comment._id));
  };

  const handleDeleteComment = () => {
    comment && dispatch(deleteComment(post._id, comment._id));
  };

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Box component={Link} to={`/profile/${post.userId}`}>
            <Avatar
              aria-label="recipe"
              src={
                isAuth
                  ? `http://localhost:4000/assets/${ownPostAvatar}`
                  : `http://localhost:4000/assets/${postAvatar}`
              }
            ></Avatar>
          </Box>
        }
        action={
          <Box>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVert />
            </IconButton>
          </Box>
        }
        title={
          <Box component={Link} to={`/profile/${post.userId}`}>
            {" "}
            <Typography variant="h5">{post.name} </Typography>
          </Box>
        }
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
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {isAuth || isAdmin || isModerator ? (
          <Box>
            {isAuth && (
              <MenuItem onClick={handleEdit}>
                <Edit /> &nbsp; Edit
              </MenuItem>
            )}
            <MenuItem onClick={handleDelete}>
              <Delete /> &nbsp; Delete
            </MenuItem>
          </Box>
        ) : null}
        <MenuItem>
          <Bookmark /> &nbsp; Bookmark
        </MenuItem>
      </Menu>

      <CardContent>
        {!isEditing || !isAuth ? (
          <Typography variant="h5" color="text.secondary">
            {post.description}
          </Typography>
        ) : (
          <Box component="div" ref={refOne}>
            <UpdatePost
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editPost={post}
            />
          </Box>
        )}
      </CardContent>

      {post.image && (
        <CardMedia
          component="img"
          height="20%"
          image={`http://localhost:4000/assets/${post.image}`}
          alt="post image"
        />
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="0.1rem">
          <FlexBetween gap="0.3rem" ml='20px'>
            <IconButton onClick={handleLike}>
              <Likes />
            </IconButton>
          </FlexBetween>
          <IconButton
            onClick={() => setIsComments((prev) => !prev)}
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <ChatBubbleOutlineOutlined />
            <Typography variant="h5"> {post?.comments?.length}</Typography>
          </IconButton>

          <IconButton>
            <Reply sx={{transform: 'scaleX(-1)'}} />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      <Divider />
      <Comments post={post} isComments={isComments} />
    </Card>
  );
};

export default Post;
