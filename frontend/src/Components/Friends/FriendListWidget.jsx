import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getFriendsList } from "../../State/Action-Creators/UserActions";
import WidgetWrapper from "../WidgetWrapper";
import Friend from './Friend/Friend'

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { palette } = useTheme();
  const {friends} = useSelector(state => state.users);
 

  useEffect(()=>{
   dispatch(getFriendsList(userId))
     
  },[dispatch,location])

  

    return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends && friends?.map((friend) => (
          <Friend
            key={friend?._id}
            friend={friend}
           // isOwnProfile={isOwnProfile}
          />
        ))}
        <Typography>saw</Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
