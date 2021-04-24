from flask import Flask, redirect, url_for, request, jsonify, Response
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app)
# @app.route('/success/<name>')
# def success(name):
#    return 'welcome %s' % name
@app.route('/api',methods = ['POST', 'GET'])
def new_config():
   if request.method == 'POST':
      content = request.json
      with open('data.txt', 'w') as outfile:
        json.dump(content, outfile)
      response = jsonify({'some': 'data'})
      response.headers.add('Access-Control-Allow-Origin', '*')
      return response #Response(status=201, mimetype='application/json')
   else:
      with open('data.txt', 'r') as infile:
        content = json.load(infile)
      response = jsonify(content)
      response.headers.add('Access-Control-Allow-Origin', '*')
      return response

if __name__ == '__main__':
   app.run(debug = True)
