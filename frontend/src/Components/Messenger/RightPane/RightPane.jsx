import { AccountBox, Call, Search, VideoCall } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { itemData } from "./imgMock";

const RightPane = () => {
  return (
    <Box component={Paper} ml="10px" mt="5px" sx={{ background: "#f2f2f2" }}>
      <Box display={"flex"} flexDirection={"column"} gap="10px" m="5px">
        <Box
          display="flex"
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          mt="10px"
          ml="10px"
        >
          <Avatar sx={{ width: 70, height: 70 }} />
          <Typography sx={{ fontSize: "25px", ml: "5px" }}> Jon Doe </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <InputBase
            id="outlined-multiline-static"
            name="message"
            placeholder="Search Messages..."
            variant="outlined"
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

        
         {/* VOICE AND VIDEO CALL icons START HERE */}
        <Box
          display="flex"
          flexDirection={"row"}
          gap={2}
          justifyContent="center"
          mb="10px"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap:'10px'
            }}
          >
            <IconButton
              sx={{
                background: "#4d79ff",
                "&:hover": { background: "violet" },
                borderRight: "1px solid #ccc",
                pr: "8px",
              }}
            >
              <Call sx={{ color: "white" }} />
            </IconButton>
            <Typography sx={{ color: "#808080" }}>Voice Call</Typography>
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap:'10px'
            }}
          >
            <IconButton
              sx={{
                background: "#4d79ff",
                "&:hover": { background: "violet" },
              }}
            >
              <VideoCall sx={{ color: "white" }} />
            </IconButton>
            <Typography sx={{ color: "#808080" }}>Voice Call</Typography>
          </Box>
        </Box>
         {/* VOICE AND VIDEO CALL icons END HERE */}


        <Typography fontSize='15px' display={"flex"} gap={1} color={' #737373'} ml='10px'>
        <AccountBox sx={{color:' #737373'}}/>
        View Profile
        </Typography>

        <Typography variant="h4" color={{ color:' #737373'}} ml='10px'>Media:</Typography>


        <ImageList sx={{ width: 400, height: 250 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
      </Box>
    </Box>
  );
};

export default RightPane;
