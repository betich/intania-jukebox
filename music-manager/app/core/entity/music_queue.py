from app.core.entity.song import Song
from typing import List
from queue import PriorityQueue

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
    
    return self.id == other.id
  
  def get_song(self) -> Song:
    return self.song
  
  def get_likes(self) -> int:
    return self.likes
    
  def set_song(self, song: Song) -> None:
    self.song = song
  
  def set_likes(self, likes: int) -> None:
    self.likes = likes

class MusicQueue():
  def __init__(self):
    self.queue = PriorityQueue()
    
  def __str__(self) -> str:
    items = [str(item) for item in self.queue]
    return f"MusicQueue: [{", ".join(items)}]"
  
  def get_queue(self) -> List[MusicQueueItem]:
    # sort by likes
    return sorted(self.queue, key=lambda item: item.get_likes(), reverse=True)
  
  def get_queue_size(self) -> int:
    return self.queue.qsize()
    
  def push(self, item: MusicQueueItem) -> None:
    if not item:
      raise Exception("Item is required")
    
    if not isinstance(item, MusicQueueItem):
      raise Exception("Item should be an instance of MusicQueueItem")
    
    self.queue.put((item.get_likes(), item))
    
  def pop(self) -> MusicQueueItem:
    return self.queue.get()
  
  def clear(self) -> None:
    self.queue.empty()