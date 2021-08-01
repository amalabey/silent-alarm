from datetime import datetime
import sqlite3
from flask import Flask, render_template, jsonify, request, abort

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
        if row['alarmtime'] is not None:
            alarm = {'time': datetime.fromisoformat(row['alarmtime'])}
            alarms_list.append(alarm)
        
    conn.close()
    return jsonify(alarms_list)

@app.route('/api/v1/alarms', methods=['POST'])
def add_alarm():
    if not request.json or not 'alarmtime' in request.json:
        abort(400)

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO alarms (alarmtime) VALUES(?)', (request.json['alarmtime'],))
    conn.commit()
    conn.close()
    
    return jsonify({'status': 'success'}), 201

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn