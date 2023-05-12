import { Box } from '@mui/material'
import ChatBox from '../../Components/Messenger/ChatBox'
import Conversations from '../../Components/Messenger/Conversations/Conversations'
import RightPane from '../../Components/Messenger/RightPane/RightPane'


const Messenger = () => {
//   const {messages} = useSelector(state=>state.messages)
//   const user = useSelector(state=>state.auth)
  // const [own,setOwn] = useState(false)
  // let own = false
  // messages?.map(m => {
  //   if( m.sender === user.result._id){
  //     own = true
  //   }
  // })

  return (
  
    <Box display={'flex'} flexDirection='row' m={2} maxHeight='100%' sx={{overflowY:'clip'}}>
      <Box flexBasis='10%'><Conversations/></Box>
      <Box ml={1} flexBasis='50%'><ChatBox sender = 'alex' /></Box>
      <Box flexBasis='30%'><RightPane/></Box>
      
    </Box>
    
  )
}

export default Messenger