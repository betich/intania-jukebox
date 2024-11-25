from app.core.entity.queue import Queue, QueueItem
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
  queue_item = QueueItem(music=music, position=1, id=str(uuid.uuid4()), likes=0)
  
  assert queue_item.get_id() != None
  assert queue_item.get_music() == music
  assert queue_item.get_position() == 1
  assert queue_item.get_likes() == 0
  
  # test empty music in queue item
  with pytest.raises(Exception):
    queue_item = QueueItem(music=None, position=1, id=str(uuid.uuid4()), likes=0)
    
  # test like
  queue_item.like()
  assert queue_item.get_likes() == 1
  
  # test reset likes
  queue_item.reset_likes()
  assert queue_item.get_likes() == 0
  
  # test get info
  assert queue_item.get_info() == {
    "id": queue_item.get_id(),
    "music": music.get_info(),
    "position": 1,
    "likes": 0
  }
  
  assert str(queue_item) == f"QueueItem: {music} | pos: 1 | likes: 0"

def test_add_music_to_queue():
  # user should be able to create a queue
  queue = Queue()
  assert queue.get_queue() == []
  
  # user should be able to add music to the queue
  music = create_music()
  queue.add_music(music)
  
  assert len(queue.get_queue()) == 1
  assert queue.get_queue()[0].get_music() == music
  assert queue.get_queue()[0].get_position() == 1
  assert queue.get_queue()[0].get_likes() == 0
  assert queue.get_queue()[0].get_id() != None
  assert queue.get_queue()[0].get_info() == {
    "id": queue.get_queue()[0].get_id(),
    "music": music.get_info(),
    "position": 1,
    "likes": 0
  }
  
  music_2 = Music(
    id="2",
    title="Music 2",
    artist="Artist 2",
    album="Album 2",
    release_date="2021-01-01",
    popularity=100,
    duration=90000,
    cover="https://cover.com"
  )
  
  queue.add_music(music_2)
  assert len(queue.get_queue()) == 2
  
  assert queue.get_queue()[1].get_music() == music_2
  assert queue.get_queue()[1].get_position() == 2
  assert queue.get_queue()[1].get_likes() == 0
  assert queue.get_queue()[1].get_id() != None
  assert queue.get_queue()[1].get_info() == {
    "id": queue.get_queue()[1].get_id(),
    "music": music_2.get_info(),
    "position": 2,
    "likes": 0
  }
  
  del queue

def test_remove_music_from_queue():
  # user should be able to remove music from the queue
  queue_a = Queue()
  music = create_music()
  queue_a.add_music(music)
  
  assert len(queue_a.get_queue()) == 1
  
  queue_a.remove(queue_a.get_queue()[0])
  
  assert len(queue_a.get_queue()) == 0
  
  # test remove non existing item
  with pytest.raises(Exception):
    queue_a.remove(queue_a.get_queue()[0])
    
  del queue_ag
