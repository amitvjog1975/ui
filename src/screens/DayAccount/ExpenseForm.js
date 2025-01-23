import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const ExpenseForm = ({ open, onClose, expense, onSave }) => {
  const [expenseAmountError, setExpenseAmountError] = useState('');
  const [expenseReasonError, setExpenseReasonError] = useState('');
  const [action, setAction] = useState('new');

  const [expnseFormData, setExpenseFormData] = useState({
    expenseID: 0,
    expenseAmount: 0,
    expenseDate: dayjs().format('YYYY-MM-DD'),
    expenseReason: '',
    shopID: 0,
    shopName: '',
    userID:0
  });

  useEffect(() => {
    if (expense) {
      setExpenseFormData(expense);
      if (expense.expenseID == 0) {
        setAction('new');
      } else {
        setAction('edit');
      }
    } else {
      setExpenseFormData({
        expenseID: 0,
        expenseAmount: 0,
        expenseDate: dayjs().format('YYYY-MM-DD'),
        expenseReason: '',
        shopID: 0,
        shopName: '',
        userID:0
      });

    }

  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == 'expenseAmount' && value !== '' || value !== 0) {
      setExpenseAmountError('');
    }
    if (name == 'expenseReason' && value !== '' || value !== 0) {
      setExpenseReasonError('');
    }

    setExpenseFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    if (date) {
      setExpenseFormData((prev) => ({ ...prev, expenseDate: date.format('YYYY-MM-DD') }));
    }
  };

  const isValidateExpenseForm = () => {
    let _form = { ...expnseFormData }
    var isValid = true;
    if (_form) {
      if (_form.shopID == 0 || _form.expenseDate === null || _form.expenseDate === undefined) {
        isValid = false;
        return isValid;
      }
      if (_form.expenseReason === '' || _form.expenseReason === undefined) {
        setExpenseReasonError('Reason must be entered');
        isValid = false;
      }
      if (_form.expenseAmount === 0 || _form.expenseAmount === '' || _form.expenseAmount <= 0) {
        setExpenseAmountError('Amount must be positive number');
        isValid = false;
      }
    }

    return isValid;
  }

  const handleSubmit = () => {
    if (isValidateExpenseForm()) {
      onSave(expnseFormData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{action && action == 'edit' ? 'Edit Expense' : 'Add Expense'} for [{expense ? expense.shopName : ''}]</DialogTitle>
      <DialogContent>
        <TextField
          name="expenseAmount"
          label="Expense Amount"
          type="number"
          value={expnseFormData.expenseAmount}
          onChange={handleChange}
          fullWidth
          error={expenseAmountError}
          helperText={expenseAmountError}
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Expense Date"
            readOnly
            disabled
            value={dayjs(expnseFormData.expenseDate)}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
        <TextField
          name="expenseReason"
          label="Expense Reason"
          value={expnseFormData.expenseReason}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
          error={expenseReasonError}
          helperText={expenseReasonError}
          inputProps={{ maxLength: 100 }}
        />
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

export default ExpenseForm;

