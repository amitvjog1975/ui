import { Visibility } from '@mui/icons-material'
import { Card, CardActionArea, CardContent, CardHeader, TextField, Typography, InputAdornment, Icon, InputLabel, OutlinedInput, IconButton, FormControl, Box, Paper, Grid, Divider, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

const AccountHeads = (props) => {
    const [shopID, setShopID] = useState(0);
    const [shopAccDate, setShopAccDate] = useState(null);
    const [openAmount, setOpenAmount] = useState(0);
    const [salesWin, setSalesWin] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);
    const [additionalIncomeTitle, setAdditionalIncomeTitle] = useState('');
    const [additionalIncomeAmount, setAdditionalIncomeAmount] = useState(0);
    const [videoGameAmount, setVideoGameAmount] = useState(0);
    const [soratAmount, setSoratAmount] = useState(0);
    const [duesCollectedAmount, setDuesCollectedAmount] = useState(0);
    const [bankDepositAmount, setBankDepositAmount] = useState(0);
    const [creditGivenAmount, setCreditGivenAmount] = useState(0);
    const [creditCardAmount, setCreditCardAmount] = useState(0);
    const [paytmPaymentAmount, setPaytmPaymentAmount] = useState(0);
    const [gPayPaymentAmount, setGPayPaymentAmount] = useState(0);
    const [dpAmount, setDPAmount] = useState(0);
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [advanceAmount, setAdvanceAmount] = useState(0);
    const [eodCashAmount, setEODCashAmount] = useState(0);
    const [physicalCashAmount, setPhysicalCashAmount] = useState(0);
    const [diffAmount, setDiffAmount] = useState(0);
    const [withdrawalAmount, setWithdrawalAmount] = useState(0);
    const [eodDepositAmount, setEODDepositAmount] = useState(0);
    const [nextDayOpeningAmount, setNextDayOpeningAmount] = useState(0);

    const [accountHeadData, setAccountHeadData] = useState(null);

    function validateEODData() {
        if (openAmount > 0 && eodCashAmount > 0 && physicalCashAmount > 0 && nextDayOpeningAmount > 0) {
            return true;
        } else {
            return false;
        }
    }

    const updateEODAccount = () => {
        let isValid = validateEODData();
        if (isValid) {
            let _postData = {
                shopID: shopID,
                shopAccDate: shopAccDate,
                openAmount: openAmount,
                salesWin: salesWin,
                depositAmount: depositAmount,
                additionalIncomeTitle: additionalIncomeTitle,
                additionalIncomeAmount: additionalIncomeAmount,
                videoGameAmount: videoGameAmount,
                soratAmount: soratAmount,
                duesCollectedAmount: duesCollectedAmount,
                bankDepositAmount: bankDepositAmount,
                creditGivenAmount: creditGivenAmount,
                creditCardAmount: creditCardAmount,
                paytmPaymentAmount: paytmPaymentAmount,
                gPayPaymentAmount: gPayPaymentAmount,
                dpAmount: dpAmount,
                expenseAmount: expenseAmount,
                advanceAmount: advanceAmount,
                eodCashAmount: eodCashAmount,
                physicalCashAmount: physicalCashAmount,
                diffAmount: diffAmount,
                withdrawalAmount: withdrawalAmount,
                eodDepositAmount: eodDepositAmount,
                nextDayOpeningAmount: nextDayOpeningAmount
            }

            props.updateOnApproval(_postData)
        } else {
            let _alert = {
                show: true,
                severity: 'error',
                color: 'error',
                message: 'Please enter all manadatory fields'
            }
            props.showAlert(_alert);
        }
    }


    useEffect(() => {
        if (accountHeadData) {
            setOpenAmount(accountHeadData.openAmount);
            setSalesWin(accountHeadData.netAmount);
            setDepositAmount(accountHeadData.depositAmount);
            setAdditionalIncomeTitle(accountHeadData.additionalIncomeTitle);
            setAdditionalIncomeAmount(accountHeadData.additionalIncomeAmount);
            setVideoGameAmount(accountHeadData.videoGameAmount);
            setSoratAmount(accountHeadData.soratAmount);
            setDuesCollectedAmount(accountHeadData.duesCollectedAmount);
            setBankDepositAmount(accountHeadData.bankDepositAmount);
            setCreditGivenAmount(accountHeadData.creditGivenAmount);
            setCreditCardAmount(accountHeadData.creditCardAmount);
            setPaytmPaymentAmount(accountHeadData.paytmPaymentAmount);
            setGPayPaymentAmount(accountHeadData.gPayPaymentAmount);
            setDPAmount(accountHeadData.dpAmount);
            setExpenseAmount(accountHeadData.expenseAmount);
            setAdvanceAmount(accountHeadData.advanceAmount);
            setEODCashAmount(accountHeadData.eodCashAmount);
            setPhysicalCashAmount(accountHeadData.physicalCashAmount);
            setDiffAmount(accountHeadData.tallyAmount);
            setWithdrawalAmount(accountHeadData.withdrawalAmount);
            setEODDepositAmount(accountHeadData.eodDepositAmount);
            setNextDayOpeningAmount(accountHeadData.nextDayOpeningAmount);
        }
    }, [accountHeadData])

    useEffect(() => {
        setAccountHeadData(props.data);
    }, [props]);

    return (
        <>
            {accountHeadData ?
                <Grid container>
                    <Grid item xs={12} md={4} lg={4} >
                        <Card elevation={0}>
                            <CardHeader
                                title="Cash In"
                            />
                            <CardContent>
                                <Paper elevation={6} component={'div'} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', paddingTop: '10px' }}>
                                    <TextField
                                        label="Opening Amount"
                                        id="openingAmount"
                                        color="success"
                                        focused
                                        type='number'
                                        variant='outlined'
                                        size='small'
                                        value={openAmount}
                                        onChange={(e) => setOpenAmount(e.target.value)}
                                        sx={{ m: 1 }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Opening amount"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="Sales - Win"
                                        id="salesWin"
                                        color="success"
                                        focused
                                        type='number'
                                        value={salesWin}
                                        onChange={(e) => setSalesWin(e.target.value)}
                                        variant='outlined'
                                        size='small'
                                        sx={{ m: 1 }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Sales - Win"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="Deposit Amount"
                                        id="depositAmount"
                                        color="success"
                                        focused
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        size='small'
                                        value={depositAmount}
                                        onChange={(e) => setDepositAmount(e.target.value)}
                                        type='number'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Deposit amount"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <Box style={{ display: 'flex' }}>
                                        <TextField
                                            label="Additional Income Title"
                                            id="addnlIncomeTitle"
                                            color="success"
                                            size='small'
                                            focused
                                            type='text'
                                            value={additionalIncomeTitle}
                                            onChange={(e) => setAdditionalIncomeTitle(e.target.value)}
                                            sx={{ m: 1 }}
                                            variant='outlined'
                                        />
                                        <TextField
                                            label="Additional Income Amount"
                                            id="addnlIncomeAmount"
                                            color="success"
                                            size='small'
                                            focused
                                            sx={{ m: 1 }}
                                            type='number'
                                            value={additionalIncomeAmount}
                                            onChange={(e) => setAdditionalIncomeAmount(e.target.value)}
                                            variant='outlined'
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end"><IconButton
                                                    aria-label="Additional Income Amount"
                                                    edge="end"
                                                >
                                                    {<Visibility />}
                                                </IconButton></InputAdornment>
                                            }}
                                        />
                                    </Box>
                                    <TextField
                                        label="Video Game"
                                        id="videoGame"
                                        color="success"
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        size='small'
                                        value={videoGameAmount}
                                        onChange={(e) => setVideoGameAmount(e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Video Game"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="Sorat"
                                        id="sorat"
                                        color="success"
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        value={soratAmount}
                                        onChange={(e) => setSoratAmount(e.target.value)}
                                        size='small'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Sorat"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="Dues Collected (उधारी जमा)"
                                        id="DuesCollected"
                                        color='success'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        value={duesCollectedAmount}
                                        onChange={(e) => setDuesCollectedAmount(e.target.value)}
                                        size='small'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Dues Collected"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                </Paper>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} >
                        <Card elevation={0}>
                            <CardHeader
                                title="Cash Out"
                            />
                            <CardContent>
                                <Paper elevation={6} component={'div'} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', paddingTop: '10px' }}>
                                    <TextField
                                        label="Bank Deposit"
                                        id="bankDeposit"
                                        color='error'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        value={bankDepositAmount}
                                        onChange={(e) => setBankDepositAmount(e.target.value)}
                                        size='small'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Bank Deposit"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="Credits given (उधारी दिया)"
                                        id="creditsGiven"
                                        color='error'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        value={creditGivenAmount}
                                        onChange={(e) => setCreditGivenAmount(e.target.value)}
                                        size='small'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Credits given"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />

                                    <TextField
                                        label="Credit card payments"
                                        id="ccPayment"
                                        color='error'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        size='small'
                                        value={creditCardAmount}
                                        onChange={(e) => setCreditCardAmount(e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Credit card payments"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="Paytm payments"
                                        id="paytmPayment"
                                        color='error'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        size='small'
                                        value={paytmPaymentAmount}
                                        onChange={(e) => setPaytmPaymentAmount(e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Paytm payments"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="Google pay"
                                        id="gPay"
                                        color='error'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        size='small'
                                        value={gPayPaymentAmount}
                                        onChange={(e) => setGPayPaymentAmount(e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Google pay"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="DP Amount"
                                        id="dpAmount"
                                        color='error'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        size='small'
                                        value={dpAmount}
                                        onChange={(e) => setDPAmount(e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="DP Amount"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="Expenses"
                                        id="expenses"
                                        color='error'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        size='small'
                                        value={expenseAmount}
                                        onChange={(e) => setExpenseAmount(e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Expenses"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="Advances"
                                        id="advances"
                                        color='error'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        size='small'
                                        value={advanceAmount}
                                        onChange={(e) => setAdvanceAmount(e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Advances"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                </Paper>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} >
                        <Card elevation={0}>
                            <CardHeader
                                title="Calculations"
                            />
                            <CardContent>
                                <Paper elevation={6} component={'div'} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', paddingTop: '10px' }}>
                                    <TextField
                                        label="Calculated cash @ EOD"
                                        id="eodCash"
                                        color='info'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        value={eodCashAmount}
                                        onChange={(e) => setEODCashAmount(e.target.value)}
                                        size='small'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Calculated cash @ EOD"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="Physical cash @ EOD"
                                        id="physicalEODCash"
                                        color='info'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        value={physicalCashAmount}
                                        onChange={(e) => setPhysicalCashAmount(e.target.value)}
                                        size='small'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Physical cash @ EOD"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                </Paper>

                                <Paper elevation={6} component={'div'} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', paddingTop: '10px' }}>
                                    <TextField
                                        label="Shortage/ Excess @ EOD"
                                        id="diffEOD"
                                        color='info'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        size='small'
                                        value={diffAmount}
                                        onChange={(e) => setDiffAmount(e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Shortage/ Excess @ EOD"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="Withdrawal @ EOD"
                                        id="withdrawalEOD"
                                        color='info'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        value={withdrawalAmount}
                                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                                        size='small'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="Withdrawal @ EOD"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                    <TextField
                                        label="EOD Deposit"
                                        id="eodDeposit"
                                        color='success'
                                        focused
                                        type='number'
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        value={eodDepositAmount}
                                        onChange={(e) => setEODDepositAmount(e.target.value)}
                                        size='small'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><IconButton
                                                aria-label="EOD Deposit"
                                                edge="end"
                                            >
                                                {<Visibility />}
                                            </IconButton></InputAdornment>
                                        }}
                                    />
                                </Paper>
                                <Paper elevation={6} component={'div'} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', paddingTop: '10px' }}>
                                    <TextField
                                        label="Next Day Opening Amount"
                                        id="nextDayOpeningAmount"
                                        color='success'
                                        focused
                                        type='number'
                                        value={nextDayOpeningAmount}
                                        onChange={(e) => setNextDayOpeningAmount(e.target.value)}
                                        disabled
                                        sx={{ m: 1 }}
                                        variant='outlined'
                                        size='small'
                                    />
                                </Paper>
                                <Paper elevation={0} component={'div'} style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', paddingTop: '10px', justifyContent: 'space-around' }}>
                                    <Button variant="contained" color='success' size='small' style={{ margin: '2px' }} onClick={updateEODAccount}>Approve</Button>
                                    <Button variant="contained" color='primary' size='small' style={{ margin: '2px' }}>Submit</Button>
                                </Paper>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid >
                :
                <Grid container>
                    <Grid item md={12} >
                        <Typography variant='subtitle2'>No Data Found</Typography>
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default AccountHeads