from flask import Blueprint,request

from app.core.usecase.crud_music_queue_item import CRUDMusicQueueItem
from app.core.mapper.music_queue_item import MusicQueueItemMapper

from app.infra.repository.memory.music_queue_item import MusicQueueItemRepository
from app.infra.mapper.response.flask import FlaskResponseMapper

queue_controller = Blueprint('queue', __name__, url_prefix='/queue')

music_queue_item_repository = MusicQueueItemRepository()
crud_music_queue_item = CRUDMusicQueueItem(music_queue_item_repository)

@queue_controller.route('/', methods=['GET'])
def get_queue():
  result = crud_music_queue_item.find_all()
  
  if not result:
    return FlaskResponseMapper.resource_not_found("No music found in queue")
  else:
    return FlaskResponseMapper.success(MusicQueueItemMapper.to_dict_list(result), "Success")
  
@queue_controller.route('/song', methods=['GET'])
def get_music_queue_item():
  result = crud_music_queue_item.find_all()
  
  if not result:
    return FlaskResponseMapper.resource_not_found("No music found in queue")
  else:
    return FlaskResponseMapper.success(MusicQueueItemMapper.to_dict_list(result), "Success")

@queue_controller.route('/song/new', methods=['POST'])
def create_music_queue_item():
  data = request.json
  
  if not data or not all(key in data for key in ['song', 'likes']):
    return FlaskResponseMapper.bad_request("Invalid keys. Expected: song, likes")
  
  try:
    result = crud_music_queue_item.create(MusicQueueItemMapper.from_request(data))
    
    if result is not None:
      return FlaskResponseMapper.success(MusicQueueItemMapper.to_dict(result), "Music added to queue")
  
  except Exception as e:
    return FlaskResponseMapper.bad_request(str(e))
  
  return FlaskResponseMapper.bad_request("There was an error adding the music to the queue")

@queue_controller.route('/song/<id>', methods=['GET'])
def get_music_queue_item_by_id(id):
  result = crud_music_queue_item.find_by_id(id)
  
  if result is None:
    return FlaskResponseMapper.resource_not_found(f"Music id {id} not found")
  else:
    return FlaskResponseMapper.success(MusicQueueItemMapper.to_dict(result), "Success")

@queue_controller.route('/song/<id>', methods=['PUT'])
def update_music_queue_item(id):
  data = request.json
  
  if not data or not all(key in data for key in ['song', 'likes']):
    return FlaskResponseMapper.bad_request("Invalid keys. Expected: song, likes")
  
  try:
    result = crud_music_queue_item.update(id, data)
    
    if result is None:
      return FlaskResponseMapper.resource_not_found(f"Music id {id} not found")
    
    return FlaskResponseMapper.success(MusicQueueItemMapper.to_dict(result), "Music updated")
  
  except Exception as e:
    return FlaskResponseMapper.bad_request(str(e))
  
@queue_controller.route('/song/<id>', methods=['DELETE'])
def delete_music_queue_item(id):
  crud_music_queue_item.delete(id)
  return FlaskResponseMapper.success(None, "Music deleted")
