from flask import Blueprint,request
from app.infra.repository.memory.music_queue import MusicQueueItemRepository
from app.core.usecase.crud_music_queue_item import CRUDMusicQueueItem

queue_controller = Blueprint('queue', __name__, url_prefix='/queue')

music_queue_item_repository = MusicQueueItemRepository()
crud_music_queue_item = CRUDMusicQueueItem(music_queue_item_repository)

@queue_controller.route('/', methods=['GET'])
def get_queue():
  return crud_music_queue_item.find_all()

@queue_controller.route('/<int:id>', methods=['GET'])
def get_queue_by_id(id):
  return crud_music_queue_item.find_by_id(id)

@queue_controller.route('/', methods=['POST'])
def create_queue():
  return crud_music_queue_item.create()

@queue_controller.route('/<int:id>', methods=['PUT'])
def update_queue(id):
  new_music = request.json
  return crud_music_queue_item.update(id, new_music)

@queue_controller.route('/<int:id>', methods=['DELETE'])
def delete_queue(id):
  return crud_music_queue_item.delete(id)