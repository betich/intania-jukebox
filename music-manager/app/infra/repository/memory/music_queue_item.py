from app.core.entity.music_queue_item import MusicQueueItem
from app.core.repository.music_queue_item import MusicQueueItemRepository
from typing import List

music_queue_item_list: List[MusicQueueItem] = []

class MusicQueueItemRepository(MusicQueueItemRepository):
  def __init__(self):
    pass
    
  def find_all(self) -> List[MusicQueueItem]:
    return music_queue_item_list
  
  def find_by_id(self, id: str) -> MusicQueueItem | None:
    for item in music_queue_item_list:
      if item.get_song().get_id() == id:
        return item
    return None
  
  def create(self, music: MusicQueueItem) -> MusicQueueItem:
    music_queue_item_list.append(music)
    return music
  
  def update(self, id: str, new_music: dict) -> MusicQueueItem | None:
    # change the music queue item with the given id by the key-value pairs in new_music
    for _, item in enumerate(music_queue_item_list):
      if item.get_song().get_id() == id:
        for key, value in new_music.items():
          if hasattr(item, key):
            setattr(item, key, value)
        return item
  
  def delete(self, id: str) -> None:
    for index, item in enumerate(music_queue_item_list):
      if item.get_song().get_id() == id:
        del music_queue_item_list[index]
        return None
    return