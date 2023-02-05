import { Edit, Panorama, Send } from '@mui/icons-material'
import { Dialog, DialogTitle,Box, DialogContent, DialogActions, Input, Typography, Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { coverImage } from '../../State/Action-Creators/UserActions'

function SimpleDialog({onClose,open,singleUser}){
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    const userId = auth?.result._id

    const [cover,setCover]=useState('')
    const handleClose =()=>{
        onClose()
    }

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        if (file){ 
            setCover(file.name)
            
           }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(coverImage(userId,cover))
        onClose()

    }
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{textAlign:'center'}}>Cover Image</DialogTitle>

            {/*-- FORM --*/}
            <Box component='form' onSubmit={handleSubmit} sx={{width:'300px'}}>

                {/*-- DIALOG CONTENT --*/}
                <DialogContent >
                 <Box component='div' sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <Box component='label' htmlFor='CoverImg' flexBasis='46%'>
                        <Input
                            accept="image/*"
                            id="CoverImg"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}  
                        />
                         <Panorama
                            sx={{ width: 75, height: 75, cursor: 'pointer' }}
                         />
                    </Box>
                    <Typography>Update Profile Pic</Typography>

                    { singleUser?.user?.coverImage ?
                    <Box component='div' sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <Box component='label' onClick={()=>setCover('')} flexBasis='46%' >
                        
                        <Avatar
                            sx={{ width: 75, height: 75, cursor: 'pointer' }}
                        />
                        </Box>
                        <Typography>Remove Cover Image</Typography>
                    </Box> 
                    :''
                 }
                 </Box>

                </DialogContent>

                {/*--DIALOG ACTIONS --*/}
                <DialogActions>
                    <Button type='submit' variant='contained' endIcon={<Send/>}>
                        Confirm Changes
                    </Button>
                </DialogActions>
            </Box>

        </Dialog>
    )
}


const CoverImage = ({changeCover,setChangeCover,singleUser}) => {
    const [open, setOpen] = useState(changeCover)

    const handleClose = ()=>{
        setOpen(false)
        setChangeCover(false)
    }
  return (
    <div>
        <SimpleDialog 
            open={open}
            onClose={handleClose}
            singleUser={singleUser}
        />
    </div>
  )
}

export default CoverImage