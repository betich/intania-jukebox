from app.core.entity.music_queue import MusicQueueItem

class CRUDMusicQueueItem():
  def __init__(self, music_queue_item_repository):
    self.music_queue_item_repository = music_queue_item_repository

  def find_all(self) -> list[MusicQueueItem]:
    return self.music_queue_item_repository.find_all()

  def find_by_id(self, id: int) -> MusicQueueItem:
    return self.music_queue_item_repository.find_by_id(id)

  def create(self, music: MusicQueueItem) -> MusicQueueItem:
    return self.music_queue_item_repository.create(music)

  def update(self, music: MusicQueueItem) -> MusicQueueItem:
    return self.music_queue_item_repository.update(music)

  def delete(self, id: int) -> None:
    return self.music_queue_item_repository.delete(id)