// src/LogViewer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LogList from './LogList';
import AddLogModal from './AddLogModal';
import {fetchGetRequest} from "../utils/http"
import endpoints from "../utils/http/endpoints";

const LogViewer = () => {
  const [date, setDate] = useState(new Date());
  const [logs, setLogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(0);
  const [time, setTime] = useState((new Date()).getTime());

  const fetchLogs = async () => {
    const selectedDate = date;
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
      const response = await fetchGetRequest(endpoints.get_logs, {
        params: { date: formattedDate },
      });
      setLogs(response.data.data);
      setLastUpdated((new Date()).getTime());
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [date]);

  const handleAddLog = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLogAdded = () => {
    fetchLogs(date);
  };

  useEffect(() => {
    console.log(time - lastUpdated);
    if(time - lastUpdated > 5000) fetchLogs();
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
        setTime((new Date()).getTime());
    }, 2000); 
    return () => clearInterval(interval);
  }, []);


  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Log Viewer
        </Typography>
        <Box display="flex" alignItems="center" gap="20px">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              inputFormat="yyyy-MM-dd"
            />
          </LocalizationProvider>
          <Box>
            <Button variant="contained" color="primary" onClick={handleAddLog}>
              Add Log
            </Button>
          </Box>
        </Box>
        <Box mt={4}>
          <LogList logs={logs} />
        </Box>
      </Box>
      <AddLogModal open={modalOpen} onClose={handleModalClose} onLogAdded={handleLogAdded} />
    </Container>
  );
};

export default LogViewer;
