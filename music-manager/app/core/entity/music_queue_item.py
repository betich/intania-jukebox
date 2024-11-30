from app.core.entity.song import Song
from dataclasses import dataclass

@dataclass
class MusicQueueItem():
  def __init__(self, song: Song, likes: int = 0):
    if not song:
      raise Exception("Music is required")
    
    if not isinstance(song, Song):
      raise Exception("Music should be an instance of Music")
    
    self.song = song
    self.likes = likes
    
  def __str__(self) -> str:
    return f"(MusicQueueItem: {self.song} | likes: {self.likes})"
  
  def __eq__(self, other) -> bool:
    if not isinstance(other, MusicQueueItem):
      return False
    
    return self.song.get_id() == other.song.get_id()
  
  def __gt__(self, other) -> bool:
    if not isinstance(other, MusicQueueItem):
      return False
    
    return self.likes > other.likes
  
  def __lt__(self, other) -> bool:
    if not isinstance(other, MusicQueueItem):
      return False
    
    return self.likes < other.likes
  
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