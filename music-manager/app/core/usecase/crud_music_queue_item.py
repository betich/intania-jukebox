from app.core.entity.music_queue_item import MusicQueueItem
from app.core.repository.music_queue import MusicQueueItemRepository
from typing import List

class CRUDMusicQueueItem():
  def __init__(self, music_queue_item_repository: MusicQueueItemRepository):
    self.music_queue_item_repository = music_queue_item_repository

  def find_all(self) -> List[MusicQueueItem]:
    return self.music_queue_item_repository.find_all()

  def find_by_id(self, id: str) -> MusicQueueItem | None:
    return self.music_queue_item_repository.find_by_id(id)

  def create(self, music: MusicQueueItem) -> MusicQueueItem:
    if self.music_queue_item_repository.find_by_id(music.song.get_id()):
      raise Exception("Music already exists")
    
    return self.music_queue_item_repository.create(music)

  def update(self, id: str, new_music: dict) -> MusicQueueItem | None:
    return self.music_queue_item_repository.update(id, new_music)

  def delete(self, id: str) -> None:
    return self.music_queue_item_repository.delete(id)