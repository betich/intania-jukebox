from flask import Flask
from app.infra.controller.home import home_controller
from app.infra.controller.queue import queue_controller
from app.infra.controller.music_queue_item import music_queue_item_controller
from app.infra.controller.song import song_controller

def create_app():
  app = Flask(__name__)  
  return app

def run():
  app = create_app()
  
  # blueprints
  app.register_blueprint(home_controller)
  app.register_blueprint(queue_controller)
  app.register_blueprint(music_queue_item_controller)
  app.register_blueprint(song_controller)

  print(app.url_map)
  
  # any other service instances should be created here
  
  app.run()