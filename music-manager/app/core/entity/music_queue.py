
from typing import List
from app.core.entity.music_queue_item import MusicQueueItem

class MusicQueue():
  def __init__(self):
    self.music_queue: List[MusicQueueItem] = [] # descending order
    
  def __str__(self) -> str:
    items = [str(item) for item in self.music_queue]
    return f"MusicQueue: [{', '.join(items)}]"
  
  def get_queue(self) -> List[MusicQueueItem]:
    # highest priority item from the list (likes -> count) in descending order
    return sorted(self.music_queue, reverse=True)
  
  def get_queue_size(self) -> int:
    return len(self.music_queue)
    
  def push(self, item: MusicQueueItem) -> None:
    if not item:
      raise Exception("Item is required")
    
    if not isinstance(item, MusicQueueItem):
      raise Exception("Item should be an instance of MusicQueueItem")
    
    # append item to the end of the list
    self.music_queue.append(item)
    
  def pop(self) -> MusicQueueItem:
    # remove the highest priority item from the list (likes -> count) in descending order
    highest_priority_item = self.get_queue()[0]
    
    index = self.music_queue.index(highest_priority_item) # find the index of the highest priority item
    self.music_queue = self.music_queue[:index] + self.music_queue[index+1:] # remove the highest priority item from the list

    return highest_priority_item
  
  def clear(self) -> None:
    self.music_queue.clear()
    
  def like(self, song_id: str) -> None:
    for item in self.music_queue:
      if item.song.get_id() == song_id:
        item.like()
        return
    raise Exception("Song not found in queue")