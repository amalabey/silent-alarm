import axios from 'axios';
import 'date-fns';
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

function App() {
  const [alarms, setAlarms] = useState(null);
  const [selectedTime, setAlarmTime] = useState(new Date('2021-08-01'));
  const apiUrl = "/api/v1/alarms";

  const fetchData = async () => {
    const response = await axios.get(apiUrl)
    setAlarms(response.data) 
  }

  const handleDateChange = (date) => {
    setAlarmTime(date);
  };

  const addAlarm = () => {
    axios.post(apiUrl, {'alarmtime': selectedTime.toLocaleString()}).then(() => {
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
          {alarms &&
            alarms.map((alarm, index) => {
              return (
                <div className="alarm" key={index}>
                  <h3>{alarm.time}</h3>
                </div>
              );
            })}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
