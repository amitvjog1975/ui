import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, useMediaQuery, Icon, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AdvanceTable = ({ data, onDelete }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const shopAdvanceData = data;
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Paper sx={{ overflowX: 'auto' }} elevation={1}>
                <Table aria-label="Daily Expenditure" size='small'>
                    <TableHead sx={{backgroundColor:'#1976d2'}} >
                        <TableRow>
                            <TableCell sx={{ textAlign: 'left', color:'#ffffff' }}>Employee</TableCell>
                            <TableCell sx={{ textAlign: 'right', color:'#ffffff' }}>Amt. (₹)<br /></TableCell>
                            <TableCell sx={{ textAlign: 'right', color:'#ffffff' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ padding: 0 }}>
                        {shopAdvanceData && shopAdvanceData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((advance) => (
                                <TableRow key={advance.expenseID} className='table-row'>
                                    <TableCell sx={{ textAlign: 'left' }}>{advance.empName}</TableCell>
                                    <TableCell sx={{ textAlign: 'right' }}>{advance.advanceAmount}</TableCell>
                                    <TableCell sx={{ textAlign: 'right' }}>
                                        <Icon onClick={() => onDelete(advance)} style={{ cursor: 'pointer' }}>
                                            <DeleteIcon fontSize='small' />
                                        </Icon>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <Pagination
                    count={Math.ceil(shopAdvanceData?.length / rowsPerPage)}
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

export default AdvanceTable;
