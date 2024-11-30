from abc import ABC, abstractmethod
from app.core.entity.music_queue import MusicQueueItem
  
class MusicQueueItemRepository(ABC):
  @abstractmethod
  def find_all(self) -> MusicQueueItem:
    pass

  @abstractmethod
  def find_by_id(self, id: int) -> MusicQueueItem:
    pass

  @abstractmethod
  def create(self, music: MusicQueueItem) -> MusicQueueItem:
    pass
  
  @abstractmethod
  def update(self, id: int, new_music: dict) -> MusicQueueItem:
    pass
  
  @abstractmethod
  def delete(self, id: int) -> None:
    pass
  