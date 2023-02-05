import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from '../FlexBetween';
import Dropzone from "react-dropzone";
//import UserImage from "components/UserImage";
import WidgetWrapper from '../WidgetWrapper';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../State/Action-Creators/PostActions";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);


  //const initialState = {description:''}
  const [description, setDescription] = useState('')

  const formData = new FormData();
  if (image) {
    formData.append("description", description);
    formData.append("picture", image);
    formData.append("image", image.name);
  }else{
    formData.append("description", description);
  } 


  const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(createPost(formData))
      
  };

  const handleChange = (e)=>{
    setDescription( [e.target.name]=e.target.value)
  }
  return (
    <WidgetWrapper>
      <Box component="form" onSubmit={handleSubmit} >
      <FlexBetween gap="1.5rem" >
        <InputBase
          placeholder="whhats on your minde"
          name="description"
          // value={newPost}
           onChange={ handleChange }
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box> 
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>
      

        <Button
          // disabled={!post}
          //  onClick={handlePost}
          type="submit"
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:hover": { cursor: "pointer", backgroundColor: palette.primary.main} 
          }}
        >
          POST
        </Button>
        
      </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
