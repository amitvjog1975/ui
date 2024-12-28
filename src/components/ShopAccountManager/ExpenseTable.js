import React, { useContext, useEffect, useState } from "react";
import { TextField, Autocomplete, Button, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Divider, LinearProgress, IconButton } from "@mui/material";
import { accountService } from "../../services";
import Grid from '@mui/material/Grid2';
import UserContext from "../../shared/UserContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import BaseCard from "../../components/BaseCard";
import Helper from "../../common/Helper";
import ExpenseTable from "../../components/ShopAccountManager/ExpenseTable";
import AdvanceTable from "../../components/ShopAccountManager/AdvanceTable";
import ShopAttendanceTable from '../../components/ShopAccountManager/ShopAttendanceTable';
import Loader from "../../layouts/loader/Loader";
import NoData from "../../components/NoData";
import EODShopSnapShots from "../../components/ShopAccountManager/EODShopSnapShots";
import { AddCircleOutline } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import ExpenseForm from "../ExpenseForm";

const DayAccountEoD = () => {
    const { shopList, eodShopId, UpdateEodShopID, eodAccountDate, UpdateEodAccountDate, userData } = useContext(UserContext);
    const [machineNetReadingData, setMachineNetReadingData] = useState(null);
    const [saleWinData, setSaleWinData] = useState(null);
    const [shopAdvanceData, setShopAdvanceData] = useState(null);
    const [shopAttendanceData, setShopAttendanceData] = useState(null);
    const [shopExpenseData, setShopExpenseData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showData, setShowData] = useState(true);
    const [formState, setFormState] = useState({
        accountDate: { value: '', error: '' },
        addBy: { value: '', error: '' },
        addOn: { value: '', error: '' },
        additionalIncome: { value: '', error: '' },
        additionalIncomeNote: { value: '', error: '' },
        advanceAmount: { value: '', error: '' },
        approvalStatus: { value: '', error: '' },
        approvalStatusName: { value: '', error: '' },
        bankDeposit: { value: '', error: '' },
        ccReceiptAmount: { value: '', error: '' },
        closingAmount: { value: '', error: '' },
        creditAmount: { value: '', error: '' },
        dayAccID: { value: '', error: '' },
        deposit: { value: '', error: '' },
        dpAmount: { value: '', error: '' },
        duesAmount: { value: '', error: '' },
        eodDeposit: { value: '', error: '' },
        expenseAmount: { value: '', error: '' },
        gPayAmount: { value: '', error: '' },
        lotteryGoodluckAmount: { value: '', error: '' },
        modBy: { value: '', error: '' },
        modOn: { value: '', error: '' },
        nextDayOpenAmount: { value: '', error: '' },
        openingAmount: { value: '', error: '' },
        paytmAmount: { value: '', error: '' },
        physicalAmount: { value: '', error: '' },
        salesAmount: { value: '', error: '' },
        salesWinNetAmount: { value: '', error: '' },
        shopAddress: { value: '', error: '' },
        shopCode: { value: '', error: '' },
        shopID: { value: '', error: '' },
        shopName: { value: '', error: '' },
        shopRentAmount: { value: '', error: '' },
        soratAmount: { value: '', error: '' },
        tallyAmount: { value: '', error: '' },
        teaAmount: { value: '', error: '' },
        userID: { value: '', error: '' },
        videoGameAmount: { value: '', error: '' },
        videoGameGoodLuckAmount: { value: '', error: '' },
        winAmount: { value: '', error: '' },
        withdrawAmount: { value: '', error: '' },
        action: { value: '', error: '' }
    });
    const [expenseFormOpen, setExpenseFormOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const navigate = useNavigate();
    function BackToDashboard() {
        UpdateEodAccountDate(null);
        UpdateEodShopID(null);
    }


    const handleExpenseAddClick = () => {
        setSelectedExpense(null);
        setExpenseFormOpen(true);
    };

    const handleExpenseEditClick = (expense) => {
        setSelectedExpense(expense);
        setExpenseFormOpen(true);
    };

    const ExpenseActions = [
        <IconButton onClick={handleExpenseAddClick}> <AddCircleOutline /> </IconButton>
    ]

    useEffect(() => {
        if (eodShopId !== null && eodAccountDate !== null) {
            setIsLoading(true); // Show loader
            getShopEODDetails(eodShopId, dayjs(eodAccountDate).format("YYYY-MM-DD"));
        } else if (eodShopId == null && eodAccountDate == null) {
            navigate('/dashboard');
        }
    }, [eodShopId, eodAccountDate]);

    function isFormValid() {
        let _form = { ...formState };
        let isValid = true;
        let positivefields = ['additionalIncome', 'deposit', 'videoGameAmount', 'soratAmount', 'eodDeposit', 'withdrawAmount', 'bankDeposit', 'ccReceiptAmount', 'gPayAmount', 'lotteryGoodluckAmount', 'videoGameGoodLuckAmount', 'teaAmount']
        const regex = /^(0|[1-9]\d*)$/;

        if (_form) {
            if (_form.dayAccID.value == undefined || _form.dayAccID.value == '' || _form.dayAccID.value == 0) {
                isValid = false;
            }
            if (_form.closingAmount.value == '') {
                _form.closingAmount.error = 'Calculated cash @ EOD is required';
                isValid = false;
            }
            let addIncome = _form.additionalIncome.value;
            if ((addIncome = ! '' && addIncome > 0) && _form.additionalIncomeNote.value == '') {
                _form.additionalIncomeNote.error = 'Additional income note is required';
                isValid = false;
            }

            positivefields.forEach(field => {
                let _val = _form[field].value;
                if (regex.test(_val) || _val === '') {
                    _form[field].error = '';
                } else {
                    _form[field].error = field + ' must be positive number';
                    isValid = false;
                }
            });
        } else {
            isValid = false;
        }
        setFormState(_form);
        return isValid;

    }

    //const handleChange = (event, fieldName) => { setFormState({ ...formState, [fieldName]: { ...formState[fieldName], value: event.target.value, error: '' }, }); }

    const handleChange = (event) => {
        const { name, value } = event.target;
        let _form = { ...formState };
        _form[name].value = value;
        let positivefields = ['additionalIncome', 'deposit', 'videoGameAmount', 'soratAmount', 'eodDeposit', 'withdrawAmount', 'bankDeposit', 'ccReceiptAmount', 'gPayAmount', 'lotteryGoodluckAmount', 'videoGameGoodLuckAmount', 'teaAmount']
        const regex = /^(0|[1-9]\d*)$/;


        if (positivefields.includes(name))
            if (regex.test(value) || value === '') {
                _form[name].error = '';
            } else {
                _form[name].error = name + ' must be positive number';
            }
        setFormState(_form);

    }

    const handleFormAction = (action) => {
        if (isFormValid()) {
            let postData = {
                accountDate: formState.accountDate.value,
                additionalIncome: formState.additionalIncome.value,
                additionalIncomeNote: formState.additionalIncomeNote.value,
                advanceAmount: (formState.advanceAmount.value == undefined || formState.advanceAmount.value == '') ? 0 : formState.advanceAmount.value,
                bankDeposit: (formState.bankDeposit.value == undefined || formState.bankDeposit.value == '') ? 0 : formState.bankDeposit.value,
                ccReceiptAmount: (formState.ccReceiptAmount.value == undefined || formState.ccReceiptAmount.value == '') ? 0 : formState.ccReceiptAmount.value,
                closingAmount: (formState.closingAmount.value == undefined || formState.closingAmount.value == '') ? 0 : formState.closingAmount.value,
                creditAmount: (formState.creditAmount.value == undefined || formState.creditAmount.value == '') ? 0 : formState.creditAmount.value,
                dayAccID: (formState.dayAccID.value == undefined || formState.dayAccID.value == '') ? 0 : formState.dayAccID.value,
                deposit: (formState.deposit.value == undefined || formState.deposit.value == '') ? 0 : formState.deposit.value,
                dpAmount: (formState.dpAmount.value == undefined || formState.dpAmount.value == '') ? 0 : formState.dpAmount.value,
                duesAmount: (formState.duesAmount.value == undefined || formState.duesAmount.value == '') ? 0 : formState.duesAmount.value,
                eodDeposit: (formState.eodDeposit.value == undefined || formState.eodDeposit.value == '') ? 0 : formState.eodDeposit.value,
                expenseAmount: (formState.expenseAmount.value == undefined || formState.expenseAmount.value == '') ? 0 : formState.expenseAmount.value,
                gPayAmount: (formState.gPayAmount.value == undefined || formState.gPayAmount.value == '') ? 0 : formState.gPayAmount.value,
                lotteryGoodluckAmount: (formState.lotteryGoodluckAmount.value == undefined || formState.lotteryGoodluckAmount.value == '') ? 0 : formState.lotteryGoodluckAmount.value,
                nextDayOpenAmount: (formState.nextDayOpenAmount.value == undefined || formState.nextDayOpenAmount.value == '') ? 0 : formState.nextDayOpenAmount.value,
                openingAmount: (formState.openingAmount.value == undefined || formState.openingAmount.value == '') ? 0 : formState.openingAmount.value,
                paytmAmount: (formState.paytmAmount.value == undefined || formState.paytmAmount.value == '') ? 0 : formState.paytmAmount.value,
                physicalAmount: (formState.physicalAmount.value == undefined || formState.physicalAmount.value == '') ? 0 : formState.physicalAmount.value,
                salesAmount: (formState.salesAmount.value == undefined || formState.salesAmount.value == '') ? 0 : formState.salesAmount.value,
                salesWinNetAmount: (formState.salesWinNetAmount.value == undefined || formState.salesWinNetAmount.value == '') ? 0 : formState.salesWinNetAmount.value,
                shopID: (formState.shopID.value == undefined || formState.shopID.value == '') ? 0 : formState.shopID.value,
                shopRentAmount: (formState.shopRentAmount.value == undefined || formState.shopRentAmount.value == '') ? 0 : formState.shopRentAmount.value,
                soratAmount: (formState.soratAmount.value == undefined || formState.soratAmount.value == '') ? 0 : formState.soratAmount.value,
                tallyAmount: (formState.tallyAmount.value == undefined || formState.tallyAmount.value == '') ? 0 : formState.tallyAmount.value,
                teaAmount: (formState.teaAmount.value == undefined || formState.teaAmount.value == '') ? 0 : formState.teaAmount.value,
                userID: (formState.userID.value == undefined || formState.userID.value == '') ? 0 : formState.userID.value,
                videoGameAmount: (formState.videoGameAmount.value == undefined || formState.videoGameAmount.value == '') ? 0 : formState.videoGameAmount.value,
                videoGameGoodLuckAmount: (formState.videoGameGoodLuckAmount.value == undefined || formState.videoGameGoodLuckAmount.value == '') ? 0 : formState.videoGameGoodLuckAmount.value,
                winAmount: (formState.winAmount.value == undefined || formState.winAmount.value == '') ? 0 : formState.winAmount.value,
                withdrawAmount: (formState.withdrawAmount.value == undefined || formState.withdrawAmount.value == '') ? 0 : formState.withdrawAmount.value,
                action: action
            }
            accountService.submitAccountEODData(postData).then(result => {
                getShopEODData(eodShopId, dayjs(eodAccountDate).format("YYYY-MM-DD"));
            }).catch(error => {
                console(error);
            });
        }
    }

    const getShopEODData = (_shopID, _accountDate) => {
        let postData = { 'shopID': _shopID, 'accountDate': _accountDate }
        accountService.get_eod_data(postData).then(result => {
            var eodData = result.data;
            populateEODFormFields(eodData);
        })
    }


    const getShopEODDetails = (_shopID, _accountDate) => {
        let postData = { 'shopID': _shopID, 'accountDate': _accountDate }
        accountService.get_full_eod_data(postData).then(result => {
            if (result == null || result.data == null) {
                setIsLoading(false);
                setShowData(false);
            } else {
                setMachineNetReadingData(result.data.machineNetReadingData);
                setSaleWinData(result.data.saleWinData);
                setShopAdvanceData(result.data.shopAdvanceData);
                setShopAttendanceData(result.data.shopAttendanceData);
                setShopExpenseData(result.data.shopExpenseData);
                var eodData = result.data.eodData;
                populateEODFormFields(eodData);
                setIsLoading(false); // Hide loader            
            }
        }).catch(err => {
            console.log('Something went wrong');
            setIsLoading(false); // Hide loader
        });
    }

    const populateEODFormFields = (eodData) => {
        setShowData(eodData?.dayAccID == 0 ? false : true);
        setFormState({
            accountDate: { value: eodData.accountDate || '', error: '' },
            addBy: { value: eodData.addBy || '', error: '' },
            addOn: { value: eodData.addOn || '', error: '' },
            additionalIncome: { value: eodData.additionalIncome || '', error: '' },
            additionalIncomeNote: { value: eodData.additionalIncomeNote || '', error: '' },
            advanceAmount: { value: eodData.advanceAmount || '', error: '' },
            approvalStatus: { value: eodData.approvalStatus || '', error: '' },
            approvalStatusName: { value: eodData.approvalStatusName || '', error: '' },
            bankDeposit: { value: eodData.bankDeposit || '', error: '' },
            ccReceiptAmount: { value: eodData.ccReceiptAmount || '', error: '' },
            closingAmount: { value: eodData.closingAmount || '', error: '' },
            creditAmount: { value: eodData.creditAmount || '', error: '' },
            dayAccID: { value: eodData.dayAccID || '', error: '' },
            deposit: { value: eodData.deposit || '', error: '' },
            dpAmount: { value: eodData.dpAmount || '', error: '' },
            duesAmount: { value: eodData.duesAmount || '', error: '' },
            eodDeposit: { value: eodData.eodDeposit || '', error: '' },
            expenseAmount: { value: eodData.expenseAmount || '', error: '' },
            gPayAmount: { value: eodData.gPayAmount || '', error: '' },
            lotteryGoodluckAmount: { value: eodData.lotteryGoodluckAmount || '', error: '' },
            modBy: { value: eodData.modBy || '', error: '' },
            modOn: { value: eodData.modOn || '', error: '' },
            nextDayOpenAmount: { value: eodData.nextDayOpenAmount || '', error: '' },
            openingAmount: { value: eodData.openingAmount || '', error: '' },
            paytmAmount: { value: eodData.paytmAmount || '', error: '' },
            physicalAmount: { value: eodData.physicalAmount || '', error: '' },
            salesAmount: { value: eodData.salesAmount || '', error: '' },
            salesWinNetAmount: { value: eodData.salesWinNetAmount || '', error: '' },
            shopAddress: { value: eodData.shopAddress || '', error: '' },
            shopCode: { value: eodData.shopCode || '', error: '' },
            shopID: { value: eodData.shopID || '', error: '' },
            shopName: { value: eodData.shopName || '', error: '' },
            shopRentAmount: { value: eodData.shopRentAmount || '', error: '' },
            soratAmount: { value: eodData.soratAmount || '', error: '' },
            tallyAmount: { value: eodData.tallyAmount || '', error: '' },
            teaAmount: { value: eodData.teaAmount || '', error: '' },
            userID: { value: eodData.userID || '', error: '' },
            videoGameAmount: { value: eodData.videoGameAmount || '', error: '' },
            videoGameGoodLuckAmount: { value: eodData.videoGameGoodLuckAmount || '', error: '' },
            winAmount: { value: eodData.winAmount || '', error: '' },
            withdrawAmount: { value: eodData.withdrawAmount || '', error: '' },
            action: { value: '', error: '' }
        });
    }

    return (
        <>
            {isLoading ?
                <Loader /> :
                <>
                    <h3>Manage Shop Account</h3>
                    <hr />
                    <Grid container>
                        <Grid size={12} sx={{ marginLeft: 'auto', display: 'flex', alignContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Account Date"
                                    value={eodAccountDate ? dayjs(eodAccountDate) : null}
                                    onChange={(newValue) => UpdateEodAccountDate(newValue)}
                                    disableFuture
                                    sx={{ maxWidth: 200, margin: 1, '.MuiInputBase-input': { padding: '8px 12px' } }}
                                    renderInput={(params) => <TextField {...params} size="small" sx={{ '.MuiOutlinedInput-root': { height: '36px' } }} />} />
                            </LocalizationProvider>
                            <Autocomplete
                                options={shopList || []}
                                value={shopList ? shopList.filter(shop => shop.shopID == eodShopId)[0] : null}
                                getOptionLabel={(option) => `${option.shopCode} - ${option.shopName}`}
                                sx={{ width: 300, display: 'flex', justifyContent: 'center' }}
                                loading={!shopList}
                                renderInput={(params) => <TextField {...params} label="Shop" size="small" />}
                                onChange={(event, newValue) => {
                                    UpdateEodShopID(newValue.shopID);
                                }}
                            />
                        </Grid>
                    </Grid>
                    {showData ?
                        <Grid container spacing={1}>
                            {/* First Column: Grid/Table Section */}
                            <Grid size={{ md: 6, lg: 8, xs: 12 }}>
                                <Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
                                    <Grid size={{ md: 4, lg: 4, sm: 6, xs: 12 }}>
                                        <BaseCard title="Machine Reading Data" headerBGColor='#f5f5f5' actions={ExpenseActions}>
                                            <>
                                                <Typography sx={{ fontSize: '12px' }}>In Reading: {machineNetReadingData?.netInReading}</Typography>
                                                <Typography sx={{ fontSize: '12px' }}>Out Reading: {machineNetReadingData?.netOutReading}</Typography>
                                            </>
                                        </BaseCard>
                                    </Grid>
                                    <Grid size={{ md: 4, lg: 4, sm: 6, xs: 12 }}>
                                        <BaseCard title="Checker Sale Win Data" headerBGColor='#f5f5f5'>
                                            <Typography sx={{ fontSize: '12px' }}>Checker Sales: {saleWinData?.checkerSales}</Typography>
                                            <Typography sx={{ fontSize: '12px' }}>Checker Win: {saleWinData?.checkerWin}</Typography>
                                        </BaseCard>
                                    </Grid>
                                    <Grid size={{ md: 4, lg: 4, sm: 6, xs: 12 }}>
                                        <BaseCard title="Shop Sale Win Data" headerBGColor='#f5f5f5'>
                                            <Typography sx={{ fontSize: '12px' }}>Shop Sales: {formState.salesAmount?.value}</Typography>
                                            <Typography sx={{ fontSize: '12px' }}>Shop Win: {formState.winAmount?.value}</Typography>
                                        </BaseCard>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} sx={{ marginTop: 2, marginBottom: 1 }}>
                                    <Grid size={{ sm: 6, lg: 4, md: 6, xs: 12 }}>
                                        <BaseCard title="Daily expenditure" headerBGColor='#bbdefb' actions={ExpenseActions}>
                                            <TableContainer>
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>ID</TableCell>
                                                            <TableCell>Amount</TableCell>
                                                            <TableCell>Date</TableCell>
                                                            <TableCell>Reason</TableCell>
                                                            <TableCell>Action</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {shopExpenseData?.map((expense) => (
                                                            <TableRow key={expense.expenseID}>
                                                                <TableCell>{expense.expenseID}</TableCell>
                                                                <TableCell>{expense.expenseAmount}</TableCell>
                                                                <TableCell>{expense.expenseDate}</TableCell>
                                                                <TableCell>{expense.expenseReason}</TableCell>
                                                                <TableCell>
                                                                    <IconButton onClick={() => handleExpenseEditClick(expense)}>
                                                                        <Edit />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </BaseCard>
                                    </Grid>
                                    <Grid size={{ sm: 6, lg: 4, md: 6, xs: 12 }}>
                                        <BaseCard title="Advance payments" headerBGColor='#bbdefb' actions={ExpenseActions}>
                                            <AdvanceTable data={shopAdvanceData} />
                                        </BaseCard>
                                    </Grid>
                                    <Grid size={{ sm: 6, lg: 4, md: 6, xs: 12 }}>
                                        <BaseCard title="Attendance" headerBGColor='#bbdefb' actions={ExpenseActions}>
                                            <ShopAttendanceTable data={shopAttendanceData} />
                                        </BaseCard>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid size={{ md: 6, lg: 4, xs: 12 }} sx={{ marginTop: 1 }}>
                                <BaseCard title="EOD Account" headerBGColor='#ff6f61' titleColor='#ffffff'>
                                    <Paper elevation={2} sx={{ padding: 1 }}>
                                        <Grid container spacing={1} sx={{ marginTop: 1 }}>
                                            <Grid size={{ md: 6, lg: 6, xs: 12 }}>
                                                <Typography variant="h7">Credits (+)</Typography>
                                                <hr />
                                                <TextField variant="outlined" size="small" label="Opening Amount (₹)" sx={{ marginBottom: 1 }}
                                                    disabled
                                                    type="number"
                                                    name="openingAmount"
                                                    value={formState.openingAmount?.value}
                                                    onChange={handleChange}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Sales- Winning (₹)" sx={{ marginBottom: 1 }}
                                                    disabled
                                                    type="number"
                                                    onChange={handleChange}
                                                    name="salesWinNetAmount"
                                                    value={formState.salesWinNetAmount?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Deposit (₹)" sx={{ marginBottom: 1 }}
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="deposit"
                                                    value={formState.deposit?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Additional Income (₹)" sx={{ marginBottom: 1 }}
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="additionalIncome"
                                                    value={formState.additionalIncome?.value}
                                                    error={formState.additionalIncome?.error}
                                                    helperText={formState.additionalIncome?.error}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Additional Income Note" sx={{ marginBottom: 1 }}
                                                    onChange={handleChange}
                                                    name="additionalIncomeNote"
                                                    type="text"
                                                    value={formState.additionalIncomeNote?.value}
                                                    error={formState.additionalIncomeNote?.error}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Videogame Amount (₹)" sx={{ marginBottom: 1 }}
                                                    disabled
                                                    type="number"
                                                    onChange={handleChange}
                                                    name="videoGameAmount"
                                                    value={formState.videoGameAmount?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Sorat (₹)" sx={{ marginBottom: 1 }}
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="soratAmount"
                                                    value={formState.soratAmount?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Dues Collected (₹)" sx={{ marginBottom: 1 }}
                                                    disabled
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="duesAmount"
                                                    value={formState.duesAmount?.value}
                                                    fullWidth />

                                            </Grid>
                                            {/* Second Inner Column */}
                                            <Grid size={{ md: 6, lg: 6, xs: 12 }}>
                                                <Typography variant="h7">Debits (-)</Typography>
                                                <hr />
                                                <TextField variant="outlined" size="small" label="Bank Deposit (₹)" sx={{ marginBottom: 1 }}
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="bankDeposit"
                                                    value={formState.bankDeposit?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="उधारी दिया. (₹)" sx={{ marginBottom: 1 }}
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="creditGiven"
                                                    disabled
                                                    value={formState.creditGiven?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Credit card payments (₹)" sx={{ marginBottom: 1 }}
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="ccReceiptAmount"
                                                    value={formState.ccReceiptAmount?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Google Pay (₹)" sx={{ marginBottom: 1 }}
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="gPayAmount"
                                                    value={formState.gPayAmount?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="DP Amount (₹)" sx={{ marginBottom: 1 }}
                                                    onChange={handleChange}
                                                    type="number"
                                                    disabled
                                                    name="dpAmount"
                                                    value={formState.dpAmount?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Expenses (₹)" sx={{ marginBottom: 1 }}
                                                    disabled
                                                    name="expenseAmount"
                                                    type="number"
                                                    onChange={handleChange}
                                                    value={formState.expenseAmount?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Advances (₹)" sx={{ marginBottom: 1 }}
                                                    disabled
                                                    type="number"
                                                    name="advanceAmount"
                                                    onChange={handleChange}
                                                    value={formState.advanceAmount?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Lottery Goodluck (₹)" sx={{ marginBottom: 1 }}
                                                    type="number"
                                                    onChange={handleChange}
                                                    name="lotteryGoodluckAmount"
                                                    value={formState.lotteryGoodluckAmount?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Videogame Goodluck (₹)" sx={{ marginBottom: 1 }}
                                                    type="number"
                                                    onChange={handleChange}
                                                    name="videoGameGoodLuckAmount"
                                                    value={formState.videoGameGoodLuckAmount?.value}
                                                    fullWidth />
                                                <TextField variant="outlined" size="small" label="Tea (₹)" sx={{ marginBottom: 1 }}
                                                    type="number"
                                                    onChange={handleChange}
                                                    name="teaAmount"
                                                    value={formState.teaAmount?.value}
                                                    fullWidth />
                                            </Grid>
                                        </Grid>
                                        <hr />
                                        <Grid container spacing={1} sx={{ margin: 1 }}>
                                            <Grid size={{ md: 6, lg: 6, xs: 12 }}>
                                                <TextField variant="outlined" size="small" label="Calculated cash @ EOD (₹)" sx={{ marginBottom: 1 }}
                                                    type="number"
                                                    disabled
                                                    onChange={handleChange}
                                                    name="closingAmount"
                                                    value={formState.closingAmount?.value}
                                                    fullWidth />
                                            </Grid>
                                            <Grid size={{ md: 6, lg: 6, xs: 12 }}>
                                                <TextField variant="outlined" size="small" label="Physical cash @ EOD (₹)" sx={{ marginBottom: 1 }}
                                                    disabled
                                                    type="number"
                                                    onChange={handleChange}
                                                    name="physicalAmount"
                                                    value={formState.physicalAmount?.value}
                                                    fullWidth />
                                            </Grid>
                                        </Grid>
                                        <hr />
                                        <Grid container spacing={1} sx={{ margin: 1 }}>
                                            <Grid size={{ md: 6, lg: 6, xs: 12 }}>
                                                <TextField variant="outlined" size="small" label="Shortage/ Excess @ EOD (₹)" sx={{ marginBottom: 1 }}
                                                    disabled
                                                    type="number"
                                                    onChange={handleChange}
                                                    name="tallyAmount"
                                                    value={formState.tallyAmount?.value}
                                                    fullWidth />
                                            </Grid>
                                            <Grid size={{ md: 6, lg: 6, xs: 12 }}>
                                                <TextField variant="outlined" size="small" label="Withdrawal @ EOD (₹)" sx={{ marginBottom: 1 }}
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="withdrawAmount"
                                                    value={formState.withdrawAmount?.value}
                                                    fullWidth />
                                            </Grid>
                                        </Grid>
                                        <hr />
                                        <Grid container spacing={1} sx={{ margin: 1 }}>
                                            <Grid size={{ md: 6, lg: 6, xs: 12 }}>
                                                <TextField variant="outlined" size="small" label="EOD Deposit amt. (₹)" sx={{ marginBottom: 1 }}
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="eodDeposit"
                                                    value={formState.eodDeposit?.value}
                                                    fullWidth />
                                            </Grid>
                                            <Grid size={{ md: 6, lg: 6, xs: 12 }}>
                                                <TextField variant="outlined" size="small" label="Next day Opening amount (₹)" sx={{ marginBottom: 1 }}
                                                    disabled
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="nextDayOpenAmount"
                                                    value={formState.nextDayOpenAmount?.value}
                                                    fullWidth />
                                            </Grid>
                                        </Grid>
                                        <Box sx={{ width: '100%', display: 'flex', flexGrow: 1, flexWrap: 'nowrap', justifyContent: 'end', paddingRight: 1, paddingBottom: 1 }}>
                                            <Button variant="contained" onClick={() => BackToDashboard()} color="#cccccc" sx={{ margin: 1, }}> Cancel </Button>
                                            {(formState.approvalStatus.value == '' || formState.approvalStatus.value == '0') &&
                                                <>
                                                    <Button variant="contained" onClick={() => handleFormAction('save')} color="primary" sx={{ margin: 1 }}> Save </Button>
                                                    <Button variant="contained" onClick={() => handleFormAction('submit')} color="secondary" sx={{ margin: 1 }}> Submit </Button>
                                                </>
                                            }
                                            {formState.approvalStatus.value == '1' &&
                                                <>
                                                    <Button variant="contained" onClick={() => handleFormAction('save')} color="primary" sx={{ margin: 1 }}> Save </Button>
                                                    <Button variant="contained" onClick={() => handleFormAction('approve')} color="primary" sx={{ margin: 1 }}> Approve </Button>
                                                </>
                                            }
                                        </Box>
                                    </Paper>
                                </BaseCard>
                            </Grid>
                        </Grid >
                        :
                        <NoData linkHref="/dashboard" linkText="Go to Dashboard" />
                    }
                    <ExpenseForm
                        open={expenseFormOpen}
                        onClose={() => setExpenseFormOpen(false)}
                        expense={selectedExpense}
                        onSave={(updatedExpense) => {
                            // Handle saving the expense here
                            console.log(updatedExpense);
                            setExpenseFormOpen(false);
                        }}
                    />
                </>
            }
        </>
    )


};
export default DayAccountEoD;

