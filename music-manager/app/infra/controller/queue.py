from flask import Blueprint

queue_controller = Blueprint('queue', __name__, url_prefix='/queue')

@queue_controller.route('/', methods=['GET'])
def get_queue():
  return 'Queue'
