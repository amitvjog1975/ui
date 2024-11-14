import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

function PageHeader({ title, children }) {
    return (
        <AppBar position="static" elevation={3} color='default'>
            <Toolbar>
                <Typography variant="h6" sx={{ marginRight: 1 }}>{title}</Typography>
                <Box sx={{ marginLeft: 'auto', display: 'flex', alignContent:'center', flexWrap:'wrap' }}>
                    {children}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default PageHeader;