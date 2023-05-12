import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const Conversation = ({ sender, latestMessage, time }) => {
  return (
    <Box
      display={"flex"}
      flexDirection="row"
      alignItems={"center"}
      mt={2}
      ml={1}
    >
      <Avatar
        alt="Remy Sharp"
        src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
        sx={{ width: 56, height: 56 }}
      />

      <Box ml={2} p={1} borderRadius={2} sx={{ backgroundColor: "#EEEEEE" }}>
        <Box display="flex" justifyContent="space-between" gap={8}>
          <Typography variant="h5" color="blueviolet">
            {sender}
          </Typography>

          <Typography>{time}</Typography>
        </Box>

        <Typography
          color="black"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "190px",
            wordWrap: "break-word",
            MozHyphens: "auto",
            WebkitHyphens: "auto",
            OHyphens: "auto",
            hyphens: "auto",
          }}
        >
          {latestMessage}
        </Typography>
      </Box>
    </Box>
  );
};

export default Conversation;