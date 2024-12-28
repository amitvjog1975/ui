import React, {  useContext, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Container, CssBaseline, Box, Avatar, Typography, TextField } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { authService , shopService} from "../services";
import UserContext from "../shared/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CircularProgress from '@mui/material/CircularProgress';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {updateUserData, updateShopList, updateIsAuthenticated}  = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const validateLogin = () => {
        setIsLoading(true);
        let postData = {
            userName: username,
            password: password
        }
        authService.authenticateLogin(postData).then(result => {
            if (result.statusCode === 200) {
                if (result.data) {                    
                    updateUserData(result.data);
                    updateIsAuthenticated(true);
                        Cookies.set("kvsrsUser", JSON.stringify(result.data), { expires: 1, sameSite: 'strict', secure: true });
                        //getShopMasterList();                        
                        shopService.getShopMasterList()
                        .then(result => {
                            updateShopList(result.data);
                            setIsLoading(false);
                            //console.log(shopList);
                            //console.log(userData);  
                            navigate('/dashboard', { replace: true });                            
                        })
                        .catch(err => {
                            setIsLoading(false);
                        });
                }
            } else {
                setIsLoading(false);
                setError(result.message);
            }
        }).catch(err => {
            setIsLoading(false);
            navigate('/login');
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            setError("Username and password are required fields.");
        } else {
            validateLogin();
            setError("");
        }
    };
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            label="Username"
                            type="text"
                            disabled={isLoading}
                            required
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            label="Password"
                            type="password"
                            disabled={isLoading}
                            required
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                            sx={{ mt: 3, mb: 2 }}
                            startIcon={isLoading ? <CircularProgress color="secondary" /> : <VpnKeyIcon />}
                        >
                            Login
                        </Button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
};

export default Login;
