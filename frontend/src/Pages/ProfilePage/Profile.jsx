import { Box, IconButton, Input, InputBase, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from '../../Components/Friends/FriendListWidget'
import Posts from "../../Components/Posts/Posts";
import UserWidget from "../../Components/Widgets/UserWidget";
import { getUser } from "../../State/Action-Creators/UserActions";
import  MyPostWidget  from '../../Components/Widgets/MyPostWidget'
import ProfilePic from "../../Components/Widgets/ProfilePic";
import CoverImage from "../../Components/Widgets/CoverImage";
import { Edit, InsertPhoto } from "@mui/icons-material";


const Profile = () => { 
  const dispatch = useDispatch()
  const [singleUser, setSingleUser] = useState(null);
  const { userId } = useParams();
  const auth = useSelector(state=>state.auth)
  const isOwnProfile = userId === auth.result._id
  const coverExists = singleUser?.user?.coverImage 
  const profilePicExists = singleUser?.user?.profilePicture
  const [changePic, setChangePic] = useState(false)
  const [changeCover, setChangeCover] = useState(false)

    const getTheUser = async ()=>{
      const theUser =await dispatch(getUser(userId))
      setSingleUser(theUser)
    }     
  

  useEffect(() => {
    getTheUser()
  }, [dispatch,userId,changePic,changeCover]); // eslint-disable-line react-hooks/exhaustive-deps

  const name = singleUser && `${singleUser.user.firstName} ${singleUser.user.lastName}`

  if (!singleUser) return null;

  return (
    <Box>
      <Box>
          <Box  component='img' src={coverExists ? `http://localhost:4000/assets/${singleUser?.user?.coverImage}`  : '../assets/coverImg.png'} alt='NO COVER IMAGE'
          sx={{
            width: '100%',
            height: '350px',
            objectFit: 'cover'
          }}
          />
          {isOwnProfile &&
         <IconButton onClick={()=>setChangeCover(true)} 
          disableRipple
          disableFocusRipple
          sx={{ml:'1400px'}}
          >
            <InsertPhoto/> <Edit  />
          </IconButton>
         }
          {changeCover && <CoverImage changeCover={changeCover} setChangeCover={setChangeCover} singleUser={singleUser}/>}

          <Box onClick={()=>{setChangePic(true)}} component='img' src={profilePicExists ? `http://localhost:4000/assets/${singleUser?.user?.profilePicture}`: '../assets/maleProfileImg.png' } alt='NO PROFILE IMAGE'
          sx={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            position: 'absolute',
            left: '0',
            right: '0',
            margin: 'auto',
            top: '350px',
            border: '3px solid white',
            cursor:'pointer'
          }}
          />

         { changePic && isOwnProfile && <ProfilePic changePic={changePic} setChangePic={setChangePic} singleUser={singleUser}/> }
      
       
          <Typography sx={{
              display: 'flex',
              flexDirection: "column",
              alignItems: 'center',
              justifyContent: 'center',
              mt:'60px',
              fontSize:'30px'
              
          }}>{name}</Typography>
      </Box>

      <Box
        width="100%"
        padding="1rem 6px"
        display= "block"
        gap="2rem"
        justifyContent="center"
        sx={{display:'flex'}}
      >
        <Box flexBasis='26%' position='sticky'>
          <UserWidget userId={userId} friends={singleUser?.user?.friends} isOwnProfile={isOwnProfile} changePic={changePic}/>
          <Box m="2rem 0" />
          <FriendListWidget userId={userId}  />
        </Box>
        <Box
          flexBasis='42%'
          mt= "2rem"
        >
          <MyPostWidget picturePath={singleUser?.user?.picturePath} />
          <Box m="2rem 0" />
          <Posts userId={userId} isProfile />
          {/* <ProfilePosts userId={userId} /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
