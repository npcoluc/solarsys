from flask import Flask, redirect, url_for, request, jsonify, Response, g, session
from flask_cors import CORS
import json
import sqlite3
import uuid

app = Flask(__name__)
CORS(app)

DATABASE = "planets.db"

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()



@app.route('/api',methods = ['POST', 'GET'])
@app.route('/',methods = ['POST', 'GET'])
def new_config():
    if request.method == 'POST':
        print("here")
        content = request.json
        username = content["username"]
        del content["username"]
        # sql = ''' SELECT ID FROM planets '''
        # users = get_db().cursor().execute(sql).fetchall()
        # users = [user[0] for user in users]
        # if user in users:
        #     return jsonify({'No': 'Overwrite'})
        sql = ''' INSERT OR REPLACE INTO planets(ID, json)
              VALUES(?,?) '''
        get_db().cursor().execute(sql,(username, json.dumps(content)))
        get_db().commit()
        # with open('data.txt', 'w') as outfile:
        #   json.dump(content, outfile)
        response = jsonify({'Mission': 'Accomplished'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response #Response(status=201, mimetype='application/json')


@app.route('/sketch',methods = ['POST'])
def get_config():
    if request.method == 'POST':
        content = request.json
        username = content["username"]
        sql = ''' SELECT json FROM planets
                Where ID= ? '''
        content = get_db().cursor().execute(sql, (username,)).fetchone()
        response = jsonify(json.loads(content[0]))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

# @app.route('/collide', methods = ['POST'])
# def collide():
#     if request.method == 'POST':
#         content = request.json
#         username = content["username"]
#         sql = ''' SELECT json FROM planets
#                 Where ID= ? '''
#         content = get_db().cursor().execute(sql, (username,)).fetchone()
#         response = jsonify(json.loads(content[0]))
#         response.headers.add('Access-Control-Allow-Origin', '*')
#         return response




if __name__ == '__main__':
    app.run(debug = True, port=8001)
