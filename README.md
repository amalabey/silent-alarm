# Overview
A Raspberry Pi Zero based alarm clock that uses a vibration motor to wake you up without waking others. The 3D printed enclosure that holds the vibration motor can be placed under the mattress or pillow.  
Project includes simple React (Material UI) based web frontend and a Python (Flask) based backend to set alarms. Alarms are stored in a `sqllite3` database. Another python script scheduled using crontab runs every minute to check if there is an alarm to be triggerred. When there is an alarm to be triggerred, the scheduled script makes use of `RPi.GPIO` python library to set a GPIO pin HIGH for a predefined period.
Connected to the GPIO pin, there is a vibration motor via a IRFZ44 mosfet. The mosfet drives the vibration motor when it receives the HIGH signal to its `gate` pin.

## Motor Driver Circuit

## 3D Printed Enclosure