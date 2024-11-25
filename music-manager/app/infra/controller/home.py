from flask import Blueprint

home_controller = Blueprint('home', __name__, url_prefix='/')

@home_controller.route('/', methods=['GET'])
def index():
  return 'OK'

@home_controller.route('/ping', methods=['GET'])
def ping():
  return 'Pong'