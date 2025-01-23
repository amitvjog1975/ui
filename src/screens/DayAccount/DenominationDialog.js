import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';


const DenominationDialog = ({ open, onClose, onSave, initialValues }) => {
    const [denominations, setDenominations] = useState([
        { key: "note500", value: 500, quantity: 0 },
        { key: "note200", value: 200, quantity: 0 },
        { key: "note100", value: 100, quantity: 0 },
        { key: "note50", value: 50, quantity: 0 },
        { key: "note20", value: 20, quantity: 0 },
        { key: "note10", value: 10, quantity: 0 },
        { key: "note5", value: 5, quantity: 0 },
        { key: "note1", value: 1, quantity: 0 },
        { key: "coin1", value: 1, quantity: 0 },
        { key: "coin2", value: 2, quantity: 0 },
        { key: "coin5", value: 5, quantity: 0 },
        { key: "coin10", value: 10, quantity: 0 },
        { key: "coin20", value: 20, quantity: 0 },
    ]);

    useEffect(() => {
        if (initialValues && Array.isArray(initialValues)) {
            setDenominations(initialValues);
        }
    }, [initialValues]);

    const handleChange = (e, key) => {
        const { value } = e.target;
        setDenominations((prevDenominations) =>
            prevDenominations.map((denomination) =>
                denomination.key === key ? { ...denomination, quantity: parseInt(value) || 0 } : denomination
            )
        );
    };

    const handleSave = () => {
        const total = denominations.reduce((acc, { value, quantity }) => acc + value * quantity, 0);
        onSave(total, denominations);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Enter Cash Denominations</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {denominations.map(({ key, value, quantity }) => (
                        <Grid item xs={6} key={key}>
                            <TextField
                                label={`₹${value}`}
                                name={key}
                                type="number"
                                value={quantity}
                                onChange={(e) => handleChange(e, key)}
                                fullWidth
                            />
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DenominationDialog;