from app.core.entity.music_queue import MusicQueue, MusicQueueItem
from app.core.entity.music import Music
import uuid
import pytest

def create_music():
  return Music(
    id="1",
    title="Music",
    artist="Artist",
    album="Album",
    release_date="2021-01-01",
    popularity=100,
    duration=90000,
    cover="https://cover.com"
  )

def test_queue_item():
  music = create_music()
  
  # add queue item
  queue_item = MusicQueueItem(music=music, id=str(uuid.uuid4()), likes=0)
  
  # empty id should generate a new one
  queue_item_empty_id = MusicQueueItem(music=music, likes=0)
  assert queue_item_empty_id.get_id() != None
  
  assert queue_item.get_id() != None
  assert queue_item.get_music() == music
  assert queue_item.get_likes() == 0
  
  # test empty music in queue item
  with pytest.raises(Exception):
    queue_item = MusicQueueItem(music=None, id=str(uuid.uuid4()), likes=0)
    
  # test invalid music in queue item
  with pytest.raises(Exception):
    queue_item = MusicQueueItem(music={}, id=str(uuid.uuid4()), likes=0)
  
  assert str(queue_item) == f"(MusicQueueItem: {music} | likes: 0)"

def test_push_queue():
  # user should be able to create a queue
  queue = MusicQueue()
  assert queue.get_queue() == []
  
  # user should be able to set new queue
  music = create_music()
  queue.push(music)
  
  assert queue.queue[0].get_music() == music
  
  del queue

def test_push_fail():
  queue = MusicQueue()
  
  with pytest.raises(Exception):
    queue.push(None)
    queue.push({})
    
  del queue
    
def test_pop_queue():
  queue = MusicQueue()
  music = create_music()
  music_2 = create_music()
  
  queue.push(music)
  queue.push(music_2)
  
  assert queue.pop().get_music() == music
  assert queue.pop().get_music() == music_2
  
def test_peek_queue():
  queue = MusicQueue()
  music = create_music()
  music_2 = create_music()
  
  queue.push(music)
  queue.push(music_2)
  
  assert queue.peek().get_music() == music
  
  del queue
  
def test_clear_queue():
  queue = MusicQueue()
  music = create_music()
  music_2 = create_music()
  
  queue.push(music)
  queue.push(music_2)
  
  queue.clear()
  
  assert queue.get_queue() == []
  
  del queue
  
def test_queue_size():
  queue = MusicQueue()
  music = create_music()
  music_2 = create_music()
  
  queue.push(music)
  
  assert queue.get_queue_size() == 1
  
  queue.push(music_2)
  
  assert queue.get_queue_size() == 2
  
  del queue
  
def test_queue_str():
  queue = MusicQueue()
  music = create_music()
  music_2 = create_music()
  
  queue.push(music)
  queue.push(music_2)
  
  assert str(queue) == f"MusicQueue: [(MusicQueueItem: {music} | likes: 0), (MusicQueueItem: {music_2} | likes: 0)]"
  
def test_queue_empty():
  queue = MusicQueue()
  
  assert queue.get_queue() == []
  assert queue.get_queue_size() == 0
  
  del queue