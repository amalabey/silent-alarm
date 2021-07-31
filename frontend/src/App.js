import axios from 'axios';
import 'date-fns';
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.production.min';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  const [alarms, setAlarms] = useState(null);
  const [selectedTime, setAlarmTime] = useState(null);
  const apiUrl = "/api/v1/alarms";

  const fetchData = async () => {
    const response = await axios.get(apiUrl)
    setAlarms(response.data) 
  }

  const handleDateChange = (date) => {
    setAlarmTime(date);
  };

  useEffect(() => {
    fetchData();
  },[]);

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
