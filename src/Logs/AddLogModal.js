// src/AddLogModal.js
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import { fetchPostRequest } from '../utils/http';
import endpoints from '../utils/http/endpoints';
import { useEffect } from 'react';

const AddLogModal = ({ open, onClose, onLogAdded }) => {
  const [date, setDate] = useState(new Date());
  const [logData, setLogData] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const newLog = {
        date: formattedDate,
        log_data: logData,
      };
      await fetchPostRequest(endpoints.add_log, newLog);
      onLogAdded();
      onClose();
    } catch (error) {
      console.error('Error adding log:', error);
    }
  };

  useEffect(() => {
    setLogData('');
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Log</DialogTitle>
      <DialogContent>
        <br />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            inputFormat="yyyy-MM-dd"
          />
        </LocalizationProvider>
        <TextField
          label="Log Data"
          multiline
          rows={4}
          value={logData}
          onChange={(e) => setLogData(e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={saving} color="primary" variant="contained">
          Add Log
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLogModal;

