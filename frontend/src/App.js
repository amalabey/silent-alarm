import axios from 'axios';
import 'date-fns';
import { format, formatRelative } from 'date-fns';
import './App.css';
import React, { useState, useEffect } from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@material-ui/core/IconButton';
import AlarmAddIcon from '@material-ui/icons/AlarmAdd';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function App() {
  const [alarms, setAlarms] = useState(null);
  const [selectedTime, setAlarmTime] = useState(new Date());
  const apiUrl = "/api/v1/alarms";

  const fetchData = async () => {
    const response = await axios.get(apiUrl)
    setAlarms(response.data) 
  }

  const handleDateChange = (date) => {
    setAlarmTime(date);
  };

  const addAlarm = () => {
    const formattedDateStr = format(selectedTime, "yyyy-MM-dd HH:mm")
    axios.post(apiUrl, {'alarmtime': formattedDateStr}).then(() => {
      fetchData();
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
                className="timePicker"
                margin="normal"
                id="time-picker"
                label="Alarm Time"
                value={selectedTime}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
          </MuiPickersUtilsProvider>
          <div className="addAlarmBtn">
            <IconButton color="primary" aria-label="add an alarm" onClick={addAlarm}>
              <AlarmAddIcon />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <List>
            {alarms &&
              alarms.map((alarm, index) => {
                const alarmTime = new Date(alarm.time);
                const timeText = format(alarmTime, "h:mm a");
                const fullText = formatRelative(alarmTime, new Date());
                const listItemClass = alarmTime < new Date() ? "pastAlarm" : "upcomingAlarm";
                return (
                  <ListItem className={listItemClass}>
                    <ListItemText primary={timeText} secondary={fullText} />
                  </ListItem>
                );
              })}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
