import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute('INSERT INTO alarms (alarmtime) VALUES(\'2021-07-31 13:32\')')
cur.execute('INSERT INTO alarms (alarmtime) VALUES(\'2021-08-01 05:00\')')
cur.execute('INSERT INTO alarms (alarmtime) VALUES(\'2021-08-02 01:10\')')


connection.commit()
connection.close()