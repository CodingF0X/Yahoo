import { Divider } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import Name_Email from "./Name_Email"
import Password from "./Password"
import Rightbar from "./Rightbar"
import Sidebar from "./Sidebar"




const EditProfile = () => {
    const location = useLocation()
    const {result} = useSelector(state=>state.auth)
    const userId = result._id 

    const main = location.pathname===`/profile/${userId}/settings/edit`
    const editingEmail = location.pathname.includes('/name_email')
    const editingPassword = location.pathname.includes('/password')
  return (
    <Box display='flex' flexDirection='row'> 

        <Box flexBasis='25%' sx={{width:'200px'}}>
         <Sidebar  />
        </Box>

        <Box><Divider orientation='vertical'  sx={{ml:'150px',color:'black'}} /></Box>
       
        <Box>
            {main && <Name_Email /> }
          {editingEmail && <Name_Email  /> }
           
          {editingPassword && <Password /> }
        
        </Box>
        
        <Box><Divider orientation='vertical'  sx={{ml:'50px',color:'black'}} /></Box>

       <Box component='div' flexBasis='66%' pr='50px'>
         <Rightbar />
       </Box>
    </Box>
    
  )
}

export default EditProfile