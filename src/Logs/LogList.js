// src/LogList.js
import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const LogList = ({ logs }) => {
  if (!logs.length) {
    return <Typography>No logs available for the selected date.</Typography>;
  }

  return (
    <Paper elevation={3}>
      <List>
        {logs.map((log) => (
          <ListItem key={log.log_id} divider>
            <ListItemText
              primary={`Date: ${log.date}`}
              secondary={
                <>
                  Created At: {log.created_at}
                  <br />
                  Created By: {log.created_by}
                  <br />
                  Log Data: <br />
                  <Typography component="span" variant="body2" color="textPrimary">
                    <pre>
                    {log.log_data}
                    </pre>
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default LogList;
