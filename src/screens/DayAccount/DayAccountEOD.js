import React, { useContext, useEffect, useState } from "react";
import { TextField, Autocomplete, Button, Chip, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Divider, LinearProgress, IconButton, InputAdornment } from "@mui/material";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { accountService } from "../../services";
import Grid from '@mui/material/Grid2';
import UserContext from "../../shared/UserContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import BaseCard from "../../components/BaseCard";
import Helper from "../../common/Helper";
import ExpenseTable from "./ExpenseTable";
import AdvanceTable from "./AdvanceTable";
import ShopAttendanceTable from './ShopAttendanceTable';
import Loader from "../../layouts/loader/Loader";
import NoData from "../../components/NoData";
import EODShopSnapShots from "./EODShopSnapShots";
import { AddCircleOutline, Delete, Edit, Grid3x3Outlined, MoreHoriz, Search } from "@mui/icons-material";
import { Pagination } from '@mui/material';
import ExpenseForm from "./ExpenseForm";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import AdvanceForm from "./AdvanceForm";
import DPTransactionTable from "./DPTransactionTable";
import DPForm from "./DPForm";
import './DayAccountEOD.css';
import DenominationDialog from "./DenominationDialog";

const DayAccountEoD = () => {
    const { shopList, userData } = useContext(UserContext);
    const { eodShopID, eodAccountDate } = useParams();
    const [machineNetReadingData, setMachineNetReadingData] = useState(null);
    const [saleWinData, setSaleWinData] = useState(null);
    const [shopAdvanceData, setShopAdvanceData] = useState(null);
    const [shopAttendanceData, setShopAttendanceData] = useState(null);
    const [shopExpenseData, setShopExpenseData] = useState(null);
    const [shopDPTransactionData, setShopDPTransactionData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showData, setShowData] = useState(true);
    const [shopID, setShopID] = useState(eodShopID);
    const [accountDate, setAccountDate] = useState(eodAccountDate);
    const [empMasterList, setEmpMasterList] = useState([]);
    const [dpPersonList, setDpPersonList] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedCard, setSelectedCard] = useState('machineReading');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [denominationDialogOpen, setDenominationDialogOpen] = useState(false);
    const [denominations, setDenominations] = useState({});



    const [formState, setFormState] = useState({
        accountDate: { value: '', error: '' },
        addBy: { value: '', error: '' },
        addOn: { value: '', error: '' },
        additionalIncome: { value: '', error: '' },
        additionalIncomeNote: { value: '', error: '' },
        advanceAmount: { value: '', error: '' },
        status: { value: '', error: '' },
        statusName: { value: '', error: '' },
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
        action: { value: '', error: '' },
        submitedBy: { value: '', error: '' },
        approvedby: { value: '', error: '' },
        submitedOn: { value: '', error: '' },
        approvedOn: { value: '', error: '' },
    });
    const navigate = useNavigate();
    const location = useLocation();

    const [page, setPage] = useState(1);
    const [expenseFormOpen, setExpenseFormOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [selectedDPTransaction, setSelectedDPTransaction] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [dpFormOpen, setDPFormOpen] = useState(false);

    const [advanceFormOpen, setAdvanceFormOpen] = useState(false);
    const [selectedAdvance, setSelectedAdvance] = useState(null);
    const [deleteAdvanceDialogOpen, setDeleteAdvanceDialogOpen] = useState(false);
    const [deleteDialogMessage, setDeleteDialogMessage] = useState("");
    const [deleteDialogConfirmAction, setDeleteDialogConfirmAction] = useState(() => { });
    const [deleteType, setDeleteType] = useState(null);

    const updateURL = (newShopID, newAccountDate) => {
        navigate(`/day-account-eod/${newShopID}/${Helper.FormatDate(newAccountDate, 'YYYY-MM-DD')}`);
    };

    function BackToDashboard() {
        setAccountDate(null);
        setShopID(null);
    }

    const handlePhysicalAmountClick = () => {
        setDenominationDialogOpen(true);
    };

    const handleDenominationSave = (total, denominations) => {
        setDenominationDialogOpen(false);
        setDenominations(denominations);
        // Update the physicalAmount field with the total
        // Save the total to the database
        // Assuming you have a function to update the database
        accountService.updatePhysicalAmount(shopID, accountDate, total).then(() => {
            // Update the state with the new total
            setFormState((prevState) => ({
                ...prevState,
                physicalAmount: { value: total, error: '' },
            }));
        });
    };

    //#region Expense handling
    const handleExpenseAddClick = () => {
        let _shop = shopList?.filter(shop => shop.shopID == eodShopID)[0]
        setSelectedExpense({
            expenseID: 0,
            expenseAmount: 0,
            expenseDate: dayjs(accountDate).format("YYYY-MM-DD"),
            expenseReason: '',
            shopID: shopID,
            shopName: _shop.shopCode + ' - ' + _shop.shopName,
            userID: 0
        }
        );
        setExpenseFormOpen(true);
    };

    const handleExpenseEditClick = (expense) => {
        setSelectedExpense(expense);
        setExpenseFormOpen(true);
    };

    const handleExpenseDeleteClick = (expense) => {
        setSelectedExpense(expense);
        setDeleteType('expense');
        setDeleteDialogOpen(true);
    };

    const ExpenseAddAction = [
        <IconButton onClick={handleExpenseAddClick}> <AddCircleOutline /> </IconButton>
    ]

    const handleDPAddClick = () => {
        let _shop = shopList?.filter(shop => shop.shopID == eodShopID)[0]
        setSelectedDPTransaction({
            dpTrnID: 0,
            dpUserID: 0,
            dpDate: dayjs(accountDate).format("YYYY-MM-DD"),
            dpDisplayName: '',
            shopID: shopID,
            dpAmount: 0
        }
        );
        setDPFormOpen(true);
    };
    const handleDPEditClick = (dpTransaction) => {
        handleSearchPerson(dpTransaction.dpDisplayName);
        setSelectedDPTransaction(dpTransaction);
        setDPFormOpen(true);
    };

    const handleDPDeleteClick = (dpTransaction) => {
        setSelectedDPTransaction(dpTransaction);
        setDeleteType('dp entry');
        setDeleteDialogOpen(true);
    };
    const handleSearchPerson = (searchText) => {
        let _postData = { 'searchText': searchText }
        accountService.search_dp_persons(_postData).then(result => {
            setDpPersonList(result.data);
        }).catch(err => {
            console.log("some error");
        });
    };

    const DPAddAction = [
        <IconButton onClick={handleDPAddClick} ><AddCircleOutline /> </IconButton>
    ]

    const AttendanceAddAction = [
        <IconButton style={{ cursor: 'default' }} ><Grid3x3Outlined /> </IconButton>
    ]
    //#endregion

    //#region Advance click handling

    const handleAdvanceAddClick = () => {
        let _shop = shopList?.filter(shop => shop.shopID == eodShopID)[0]
        setSelectedAdvance({
            empAdvID: 0,
            empID: 0,
            advanceAmount: '',
            shopID: shopID,
            AdvanceDate: dayjs(accountDate).format("YYYY-MM-DD"),
            AdvanceNotes: '',
            userID: 0
        }
        );
        setAdvanceFormOpen(true);
    };

    const handleAdvanceDeleteClick = (advance) => {
        setSelectedAdvance(advance);
        setDeleteType('advance');
        setDeleteDialogOpen(true);
    }

    const handleDeleteConfirm = () => {
        if (deleteType === 'expense' && selectedExpense) {
            let postData = { 'expenseID': selectedExpense.expenseID, 'shopID': selectedExpense.shopID, 'expenseDate': selectedExpense.expenseDate };
            accountService.delete_expense(postData).then(() => {
                getShopEODData(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
                getShopExpenses(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
            }).catch((error) => {
                console.error('Error deleting expense:', error);
            });
        } else if (deleteType === 'advance' && selectedAdvance) {
            let postData = { 'empAdvID': selectedAdvance.empAdvID, 'advanceDate': selectedAdvance.advanceDate, 'empID': selectedAdvance.empID, 'shopID': selectedAdvance.shopID };
            accountService.delete_shop_advance(postData).then(() => {
                getShopEODData(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
                getShopAdvances(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
            }).catch((error) => {
                console.error('Error deleting advance:', error);
            });
        } else if (deleteType === 'dp entry' && selectedDPTransaction) {
            let postData = { 'dpTrnID': selectedDPTransaction.dpTrnID, 'dpDate': selectedDPTransaction.dpDate, 'shopID': selectedDPTransaction.shopID };
            accountService.delete_dp_entry(postData).then(() => {
                getShopEODData(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
                getShopDPTransaction(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
            }).catch((error) => {
                console.error('Error deleting advance:', error);
            });
        }

        setDeleteDialogOpen(false);
        setSelectedExpense(null);
        setSelectedAdvance(null);
        setDeleteType(null);
    };

    const AdvanceAddAction = [<IconButton onClick={handleAdvanceAddClick}><AddCircleOutline /></IconButton>]


    //#endregion

    useEffect(() => {
        if (shopID !== null && accountDate !== null) {
            //setIsLoading(true); // Show loader
            getShopEODDetails(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
            accountService.get_kobc_employee_list().then(result => {
                setEmpMasterList(result.data);
            }).catch(err => { });
        } else if (shopID == null && accountDate == null) {
            navigate('/dashboard');
        }
    }, [shopID, accountDate]);

    function isFormValid() {
        let _form = { ...formState };
        let isValid = true;
        let positivefields = ['additionalIncome', 'deposit', 'videoGameAmount', 'soratAmount', 'eodDeposit', 'withdrawAmount', 'bankDeposit', 'ccReceiptAmount', 'gPayAmount', 'lotteryGoodluckAmount', 'videoGameGoodLuckAmount', 'teaAmount']
        const regex = /^(0|[1-9]\d*)$/;

        if (_form) {
            if (_form.dayAccID.value == undefined || _form.dayAccID.value == '' || _form.dayAccID.value == 0) {
                isValid = false;
            }
            if (_form.closingAmount.value == '' || isNaN(_form.closingAmount.value)) {
                _form.closingAmount.error = 'Calculated cash @ EOD is required';
                isValid = false;
            }
            let addIncome = _form.additionalIncome.value;
            if ((addIncome !== '' && parseInt(addIncome) > 0) && _form.additionalIncomeNote.value === '') {
                _form.additionalIncomeNote.error = 'Additional income note is required';
                isValid = false;
            }

            positivefields.forEach(field => {
                let _val = _form[field].value;
                if (regex.test(_val) || _val == '') {
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
            if (regex.test(value) || value == '') {
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
                additionalIncome: formState.additionalIncome.value == undefined || formState.additionalIncome.value == '' ? 0 : formState.additionalIncome.value,
                additionalIncomeNote: formState.additionalIncomeNote.value == undefined || formState.additionalIncomeNote.value == '' ? '' : formState.additionalIncomeNote.value,
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
            if (action == 'draft') {
                accountService.saveAccountEODData(postData).then(result => {
                    getShopEODData(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
                }).catch(error => {
                    console.log(error);
                });
            } else if (action == 'save') {
                accountService.saveAccountEODData(postData).then(result => {
                    getShopEODData(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
                }).catch(error => {
                    console(error);
                });
            } else if (action == 'submit') {
                accountService.submitAccountEODData(postData).then(result => {
                    getShopEODData(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
                }).catch(error => {
                    console(error);
                });
            } else if (action == 'approve') {
                accountService.approveAccountEODData(postData).then(result => {
                    getShopEODData(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
                }).catch(error => {
                    console.log(error);
                });
            } else if (action == 'reject') {
                accountService.rejectAccountEODData(postData).then(result => {
                    getShopEODData(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }

    const updateExpense = (_postData) => {
        accountService.update_shop_expenses(_postData).then(result => {
            getShopEODData(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
            getShopExpenses(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        });
        setExpenseFormOpen(false);
    }


    const updateAdvance = (_postData) => {
        accountService.insert_shop_advance(_postData).then(result => {
            getShopEODData(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
            getShopAdvances(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        });
        setAdvanceFormOpen(false);
    }


    const saveDPTrasnaction = (_postData) => {
        accountService.save_dp_entry(_postData).then(result => {
            getShopEODData(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
            getShopDPTransaction(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
            setDPFormOpen(false);
        }).catch(err => {
            setDPFormOpen(false);
            console.log(err);
        });
    }

    const getShopEODData = (_shopID, _accountDate) => {
        let postData = { 'shopID': _shopID, 'accountDate': _accountDate }
        //setIsLoading(true);
        accountService.get_eod_data(postData).then(result => {
            var eodData = result.data;
            populateEODFormFields(eodData);
            setIsLoading(false);
        });
    }

    const getShopExpenses = (_shopID, _accountDate) => {
        let postData = { 'shopID': _shopID, 'accountDate': _accountDate }
        //setIsLoading(true);
        accountService.get_shop_expenses(postData).then(result => {
            setShopExpenseData(result.data);
            setIsLoading(false);
        })
    }


    const getShopAdvances = (_shopID, _accountDate) => {
        let postData = { 'shopID': _shopID, 'accountDate': _accountDate }
        //setIsLoading(true);
        accountService.get_shop_advances(postData).then(result => {
            setShopAdvanceData(result.data);
            setIsLoading(false);
        })
    }

    const getShopDPTransaction = (_shopID, _accountDate) => {
        let postData = { 'shopID': _shopID, 'accountDate': _accountDate }
        //setIsLoading(true);
        accountService.get_dp_entries(postData).then(result => {
            setShopDPTransactionData(result.data);
            setIsLoading(false);
        })
    }


    const saveAttendance = (selectedEmployees) => {
        const attendanceData = {
            'employeeList': selectedEmployees.map(emp => emp.empID),
            'shopID': shopID,
            'attendanceDate': dayjs(accountDate).format("YYYY-MM-DD"),
            'userID': 0
        };

        // Call the service to save the attendance data
        accountService.save_shop_attendance(attendanceData).then(() => {
            // Refresh the attendance data after saving
            getShopAttendance(shopID, dayjs(accountDate).format("YYYY-MM-DD"));
        }).catch(error => {
            console.error('Error saving attendance:', error);
        });
    };

    const getShopAttendance = (_shopID, _accountDate) => {
        let postData = { 'shopID': _shopID, 'attendanceDate': _accountDate }
        accountService.get_shop_attendance(postData).then(result => {
            setShopAttendanceData(result.data);
            if (result.data) {
                const selectedEmps = empMasterList.filter(emp => result.data.some(att => att.empID === emp.empID));
                setSelectedEmployees(selectedEmps);
            }
        }).catch(error => {
            console.error('Error fetching attendance:', error);
        });
    };


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
                setShopDPTransactionData(result.data.shopDPTransactionData);

                if (result.data.shopAttendanceData) {
                    const selectedEmps = empMasterList.filter(emp => result.data.shopAttendanceData.some(att => att.empID === emp.empID));
                    setSelectedEmployees(selectedEmps);
                }
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

    useEffect(() => {
        if (shopAttendanceData !== null && empMasterList !== null) {
            const selectedEmps = empMasterList.filter(emp => shopAttendanceData.some(att => att.empID === emp.empID));
            setSelectedEmployees(selectedEmps);
        }
    }, [shopAttendanceData, empMasterList]);

    const populateEODFormFields = (eodData) => {
        setShowData(eodData?.dayAccID == 0 ? false : true);
        setFormState({
            accountDate: { value: eodData.accountDate || '', error: '' },
            addBy: { value: eodData.addBy || '', error: '' },
            addOn: { value: eodData.addOn || '', error: '' },
            additionalIncome: { value: eodData.additionalIncome || '', error: '' },
            additionalIncomeNote: { value: eodData.additionalIncomeNote || '', error: '' },
            advanceAmount: { value: eodData.advanceAmount || '', error: '' },
            status: { value: eodData.status || '', error: '' },
            statusName: { value: eodData.statusName || '', error: '' },
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
            action: { value: '', error: '' },
            submitedBy: { value: eodData.submitedBy || '', error: '' },
            approvedby: { value: eodData.approvedby || '', error: '' },
            submitedOn: { value: eodData.submitedOn || '', error: '' },
            approvedOn: { value: eodData.approvedOn || '', error: '' },

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
                                    value={accountDate ? dayjs(accountDate) : null}
                                    onAccept={(newValue) => {
                                        setAccountDate(newValue);
                                        updateURL(shopID, newValue);
                                    }}
                                    disableFuture
                                    sx={{ maxWidth: 200, margin: 1, '.MuiInputBase-input': { padding: '8px 12px' } }}
                                    renderInput={(params) => <TextField {...params} size="small" sx={{ '.MuiOutlinedInput-root': { height: '36px' } }} />} />
                            </LocalizationProvider>
                            <Autocomplete
                                options={shopList || []}
                                value={shopList ? shopList.filter(shop => shop.shopID == shopID)[0] : null}
                                getOptionLabel={(option) => `${option.shopCode} - ${option.shopName}`}
                                sx={{ width: 300, display: 'flex', justifyContent: 'center' }}
                                loading={!shopList}
                                renderInput={(params) => <TextField {...params} label="Shop" size="small" />}
                                onChange={(event, newValue) => {
                                    setShopID(newValue.shopID);
                                    updateURL(newValue.shopID, accountDate);
                                }}
                            />
                        </Grid>
                    </Grid>
                    {showData ?
                        <div className="cards-container">
                            <Grid container spacing={1}>
                                {/* First Column: Grid/Table Section */}
                                <Grid size={{ md: 6, lg: 8, xs: 12 }}>
                                    <Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
                                        <Grid size={{ md: 6, lg: 4, sm: 6, xs: 12 }}>
                                            <div className={`card ${selectedCard === 'machineReading' ? 'visible' : 'hidden'}`}>
                                                <BaseCard title="Machine Reading Data" headerBGColor='#bbdefb' actions={AttendanceAddAction}>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography sx={{ fontSize: '12px' }}>In Reading: {machineNetReadingData?.netInReading}</Typography>
                                                        <Typography sx={{ fontSize: '12px' }}>Out Reading: {machineNetReadingData?.netOutReading}</Typography>
                                                    </Box>
                                                </BaseCard>
                                            </div>
                                        </Grid>
                                        <Grid size={{ md: 6, lg: 4, sm: 6, xs: 12 }}>
                                            <div className={`card ${selectedCard === 'checkerSaleWinData' ? 'visible' : 'hidden'}`}>
                                                <BaseCard title="Checker Sale Win Data" headerBGColor='#bbdefb' actions={AttendanceAddAction}>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography sx={{ fontSize: '12px' }}>Checker Sales: {saleWinData?.checkerSales}</Typography>
                                                        <Typography sx={{ fontSize: '12px' }}>Checker Win: {saleWinData?.checkerWin}</Typography>
                                                    </Box>
                                                </BaseCard>
                                            </div>
                                        </Grid>
                                        <Grid size={{ md: 6, lg: 4, sm: 6, xs: 12 }}>
                                            <div className={`card ${selectedCard === 'shopSaleWinData' ? 'visible' : 'hidden'}`}>
                                                <BaseCard title="Shop Sale Win Data" headerBGColor='#bbdefb' actions={AttendanceAddAction}>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography sx={{ fontSize: '12px' }}>Shop Sales: {formState.salesAmount?.value}</Typography>
                                                        <Typography sx={{ fontSize: '12px' }}>Shop Win: {formState.winAmount?.value}</Typography>
                                                    </Box>
                                                </BaseCard>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} sx={{ marginTop: 2, marginBottom: 1 }}>
                                        <Grid size={{ sm: 6, lg: 5, md: 12, xs: 12 }}>
                                            <BaseCard title="Daily expenditure" headerBGColor='#bbdefb' actions={ExpenseAddAction}>
                                                <ExpenseTable
                                                    data={shopExpenseData}
                                                    handleExpenseEditClick={handleExpenseEditClick}
                                                    handleExpenseDeleteClick={handleExpenseDeleteClick} />
                                            </BaseCard>
                                        </Grid>
                                        <Grid size={{ sm: 6, lg: 5, md: 12, xs: 12 }}>
                                            <BaseCard title="Advance payments" headerBGColor='#bbdefb' actions={AdvanceAddAction}>
                                                <AdvanceTable data={shopAdvanceData} onDelete={handleAdvanceDeleteClick} />
                                            </BaseCard>
                                        </Grid>
                                        <Grid size={{ sm: 6, lg: 5, md: 12, xs: 12 }}>
                                            <BaseCard title="DP entry" headerBGColor='#bbdefb' actions={DPAddAction}>
                                                <DPTransactionTable
                                                    data={shopDPTransactionData}
                                                    handleDPEditClick={handleDPEditClick}
                                                    handleDPDeleteClick={handleDPDeleteClick} />
                                            </BaseCard>
                                        </Grid>
                                        <Grid size={{ sm: 6, lg: 6, md: 12, xs: 12 }}>
                                            <BaseCard title="Attendance" headerBGColor='#bbdefb' actions={AttendanceAddAction} >
                                                <Box sx={{ margin: 1 }}>
                                                    <Autocomplete
                                                        multiple
                                                        limitTags={2}
                                                        id="attendance-multiselect"
                                                        options={empMasterList}
                                                        getOptionLabel={(option) => `${option.empCode} - ${option.employeeName}`}
                                                        value={selectedEmployees}
                                                        onChange={(event, newValue) => {
                                                            setSelectedEmployees(newValue);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                label="Mark Attendance"
                                                                placeholder="Select Employees"
                                                            />
                                                        )}
                                                        renderTags={(value, getTagProps) =>
                                                            value.map((option, index) => (
                                                                <Chip {...getTagProps({ index })} label={`${option.empCode} - ${option.employeeName}`} />
                                                            ))
                                                        }
                                                        sx={{ marginBottom: 2 }}
                                                    />
                                                </Box>
                                                <Box sx={{ margin: 1 }}>
                                                    <Button variant="contained" color="primary" onClick={() => saveAttendance(selectedEmployees)}>
                                                        Save Attendance
                                                    </Button>
                                                </Box>
                                                <ShopAttendanceTable data={shopAttendanceData} />
                                            </BaseCard>
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid size={{ md: 6, lg: 4, xs: 12 }} sx={{ marginTop: 1 }}>
                                    <BaseCard title="EOD Account" headerBGColor='#bbdefb' actions={AttendanceAddAction}>
                                        <Paper elevation={2} sx={{ padding: 1 }}>
                                            <Grid container spacing={1} sx={{ marginTop: 1 }}>
                                                <Grid size={{ md: 6, lg: 6, sm: 6, xs: 12 }}>
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
                                                        helperText={formState.additionalIncomeNote?.error}
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
                                                <Grid size={{ md: 6, lg: 6, sm: 6, xs: 12 }}>
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
                                                <Grid size={{ md: 6, lg: 6, sm: 6, xs: 12 }}>
                                                    <TextField variant="outlined" size="small" label="Calculated cash @ EOD (₹)" sx={{ marginBottom: 1 }}
                                                        type="number"
                                                        disabled
                                                        onChange={handleChange}
                                                        name="closingAmount"
                                                        value={formState.closingAmount?.value}
                                                        error={formState.closingAmount?.error}
                                                        helperText={formState.closingAmount?.error}
                                                        fullWidth />
                                                </Grid>
                                                <Grid size={{ md: 6, lg: 6, sm: 6, xs: 12 }}>
                                                    <TextField
                                                        variant="outlined"
                                                        size="small"
                                                        label="Physical cash @ EOD (₹)"
                                                        sx={{ marginBottom: 1 }}
                                                        disabled
                                                        type="number"
                                                        onClick={handlePhysicalAmountClick}
                                                        name="physicalAmount"
                                                        value={formState.physicalAmount?.value}
                                                        fullWidth
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <Button
                                                                        edge="end"
                                                                        size="small"
                                                                        sx={{ backgroundColor: '#000', padding: '0 8px', minWidth: 'auto', height: '100%' }}
                                                                        color="primary"
                                                                    >
                                                                        <MoreHoriz />
                                                                    </Button>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <hr />
                                            <Grid container spacing={1} sx={{ margin: 1 }}>
                                                <Grid size={{ md: 6, lg: 6, sm: 6, xs: 12 }}>
                                                    <TextField variant="outlined" size="small" label="Shortage/ Excess @ EOD (₹)" sx={{ marginBottom: 1 }}
                                                        disabled
                                                        type="number"
                                                        onChange={handleChange}
                                                        name="tallyAmount"
                                                        value={formState.tallyAmount?.value}
                                                        fullWidth />
                                                </Grid>
                                                <Grid size={{ md: 6, lg: 6, sm: 6, xs: 12 }}>
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
                                                <Grid size={{ md: 6, lg: 6, sm: 6, xs: 12 }}>
                                                    <TextField variant="outlined" size="small" label="EOD Deposit amt. (₹)" sx={{ marginBottom: 1 }}
                                                        onChange={handleChange}
                                                        type="number"
                                                        name="eodDeposit"
                                                        value={formState.eodDeposit?.value}
                                                        fullWidth />
                                                </Grid>
                                                <Grid size={{ md: 6, lg: 6, sm: 6, xs: 12 }}>
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

                                                {(formState.status.value == '' || formState.status.value == '0') &&
                                                    <>
                                                        <Button variant="contained" onClick={() => BackToDashboard()} color="#cccccc" sx={{ margin: 1, }}> Cancel </Button>
                                                        <Button variant="contained" onClick={() => handleFormAction('draft')} color="primary" sx={{ margin: 1 }}> Save </Button>
                                                        <Button variant="contained" onClick={() => handleFormAction('approve')} color="secondary" sx={{ margin: 1 }}> Approve </Button>
                                                    </>
                                                }
                                                {formState.status.value == '1' &&
                                                    <>
                                                        <Button variant="contained" onClick={() => BackToDashboard()} color="#cccccc" sx={{ margin: 1, }}> Cancel </Button>
                                                        <Button variant="contained" onClick={() => handleFormAction('save')} color="primary" sx={{ margin: 1 }}> Save </Button>
                                                        {/* <Button variant="contained" onClick={() => handleFormAction('draft')} color="primary" sx={{ margin: 1 }}> Save </Button> */}
                                                        <Button variant="contained" onClick={() => handleFormAction('approve')} color="primary" sx={{ margin: 1 }}> Approve </Button>
                                                    </>
                                                }
                                            </Box>
                                            <Paper elevation={2} border={1} sx={{ padding: 1, fontSize: '12px', marginTop: 1 }}>
                                                <Typography variant="div" sx={{ color: 'red', marginLeft: '5px', display: 'block' }}>
                                                    Status - {formState.statusName?.value}
                                                </Typography>
                                                {
                                                    formState.submitedBy?.value !== '' && formState.submitedOn?.value !== '' &&
                                                    <Typography variant="div" sx={{ color: 'red', marginLeft: '5px', display: 'block' }}>
                                                        Submitted by - {formState.submitedBy?.value} on {Helper.FormatDate(formState.submitedOn?.value, 'DD-MM-YYYY hh:mm a')}
                                                    </Typography>
                                                }
                                                {
                                                    formState.approvedBy?.value !== '' && formState.approvedOn?.value !== '' &&
                                                    <Typography variant="div" sx={{ color: 'red', marginLeft: '5px', display: 'block' }}>
                                                        Approved by - {formState.approvedBy?.value} on {Helper.FormatDate(formState.approvedOn?.value, 'DD-MM-YYYY hh:mm a')}
                                                    </Typography>
                                                }
                                            </Paper>
                                        </Paper>
                                    </BaseCard>
                                </Grid>
                            </Grid >
                        </div>
                        :
                        <NoData linkHref="/dashboard" linkText="Go to Dashboard" />
                    }
                    <DenominationDialog
                        open={denominationDialogOpen}
                        onClose={() => setDenominationDialogOpen(false)}
                        onSave={handleDenominationSave}
                        initialValues={denominations}
                    />
                    <ExpenseForm
                        open={expenseFormOpen}
                        onClose={() => setExpenseFormOpen(false)}
                        expense={selectedExpense}
                        onSave={updateExpense}
                    />
                    <DeleteConfirmationDialog
                        open={deleteDialogOpen}
                        message={`Are you sure you want to delete this ${deleteType}? This action cannot be undone.`}
                        onClose={() => setDeleteDialogOpen(false)}
                        onConfirm={handleDeleteConfirm}
                    />
                    <AdvanceForm
                        open={advanceFormOpen}
                        empMasterList={empMasterList}
                        onClose={() => setAdvanceFormOpen(false)}
                        advance={selectedAdvance}
                        onSave={updateAdvance}
                    />
                    <DPForm
                        open={dpFormOpen}
                        onClose={() => setDPFormOpen(false)}
                        dpTransaction={selectedDPTransaction}
                        onSave={saveDPTrasnaction}
                        handleSearchPerson={handleSearchPerson}
                        dpPersonList={dpPersonList}
                    />

                </>
            }
        </>
    )


};
export default DayAccountEoD;

