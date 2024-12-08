from app.core.entity.music_queue_item import MusicQueueItem
from app.core.repository.music_queue_item import MusicQueueItemRepository
from app.core.repository.song import SongRepository
from typing import List
from app.infra.db.model import MusicQueueItem as MusicQueueItemModel
from app.infra.db.init import db
import uuid

class MusicQueueItemRepository(MusicQueueItemRepository):
  def __init__(self, song_repository: SongRepository):
    self.song_repository = song_repository
    
  def find_all(self) -> List[MusicQueueItem]:
    music_items = MusicQueueItemModel.query.all()
    
    items = []
    for item in music_items:
      song = self.song_repository.find_by_id(item.song_id)
      if song:
        items.append(MusicQueueItem(song, int(item.likes)))
    return items
  
  
  def find_by_id(self, id: str) -> MusicQueueItem | None:
    music_item = MusicQueueItemModel.query.filter_by(song_id=id).first()
    if music_item:
      song = self.song_repository.find_by_id(music_item.song_id)
      return MusicQueueItem(song, int(music_item.likes))
    return None
  
  def create(self, music: MusicQueueItem) -> MusicQueueItem:
    music_item = MusicQueueItemModel(
      song_id=music.get_song().get_id(),
      likes=music.get_likes(),
      id=str(uuid.uuid4())
    )
    db.session.add(music_item)
    db.session.commit()
    return music
  
  def update(self, id: str, new_music: dict) -> MusicQueueItem | None:
    music_item = MusicQueueItemModel.query.filter_by(song_id=id).first()
    if music_item:
      for key, value in new_music.items():
        if hasattr(music_item, key):
          setattr(music_item, key, value)
      db.session.commit()
      song = self.song_repository.find_by_id(music_item.song_id)
      return MusicQueueItem(song, music_item.likes)
  
  def delete(self, id: str) -> None:
    music_item = MusicQueueItemModel.query.filter_by(song_id=id).first()
    if music_item:
      db.session.delete(music_item)
      db.session.commit()
    return
  