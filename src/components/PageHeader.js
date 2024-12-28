import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

function PageHeader({ title, children }) {
    return (
        <>
            <AppBar position="static" elevation={3} color='default'>
                <Toolbar>
                    <Typography variant="h6" sx={{ marginRight: 1, }}>{title}</Typography>
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid size={12} sx={{ marginLeft: 'auto', display: 'flex', alignContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
}

export default PageHeader;