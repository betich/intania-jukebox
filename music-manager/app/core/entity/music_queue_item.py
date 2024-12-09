from app.core.entity.song import Song
from functools import total_ordering
from itertools import count

iterator = count()

@total_ordering
class MusicQueueItem():
  def __init__(self, id: str, song: Song, likes: int = 0):
    if not song:
      raise Exception("Music is required")
    
    if not isinstance(song, Song):
      raise Exception("Music should be an instance of Music")
    self.id = id
    self.song = song
    self.likes = likes
    self.count = next(iterator)
    
  def __str__(self) -> str:
    return f"(MusicQueueItem: {self.song} | likes: {self.likes})"
  
  def __eq__(self, other) -> bool:
    if not isinstance(other, MusicQueueItem):
      return NotImplemented
    
    return self.song.get_id() == other.song.get_id()
  
  def __lt__(self, other) -> bool:
    if not isinstance(other, MusicQueueItem):
      return NotImplemented
    
    # sort by likes then count
    if self.likes == other.likes:
      return self.count < other.count
    return self.likes < other.likes
  
  def get_id(self) -> str:
    return self.id
  
  def get_song(self) -> Song:
    return self.song
  
  def get_likes(self) -> int:
    return self.likes
    
  def set_song(self, song: Song) -> None:
    self.song = song
  
  def set_likes(self, likes: int) -> None:
    self.likes = likes
    
  def like(self) -> None:
    self.likes += 1
    self.priority = -self.likes
    
  def to_dict(self) -> dict:
    return {
      'song': self.song.to_dict(),
      'likes': self.likes,
      'id': self.id
    }