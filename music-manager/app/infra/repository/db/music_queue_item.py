from app.core.entity.music_queue_item import MusicQueueItem
from app.core.repository.music_queue_item import MusicQueueItemRepository
from app.core.repository.song import SongRepository
from typing import List
from app.infra.db.model import MusicQueueItem as MusicQueueItemModel, PlayedSong
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
        items.append(MusicQueueItem(item.id, song, int(item.likes)))
    return items
  
  
  def find_by_id(self, id: str) -> MusicQueueItem | None:
    music_item = MusicQueueItemModel.query.filter_by(song_id=id).first()
    if music_item:
      song = self.song_repository.find_by_id(music_item.song_id)
      return MusicQueueItem(music_item.id, song, int(music_item.likes))
    return None
  
  def create(self, music: MusicQueueItem) -> MusicQueueItem:
    music_item = MusicQueueItemModel(
      song_id=music.get_song().get_id(),
      likes=music.get_likes(),
      id=music.get_id()
    )
    db.session.add(music_item)
    db.session.commit()
    return music
  
  def update(self, song_id: str, new_music: dict) -> MusicQueueItem | None:
    success = MusicQueueItemModel.query.filter_by(song_id=song_id).update(new_music)
    db.session.commit()
    
    if success:
      song = self.song_repository.find_by_id(song_id)
      music_item = MusicQueueItemModel.query.filter_by(song_id=song_id).first()
      if music_item:
        return MusicQueueItem(music_item.id, song, int(music_item.likes))
    return None
  
  def delete(self, id: str) -> None:
    music_item = MusicQueueItemModel.query.filter_by(song_id=id).first()
    
    MusicQueueItemModel.query.filter_by(song_id=id).delete()
    db.session.commit()
    
    if music_item:
      played_song = PlayedSong(
        song_id=id,
        likes=music_item.likes,
        id=str(uuid.uuid4())
      )
      
      db.session.add(played_song)
      db.session.commit()
    
    return
  