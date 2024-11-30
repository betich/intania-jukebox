from app.core.entity.music_queue import MusicQueueItem
from app.core.repository.music_queue import MusicQueueItemRepository

class MusicQueueItemRepository(MusicQueueItemRepository):
  def __init__(self):
    self._music_queue_item_list = []
    
  def find_all(self) -> MusicQueueItem:
    return self._music_queue_item_list
  
  def find_by_id(self, id: int) -> MusicQueueItem:
    for item in self._music_queue_item_list:
      if item.id == id:
        return item
    return None
  
  def create(self, music: MusicQueueItem) -> MusicQueueItem:
    self._music_queue_item_list.append(music)
    return music
  
  def update(self, music: MusicQueueItem) -> MusicQueueItem:
    for index, m in enumerate(self._music_queue_item_list):
      if m.id == music.id:
        self._music_queue_item_list[index] = music
        return music
    return None
  
  def delete(self, id: int) -> None:
    for index, item in enumerate(self._music_queue_item_list):
      if item.id == id:
        del self._music_queue_item_list[index]
        return None
    return