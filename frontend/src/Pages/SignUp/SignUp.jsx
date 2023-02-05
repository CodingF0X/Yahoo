import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../../State/Action-Creators/UserActions';
import { Input } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { USER_SIGNUP } from '../../State/constants/constants';
import jwt_decode from "jwt-decode";
import Register from './Register';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialState = {firstName:'',lastName:'',email:'', password:''}
  const [formData, setFormData] = useState(initialState)
 // const [googleData,setGoogleData]=useState({firstName:'',lastName:'',email:'',profilePicture:''})
 
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(formData,navigate))
  //  navigate('/')
  };

  const handleChange = (e)=>{
    e.preventDefault()
    setFormData({...formData, [e.target.name]:e.target.value})
  }


  const googleSuccess= async (res)=>{
    const token = res?.credential
    console.log(jwt_decode(token))
    const decodedToken = jwt_decode(token)

    try{
      token && dispatch({type:USER_SIGNUP, payload: { 
        
        email:decodedToken.email,
        firstName:decodedToken.given_name,
        lastName:decodedToken.family_name,
        profilePicture:decodedToken.picture,
        password:'sosn'
        }
      })
      
      
      navigate('/')
    }catch(err){ 
      console.log(err)
    }
}

const googleFailure =(error)=>{
  console.log(error)
  console.log('Signing in was unsuccessfull')
}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Register/> */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="firstName"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
                
              </Grid>

              <Grid item xs={12} >
                <TextField
                  autoComplete="lastName"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoFocus
                  onChange={handleChange}
                />
                
              </Grid>
          
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}

                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <GoogleLogin 
              // render={(renderProps)=>(
              //   <Button 
              //   color='primary' 
              //   fullWidth
              //   onClick={renderProps.onClick} 
              //   disabled={renderProps.disabled} 
              //   startIcon={<Icon/>}
              //   variant='contained' 
              //   sx={[{
              //     marginBottom: theme.spacing(2),
              //   }]}
              //   >Login with Google</Button>
              // )} 
              onSuccess={googleSuccess} 
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}