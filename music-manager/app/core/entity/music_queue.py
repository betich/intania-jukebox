
from typing import List
from queue import PriorityQueue
from app.core.entity.music_queue_item import MusicQueueItem

class MusicQueue():
  def __init__(self):
    self.music_queue: PriorityQueue[MusicQueueItem] = PriorityQueue()
    
  def __str__(self) -> str:
    items = [str(item) for item in self.music_queue.queue]
    return f"MusicQueue: [{", ".join(items)}]"
  
  def get_queue(self) -> List[MusicQueueItem]:
    # sort by likes
    # return sorted(self.music_queue.queue, key=lambda item: item.get_likes(), reverse=True)
    return self.music_queue.queue
  
  def get_queue_size(self) -> int:
    return self.music_queue.qsize()
    
  def push(self, item: MusicQueueItem) -> None:
    if not item:
      raise Exception("Item is required")
    
    if not isinstance(item, MusicQueueItem):
      raise Exception("Item should be an instance of MusicQueueItem")
    
    self.music_queue.put(item)
    
  def pop(self) -> MusicQueueItem:
    return self.music_queue.get()
  
  def clear(self) -> None:
    self.music_queue.empty()