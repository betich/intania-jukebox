from flask import Flask
from flask_cors import CORS

from app.infra.http.swagger import swagger_ui_blueprint

from app.infra.controller.home import home_controller
from app.infra.controller.queue import queue_controller
from app.infra.controller.music_queue_item import music_queue_item_controller
from app.infra.controller.song import song_controller

from app.infra.db.init import db
from app.infra.db.model import Song, MusicQueueItem, PlayedSong # for creating tables

import os
from flask_socketio import SocketIO, emit
from app.config.env import load_env

from flask import request

load_env()
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URI')
app.config['SECRET_KEY'] = 'secret!'
db.init_app(app)

with app.app_context():
  print('Creating tables...')
  db.create_all()
  
app.app_context().push()
CORS(app)

# socketio
socketio = SocketIO(app, cors_allowed_origins=['http://localhost:3000'])

# routes
app.register_blueprint(home_controller)
app.register_blueprint(queue_controller)
app.register_blueprint(music_queue_item_controller)
app.register_blueprint(song_controller)

# swagger
app.register_blueprint(swagger_ui_blueprint)

print(app.url_map)

# any other service instances should be created here
@socketio.on('connect')
def test_connect():
  print('Client connected')
  emit('hello',  {})
    
@socketio.event
def hi():
  print('i got it!')
  
@app.route('/sio/command')
def command():
  # TOGGLE_PLAY | NEXT | VOLUME_UP | VOLUME_DOWN
  command = request.args.get('c')
  
  if command in ['TOGGLE_PLAY', 'NEXT', 'VOLUME_UP', 'VOLUME_DOWN']:
    print('emit')
    socketio.emit('command', {'command': command })
    return 'OK'
  else :
    return 'Invalid command', 400