import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

import AppContext from '../shared/AppContext';
import { jwtDecode } from 'jwt-decode';
import Sidebar from "./Sidebar";
import { Container } from "reactstrap";
import { AppBar, IconButton, Toolbar, Typography, Drawer, Box } from '@mui/material';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

import MenuIcon from '@mui/icons-material/Menu';


function PrivateLayout() {
  const [_userInfo, set_UserInfo] = useState(null);

  const navigate = useNavigate();
  let cookieDataStr = Cookies.get("kvsrsUser");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  useEffect(() => {
    if (cookieDataStr) {
      let userData = JSON.parse(cookieDataStr);
      if (userData && userData.token) {
        /*return (<Outlet />)*/
        if (!isTokenExpired(userData.token)) {
          set_UserInfo(userData);
        } else {
          Cookies.set("kvsrsUser", "");
          Cookies.remove("kvsrsUser");
          navigate("/login", { replace: true });
        }
      } else {
        Cookies.set("kvsrsUser", "");
        Cookies.remove("kvsrsUser");
        navigate("/login", { replace: true });
      }
    } else {
      Cookies.set("kvsrsUser", "");
      Cookies.remove("kvsrsUser");
      navigate("/login", { replace: true });
    }
  }, [])

  function isTokenExpired(token) {
    //debugger
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
    const currentTime = Date.now();
    console.log("is Token Expired " + currentTime >= expirationTime);
    return currentTime >= expirationTime;
  }


  if (cookieDataStr == null || cookieDataStr == undefined || cookieDataStr == "") {
    return <Navigate to="/login" />
  }
  /*//Routing Start*/
  /*Routing End*/

  return (
    <main>
      <AppBar position="fixed" elevation={1} sx={{ backgroundColor: "primary" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: 'block',
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{
            flexGrow: 1
          }}>
            <CrisisAlertIcon />
            KVSRS
          </Typography>
          {/* User Menu */}
          <div>
            <IconButton color="inherit">
              {/* User Avatar or Initials */}
            </IconButton>
            <Typography variant="body1">Username</Typography>
          </div>
        </Toolbar>

      </AppBar>
      <Drawer
        variant="temporary"
        open={isSidebarOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'block' }, // Display on all screen sizes
          flexGrow: 1, p: 3, marginTop: 3,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <Sidebar />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 3 }}>
        <Container className="p-4" fluid>
          <Outlet />
        </Container>
      </Box>
      {/********header**********/}
      {/* <Header />
      <div className="pageWrapper d-lg-flex">
        ********Sidebar**********
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        ********Content Area**********
        <div className="contentArea">
          ********Middle Content**********
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div> */}
    </main>
  );
}
export default PrivateLayout;
