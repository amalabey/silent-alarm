import axios from 'axios';
import 'date-fns';
import { format, formatRelative, isBefore, add } from 'date-fns';
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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import SnoozeIcon from '@material-ui/icons/Snooze';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
    const now = new Date();

    const formattedDateStr = format(isBefore(selectedTime, now) ? add(selectedTime, { days: 1 }) : selectedTime, "yyyy-MM-dd HH:mm")
    axios.post(apiUrl, {'alarmtime': formattedDateStr}).then(() => {
      fetchData();
    });
  }

  const deleteAlarm = (id) => {
    axios.delete(`${apiUrl}/${id}`).then(() => {
      fetchData();
    });
  }

  const alarmIcon = (state) => {
    switch(state)
    {
      case 0:
        return <AlarmOnIcon/>;
      case 1:
        return <NotificationsActiveIcon/>
      case 2:
        return <SnoozeIcon/>;
      case 3:
        return <AlarmOffIcon/>;
      default:
        return <AlarmOnIcon/>;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography>
              Silent Alarm
            </Typography>
          </Toolbar>
        </AppBar>
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
                const primaryText = alarm.tag !== null ? alarm.tag : format(alarmTime, "h:mm a");
                const secondaryText = formatRelative(alarmTime, new Date());
                const listItemClass = alarmTime < new Date() ? "pastAlarm" : "upcomingAlarm";
                return (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        {alarmIcon(alarm.state)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={primaryText} secondary={secondaryText} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteAlarm(alarm.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
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
