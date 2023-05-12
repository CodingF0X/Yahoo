import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import {
  VideoCall,
  Call,
  FiberManualRecord,
  Notifications,
  Search,
  MoreVert,
  Send,
  EmojiEmotions,
  CameraAlt,
  Attachment,
} from "@mui/icons-material";

import Messages from "./Messages";

const ChatBox = ({ sender }) => {
  return (
    <Box component={Paper} display={"flex"} flexDirection="column"  height='80vh' >
      <Stack m="10px" overflow='auto' flexGrow={1}>
        <Toolbar
          sx={{
            color: "#595959",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:'space-between'
          }}
        >
          <Box
            display="flex"
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar />
            <Typography sx={{ fontSize: "17px", ml: "5px" }}>
              Jon Doe
            </Typography>
            &nbsp;
            <FiberManualRecord sx={{ fontSize: "10px", color: "#00A344" }} />
          </Box>
          <Box >
            <IconButton>
              <Search />
            </IconButton>
            <IconButton>
              <Notifications />
            </IconButton>

            <IconButton>
              <Call />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
        <Divider/>
        <br style={{color:'green'}}/>

        <Box display="flex" flexDirection="column" overflow='auto' height='100%' sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />

        </Box>


      </Stack>
      <Box component="form" display={"flex"} flexDirection={"row"} ml='10px' mr='20px' alignItems="center" mb='5px'  >
      <InputBase
          id="outlined-multiline-static"
          multiline
          name="message"
          rows={2}
          placeholder="Write Something..."
          fullWidth
          // value={comment}
          // onChange={(e) => setComment(e.target.value)}
          sx={{
            backgroundColor: "#EAEAEA",
            ml: "10px",
            mt: "10px",
            mr: "10px",
            pl: "20px",
            '&::placeholder': { mt:'50px'},
            borderRadius: "20px",
          }}
        />
        <IconButton>
          <Attachment/>
        </IconButton>

       
        <IconButton>
          <CameraAlt/>
        </IconButton>

        <IconButton>
          <EmojiEmotions/>
        </IconButton>

        
        <IconButton  sx={{background:'#4d79ff', '&:hover':{background:'violet'}}} type="submit">
          <Send fontSize="large" sx={{color:'white'}}/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatBox;
