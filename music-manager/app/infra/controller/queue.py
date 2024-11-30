from flask import Blueprint,request

from app.core.mapper.music_queue import MusicQueueMapper
from app.core.mapper.music_queue_item import MusicQueueItemMapper
from app.core.mapper.song import SongMapper
from app.core.usecase.crud_music_queue_item import CRUDMusicQueueItem
from app.core.usecase.music_queue import MusicQueueService

from app.infra.repository.memory.song import SongRepository
from app.infra.repository.memory.music_queue_item import MusicQueueItemRepository
from app.infra.mapper.response.flask import FlaskResponseMapper

from app.utils.logger import Logger
logger = Logger()

queue_controller = Blueprint('queue', __name__, url_prefix='/queue')

song_repository = SongRepository()
music_queue_item_repository = MusicQueueItemRepository()
crud_music_queue_item = CRUDMusicQueueItem(music_queue_item_repository, song_repository)

music_queue_service = MusicQueueService(music_queue_item_repository)

@queue_controller.route('/', methods=['GET'])
def get_queue():
  try:
    result = music_queue_service.get_queue()
    return FlaskResponseMapper.success(MusicQueueMapper.to_response(result), "Found queue")
  except Exception as e:
    logger.log_error(e)
    return FlaskResponseMapper.bad_request(str(e))

@queue_controller.route('/like/<id>', methods=['PUT'])
def like_music_queue_item(id):
  try:
    music_queue_service.like_song(id)
    return FlaskResponseMapper.success(None, "Song liked")
  except Exception as e:
    logger.log_error(e)
    return FlaskResponseMapper.bad_request(str(e))
  
@queue_controller.route('/pop', methods=['DELETE'])
def pop_music_queue_item():
  try:
    result = music_queue_service.pop()
    return FlaskResponseMapper.success(MusicQueueItemMapper.to_dict(result), "Song popped")
  except Exception as e:
    logger.log_error(e)
    return FlaskResponseMapper.bad_request(str(e))
  
@queue_controller.route('/clear', methods=['DELETE'])
def clear_music_queue_item():
  try:
    music_queue_service.clear_queue()
    return FlaskResponseMapper.success(None, "Queue cleared")
  except Exception as e:
    logger.log_error(e)
    return FlaskResponseMapper.bad_request(str(e))
  
@queue_controller.route('/add', methods=['POST'])
def add_song_to_queue():
  data = request.json
  
  if not data or not any(key in data for key in ['song_id', 'song']):
    return FlaskResponseMapper.bad_request("Invalid keys. Expected: song_id or song, likes")
  
  # either song_id or song, likes must be present, not both
  try:
    # song_id case
    if 'song_id' in data and 'song' not in data:
      result = crud_music_queue_item.create_by_id(data['song_id'])
        
      if result is not None:
        queue_result = music_queue_service.get_queue()
        return FlaskResponseMapper.success(MusicQueueMapper.to_response(queue_result), "Music added to queue")
    # song case
    elif 'song' in data and 'song_id' not in data:
      result = crud_music_queue_item.create_by_song(SongMapper.from_request(data['song']))
      
      if result is not None:
        queue_result = music_queue_service.get_queue()
        return FlaskResponseMapper.success(MusicQueueMapper.to_response(queue_result), "Music added to queue")
    
  except Exception as e:
    logger.log_error(e)
    return FlaskResponseMapper.bad_request(str(e))
    
  return FlaskResponseMapper.bad_request("There was an error adding the music to the queue")
  
@queue_controller.route('/size', methods=['GET'])
def get_queue_size():
  try:
    result = music_queue_service.get_queue_size()
    return FlaskResponseMapper.success({"count": result}, "Queue size")
  except Exception as e:
    logger.log_error(e)
    return FlaskResponseMapper.bad_request(str(e))