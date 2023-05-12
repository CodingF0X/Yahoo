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
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Conversation from "./Conversation";

const Conversations = () => {
  const chats = [{
    _id:1,
    sender:'Jone Doe',
    time: '10:56',
    latestMessage:'laakfmlasflassfalfaksjnkaslflaslflasflaslflashalsdnlasndlansldnsjnfasfjlnlnsaf'

  },
  {
  _id:2,
  sender:'Jane Doe',
  time: '09:56',
  latestMessage:'Lmees lmsaaa'

}
]
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

        <Box
          component={Link}
          display={"flex"}
          flexDirection="column"
          gap={1}
          m={1}
          to={`/chats/`}
        >
          {chats.map(chat=>(
          <Conversation key={chat._id} sender={chat.sender} latestMessage={chat.latestMessage} time={chat.time}/>

          ))}

          
        </Box>
      </Box>
      {/* <Divider  orientation='vertical'  flexItem variant='fullWidth'  sx={{ ml:'250px', height:'500px', maxWidth:'5px'}}/> */}
    </Box>
  );
};

export default Conversations;
