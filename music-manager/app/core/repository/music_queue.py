from abc import ABC, abstractmethod
from app.core.entity.music_queue import MusicQueueItem
from typing import List
  
class MusicQueueItemRepository(ABC):
  @abstractmethod
  def find_all(self) -> List[MusicQueueItem]:
    pass

  @abstractmethod
  def find_by_id(self, id: int) -> MusicQueueItem | None:
    pass

  @abstractmethod
  def create(self, music: MusicQueueItem) -> MusicQueueItem:
    pass
  
  @abstractmethod
  def update(self, id: int, new_music: dict) -> MusicQueueItem | None:
    pass
  
  @abstractmethod
  def delete(self, id: int) -> None:
    pass
  