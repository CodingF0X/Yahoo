import { useState } from "react";
import {Box,IconButton,InputBase,Typography,Select,MenuItem,FormControl,useTheme,useMediaQuery, Badge} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  LoginOutlined
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation, Link } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { logout } from "../State/Action-Creators/UserActions";
import { setMode } from "../State/Action-Creators/ModeActions";
import { useEffect } from "react";
import jwt_decode from 'jwt-decode'
import SearchBar from "./Search/SearchBar";


const Navbar = () => {
  //const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  //const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const [user,setUser] = useState(null)
  const auth = useSelector(state=> state.auth )

  
 
  const logoutHandler = ()=>{
    dispatch(logout(navigate))
    // navigate('/signin')
  }

  const darkModeHandler = (e)=>{
    dispatch(setMode())
    setUser(null)
  }

  useEffect(()=>{
     setUser(auth?.result)
  // user && console.log(user)
  },[location])
 
//-- HANDLE WHEN TOKEN EXPIRES --//
  if(auth && auth.token){
    const decode = jwt_decode(auth.token)
    decode.exp * 1000 < new Date().getTime() && logoutHandler()
  // logoutHandler()
  }

  const name = user && `${user?.firstName} ${user?.lastName}`

  return (

    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Yahoo!
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            
          >
            <SearchBar />
            <IconButton>  
               <Search />
            </IconButton> 
        
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      
        <FlexBetween gap="2rem">
          <IconButton onClick={darkModeHandler}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
            <IconButton onClick={()=>navigate('/messenger')}>
             <Message sx={{ fontSize: "25px" }} />
            </IconButton>
          <IconButton>
            <Badge badgeContent={2} color='primary'>
                <Notifications sx={{ fontSize: "25px" , color:'black'}}   />
            </Badge>
          </IconButton>
          {/* <Help sx={{ fontSize: "25px" }} /> */}
      
          <FormControl variant="standard" value={'userName'}>
            <Select
              value={user ? name : ''}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={user && name}>
                <Typography>{user && name}</Typography>
              </MenuItem>
              {!user && 
              <MenuItem  onClick={()=>navigate('/signin')}>
               SignIn &nbsp; 
               <LoginOutlined></LoginOutlined>
               
               </MenuItem>}
              <MenuItem onClick={()=>logoutHandler()}>Log Out</MenuItem>
            </Select>
          </FormControl>
        
        
        </FlexBetween>
      

    </FlexBetween>
  );
  
}

export default Navbar