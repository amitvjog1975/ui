import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableContainer, TableCell, TableBody, Paper, useMediaQuery, Icon, Pagination } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const DPTransactionTable = ({ data, handleDPEditClick, handleDPDeleteClick }) => {
    const [page, setPage] = useState(0); // Start with page 0
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const dpTransactionData = data;
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        if(dpTransactionData  == null) {
            setPage(0);
        } else {            
            setPage((Math.ceil(dpTransactionData?.length / rowsPerPage) - 1));
        }
    },
    [dpTransactionData])

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
                <TableContainer>
                    <Table size="small">
                        <TableHead sx={{backgroundColor:'#1976d2'}}>
                            <TableRow>
                                <TableCell sx={{ width: '40%', textAlign: 'left', color:'#ffffff' }}>Person</TableCell>
                                <TableCell sx={{ width: '30%', textAlign: 'right', color:'#ffffff' }}>Amt. (₹)</TableCell>
                                <TableCell sx={{ width: '30%', textAlign: 'right', color:'#ffffff' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ minHeight: '200px' }}>
                            {dpTransactionData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dp) => (
                                <TableRow key={dp.dpTrnID}>
                                    <TableCell sx={{ width: '40%', textAlign: 'left' }}>{dp.dpDisplayName}</TableCell>
                                    <TableCell sx={{ width: '30%', textAlign: 'right' }}>{dp.dpAmount}</TableCell>
                                    <TableCell sx={{ width: '30%', textAlign: 'right' }}>
                                        <Edit fontSize="smaller" onClick={() => handleDPEditClick(dp)} style={{ cursor: 'pointer' }} />
                                        <Delete fontSize="smaller" onClick={() => handleDPDeleteClick(dp)} style={{ cursor: 'pointer' }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    count={Math.ceil(dpTransactionData?.length / rowsPerPage)}
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

export default DPTransactionTable;
