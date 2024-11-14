import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Tab, Box, Grid, Paper, CardContent, Typography, CardHeader, Card, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Toolbar } from "@mui/material";
import { styled } from '@mui/material/styles';
import AccountHeads from "../../components/ShopAccountManager/AccountHeads";
import { dashboardService } from "../../services";
import { accountService } from "../../services";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from "moment";
import PaymentIcon from '@mui/icons-material/Payment';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import UserContext  from "../../shared/UserContext";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';


const DashboardCard = styled((props) => {
    const { ...other } = props;
    return <Card {...other} />;
})(({ theme }) => ({
    height: 150,
    flexGrow: '1',
    margin: '5px'
}));

const DashboardCardHeader = styled((props) => {
    const { ...other } = props;
    return <CardHeader title {...other} />;
})(({ theme }) => ({
    backgroundColor: '#ff7f50',
    color: '#fff',
    height: 50
}));
const ShopAccountManager = () => {
    const location = useLocation();
    const { shopList, setAlert } = useContext(UserContext);

    const receivedData = location.state && location.state.data;
    const [shopID, setShopID] = useState(null);
    const [shopCode, setShopCode] = useState(null);
    const [shopName, setShopName] = useState(null);
    const [shopAccDate, setShopAccDate] = useState(null);

    const [checkerSales, setCheckerSales] = useState(0);
    const [checkerWin, setCheckerWin] = useState(0);
    const [shopSales, setshopSales] = useState(0);
    const [shopWin, setShopWin] = useState(0);

    const [videoGameIn, setVideoGameIn] = useState(0);
    const [videoGameOut, setVideoGameOut] = useState(0);

    const [submissionStatus, setSubmissionStatus] = useState('');
    const [submittedBy, setSubmittedBy] = useState('');

    const [submittedOn, setSubmittedOn] = useState(null);

    const [approvedBy, setApprovedBy] = useState('');
    const [approvedOn, setApprovedOn] = useState(null);


    const [accountHeadData, setAccountHeadData] = useState(null);

    const [shopData, setShopData] = useState(null);
    const [accountDialogOpen, setAccountDialogOpen] = useState(false);

    const [accountShopID, setAccountShopID] = useState(shopID);
    const [accountShopAccDate, setAccountShopAccDate] = useState(shopAccDate);
    const [recvdData, setRecvdData] = useState(false);

    const handleAccountShopChange = (event) => {
        setAccountShopID(event.target.value);
    }

    const handleCloseAccountDialog = () => {
        setAccountDialogOpen(false);
    }

    const handleShowAccountDialog = () => {
        ///Refresh 
        let _date = dayjs(accountShopAccDate).format("YYYY-MM-DD")
        getAccountHeadData(accountShopID, _date);
        setAccountDialogOpen(false);
    }

    const handleOpenAccountDialog = () => {
        //console.log('accountShopAccDate ' + accountShopAccDate);
        setAccountDialogOpen(true);
    }

    const updateShopDate = (newValue) => {
        setAccountShopAccDate(dayjs(newValue))
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (receivedData != null) {
            setRecvdData(true);
            setShopID(receivedData.shopID);
            setShopAccDate(receivedData.shopAccDate ? dayjs(receivedData.shopAccDate).format("YYYY-MM-DD") : null);
            setAccountShopID(receivedData.shopID);
            setAccountShopAccDate(receivedData.shopAccDate ? dayjs(receivedData.shopAccDate) : null)
            //getAccountHeadData();
        }
    }, [receivedData]);

    useEffect(() => {
        if (recvdData && shopID != null && shopID != undefined && shopAccDate != null && shopAccDate != undefined) {
            getAccountHeadData(shopID, shopAccDate)
            setRecvdData(false);
        }
    }, [shopID, shopAccDate])


    const getAccountHeadData = (_shopID, _accDate) => {
        let postData = { 'shopID': _shopID, 'accountDate': _accDate }
        setAccountHeadData(null);
        accountService.getAccountHeadData(postData).then(shopData => {
            setAccountHeadData(shopData);
            setShopID(shopData.shopID);
            setShopAccDate(shopData.accDate ? dayjs(shopData.accDate).format("YYYY-MM-DD") : null);
            setAccountShopID(shopData.shopID);
            setAccountShopAccDate(shopData.accDate ? dayjs(shopData.accDate) : null)
            setShopCode(shopData.shopCode);
            setShopName(shopData.shopName);
            setSubmissionStatus(shopData.statusName)
            setSubmittedBy(shopData.submittedBy);
            setApprovedBy(shopData.approvedBy);
            setSubmittedOn(shopData.submittedOn);
            setApprovedOn(shopData.approvedOn);
            setshopSales(shopData.salesAmount);
            setShopWin(shopData.winningAmount);
        }).catch(err => {
            console.log('Something went wrong');
        });
    }

    const navigateBackToDashboard = () => {
        let dataToSend = {
            accDate: shopAccDate
        }
        navigate('/dashboard', { state: { data: dataToSend } });
    }


    const updateOnApproval = (postData) => {
        accountService.submitAccountEODData(postData).then(result => {

        }).catch(err => {
            let _alert = {
                show: true,
                severity: 'error',
                color: 'error',
                message: 'Something went wrong!'
            }
            showAlertToUser(_alert);
        })
    }


    const showAlertToUser = (_alert) => {
        setAlert(_alert);
    }


    //const [activeTab, setActiveTab] = useState(0);
    return (
        <Box component="div" style={{ marginTop: 20 }}>
            <Grid container>
                {accountHeadData && <>
                    <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
                        <Button startIcon={<ArrowBackIcon />} onClick={navigateBackToDashboard}>Back to Dashboard</Button>
                        <Box style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}> Date :</Typography> <Typography variant="subtitle2"> {moment(accountHeadData.accDate).format("YYYY-MM-DD")} </Typography>
                            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</Typography>
                            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>Shop :</Typography> <Typography variant="subtitle2">{accountHeadData.shopCode + ' - ' + accountHeadData.shopName} </Typography>
                        </Box>
                    </Grid >
                    <Grid item xs={12} md={3} lg={3} style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
                        <Box component={'div'} sx={{ width: '100%' }} display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' }}>
                            <DashboardCard>
                                <DashboardCardHeader title={<Typography variant="h7" component={'div'}>Sales Data</Typography>} />
                                <CardContent>
                                    <Typography color="text.secondary" style={{ fontSize: 'small' }}>
                                        Checker Sales - Checker Win
                                        <Typography variant="body2">
                                            ₹ {checkerSales} - ₹ {checkerWin}
                                        </Typography>
                                    </Typography>

                                    <Typography color="text.secondary" style={{ fontSize: 'small' }}>
                                        Shop Sales - Shop Win
                                        <Typography variant="body2">
                                            ₹ {shopSales} - ₹ {shopWin}
                                        </Typography>
                                    </Typography>
                                </CardContent>
                            </DashboardCard>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
                        <Box component={'div'} sx={{ width: '100%' }} display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' }}>
                            <DashboardCard>
                                <DashboardCardHeader title={<Typography variant="h7" component={'div'}>Videogame</Typography>} />
                                <CardContent>
                                    <Typography color="text.secondary" style={{ fontSize: 'small' }}>
                                        In - Out
                                        <Typography variant="body2">
                                            ₹ {videoGameIn} - ₹ {videoGameOut}
                                        </Typography>
                                    </Typography>
                                </CardContent>
                            </DashboardCard>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
                        <DashboardCard>
                            <DashboardCardHeader
                                title={<Typography variant="h7" component={'div'}>Status</Typography>}
                            />
                            <CardContent>
                                <Typography color="text.secondary" style={{ fontSize: 'small' }}>
                                    Submission Status {submissionStatus} <br />
                                    Submitted By {submittedBy} {submittedOn && submittedOn !== "0001-01-01T00:00:00" ? ' on ' + moment(submittedOn).format("YYYY-MM-DD") : ""}<br />
                                    Approved By {approvedBy} {approvedOn && approvedOn !== "0001-01-01T00:00:00" ? ' on ' + moment(approvedOn).format("YYYY-MM-DD") : ""}
                                </Typography>
                            </CardContent>
                        </DashboardCard>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
                        <DashboardCard>
                            <DashboardCardHeader title={<Typography variant="h7" component={'div'}>Select Another Date</Typography>} />
                            <CardContent>
                                <IconButton aria-label="Prev Day">
                                    <KeyboardDoubleArrowLeftIcon />
                                </IconButton>
                                <Button startIcon={<PaymentIcon />} variant="contained" size="small" color="primary" onClick={handleOpenAccountDialog}>Manage Account...</Button>
                                <IconButton aria-label="Next Day">
                                    <KeyboardDoubleArrowRightIcon />
                                </IconButton>
                            </CardContent>
                        </DashboardCard>
                    </Grid>
                </>}
                <Grid item xs={12} md={12} lg={12}>
                    {accountHeadData &&
                        <AccountHeads
                            onApproval={updateOnApproval}
                            data={accountHeadData}
                            showAlert={showAlertToUser}
                        />
                    }
                </Grid>
            </Grid >
            <Dialog open={accountDialogOpen} onClose={handleCloseAccountDialog} >
                <DialogTitle>Manage Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select Shop and Date to check out EOD data
                    </DialogContentText>
                    <Toolbar variant='dense'
                        width='100%'
                        style={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Select Account Date"
                                    value={dayjs(accountShopAccDate)}
                                    onChange={(newValue) => updateShopDate(newValue)}
                                    slotProps={{ textField: { size: 'small', width: 200 } }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormControl sx={{ m: 2, width: 200, fontSize: 'small' }} size="small" style={{ marginTop: '30px', fontSize: 'small' }}>
                            <InputLabel id="demo-simple-select-helper-label">Select Shop</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Select Shop"
                                value={accountShopID || ''}
                                onChange={handleAccountShopChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {shopList && shopList.map((shop) => {
                                    return (<MenuItem value={shop.shopID}>{shop.shopCode} - {shop.shopName}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>

                    </Toolbar>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="info" onClick={handleCloseAccountDialog}>Cancel</Button>
                    <Button variant="contained" color="secondary" onClick={handleShowAccountDialog}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box >
    )


};
export default ShopAccountManager;