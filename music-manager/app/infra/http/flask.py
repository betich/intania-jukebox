from flask import Flask
from app.infra.controller.home import home_controller
from app.infra.controller.queue import queue_controller

def create_app():
  app = Flask(__name__)  
  return app

def run():
  app = create_app()
  
  # blueprints
  app.register_blueprint(home_controller)
  app.register_blueprint(queue_controller)

  print(app.url_map)
  
  # any other service instances should be created here
  
  app.run()