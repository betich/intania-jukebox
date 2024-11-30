from app.core.entity.song import Song
from app.core.repository.song import SongRepository
from typing import List

song_list: List[Song] = []

class SongRepository(SongRepository):
  def __init__(self):
    pass
    
  def find_all(self) -> list[Song]:
    return song_list
  
  def find_by_id(self, id: str) -> Song | None:
    for song in song_list:
      if song.id == id:
        return song
    return None
  
  def create(self, song: Song) -> Song:
    song_list.append(song)
    return song
  
  def update(self, id: str, song: Song) -> Song | None:
    for index, song in enumerate(song_list):
      if song.id == id:
        song_list[index] = song
        return song
    return None
  
  def delete(self, id: str) -> None:
    for index, song in enumerate(song_list):
      if song.id == id:
        del song_list[index]
        return None
    return None
 