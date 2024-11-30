from app.core.entity.music_queue import MusicQueueItem
from app.core.repository.music_queue import MusicQueueItemRepository

class CRUDMusicQueueItem():
  def __init__(self, music_queue_item_repository: MusicQueueItemRepository):
    self.music_queue_item_repository = music_queue_item_repository

  def find_all(self) -> list[MusicQueueItem]:
    return self.music_queue_item_repository.find_all()

  def find_by_id(self, id: int) -> MusicQueueItem:
    return self.music_queue_item_repository.find_by_id(id)

  def create(self, music: MusicQueueItem) -> MusicQueueItem:
    return self.music_queue_item_repository.create(music)

  def update(self, id: int, new_music: dict) -> MusicQueueItem:
    return self.music_queue_item_repository.update(id, new_music)

  def delete(self, id: int) -> None:
    return self.music_queue_item_repository.delete(id)