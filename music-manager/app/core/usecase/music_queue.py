from app.core.repository.music_queue_item import MusicQueueItemRepository
from app.core.entity.music_queue_item import MusicQueueItem
from app.core.entity.music_queue import MusicQueue
from app.core.entity.song import Song
from typing import List

class MusicQueueService():
  def __init__(self, music_queue_item_repository: MusicQueueItemRepository):
    self.music_queue_item_repository = music_queue_item_repository
    self.music_queue = MusicQueue()
    
  def _sync_queue(self) -> None:
    self.music_queue = MusicQueue()
    for music in self.music_queue_item_repository.find_all():
      self.music_queue.push(music)

  def get_queue(self) -> List[MusicQueueItem]:
    self._sync_queue()
    return self.music_queue.get_queue()
  
  def get_queue_size(self) -> int:
    self._sync_queue()
    return self.music_queue.get_queue_size()
  
  def add_song_to_queue(self, song: Song) -> None:
    self._sync_queue()
    music = MusicQueueItem(song)
    self.music_queue.push(music)
    self.music_queue_item_repository.create(music)
    
  def like_song(self, song_id: str) -> None:
    self._sync_queue()
    for music in self.music_queue.get_queue():
      if music.song.get_id() == song_id:
        music.like()
        self.music_queue_item_repository.update(song_id, {"likes": music.get_likes()})
        return
    raise Exception("Song not found in queue")
    
  def pop(self) -> MusicQueueItem:
    self._sync_queue()
    music = self.music_queue.pop()
    self.music_queue_item_repository.delete(music.song.get_id())
    return music
      
  def clear_queue(self) -> None:
    self.music_queue = MusicQueue()
    items = self.music_queue_item_repository.find_all()
    for item in items:
      self.music_queue_item_repository.delete(item.song.get_id())