import React, { Component, useContext, useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { userService } from '../services';
import { UserContext } from '../shared/UserContext';
import { useTable, usePagination } from 'react-table';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, Container, Card, CardContent, Typography, AppBar, InputBase, Box, Toolbar, Button, TextField, Divider, TableSortLabel, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ChevronLeft, ChevronRight, FilterBAndW, FindInPageSharp, GarageRounded, Looks3Outlined, ThumbUp } from '@mui/icons-material';
import DashboardShopCard from '../components/DashboardShopCard';
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
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: 200,
    color: theme.palette.text.secondary,
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%'
    // [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing(3),
    //     width: 'auto',
    // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
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
        label: 'Closing Amount ₹',
    },
    {
        id: 'deposit',
        numeric: true,
        disablePadding: false,
        label: 'Deposit ₹',
    },
    {
        id: 'expenses',
        numeric: true,
        disablePadding: false,
        label: 'Expenses ₹',
    },
    {
        id: 'saleAmount',
        numeric: true,
        disablePadding: false,
        label: 'Sales ₹',
    },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#cccccc",
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
    zIndex: 999, // Ensure it's above the table
}));

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
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
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


const Dashboard = () => {
    const location = useLocation();
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

    const paginationModel = { page: 0, pageSize: 10 };

    useEffect(() => {
        if (receivedData != null && receivedData != undefined) {
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

    const handleDetail = (shopid, accDate) => {
        let dataToSend = {
            shopID: shopid,
            accountDate: accDate
        }
        navigate('/eod-activity', { state: { data: dataToSend } });

    }

    const handlePageClick = (page) => {
        setCurrentPageIndex(page);
        showDashboardData(page);
    }


    useEffect(() => {
        if (accountDateFrom !== null && accountDateTo !== null) {
            showDashboardData()
        }
    }, [accountDateFrom, accountDateTo]);


    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }




    function EnhancedTableToolbar(props) {
        const { numSelected } = props;
        return (
            <Toolbar
                sx={[
                    {
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    },
                    numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
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
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Nutrition
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
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
                accountDateFrom: dayjs(accountDateFrom).format('YYYY-MM-DD'),
                accountDateTo: dayjs(accountDateFrom).format('YYYY-MM-DD'),
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
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
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
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ maxWidth: 200, margin: 1 }}>
                        <DatePicker
                            label="To"
                            value={accountDateTo}
                            format='DD/MM/YYYY'
                            disableFuture
                            sx={{ maxWidth: 150, margin: 1 }}
                            onChange={(newValue) => setAccountDateTo(newValue)}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                    </DemoContainer>
                </LocalizationProvider> */}
                <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap' }}>
                    <Button component="label" variant='contained' size='small'
                        color='success'
                        onClick={showDashboardData}
                        sx={{ height: 'fit-content' }}
                        startIcon={<SearchIcon />} >Search</Button>
                </Box>
            </PageHeader>

            <Grid container spacing={2} marginTop={1}>
                <Grid size={8}>

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
                                                <TableCell >{moment(row.accountDate).format('DD/MM/YYYY')}</TableCell>
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
                    {isLoading &&
                        <DailyStatusLoaderOverlay>
                            <CircularProgress />
                        </DailyStatusLoaderOverlay>
                    }
                </Grid>
                <Grid size={4}>
                    <Item>size=4</Item>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
