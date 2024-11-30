from app.core.entity.song import Song
from app.core.repository.song import SongRepository
from app.utils.singleton import Singleton

class SongRepository(Singleton, SongRepository):
  def __init__(self):
    self._song_list = []
    
  def find_all(self) -> list[Song]:
    return self._song_list
  
  def find_by_id(self, id: str) -> Song | None:
    for song in self._song_list:
      if song.id == id:
        return song
    return None
  
  def create(self, song: Song) -> Song:
    self._song_list.append(song)
    return song
  
  def update(self, id: str, song: Song) -> Song | None:
    for index, song in enumerate(self._song_list):
      if song.id == id:
        self._song_list[index] = song
        return song
    return None
  
  def delete(self, id: str) -> None:
    for index, song in enumerate(self._song_list):
      if song.id == id:
        del self._song_list[index]
        return None
    return None
 