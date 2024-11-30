from app.core.entity.music_queue_item import MusicQueueItem
from typing import Dict, List

MUSIC_QUEUE_ITEM_KEYS = ['song', 'likes']

class MusicQueueItemMapper():
  @staticmethod
  def to_entity(data: Dict) -> MusicQueueItem:
    if not all(key in data for key in MUSIC_QUEUE_ITEM_KEYS):
      raise Exception(f"Invalid keys. Expected: {MUSIC_QUEUE_ITEM_KEYS}")

    return MusicQueueItem(
      song=data['song'],
      likes=data['likes']
    )

  @staticmethod
  def to_dict(entity: MusicQueueItem) -> Dict:
    return {
      'song': entity.get_song(),
      'likes': entity.get_likes()
    }
    
  @staticmethod
  def to_dict_list(entities: List[MusicQueueItem]) -> List[Dict]:
    return [MusicQueueItemMapper.to_dict(entity) for entity in entities]
    
  @staticmethod
  def from_request(data: Dict) -> MusicQueueItem:
    return MusicQueueItemMapper.to_entity(data)
  
  @staticmethod
  def from_response(entity: MusicQueueItem) -> Dict:
    return MusicQueueItemMapper.to_dict(entity)