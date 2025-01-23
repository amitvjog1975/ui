import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Autocomplete } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const AdvanceForm = ({ open, empMasterList, onClose, advance, onSave }) => {
  const [advanceAmountError, setAdvanceAmountError] = useState('');
  const [advanceEmpError, setAdvanceEmpError] = useState('');
  const [action, setAction] = useState('new');

  const [advanceFormData, setAdvanceFormData] = useState({
    empAdvID: 0,
    empID: 0,
    advanceAmount: 0,
    shopID: 0,
    AdvanceDate: dayjs().format('YYYY-MM-DD'),
    AdvanceNotes: '',
    userID: 0,
    employeeName: ''
  });

  useEffect(() => {
    if (advance) {
      setAdvanceFormData(advance);
      if (advance.empAdvID === 0) {
        setAction('new');
      } else {
        setAction('edit');
      }
    } else {
      setAdvanceFormData({
        empAdvID: 0,
        empID: 0,
        advanceAmount: 0,
        shopID: 0,
        AdvanceDate: dayjs().format('YYYY-MM-DD'),
        AdvanceNotes: '',
        userID: 0,
        employeeName: ''
      });
    }
  }, [advance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'advanceAmount') {
      const amount = Number(value);
      if (amount > 100000) {
        setAdvanceAmountError('Amount must be less than or equal to 100,000');
      } else {
        setAdvanceAmountError('');
        setAdvanceFormData((prev) => ({ ...prev, advanceAmount: amount }));
      }
    }
    if (name === 'employeeName' && (value !== '' || value !== 0)) {
      setAdvanceEmpError('');
    }

    setAdvanceFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    if (date) {
      setAdvanceFormData((prev) => ({ ...prev, AdvanceDate: date.format('YYYY-MM-DD') }));
    }
  };

  const isValidateAdvanceForm = () => {
    let _form = { ...advanceFormData };
    let isValid = true;
    if (_form) {
      if (_form.shopID === 0 || _form.AdvanceDate === null || _form.AdvanceDate === undefined) {
        isValid = false;
        return isValid;
      }
      if (_form.employeeName === '' || _form.employeeName === undefined) {
        setAdvanceEmpError('Employee must be selected');
        isValid = false;
      }

      const amount = Number(_form.advanceAmount);      
        if (amount > 100000) {
          setAdvanceAmountError('Amount must be less than or equal to 100,000');
          isValid = false;
        } else {
          setAdvanceAmountError('');
          setAdvanceFormData((prev) => ({ ...prev, advanceAmount: amount }));
        }

      if (_form.advanceAmount === 0 || _form.advanceAmount === '' || _form.advanceAmount <= 0) {
        setAdvanceAmountError('Amount must be positive number');
        isValid = false;
      } 
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (isValidateAdvanceForm()) {
      onSave(advanceFormData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{action && action === 'edit' ? 'Edit Advance' : 'Add Advance'} for [{advance ? advance.shopName : ''}]</DialogTitle>
      <DialogContent>
        {empMasterList &&
          <Autocomplete
            options={empMasterList ? empMasterList : []}
            getOptionLabel={(option) => option.empID ? `${option.empCode} - ${option.employeeName}` : 'Select Employee'}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Employee"
                margin="normal"
                error={!!advanceEmpError}
                helperText={advanceEmpError}
              />
            )}
            onChange={(event, newValue) => {
              setAdvanceFormData((prev) => ({
                ...prev,
                empID: newValue ? newValue.empID : 0,
                employeeName: newValue ? `${newValue.empCode} - ${newValue.employeeName}` : ''
              }));
              setAdvanceEmpError('');
            }}
            value={empMasterList ? empMasterList.find(
              (emp) => emp.EmpID === advanceFormData.empID
            ) : null}
          />
        }
        <TextField
          name="advanceAmount"
          label="Advance Amount"
          type="number"
          value={advanceFormData.advanceAmount}
          onChange={handleChange}
          fullWidth
          error={!!advanceAmountError}
          helperText={advanceAmountError}
          inputProps={{ max: 100000 }}
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Advance Date"
            readOnly
            disabled
            value={dayjs(advanceFormData.AdvanceDate)}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
        <TextField
          name="AdvanceNotes"
          label="Advance Notes"
          type="text"
          value={advanceFormData.AdvanceNotes}
          onChange={handleChange}
          fullWidth
          margin="normal"
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

export default AdvanceForm;