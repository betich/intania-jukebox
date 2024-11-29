from app.core.entity.music import Music
from typing import List
import uuid
from collections import deque

class MusicQueueItem():
  def __init__(self, music: Music, id: str = None, likes: int = 0):
    if not music:
      raise Exception("Music is required")
    
    if not isinstance(music, Music):
      raise Exception("Music should be an instance of Music")
    
    if not id:
      self.id = str(uuid.uuid4())
    else:
      self.id = id
    
    self.music = music
    self.likes = likes
    
  def __str__(self) -> str:
    return f"(MusicQueueItem: {self.music} | likes: {self.likes})"
  
  def __eq__(self, other) -> bool:
    if not isinstance(other, MusicQueueItem):
      return False
    
    return self.id == other.id
  
  def get_id(self) -> str:
    return self.id
  
  def get_music(self) -> Music:
    return self.music
  
  def get_likes(self) -> int:
    return self.likes
    
  def set_music(self, music: Music) -> None:
    self.music = music
  
  def set_likes(self, likes: int) -> None:
    self.likes = likes

class MusicQueue():
  def __init__(self):
    self.queue = deque()
    
  def __str__(self) -> str:
    items = [str(item) for item in self.queue]
    return f"MusicQueue: [{", ".join(items)}]"
  
  def get_queue(self) -> List[MusicQueueItem]:
    return list(self.queue)
  
  def get_queue_size(self) -> int:
    return len(self.queue)
  
  def push(self, music: Music) -> None:
    if not music:
      raise Exception("Music is required")
    
    if not isinstance(music, Music):
      raise Exception("Music should be an instance of Music")
    
    self.queue.append(MusicQueueItem(music))
    
  def pop(self) -> MusicQueueItem:
    return self.queue.pop()
  
  def peek(self) -> MusicQueueItem:
    return self.queue[-1]
  
  def clear(self) -> None:
    self.queue.clear()
  
  def remove(self, id: str) -> None:
    if not id:
      raise Exception("ID is required")
    
    for item in self.queue:
      if item.get_id() == id:
        self.queue.remove(item)
        return
      
    raise Exception("Item not found")
  