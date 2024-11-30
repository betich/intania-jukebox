from flask import Blueprint,request
from app.infra.repository.memory.song import SongRepository
from app.core.usecase.crud_song import CRUDSong

song_controller = Blueprint('song', __name__, url_prefix='/song')

song_repository = SongRepository()
crud_song = CRUDSong(song_repository)

@song_controller.route('/', methods=['GET'])
def get_queue():
  return crud_song.find_all()

@song_controller.route('/<int:id>', methods=['GET'])
def get_queue_by_id(id):
  return crud_song.find_by_id(id)

@song_controller.route('/', methods=['POST'])
def create_queue():
  song = request.json
  return crud_song.create()

@song_controller.route('/<int:id>', methods=['PUT'])
def update_queue(id):
  new_music = request.json
  return crud_song.update(id, new_music)

@song_controller.route('/<int:id>', methods=['DELETE'])
def delete_queue(id):
  return crud_song.delete(id)