from app.core.entity.song import Song
from app.core.repository.song import SongRepository

class CRUDSong():
  def __init__(self, song_repository: SongRepository):
    self.song_repository = song_repository

  def find_all(self) -> list[Song]:
    return self.song_repository.find_all()

  def find_by_id(self, id: int) -> Song:
    return self.song_repository.find_by_id(id)

  def create(self, song: Song) -> Song:
    return self.song_repository.create(song)

  def update(self, song: Song) -> Song:
    return self.song_repository.update(song)

  def delete(self, id: int) -> None:
    return self.song_repository.delete(id)