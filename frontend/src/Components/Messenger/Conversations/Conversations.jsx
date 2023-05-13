import { Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Conversation from "./Conversation";
import { useDispatch, useSelector } from "react-redux";
import { getAllChats, getAllMessages, getSingleChat } from "../../../State/Action-Creators/MessengerActions";

const Conversations = () => {
  const { chats } = useSelector(state=>state.messenger)
  const dispatch= useDispatch()
  //const [chatId, setChatId] = useState('')
  
  const handleChatClick = (chatId)=>{
    dispatch(getAllMessages(chatId))
    // dispatch(getSingleChat(userId))

  }

  // useEffect(()=>{
  //   dispatch(getAllChats())
  // },[dispatch]) 
  return (
    <Box component={Paper} ml="10px" mt="5px" sx={{background:'#f2f2f2'}}>
      {/* <Box
        sx={{
          height: "500px",
          position: "absolute",
          left: "75%",
          ml: "30px",
          pl: "20px",
          top: 100,
        }}
      ></Box> */}
      <Box display={"flex"} flexDirection={"column"} gap="10px" m='5px' >
        <Box display="flex" flexDirection={"row"} alignItems={"center"} mt='10px' ml='10px'>
          <Avatar sx={{ width: 70, height: 70 }} />
          <Typography sx={{ fontSize: "17px", ml: "5px" }}>ME </Typography>
        </Box>
        <Box>
          <InputBase
            id="outlined-multiline-static"
            name="message"
            placeholder="Search Friends..."
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: "20px",
              borderline: "none",
              p: "10px",
            }}
            endAdornment={<Search sx={{ color: " #d1d1e0" }} />}
          />
        </Box>

        {chats.map(chat=>(
        <Box
          component={Link}
          display={"flex"}
          flexDirection="column"
          gap={1}
          m={1}
          // to={`/chats/${chat._id}` }
          key={chat._id}
          onClick={()=>handleChatClick(chat._id)}
        >
          <Conversation  members={chat.members} latestMessage={chat.latestMessages} time={chat.createdAt}/>
        </Box>
        ))}

      </Box>
      {/* <Divider  orientation='vertical'  flexItem variant='fullWidth'  sx={{ ml:'250px', height:'500px', maxWidth:'5px'}}/> */}
    </Box>
  );
};

export default Conversations;
