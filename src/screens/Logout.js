import React, { useContext, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, Box, Avatar, Typography } from "@mui/material";
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import UserContext from "../shared/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
    const { setUserData,handleLogout, updateIsAuthenticated } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        updateIsAuthenticated(false);
        handleLogout();
        setTimeout(() => {
            console.log('This will run after 5 seconds!')
            Cookies.set("kvsrsUser", null);
            Cookies.remove("kvsrsUser");
            navigate('/login', { replace: true });
        }, 5000);
    })

    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
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
                        <HikingOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        You are being signed out...
                    </Typography>
                </Box>

            </Container>
        </ThemeProvider>
    );
};

export default Logout;
