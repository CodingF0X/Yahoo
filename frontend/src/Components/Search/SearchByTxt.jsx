import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { typography } from '@mui/system';
import { Link } from 'react-router-dom';
import { searchFilter } from '../../State/Action-Creators/SearchActions';
import { Avatar } from '@mui/material';


function TabPanel(props) {
  const { children, value, index,component, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      component='div'
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  component:PropTypes.element
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SearchByTxt = ({searchResult,text,setOpen}) => {
  const dispatch = useDispatch() 
  const [value, setValue] = React.useState(0);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };

  useEffect(()=>{
    if(value===0){
      dispatch(searchFilter({type:'userProfile', query : text}))
    }if(value===1){
      console.log('TAg')
    }else if (value ===2) {
      dispatch(searchFilter({type:'POSTS', query : text}))
    }
  },[value,dispatch,text])


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Hash#" {...a11yProps(1)} />
          <Tab label="posts" {...a11yProps(2)} />
        </Tabs>
      </Box>
    
      {searchResult?.users && searchResult?.users?.map(user=> 
       <Box component='div' key={user._id} >  
        <TabPanel  value={value} index={0} >
         <Link to={`/profile/${user._id}`} onClick={()=>setOpen(false)}> 
         <Box display={'flex'} flexDirection={'row'} alignItems='center' gap={1} >
          <Avatar sx={{width:'25px', height:'25px'}} src={`http://localhost:4000/assets/${user.profilePicture}`}/>
          <Typography variant='h6'>
            {user?.firstName} 
            &nbsp;
            {user?.lastName.toLowerCase()}
          </Typography>
          </Box>
          </Link>  
        </TabPanel>
       </Box>
      )}
      
      <TabPanel value={value} index={1}>
        Item two
      </TabPanel>
    
      {searchResult?.posts && searchResult?.posts?.map(post=>
      <TabPanel key={post._id} value={value} index={2}>
        {post?.description}
      </TabPanel>
      )}
     
    </Box>
  )
}

export default SearchByTxt


// allUsers.filter(user=>{
//   if(text=== ''){
//       return ''
//   }else if(user.firstName.toLowerCase().includes(text.toLowerCase())){
//       return user
//   }
// }).map((user,index)=>(
//   <Box key={index}>
//       <p>{user.firstName}</p>
//   </Box>
// ))

// }