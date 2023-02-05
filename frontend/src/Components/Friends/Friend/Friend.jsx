import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFriendsList } from "../../../State/Action-Creators/UserActions";
import FlexBetween from "../../FlexBetween";
import UserImage from "../../UserImage";

const Friend = ({ friend }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const auth = useSelector(state=>state.auth)
  const {friends} = useSelector(state => state.users);

  const user = auth && auth.result

  const [isFriend, setIsFriend] = useState(false)
  //const isFriend = friends?.find((f) => f._id === friend._id);
  
  const patchFriend = ()=>{

   dispatch(updateFriendsList(user._id,friend?._id)) 

    if(friends?.findIndex(f=>f === friend?._id))
      setIsFriend(prev=>!prev)
    
  }
  //console.log(friend.profilePicture)
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={friend?.profilePicture} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friend._id}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {friend?.firstName} {friend?.lastName}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {'subtitle'}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
         onClick={()=>patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {   isFriend ? (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend
