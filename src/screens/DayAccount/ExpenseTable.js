import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableContainer, TableCell, TableBody, Paper,  Pagination } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const ExpenseTable = ({ data, handleExpenseEditClick, handleExpenseDeleteClick }) => {
    const [page, setPage] = useState(0); // Start with page 0
    const rowsPerPage = 10;
    const shopExpenseData = data;
    // const isMobile = useMediaQuery('(max-width:600px)');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    return (
        <>
            <Paper sx={{ overflowX: 'auto' }} elevation={1}>
                <TableContainer>
                    <Table size="small">
                        <TableHead sx={{backgroundColor:'#1976d2'}}>
                            <TableRow>
                                <TableCell sx={{ width: '40%', textAlign: 'left', color:'#ffffff' }}>Reason</TableCell>
                                <TableCell sx={{ width: '30%', textAlign: 'right', color:'#ffffff' }}>Amt. (₹)</TableCell>
                                <TableCell sx={{ width: '30%' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{
                            minHeight: '200px',
                        }}>
                            {shopExpenseData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense) => (
                                <TableRow key={expense.expenseID}>
                                    <TableCell sx={{ width: '40%', textAlign: 'left' }}>{expense.expenseReason}</TableCell>
                                    <TableCell sx={{ width: '30%', textAlign: 'right' }}>{expense.expenseAmount}</TableCell>
                                    <TableCell sx={{ width: '30%', textAlign:'right' }}>
                                        <Edit fontSize="smaller" onClick={() => handleExpenseEditClick(expense)} style={{ cursor: 'pointer' }} />
                                        <Delete fontSize="smaller" onClick={() => handleExpenseDeleteClick(expense)} style={{ cursor: 'pointer' }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    count={Math.ceil(shopExpenseData?.length / rowsPerPage)}
                    page={page + 1}
                    onChange={(event, value) => handleChangePage(event, value - 1)}
                    color="primary"
                    size="small"
                    sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                />
            </Paper>
        </>
    );
};

export default ExpenseTable;
