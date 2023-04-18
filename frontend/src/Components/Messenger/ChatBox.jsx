import { Box, Button, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { VideoCall, Call } from '@mui/icons-material'

import Messages from './Messages'

const ChatBox = ({sender}) => {
  
  return (
    <Box display={'flex'} flexDirection='column' gap={10} >
    <Stack  maxWidth='95%'  >

            <Toolbar sx={{
                color:'white',
                background:'violet',
                borderRadius:'10px',
                display:'flex',
                flexDirection:'row',
                alignItems:'center'
            }}>
                    <Typography >Reciver's Name</Typography>
                
                  <Box ml={105}>
                    <IconButton>
                        <VideoCall/>
                    </IconButton>

                    <IconButton>
                        <Call/>
                    </IconButton>
                  </Box>
            </Toolbar>
            <Messages  />
            
        
     

    
        
    </Stack>
        <Box component='form'  display={'flex'} alignItems='center' gap={1}>
           
            <TextField
            size='medium'
            multiline
            label='write sth...'
            sx={{
                width:'50%',
                maxWidth:'30%'
            }}
           
            >
            </TextField>
            <Button variant='contained' color='secondary' type='submit'>Send</Button>
        </Box>
    </Box>
  )
}

export default ChatBox