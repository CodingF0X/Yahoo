
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { DialogActions, DialogContent, Input } from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/system';
import { Send } from '@mui/icons-material';
import { profilePicture } from '../../State/Action-Creators/UserActions';



function SimpleDialog({ onClose, open,singleUser}) {
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    const {user} = useSelector(state=>state.users.user)
    const profilePicExists = auth?.result?.profilePicture 
    const PicturePath = `http://localhost:4000/assets/${singleUser?.user?.profilePicture}`
    const [picture,setPicture] = useState('')

    // const formData = new FormData()
    //     if(picture){
    //         formData.append("picture", picture);
    //         formData.append("profilePicture", picture);
    //     }

    const handleClose = () => {
      onClose();
    };
  
    const handleFileChange = (e)=>{ 
        const file = e.target.files[0];
    if (file){ 
        setPicture(file.name)
        
       }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(profilePicture(auth?.result?._id, picture))
        onClose()

    }
  
    return (
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle sx={{textAlign:'center'}}>Profile Picture</DialogTitle>
        
        <Box component='form' onSubmit={handleSubmit} sx={{width:'300px'}}>
  
          <DialogContent >
            <Box component='div' sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Box component='label' htmlFor="profilePhoto" flexBasis='46%' >
                <Input
                    accept="image/*"
                    id="profilePhoto"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <Avatar
                    src={PicturePath} alt={user.firstName}
                    sx={{ width: 75, height: 75, cursor: 'pointer' }}
                />
                </Box>
                <Typography>Update Profile Pic</Typography>
            </Box>

       { singleUser?.user?.profilePicture ?
        <Box component='div' sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          <Box component='label' onClick={()=>setPicture('')} flexBasis='46%' >
              
              <Avatar
                sx={{ width: 75, height: 75, cursor: 'pointer' }}
              />
            </Box>
            <Typography>Remove Profile Pic</Typography>
        </Box>
        :''
       }
          </DialogContent>
  
            <DialogActions sx={{ px: '19px' }}>
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Update
            </Button>
          </DialogActions>
        </Box>
   
      </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
   // selectedValue: PropTypes.string.isRequired,
  };


export default function ProfilePic({changePic,setChangePic,singleUser}) {
  const [open, setOpen] = useState(changePic);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChangePic(false)
  };

  return (
    <div>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        singleUser={singleUser}
      />
    </div>
  );
}
