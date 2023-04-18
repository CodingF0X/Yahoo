import { Avatar, Box, Divider, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Conversations = () => {
  return (
    <div>
      <Box
        sx={{
          borderLeft: "1px solid violet",
          height: "500px",
          position: "absolute",
          left: "75%",
          ml: "30px",
          top: 100,
        }}
      ></Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Box>
          <TextField label="Search..." variant="outlined" size="small" />
        </Box>
        
          <Box
            
            component={Link}
            display={"flex"}
            flexDirection="column"
            gap={1}
            mt={2}
            ml={1}
            to={`/chats/`}
          >
            <Box
              display={"flex"}
              flexDirection="row"
              alignItems={"center"}
              gap={1}
              mt={2}
              ml={1}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
              />

              <Box>
              </Box>
            </Box>

            <Typography
              ml={2}
              p={1}
              borderRadius={2}
              sx={{ backgroundColor: "#EEEEEE" }}
            >
         
            </Typography>
          </Box>
      </Box>
      {/* <Divider  orientation='vertical'  flexItem variant='fullWidth'  sx={{ ml:'250px', height:'500px', maxWidth:'5px'}}/> */}
    </div>
  );
};

export default Conversations;
