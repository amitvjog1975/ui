import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

function EnhancedTableHead({ props }) {
    props.headCells
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

export default EnhancedTableHead;