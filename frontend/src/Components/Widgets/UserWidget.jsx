import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  PersonRemoveOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserImage from '../UserImage';
import FlexBetween from '../FlexBetween';
import WidgetWrapper from '../WidgetWrapper';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, updateFriendsList } from "../../State/Action-Creators/UserActions";

const UserWidget = ({ userId ,isOwnProfile,changePic}) => {
  //-- THEME --//
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {friends,allUsers} = useSelector(state => state.users);
  const auth = useSelector(state=>state.auth)
  const authId = auth && auth.result._id

  let me =null
  allUsers.find(user=>{
    if(user._id === authId){
      me=user
    }
  })

  const [user, setUser] = useState(null)
  const name = user && `${user.user.firstName} ${user.user.lastName}`

  const getTheUser = async ()=>{
    const theUser = await dispatch(getUser(userId))
    setUser(theUser)
  }

  useEffect(()=>{
    getTheUser()
  },[dispatch,changePic,userId]) //add (user) to dependency array for instant refresh for profile pic in this widget in entire app

  const handleNavigate = ()=>{
    navigate(`/profile/${userId}`)
  }

  // const handleSettings = ()=>{
  //    navigate(`/profile?/${userId}/settings/edit`)
  //   //navigate('/profile/'+userId+'/settings/edit')
  // }
  const handleSettings = ()=>{
    navigate(`/profile/${userId}/settings/edit`)
  
   
  }

  const [isFriend, setIsFriend] = useState(false)
  //const isFriend = friends?.find((f) => f._id === friend._id);
  
  const patchFriend = ()=>{
 
   dispatch(updateFriendsList(authId,userId)) 

    if(friends?.findIndex(f=>f === userId))
      setIsFriend(prev=>!prev)
    
  }

  if (!user) return null;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={ handleNavigate}
      >
        <FlexBetween gap="1rem">
          <UserImage image={user.user?.profilePicture} user={user} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user && name}
            </Typography>
            <Typography color={medium}>{friends?.length} friends</Typography>
          </Box>
        </FlexBetween>
        
        {isOwnProfile && 
        
        <IconButton href={`/profile/${userId}/settings/edit`}>
        <ManageAccountsOutlined />
        </IconButton> 
        
        } {!me ?
          <IconButton
          onClick={()=>patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
          {   isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
        : null
        }
        
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{user.user.location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{user.user.occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Me@twitter</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Me@LinkedIn</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  ); 
};

export default UserWidget;
