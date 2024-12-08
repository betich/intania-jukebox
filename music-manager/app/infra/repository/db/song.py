from app.core.entity.song import Song
from app.core.repository.song import SongRepository
from typing import List
from app.infra.db.model import Song as SongModel
from app.infra.db.init import db
from sqlalchemy.sql import func

class SongRepository(SongRepository):
  def __init__(self):
    pass
  
  def find_all(self) -> List[Song]:
    songs = []
    result = SongModel.query.all()

    for song in result:
      songs.append(Song(
        id=song.id,
        title=song.title,
        artist=song.artist,
        duration=song.duration,
        cover=song.cover,
        album=song.album,
        popularity=song.popularity,
        release_date=song.release_date
      ))
    
    return songs
  
  def find_by_id(self, id: str) -> Song | None:
    song = SongModel.query.filter_by(id=id).first()
    return Song(
      id=song.id,
      title=song.title,
      artist=song.artist,
      duration=song.duration,
      cover=song.cover,
      album=song.album,
      popularity=song.popularity,
      release_date=song.release_date
    ) if song else None 
  
  def create(self, song: Song) -> Song:
    song_model = SongModel(
      id=song.id,
      title=song.title,
      artist=song.artist,
      duration=song.duration,
      cover=song.cover,
      album=song.album,
      popularity=song.popularity,
      release_date=song.release_date,
      created_at=func.now(),
      updated_at=func.now()
    )
  
    db.session.add(song_model)
    db.session.commit()
    return song
  
  def update(self, id: str, song: Song) -> Song | None:
    song_model = SongModel.query.filter_by(id=id).first()
    if song_model:
      song_model.title = song.title
      song_model.artist = song.artist
      song_model.duration = song.duration
      song_model.cover = song.cover
      song_model.album = song.album
      song_model.popularity = song.popularity
      song_model.release_date = song.release_date
      song_model.updated_at = func.now()
      db.session.commit()
      return Song(
        id=song_model.id,
        title=song_model.title,
        artist=song_model.artist,
        duration=song_model.duration,
        cover=song_model.cover,
        album=song_model.album,
        popularity=song_model.popularity,
        release_date=song_model.release_date
      )
    return None
  
  def delete(self, id: str) -> None:
    song_model = SongModel.query.filter_by(id=id).first()
    if song_model:
      db.session.delete(song_model)
      db.session.commit()
    return None