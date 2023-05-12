import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserWidget from "../../Components/Widgets/UserWidget";
import Post from "../../Components/Posts/Post/Post";
import { useNavigate, useLocation } from "react-router-dom";
import MyPostWidget from "../../Components/Widgets/MyPostWidget";
import { customToken, Token_Google_auth, user } from "../../State/Tokens/token";
import Posts from "../../Components/Posts/Posts";
import { useState } from "react";
import {
  getAllUsers,
  getFriendsList,
} from "../../State/Action-Creators/UserActions";
import FriendListWidget from "../../Components/Friends/FriendListWidget";
import jwtDecode from "jwt-decode";
import SearchByTxt from "../../Components/Search/SearchByTxt";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const auth = useSelector(state=>state.auth)
  // const {friends} = useSelector(state=>state.users)
  //const isOwnProfile = auth.result._id
  const GoogleUser = Token_Google_auth && jwtDecode(user?.token);
  const userId = customToken ? user?.result?._id : GoogleUser?.sub;

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis="26%">
          <UserWidget
            userId={userId}
            //token={auth && auth?.token}
            //friends={friends}
          />
        </Box>

        <Box flexBasis="42%">
          <MyPostWidget />
          <Posts userId={userId} />
        </Box>

        <Box flexBasis="26%">
          <FriendListWidget
            userId={userId}
            // token={auth && auth?.token}
            // isOwnProfile={isOwnProfile}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
