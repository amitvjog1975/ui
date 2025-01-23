import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, TablePagination, Paper, useMediaQuery } from '@mui/material';
import Helper from '../../common/Helper'; // Adjust the path as necessary
import './ShopAttendanceTable.css';

const ShopAttendanceTable = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Set default rows per page
    const ShopAttendanceData = props.data;
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
                <Table aria-label="go" className="table">
                    <TableHead sx={{backgroundColor:'#1976d2'}}>
                        <TableRow>
                            <TableCell sx={{ textAlign: 'left', color:'#ffffff' }}>
                                    Employee
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ padding: 0 }}>
                        {ShopAttendanceData && ShopAttendanceData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice the data for pagination
                            .map((attendance) => (
                                <TableRow key={attendance.empID} className='table-row'>
                                    <TableCell>
                                        <Box>
                                            <Typography className={`table-cell ${isMobile ? 'table-cell-small' : 'table-cell-large'}`}>
                                            {attendance.empCode} - {attendance.empName}
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
                count={ShopAttendanceData ? ShopAttendanceData.length : 0} // Total number of rows
                rowsPerPage={rowsPerPage} // Current rows per page
                page={page} // Current page
                onPageChange={handleChangePage} // Function to handle page change
                onRowsPerPageChange={handleChangeRowsPerPage} // Function to handle rows per page change
            />
        </>
    );
};

export default ShopAttendanceTable;