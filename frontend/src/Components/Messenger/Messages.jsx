import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const Messages = ({ message }) => {
  const owner = useSelector((state) => state.auth.result);

  return (
    <Box>
      {message.sender !== owner._id ? (
        <>
          <Box display={"flex"} alignItems={"center"} mt={2} ml={2} gap={1}>
            <Avatar
              alt="Remy Sharp"
              src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
            />

            <Typography
              sx={{
                backgroundColor: "#F5F5F5	",
                borderRadius: "15px",
                padding: "10px",
                maxWidth: "500px",
              }}
            >
              {message.content}
            </Typography>
          </Box>
          <Typography ml={9}>1hr ago</Typography>
        </>
      ) : (
        <Box display={"flex"} flexDirection={"column"} alignItems="flex-end">
          <Box display={"flex"} alignItems={"center"} mt={2} ml={2} gap={1}>
            <Typography
              sx={{
                backgroundColor: "#4d79ff",
                borderRadius: "15px",
                padding: "10px",
                maxWidth: "500px",
                color: "white",
              }}
            >
              {message.content}
            </Typography>

            <Avatar
              alt="Remy Sharp"
              src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
            />
          </Box>
          <Typography mr={7}>1hr ago</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Messages;
