from datetime import datetime, timedelta
import sqlite3
from flask import Flask, render_template, jsonify, request, abort

app = Flask(__name__, template_folder='frontend/build', static_folder='frontend/build/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/alarms', methods=['GET'])
def get_alarms():
    conn = get_db_connection()
    alarm_rows = conn.execute('SELECT id, alarmtime, alarmstate FROM alarms').fetchall()
    alarms_list = list()
    for row in alarm_rows:
        if row['alarmtime'] is not None:
            alarm = { 'id': row['id'], 'time': row['alarmtime'], 'timedt': datetime.strptime(row['alarmtime'],"%Y-%m-%d %H:%M"), 'state': row['alarmstate']}
            alarms_list.append(alarm)

    from_time = datetime.today() - timedelta(hours=3)
    upcoming_alarms = [x for x in sorted(alarms_list, key=lambda k: k['timedt']) if x['timedt'] > from_time]
    conn.close()
    return jsonify(upcoming_alarms)

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

@app.route('/api/v1/alarms/<id>', methods=['DELETE'])
def delete_alarm(id):
    conn = get_db_connection()
    cur = conn.cursor();
    cur.execute('DELETE FROM alarms WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'}), 201

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn