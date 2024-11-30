from app.core.mapper.music_queue_item import MusicQueueItemMapper
from app.core.entity.music_queue_item import MusicQueueItem
from typing import List

class MusicQueueMapper():
  @staticmethod
  def to_response(entity: List[MusicQueueItem]) -> dict:
    queue_dict = [MusicQueueItemMapper.to_dict(item) for item in entity] 
    
    for item in queue_dict:
      item['position'] = queue_dict.index(item) + 1
    
    return {
      'queue': queue_dict,
      'size': len(entity)
    }