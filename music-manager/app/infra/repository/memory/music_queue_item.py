from app.core.entity.music_queue_item import MusicQueueItem
from app.core.repository.music_queue_item import MusicQueueItemRepository
from app.core.repository.song import SongRepository
from typing import List
from dataclasses import dataclass

@dataclass
class MusicQueueItemMemory():
  song_id: str
  likes: int

music_queue_item_list: List[MusicQueueItemMemory] = []

class MusicQueueItemRepository(MusicQueueItemRepository):
  def __init__(self, song_repository: SongRepository):
    self.song_repository = song_repository
    
  def find_all(self) -> List[MusicQueueItem]:
    items = []
    for item in music_queue_item_list:
      song = self.song_repository.find_by_id(item.song_id)
      if song:
        items.append(MusicQueueItem(song, item.likes))
    return items
  
  def find_by_id(self, id: str) -> MusicQueueItem | None:
    for item in music_queue_item_list:
      if item.song_id == id:
        return MusicQueueItem(self.song_repository.find_by_id(item.song_id), item.likes)
    return None
  
  def create(self, music: MusicQueueItem) -> MusicQueueItem:
    item_in_memory = MusicQueueItemMemory(music.get_song().get_id(), music.get_likes())
    music_queue_item_list.append(item_in_memory)
    return music
  
  def update(self, id: str, new_music: dict) -> MusicQueueItem | None:
    # change the music queue item with the given id by the key-value pairs in new_music
    for _, item in enumerate(music_queue_item_list):
      if item.song_id == id:
        for key, value in new_music.items():
          if hasattr(item, key):
            setattr(item, key, value)
        return MusicQueueItem(self.song_repository.find_by_id(item.song_id), item.likes)
  
  def delete(self, id: str) -> None:
    for index, item in enumerate(music_queue_item_list):
      if item.song_id == id:
        del music_queue_item_list[index]
        return None
    return