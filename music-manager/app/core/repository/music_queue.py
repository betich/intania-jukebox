from abc import ABC, abstractmethod
from app.core.entity.music_queue import MusicQueue, MusicQueueItem

class MusicQueueRepository(ABC):
  @abstractmethod
  def find_all(self) -> MusicQueue:
    pass

  @abstractmethod
  def find_by_id(self, id: int) -> MusicQueueItem:
    pass

  @abstractmethod
  def create(self, music: MusicQueueItem) -> MusicQueueItem:
    pass
  
  @abstractmethod
  def update(self, music: MusicQueueItem) -> MusicQueueItem:
    pass
  
  @abstractmethod
  def delete(self, id: int) -> None:
    pass