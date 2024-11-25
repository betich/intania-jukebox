from app.core.entity.music import Music
from typing import List
import math

class QueueItem():
  def __init__(self, music: Music, position: int, id: str = None, likes: int = 0):
    self.id = id
    self.music = music
    self.position = position
    self.likes = likes
    
  def __str__(self) -> str:
    return f"QueueItem: {self.music} - {self.position} - {self.likes}"
  
  def get_id(self) -> str:
    return self.id
  
  def get_music(self) -> Music:
    return self.music
  
  def get_position(self) -> int:
    return self.position
  
  def get_likes(self) -> int:
    return self.likes
  
  def like(self) -> None:
    self.likes += 1
    
  def reset_likes(self) -> None:
    self.likes = 0
    
  def get_info(self) -> dict:
    return {
      "id": self.id,
      "music": self.music.get_info(),
      "position": self.position,
      "likes": self.likes
    }

class Queue():
  def __init__(self, queue=List[QueueItem]):
    self.queue = queue
    
  def __str__(self) -> str:
    return f"Queue: {",".join(self.queue)}"
  
  def get_queue(self) -> List[QueueItem]:
    return self.queue
  
  def add(self, queue_item: QueueItem) -> None:
    self.queue.append(queue_item)
    
  def remove(self, queue_item: QueueItem) -> None:
    self.queue.remove(queue_item)
    
  def get_info(self) -> dict:
    return {
      "queue": [queue_item.get_info() for queue_item in self.queue]
    }
    
  def get_queue_length(self) -> int:
    return len(self.queue)