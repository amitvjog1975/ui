import { Box, CardContent, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import AccountHeads from './AccountHeads'

const EODManager = () => {
  return (
    <Box component="div">
      <Grid container>
        <Grid item xs={12} md={6} style={{display: 'flex', flexDirection: 'row', alignContent:'center', alignContent: 'center'}}>
          <Paper elevation={4} style={{marginRight: 10, marginLeft: 10, marginBottom: 10, flexGrow:'0.5', height: 150}}>
            <CardContent>              
              <Typography variant="h5" component="div">
                Checker Data
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Sales - Win
              </Typography>
              <Typography variant="body2">
                ₹ 10000 - ₹ 5000               
              </Typography>
            </CardContent>           
          </Paper>
          <Paper elevation={4} style={{marginRight: 10, marginLeft: 10, marginBottom: 10, flexGrow:'0.5', height: 150}}>
            <CardContent>              
              <Typography variant="h5" component="div">
                Shop Data
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Sales - Win
              </Typography>
              <Typography variant="body2">
                ₹ 10000 - ₹ 5000               
              </Typography>
            </CardContent>           
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <AccountHeads />
        </Grid>
      </Grid>
    </Box>
  )
}

export default EODManager