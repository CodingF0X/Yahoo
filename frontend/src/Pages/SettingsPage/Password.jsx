import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../Components/FlexBetween";
import { ManageAccounts } from "@mui/icons-material";
import { updateUserDetails, updateUserPWD } from "../../State/Action-Creators/UserActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Password = ({ setIsClicked }) => {
  const { result } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserPWD(result._id, newPassword));
    setOpen(true);
  };

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display="flex"
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis="30%"></Box>

      <Box flexBasis="45%%">
        <Container component="main">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FlexBetween>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <ManageAccounts />
              </Avatar>

              <Typography component="h1" variant="h5">
                Editing Profile
              </Typography>
            </FlexBetween>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete=" password"
                    name="password"
                    type="password"
                    required
                    fullWidth
                    id="password"
                    label="Enter New Password"
                    autoFocus
                    value={newPassword.password}
                    onChange={(e) =>setNewPassword( e.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoComplete="New Password"
                    name="password"
                    type="password"
                    required
                    fullWidth
                    id="password"
                    label="Re-enter New Password"
                    autoFocus
                    // value={formData.lastName}
                    // onChange={e=>setFormData({...formData, lastName:e.target.value})}
                  />
                </Grid>

                {/* <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={e=>setFormData({...formData,password:e.target.value})}

                    />
                    </Grid> */}
              </Grid>

              <Divider
                variant="fullWidth"
                textAlign="center"
                sx={{ color: "black", mt: "20px" }}
              />
              <Typography>
                * For changes to take Effect in Topbar , you need to re-sign in
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Profile has been updated!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Password;
