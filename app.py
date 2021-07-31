import sqlite3
from flask import Flask, render_template, jsonify

app = Flask(__name__, template_folder='frontend/build', static_folder='frontend/build/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/alarms', methods=['GET'])
def get_alarms():
    conn = get_db_connection()
    alarm_rows = conn.execute('SELECT * FROM alarms').fetchall()
    alarms_list = list()
    for row in alarm_rows:
        alarm = {'time':row['alarmtime']}
        alarms_list.append(alarm)
        
    conn.close()
    return jsonify(alarms_list)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn