from app.core.entity.music import Music
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
    cover="Cover"
  )

def create_music_without_album():
  return Music(
    id="3",
    title="Music",
    artist="Artist",
    release_date="2021-01-01",
    popularity=100,
    duration=3650000,
    cover="Cover"
  )

def test_music():
  music = create_music()
  
  assert music.get_id() == "1"
  assert music.get_title() == "Music"
  assert music.get_artist() == "Artist"
  assert music.get_album() == "Album"
  assert music.get_release_date() == "2021-01-01"
  assert music.get_popularity() == 100
  assert music.get_duration() == 90000
  assert music.get_cover() == "Cover"
  assert str(music) == "Music - Artist"

def test_edit_music():
  music2 = create_music()
  music2.set_title("New Title")
  music2.set_artist("New Artist")
  music2.set_album("New Album")
  music2.set_release_date("2021-01-02")
  music2.set_popularity(200)
  music2.set_duration(100000)
  music2.set_cover("New Cover")
  
  assert music2.get_title() == "New Title"
  assert music2.get_artist() == "New Artist"
  assert music2.get_album() == "New Album"
  assert music2.get_release_date() == "2021-01-02"
  assert music2.get_popularity() == 200
  assert music2.get_duration() == 100000
  assert music2.get_cover() == "New Cover"
  assert str(music2) == "New Title - New Artist"
  
    
def test_empty_music():
  with pytest.raises(TypeError):  
    Music()
  
def test_music_without_album():  
  with pytest.raises(TypeError):
    create_music_without_album()
    
def test_compare_music():
  music1 = create_music()
  music2 = create_music()
  
  assert music1 == music2
  assert music1.get_id() == music2.get_id()
  
  music2.id = "2"
  assert music1 != music2
  assert music1.get_id() != music2.get_id()