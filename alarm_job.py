import sqlite3
from datetime import datetime, timedelta
import RPi.GPIO as GPIO
import time

# ALARM STATES: 0 - NEW, 1 - ALARMING, 2 - STOPPED
DB_NAME = 'database.db'
VIBRATION_MOTOR_GPIO_PIN = 14
ALARM_DURATION = 12
ALARM_TRIGGER_TIME = 2

def get_alarms():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row

    alarm_rows = conn.execute('SELECT id, alarmtime, alarmstate FROM alarms WHERE alarmstate = 0').fetchall()
    alarms_list = list()
    for row in alarm_rows:
        if row['alarmtime'] is not None:
            alarm = { 'id': row['id'], 'alarmtime':  datetime.strptime(row['alarmtime'],"%Y-%m-%d %H:%M"), 'alarmstate': row['alarmstate'] }
            alarms_list.append(alarm)

    from_time = datetime.today() - timedelta(minutes=10)
    upcoming_alarms = [x for x in alarms_list if x['alarmtime'] > from_time and x['alarmtime'] < datetime.today()]
    conn.close()
    return upcoming_alarms

def set_alarm_state(id, state):
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor();
    cur.execute('UPDATE alarms SET alarmstate = ? WHERE id = ?', (state, id))
    conn.commit()
    conn.close()

def check_alarm_state(id):
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor();
    row = cur.execute('SELECT alarmstate FROM alarms WHERE id = ?', (id,)).fetchone()
    conn.close()

    if row is None:
        return -1
    return row['alarmstate']

def trigger_alarm(seconds):
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(VIBRATION_MOTOR_GPIO_PIN, GPIO.OUT)
    GPIO.output(VIBRATION_MOTOR_GPIO_PIN, GPIO.HIGH)
    time.sleep(seconds)
    GPIO.output(VIBRATION_MOTOR_GPIO_PIN, GPIO.LOW)

def process_alarms():
    print("Processing alarms")
    alarms_to_trigger = get_alarms()
    print("number of alarms: {0}".format(len(alarms_to_trigger)))
    for alarm in alarms_to_trigger:
        print("Alarm triggered for: {0} at {1}".format(alarm['id'], alarm['alarmtime']))
        set_alarm_state(alarm['id'], 1) # alarming
        for x in range(0, ALARM_DURATION, ALARM_TRIGGER_TIME):
            print("Triggering the alarm: {0}".format(alarm['id']))
            trigger_alarm(ALARM_TRIGGER_TIME)
            alarm_state = check_alarm_state(alarm['id'])
            if alarm_state == -1 or alarm_state == 2:
                print("Alarm deleted, cancelling the alarm")
                break
        set_alarm_state(alarm['id'], 2)

process_alarms()