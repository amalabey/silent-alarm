import sqlite3
from datetime import datetime, timedelta

# ALARM STATES: 0 - NEW, 1 - ALARMING, 2 - STOPPED
DB_NAME = 'database.db'

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
    cur.execute('UPDATE alarms SET alarmstate = ? WHERE id = ?', (id, state))
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