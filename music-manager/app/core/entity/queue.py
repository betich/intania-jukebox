from app.core.entity.music import Music
from typing import List

class Queue():
  def __init__(self, queue=List[Music]):
    self.queue = queue
    
  def __str__(self) -> str:
    return f"Queue: {",".join(self.queue)}"
  
  def add(self, music: Music) -> None:
    self.queue.append(music)
    
  def remove(self, music: Music) -> None:
    self.queue.remove(music)
    
  def clear(self) -> None:
    self.queue.clear()
    
  def get(self, index: int) -> Music:
    return self.queue[index]
  
  def size(self) -> int:
    return len(self.queue)