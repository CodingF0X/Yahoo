import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Rightbar = () => {
    const {result} = useSelector(state=>state.auth)
    const navigate = useNavigate()  

    const handlePreview = ()=>{
        navigate(`/profile/${result._id}`)
    }
  return (
    <Box>
        
     <Box flexBasis='10%'  >
       <Button variant='contained'  
          onClick={handlePreview}
          sx={{
            width:'200px',
            borderRadius: "3rem",
            marginTop:'200px',
            ml:'50px'
          }}
        > 
          Preview Profile
        </Button>
        </Box>
  
    </Box>
  )
}

export default Rightbar