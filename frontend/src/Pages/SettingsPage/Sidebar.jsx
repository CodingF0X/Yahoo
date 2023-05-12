import { Contacts, Delete, Info, Password } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Divider,
  Stack,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { result } = useSelector((state) => state.auth);
  const userId = result._id;
  return (
    <Box>
      <Stack
        direction="column"
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          ml: "20px",
          mt: "20px",
        }}
      >
        <Box
          component={Link}
          to={`/profile/${userId}/settings/edit/name_email`}
          display={"flex"}
          alignItems={"center"}
          gap={1}
        >
          <Contacts sx={{color:'blue'}}/>
          <Typography variant="h4">Basic details</Typography>
        </Box>

        <Box
          component={Link}
          to={`/profile/${userId}/settings/edit/password`}
          display={"flex"}
          alignItems={"center"}
          gap={1}
        >
          <Password />
          <Typography variant="h4">Change Password</Typography>
        </Box>

        <Box
          component={Link}
          to={`/profile/${userId}/settings/edit/facts`}
          display={"flex"}
          alignItems={"center"}
          gap={1}
        >
          <Info sx={{color:'orange'}}/>
          <Typography variant="h4">Location & occupation </Typography>
        </Box>
        <Box
          component={Link}
          to={`/profile/${userId}/settings/edit/facts`}
          display={"flex"}
          alignItems={"center"}
          gap={1}
        >
            <Delete sx={{color:'red'}}></Delete>
          <Typography variant="h4"> Delete Account</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
