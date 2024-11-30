from app.core.entity.music_queue_item import MusicQueueItem
from app.core.repository.music_queue_item import MusicQueueItemRepository
from app.core.repository.song import SongRepository
from app.core.entity.song import Song
from typing import List

class CRUDMusicQueueItem():
  def __init__(self, music_queue_item_repository: MusicQueueItemRepository, song_repository: SongRepository):
    self.music_queue_item_repository = music_queue_item_repository
    self.song_repository = song_repository

  def find_all(self) -> List[MusicQueueItem]:
    return self.music_queue_item_repository.find_all()

  def find_by_id(self, id: str) -> MusicQueueItem | None:
    return self.music_queue_item_repository.find_by_id(id)

  def create_by_id(self, song_id: str) -> MusicQueueItem:
    song = self.song_repository.find_by_id(song_id)
    if not song:
      raise Exception("Song not found")
    
    song_in_queue = self.find_by_id(song_id)
    if song_in_queue:
      raise Exception("Song already in queue")
    
    music = MusicQueueItem(song)
    return self.music_queue_item_repository.create(music)
  
  def create_by_song(self, song: Song) -> MusicQueueItem:
    song_in_queue = self.find_by_id(song.get_id())
    if song_in_queue:
      raise Exception("Song already in queue")
    
    # check if song exists in the song repository
    if not self.song_repository.find_by_id(song.get_id()):
      # if not, create it
      self.song_repository.create(song)
    
    music = MusicQueueItem(song)
    return self.music_queue_item_repository.create(music)

  def update(self, id: str, new_music: dict) -> MusicQueueItem | None:
    return self.music_queue_item_repository.update(id, new_music)

  def delete(self, id: str) -> None:
    return self.music_queue_item_repository.delete(id)