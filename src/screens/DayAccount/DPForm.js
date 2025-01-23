import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Autocomplete } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const DPForm = ({ open, onClose, dpTransaction, onSave, handleSearchPerson, dpPersonList }) => {
  const [dpAmountError, setDPAmountError] = useState('');
  const [dpPersonError, setDPPersonError] = useState('');
  const [action, setAction] = useState('new');
  const [inputValue, setInputValue] = useState('');

  const [dpTransactionData, setDPTransactionData] = useState({
    dpTrnID: 0,
    dpUserID: 0,
    dpDate: dayjs().format("YYYY-MM-DD"),
    dpDisplayName: '',
    shopID: 0,
    dpAmount: 0
  });

  useEffect(() => {
    if (dpTransaction) {
      setDPTransactionData(dpTransaction);
      if (dpTransaction.dpTrnID === 0) {
        setAction('new');
      } else {
        setAction('edit');
      }
    } else {
      setDPTransactionData({
        dpTrnID: 0,
        dpUserID: 0,
        dpDate: dayjs().format("YYYY-MM-DD"),
        dpDisplayName: '',
        shopID: 0,
        dpAmount: 0
      });
    }
  }, [dpTransaction]);

  useEffect(() => {
    if (inputValue && inputValue.length >= 3) {
      // Call API to fetch employee list based on the input value 
      // // Update empMasterList with the fetched data 
      handleSearchPerson(inputValue);
    }
  }, [inputValue])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'advanceAmount') {
      const amount = Number(value);
      if (amount > 100000) {
        setDPAmountError('Amount must be less than or equal to 100,000');
      } else {
        setDPAmountError('');
        setDPTransactionData((prev) => ({ ...prev, dpAmount: amount }));
      }
    }
    if (name === 'dpDisplayName' && (value !== '' || value !== 0)) {
      setDPPersonError('');
    }

    setDPTransactionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    if (date) {
      setDPTransactionData((prev) => ({ ...prev, dpDate: date.format('YYYY-MM-DD') }));
    }
  };

  const isValidatedpTransactionForm = () => {
    let _form = { ...dpTransactionData };
    let isValid = true;
    if (_form) {
      if (_form.shopID === 0 || _form.dpDate === null || _form.dpDate === undefined) {
        isValid = false;
        return isValid;
      }
      if (_form.dpDisplayName === '' || _form.dpDisplayName === undefined) {
        setDPPersonError('Person must be entered');
        isValid = false;
      }

      const amount = Number(_form.advanceAmount);
      if (amount <= 0 || amount > 100000) {
        setDPAmountError('Amount must be beween 0 and 1,00,000');
        isValid = false;
      } else {
        setDPAmountError('');
        setDPTransactionData((prev) => ({ ...prev, dpAmount: amount }));
      }

      if (_form.dpAmount === 0 || _form.dpAmount === '' || _form.dpAmount <= 0) {
        setDPAmountError('Amount must be positive number');
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (isValidatedpTransactionForm()) {
      onSave(dpTransactionData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{action && action === 'edit' ? 'Edit DP entry' : 'Add DP entry'} for [{dpTransaction ? dpTransaction.shopName : ''}]</DialogTitle>
      <DialogContent>
        {dpPersonList && (
          <Autocomplete
            options={dpPersonList}
            name='dpDisplayName'
            getOptionLabel={(option) => option.personName}
            renderOption={(props, option) => <li {...props}>{option.personName}</li>}
            renderInput={(params) => (
              <TextField {...params}
                label="DP Person"
                margin="normal"
                error={!!dpPersonError}
                helperText={dpPersonError} />
            )}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            onChange={(event, newValue) => {
              setDPTransactionData((prev) => ({
                ...prev, dpDisplayName: newValue?.personName || ''

              })); setDPPersonError('');
            }}
            clearIcon={true}
            value={dpPersonList.find((person) => person.personName === dpTransactionData.dpDisplayName) || null}
          />)}
        <TextField
          name="dpAmount"
          label="DP Amount"
          type="number"
          value={dpTransactionData.dpAmount}
          onChange={handleChange}
          fullWidth
          error={!!dpAmountError}
          helperText={dpAmountError}
          inputProps={{ max: 100000 }}
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="DP Date"
            readOnly
            disabled
            value={dayjs(dpTransactionData.dpDate)}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DPForm;