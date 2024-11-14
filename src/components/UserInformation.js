import React from 'react'
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { red, blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Paper, Grid, Typography, Avatar, Card, CardHeader, CardMedia, CardContent, CardActions  } from '@mui/material';

const UserInformation = ({ userInfo }) => {
    return (
        <Card elevation={5}
        style={{marginTop: '30px', border: 1}}        
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title={<Typography component='h4'>User Information</Typography>}
                style={{ backgroundColor: blue[600] }}
            />
            <CardContent>
                <Grid component="container" md={12}>
                    <Grid item md={6} xs={12 }>
                        <Typography variant="caption">Login name</Typography>
                        <Typography variant="body1">{userInfo.loginName
                        }</Typography>
                    </Grid>
                    <Grid item md={6} xs={12 }>
                        <Typography variant="caption">Full Name</Typography>
                        <Typography variant="body1">{userInfo.fullName}</Typography>

                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>

    )
}

export default UserInformation