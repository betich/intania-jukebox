from abc import ABC, abstractmethod
from app.core.entity.song import Song

class SongRepository(ABC):
  @abstractmethod
  def find_all(self) -> list[Song]:
    pass

  @abstractmethod
  def find_by_id(self, id: str) -> Song:
    pass

  @abstractmethod
  def create(self, music: Song) -> Song:
    pass
  
  @abstractmethod
  def update(self, id: str, music: Song) -> Song:
    pass
  
  @abstractmethod
  def delete(self, id: str) -> None:
    pass
