from app.core.entity.music_queue import MusicQueueItem
from app.core.repository.music_queue import MusicQueueItemRepository
from typing import List

class MusicQueueItemRepository(MusicQueueItemRepository):
  def __init__(self):
    self._music_queue_item_list: List[MusicQueueItem] = []
    
  def find_all(self) -> List[MusicQueueItem]:
    return self._music_queue_item_list
  
  def find_by_id(self, id: int) -> MusicQueueItem | None:
    for item in self._music_queue_item_list:
      if item.get_song().get_id() == id:
        return item
    return None
  
  def create(self, music: MusicQueueItem) -> MusicQueueItem:
    self._music_queue_item_list.append(music)
    return music
  
  def update(self, id: int, new_music: dict) -> MusicQueueItem | None:
    # change the music queue item with the given id by the key-value pairs in new_music
    for _, item in enumerate(self._music_queue_item_list):
      if item.get_song().get_id() == id:
        for key, value in new_music.items():
          if hasattr(item, key):
            setattr(item, key, value)
        return item
  
  def delete(self, id: int) -> None:
    for index, item in enumerate(self._music_queue_item_list):
      if item.get_song().get_id() == id:
        del self._music_queue_item_list[index]
        return None
    return