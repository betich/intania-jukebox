from flask import Blueprint,request

from app.core.usecase.crud_song import CRUDSong
from app.core.mapper.song import SongMapper

from app.infra.repository.memory.song import SongRepository
from app.infra.mapper.response.flask import FlaskResponseMapper

from app.utils.logger import Logger
logger = Logger()

song_controller = Blueprint('song', __name__, url_prefix='/song')

song_repository = SongRepository()
crud_song = CRUDSong(song_repository)

@song_controller.route('/', methods=['GET'])
def get_queue():
  result = crud_song.find_all()
  
  if not result:
    return FlaskResponseMapper.resource_not_found("No song found")
  else:
    return FlaskResponseMapper.success(SongMapper.to_dict_list(result), "Success")

@song_controller.route('/new', methods=['POST'])
def create_queue():
  data = request.json
  
  if not data or not all(key in data for key in ['title', 'artist', 'album', 'release_date', 'popularity', 'duration', 'cover']):
    return FlaskResponseMapper.bad_request("Invalid keys. Expected: title, artist, album, release_date, popularity, duration, cover")
  
  try:
    result = crud_song.create(SongMapper.from_request(data))
    
    if result is not None:
      return FlaskResponseMapper.success(SongMapper.to_dict(result), "Song added to database")
  
  except Exception as e:
    logger.log_error(e)
    return FlaskResponseMapper.bad_request(str(e))
  
  return FlaskResponseMapper.bad_request("There was an error adding the song")

@song_controller.route('/<id>', methods=['GET'])
def get_queue_by_id(id):
  result = crud_song.find_by_id(id)
  
  if result is None:
    return FlaskResponseMapper.resource_not_found(f"Song id {id} not found")
  else:
    return FlaskResponseMapper.success(SongMapper.to_dict(result), "Success")

@song_controller.route('/<id>', methods=['PUT'])
def update_queue(id):
  data = request.json
  
  if not data or not all(key in data for key in ['title', 'artist', 'album', 'release_date', 'popularity', 'duration', 'cover']):
    return FlaskResponseMapper.bad_request("Invalid keys. Expected: title, artist, album, release_date, popularity, duration, cover")
  
  try:
    result = crud_song.update(id, data)
    
    if result is None:
      return FlaskResponseMapper.bad_request("Song not found")
    
    return FlaskResponseMapper.success(SongMapper.to_dict(result), "Song updated")
  
  except Exception as e:
    logger.log_error(e)
    return FlaskResponseMapper.bad_request(str(e))

@song_controller.route('/<id>', methods=['DELETE'])
def delete_queue(id):
  crud_song.delete(id)
  return FlaskResponseMapper.success(None, "Song deleted")