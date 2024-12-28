import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, TablePagination, Paper, useMediaQuery } from '@mui/material';
import Helper from '../../common/Helper'; // Adjust the path as necessary
import './AdvanceTable.css';

const AdvanceTable = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10); // Set default rows per page
    const shopAdvanceData = props.data;
    const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen is mobile size

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when changing rows per page
    };

    return (
        <>
            <Paper sx={{ overflowX: 'auto' }} elevation={1}>
                <Table aria-label="Daily Expenditure" className="table">
                    <TableHead>
                        <TableRow className="table-header">
                            <TableCell>
                                <Typography className={`table-header-cell ${isMobile ? 'table-cell-small' : 'table-cell-large'}`}>
                                    Advance amount (₹)<br />
                                    Employee
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ padding: 0 }}>
                        {shopAdvanceData && shopAdvanceData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice the data for pagination
                            .map((expense) => (
                                <TableRow key={expense.expenseID} className='table-row'>
                                    <TableCell>
                                        <Box>
                                            <Typography className={`table-cell ${isMobile ? 'table-cell-small' : 'table-cell-large'}`}>
                                                {expense.advAmt}
                                            </Typography>
                                            <Typography className={`table-cell ${isMobile ? 'table-cell-small' : 'table-cell-large'}`}>
                                                {expense.empName}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Paper>
            <TablePagination
                rowsPerPageOptions={[10]} // Options for rows per page
                component="div"
                count={shopAdvanceData ? shopAdvanceData.length : 0} // Total number of rows
                rowsPerPage={rowsPerPage} // Current rows per page
                page={page} // Current page
                onPageChange={handleChangePage} // Function to handle page change
                onRowsPerPageChange={handleChangeRowsPerPage} // Function to handle rows per page change
            />
        </>
    );
};

export default AdvanceTable;