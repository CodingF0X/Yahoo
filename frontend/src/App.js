import "./App.css";
import Home from "./Pages/HomePage/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./Theme";
import Navbar from "./Components/Navbar";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SigninPage/SignIn";
import Profile from "./Pages/ProfilePage/Profile";
import EditProfile from "./Pages/SettingsPage/EditProfile";
import { Token_Google_auth, user, customToken } from "./State/Tokens/token";
import Register from "./Pages/SignUp/Register";
import Messenger from "./Pages/Messenger/Messenger";
import Dashboard from "./Pages/Admin/Dashboard";

function App() {
  const mode = useSelector((state) => state.darkMode.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // const auth = useSelector(state=>state.auth)
  // const user = auth?.result

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/home" /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/signin" />}
            />
            <Route
              path="/profile/:userId"
              element={user ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId/settings/edit"
              element={user ? <EditProfile /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId/settings/edit/name_email"
              element={user ? <EditProfile /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId/settings/edit/password"
              element={user ? <EditProfile /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId/settings/edit/facts"
              element={user ? <EditProfile /> : <Navigate to="/" />}
            />
            <Route
              path="messenger"
              element={user ? <Messenger /> : <Navigate to="/signin" />}
            />
            //-- ADMIN --//
            <Route
              path="/dashboard"
              element={user?.result?.isAdmin && <Dashboard />}
            />
            <Route
              path="/signin"
              element={!user ? <SignIn /> : <Navigate to="/home" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/home" />}
            />
            {/* <Route path='/signup' element={!user ?<Register/> : <Navigate to='/home' />} /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
