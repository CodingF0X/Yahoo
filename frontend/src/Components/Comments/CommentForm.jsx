import { useTheme } from "@emotion/react";
import { EmojiEmotions, Image, Send, StickyNote2 } from "@mui/icons-material";
import { Box, IconButton, InputBase, TextField } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  commentPost,
  editComment,
} from "../../State/Action-Creators/PostActions";
import FlexBetween from "../FlexBetween";

const CommentForm = ({
  post,
  setEditing,
  isEditing,
  commentBody,
  setSubmitted,
}) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  // const commentValue = isEditing ? commentBody.text : ''
  //console.log(commentBody)
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editComment(post._id, commentBody._id, comment));
      setComment("");
      setEditing(false);
    } else {
      !isEditing && dispatch(commentPost(post._id, comment));
      setComment("");
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (isEditing == true) {
      setComment(commentBody.text);
      // setEditing(false)
    }
  }, [commentBody, isEditing, dispatch]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FlexBetween>
        <InputBase
          id="outlined-multiline-static"
          multiline
          name="comment"
          rows={2}
          placeholder="Write a comment..."
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{
            backgroundColor: "#EAEAEA",
            ml: "10px",
            mt: "10px",
            mr: "10px",
            pl: "20px",
            '&::placeholder': { mt:'50px'},
            borderRadius: "20px",
          }}
        ></InputBase>
      </FlexBetween>

      <Box
        display={"flex"}
        flexDirection='row'
        justifyContent={'space-between'}
      >
        <Box ml='20px' >
          <IconButton>
            <Image fontSize="small" />
          </IconButton>
          <IconButton>
            <StickyNote2 fontSize="small" />
          </IconButton>

          <IconButton>
            <EmojiEmotions fontSize="small"/>
          </IconButton>
        </Box>

        <IconButton type="submit" sx={{mr:'10px'}}>
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CommentForm;
