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
import WidgetWrapper from '../../Components/WidgetWrapper';
import { signIn } from '../../State/Action-Creators/UserActions';
import { GoogleLogin } from '@react-oauth/google';
import { USER_SIGNIN } from '../../State/constants/constants'
import jwt_decode from "jwt-decode";

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

export default function SignIn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initalState = {email:'', password:''}
    const [formData, setFormData]=useState(initalState)
    

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(signIn(formData,navigate))
        /// navigate('/')
    }

    const handleChange = (e)=>{
      e.preventDefault()

      setFormData({...formData,[e.target.name]:e.target.value})
    }

    const googleSuccess= async (res)=>{
        const token = res?.credential
        console.log(jwt_decode(token))
        try{
          token && dispatch({type:USER_SIGNIN, payload:{token}})
          
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
    <WidgetWrapper>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={()=>navigate('/')}
            >
             
              Sign In
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signup' >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </WidgetWrapper>
  );
}