from app.core.entity.music_queue_item import MusicQueueItem
from app.core.entity.song import Song
import pytest

def create_song():
  return Song(
    id="1",
    title="Music",
    artist="Artist",
    album="Album",
    release_date="2021-01-01",
    popularity=100,
    duration=90000,
    cover="https://cover.com",
    uri="spotify:track:46kspZSY3aKmwQe7O77fCC"
  )

def test_queue_item():
  song = create_song()
  
  # add queue item
  queue_item = MusicQueueItem(id="3", song=song, likes=0)
  
  assert queue_item.get_song() == song
  assert queue_item.get_likes() == 0
  
  # test empty music in queue item
  with pytest.raises(Exception):
    queue_item = MusicQueueItem(song=None, likes=0) # type: ignore
    
  # test invalid music in queue item
  with pytest.raises(Exception):
    queue_item = MusicQueueItem(song={}, likes=0) # type: ignore
  
  assert str(queue_item) == f"(MusicQueueItem: {song} | likes: 0)"#

