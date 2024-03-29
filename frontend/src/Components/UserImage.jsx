import { Box } from "@mui/material";

const UserImage = ({user, image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image ? `http://localhost:4000/assets/${image}` : '../assets/maleProfileImg.png'}
        
      />  
    </Box>
  );
};

export default UserImage;
