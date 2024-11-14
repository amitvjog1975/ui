import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 'bold'
    },
    bodyDate: {
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'bold',
      color: '#0000cc'
    },
    button: {
      fontStyle: 'italic',
    },
    statusApproved: {
      fontSize: 14,
      color: '#009900'
    },
    statusPending: {
      fontSize: 14,
      color: '#0000cc'
    },
    statusInProgress: {
      fontSize: 14,
      color: '#cc0000'
    }
  },
});

const DashboardShopCard = (props) => {
  let data = props.data;
  const fnOpenDetails = () => {
    //console.log(data.shopID);
    //console.log(data.accDate);
    props.onDetailsClick(data.shopID, data.accountDate);
  }
  return (
    <ThemeProvider theme={theme}>
      <Card elevation={6}>
        <CardContent>
          <Typography variant="body2" component="div">
            {data.shopCode + ' - ' + data.shopName}
          </Typography>
          <Typography variant="bodyDate" color="text.secondary">
            Date: {moment(data.accountDate).format("DD-MM-YYYY")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Closing Amount: {data.closingAmount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Opening Amount: {data.openingAmount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Winning Amount: {data.winningAmount}
          </Typography>
          <Typography variant="body2">
            Status:
            {data.approvalStatus == 2 &&
              <ThumbUpIcon color='success' fontSize='small' />}
            {data.approvalStatus == 1 &&
              <ThumbUpIcon color='warning' fontSize='small' />}
            {(data.approvalStatus == null || data.approvalStatus == undefined || data.approvalStatus == 0) &&
              <Box sx={{ display: 'flex' }}>
                <ThumbUpIcon color='disabled' fontSize='small' />  &nbsp;
                <Typography>{data.approvalStatusName}</Typography>
              </Box>
            }
          </Typography>
          <Typography variant='body2' component={'div'} style={{ float: 'right', marginBottom: '10px' }}>
            <Button variant="outlined" size='small' startIcon={<VisibilityIcon />} onClick={() => fnOpenDetails()}>
              View Details
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default DashboardShopCard;
