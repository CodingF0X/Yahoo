import { Contacts, Password } from '@mui/icons-material'
import { AppBar, Box, Divider, Stack, Toolbar ,IconButton} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Sidebar = () => {
   const {result} = useSelector(state=>state.auth)
   const userId = result._id
  return (
    <Box>

   
    <Stack 
    direction="column"
    sx={{
        display:'flex',
        gap:'20px',
        flexDirection: "column" ,
    }}
    > 
      
        <Box component={Link} to={`/profile/${userId}/settings/edit/name_email`}>
        <IconButton id='x1' >
           <Contacts /> Basic details
        </IconButton>
        </Box>
       
       <Box component={Link} to={`/profile/${userId}/settings/edit/password`}>
        <IconButton >
            <Password/>
            Change Password
        </IconButton>
       </Box>

        <Box>
            Location, occupation and Language
        </Box>
        <Box>
            Privacy
        </Box>
        <Box>
            Delete Account
        </Box>

    </Stack>
  </Box>
  )
}

export default Sidebar