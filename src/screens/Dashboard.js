
import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Typography, Box, Toolbar, Button, TableSortLabel, CircularProgress, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ThumbUp } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment/moment';
import { dashboardService } from '../services/dashboard.service';
import { useNavigate, useLocation } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import PageHeader from '../components/PageHeader';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Helper from '../common/Helper';

import UserContext from '../shared/UserContext';
import Loader from '../layouts/loader/Loader';
import NoData from '../components/NoData';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: 200,
    color: theme.palette.text.secondary,
}));

const headCells = [
    {
        id: 'accountDate',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'shopCode',
        numeric: false,
        disablePadding: false,
        label: 'Shop name',
    },
    {
        id: 'approvalStatusName',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'closingAmount',
        numeric: true,
        disablePadding: false,
        label: 'Closing',
    },
    {
        id: 'deposit',
        numeric: true,
        disablePadding: false,
        label: 'Deposit',
    },
    {
        id: 'expenses',
        numeric: true,
        disablePadding: false,
        label: 'Expenses',
    },
    {
        id: 'saleAmount',
        numeric: true,
        disablePadding: false,
        label: 'Sales',
    },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#e6f2ff",
        color: '#333333',
        fontWeight: 'bold'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
    },
}));

const DailyStatusLoaderOverlay = styled(Box)(({ theme }) => ({
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust opacity as needed
    zIndex: 999, // Ensure it's above the table
}));

function EnhancedTableHead(props) {
    const { order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


const Dashboard = () => {
    const location = useLocation();
    const { UpdateEodShopID, UpdateEodAccountDate } = useContext(UserContext);
    const receivedData = location.state && location.state.data;
    const [dashboardData, setDashboardData] = useState(null);
    const [accountDateFrom, setAccountDateFrom] = useState(null);
    const [accountDateTo, setAccountDateTo] = useState(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [totalItems, setTotalItems] = useState(0);
    const [pages, setPages] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [rows, setRows] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('shopcode');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [loadInitialComplete, setLoadInitialComplete] = useState(false);
    const [showData, setShowData] = useState(true);

    const paginationModel = { page: 0, pageSize: 10 };

    useEffect(() => {
        if (receivedData !== null && receivedData !== undefined) {
            setCurrentPageIndex(1);
            setAccountDateFrom(dayjs(moment(receivedData.accountDate).format('l')));
            setAccountDateTo(dayjs(moment(receivedData.accountDate).format('l')));
        } else {
            setCurrentPageIndex(1);
            setAccountDateFrom(dayjs(moment().format('l')));
            setAccountDateTo(dayjs(moment().format('l')));
        }
    }, []);

    const navigate = useNavigate();

    const showEodDetails = (shopid, accDate) => {
        UpdateEodShopID(shopid);
        UpdateEodAccountDate(accDate);
        navigate('/day-account-eod');
    }

    useEffect(() => {
        if (accountDateFrom !== null) {
            showDashboardData();
        }
    }, [accountDateFrom]);


    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function EnhancedTableToolbar(props) {
        const { numSelected } = props;
        return (
            <Toolbar
                sx={[
                    {
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        minHeight: '48px !important',
                        maxHeight: '48px !important',
                        backgroundColor: '#115f98',
                        color: '#f0f0f0'
                    },
                    numSelected > 0 && {
                        backgroundColor: '#115f98',
                        color: '#f0f0f0'
                    },
                ]}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h7"
                        id="tableTitle"
                        component="div"
                        fontWeight={'bold'}
                    >
                        Daily Status - {Helper.FormatDate(accountDateFrom, 'DD/MM/YYYY')}
                    </Typography>
                )}
            </Toolbar>
        );
    }

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };



    function showDashboardData() {
        if (accountDateFrom !== null) {
            setIsLoading(true);
            let postData = {
                accountDateFrom: Helper.FormatDate(accountDateFrom, 'YYYY-MM-DD'),
                accountDateTo: Helper.FormatDate(accountDateFrom, 'YYYY-MM-DD'),
                pageIndex: currentPageIndex,
                pageSize: pageSize,
                filterText: filterText,
                sortDirection: order,
                sortColumn: orderBy
            }
            dashboardService.dashboardData(postData)
                .then(result => {
                    setIsLoading(false);
                    if (result != null) {
                        setDashboardData(result.data);
                        setShowData(true);
                        if (!result.data.shopsList || result.data.shopsList.length == 0) {
                            setShowData(false);
                        } else 
                        setRows(result.data.shopsList);
                        if (result.data.pagination) {
                            let pagearr = [];
                            setCurrentPageIndex(result.data.pagination.currentPage)
                            setTotalPages(result.data.pagination.totalPages);
                            setPageSize(result.data.pagination.pageSize);
                            setTotalItems(result.data.pagination.totalItems);
                            for (let i = 1; i <= result.data.pagination.totalPages; i++) {
                                pagearr.push(i);
                            }
                            setPages(pagearr);
                        }
                    }
                }).catch(error => {
                    setShowData(false);
                    setIsLoading(false);
                });
        }
    }

    //const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));   

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        showDashboardData();
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        if (rows && id > 0) {
            let itemArr = rows.filter(r => r.id == id);
            if (itemArr && itemArr.length > 0) {
                let item = itemArr[0];
                showEodDetails(item.shopID, item.accountDate);
            }
        }
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <>
            <PageHeader title="Dashboard">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ maxWidth: 200, margin: 1 }}>
                        <DatePicker
                            label="From"
                            value={accountDateFrom}
                            format='DD/MM/YYYY'
                            disableFuture
                            sx={{ maxWidth: 150, margin: 1 }}
                            onChange={(newValue) => setAccountDateFrom(newValue)}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                    </DemoContainer>
                </LocalizationProvider>                
            </PageHeader>

            <Grid container spacing={2} marginTop={1}>
                <Grid size={12}>
                    {isLoading ?
                        <Loader />
                        :
                        showData ?
                            <Paper sx={{ width: '100%' }} >
                                <EnhancedTableToolbar numSelected={selected.length} />
                                <TableContainer>
                                    <Table stickyHeader
                                        sx={{ minWidth: 750 }}
                                        aria-labelledby="tableTitle"
                                        size={dense ? 'small' : 'medium'}
                                    >
                                        <EnhancedTableHead
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onRequestSort={handleRequestSort}
                                            rowCount={rows ? rows.length : 0}
                                        />
                                        <TableBody>
                                            {rows && rows.map((row, index) => {
                                                const isItemSelected = selected.includes(row.id);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, row.id)}
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.id}
                                                        selected={isItemSelected}
                                                        sx={{ cursor: 'pointer' }}
                                                    >
                                                        <TableCell >{Helper.FormatDate(moment(row.accountDate), 'DD/MM/YYYY')}</TableCell>
                                                        <TableCell >{row.shopCode + ` - ` + row.shopName}</TableCell>
                                                        <TableCell align="center">{row.approvalStatus == 2 ? <ThumbUp color='success' /> : row.approvalStatus == 1 ? <ThumbUp color='warning' /> : `Waiting`}</TableCell>
                                                        <TableCell align="right">₹ {row.closingAmount}</TableCell>
                                                        <TableCell align="right">{row.deposit}</TableCell>
                                                        <TableCell align="right">{row.expenses}</TableCell>
                                                        <TableCell align="right">{row.saleAmount}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                            {emptyRows > 0 && (
                                                <TableRow
                                                    style={{
                                                        height: (dense ? 33 : 53) * emptyRows,
                                                    }}
                                                >
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                            :
                            <NoData />
                    }
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
