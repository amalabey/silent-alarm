import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.production.min';

function App() {
  const [alarms, setAlarms] = useState(null);
  const apiUrl = "/api/v1/alarms";

  const fetchData = async () => {
    const response = await axios.get(apiUrl)
    setAlarms(response.data) 
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="App">
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
