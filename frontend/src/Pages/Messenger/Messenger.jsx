import { Box } from '@mui/material'
import ChatBox from '../../Components/Messenger/ChatBox'
import Conversations from '../../Components/Messenger/Conversations'


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
  
    <Box display={'flex'} flexDirection='row' m={2}>
      <Box ml={1} flexBasis='80%'><ChatBox sender = 'alex' /></Box>
      
      <Box><Conversations/></Box>
    </Box>
    
  )
}

export default Messenger