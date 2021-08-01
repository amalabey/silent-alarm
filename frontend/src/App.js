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
    axios.post(apiUrl, {'alarmtime': selectedTime.toLocaleString()});
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="setAlarm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedTime}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>
        <IconButton color="secondary" aria-label="add an alarm" onClick={addAlarm}>
          <AlarmAddIcon />
        </IconButton>
      </div>
      <div className="test">
        {selectedTime &&
          <h4>{selectedTime.toLocaleString()}</h4>
        }
      </div>
      <div className="alarms">
        {alarms &&
          alarms.map((alarm, index) => {
            return (
              <div className="alarm" key={index}>
                <h3>{alarm.time}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
