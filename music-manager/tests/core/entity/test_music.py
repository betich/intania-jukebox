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
    cover="Cover"
  )

def create_song_without_album():
  return Song(
    id="3",
    title="Music",
    artist="Artist",
    release_date="2021-01-01",
    popularity=100,
    duration=3650000,
    cover="Cover"
  )

def test_song():
  music = create_song()
  
  assert music.get_id() == "1"
  assert music.get_title() == "Music"
  assert music.get_artist() == "Artist"
  assert music.get_album() == "Album"
  assert music.get_release_date() == "2021-01-01"
  assert music.get_popularity() == 100
  assert music.get_duration() == 90000
  assert music.get_cover() == "Cover"
  assert str(music) == "Music - Artist"

def test_edit_song():
  song2 = create_song()
  song2.set_title("New Title")
  song2.set_artist("New Artist")
  song2.set_album("New Album")
  song2.set_release_date("2021-01-02")
  song2.set_popularity(200)
  song2.set_duration(100000)
  song2.set_cover("New Cover")
  
  assert song2.get_title() == "New Title"
  assert song2.get_artist() == "New Artist"
  assert song2.get_album() == "New Album"
  assert song2.get_release_date() == "2021-01-02"
  assert song2.get_popularity() == 200
  assert song2.get_duration() == 100000
  assert song2.get_cover() == "New Cover"
  assert str(song2) == "New Title - New Artist"
  
    
def test_empty_song():
  with pytest.raises(TypeError):  
    Song()
  
def test_song_without_album():  
  with pytest.raises(TypeError):
    create_song_without_album()
    
def test_compare_song():
  song1 = create_song()
  song2 = create_song()
  
  assert song1 == song2
  assert song1.get_id() == song2.get_id()
  
  song2.id = "2"
  assert song1 != song2
  assert song1.get_id() != song2.get_id()