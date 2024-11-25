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
  
def create_music_hours():
  return Music(
    id="2",
    title="Music",
    artist="Artist",
    album="Album",
    release_date="2021-01-01",
    popularity=100,
    duration=3650000,
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
  assert music.get_duration_in_minutes_str() == "1:30"
  assert str(music) == "Music - Artist"
  assert music.get_info() == {
    "id": "1",
    "title": "Music",
    "artist": "Artist",
    "album": "Album",
    "release_date": "2021-01-01",
    "popularity": 100,
    "duration": 90000,
    "cover": "Cover"
  }
  
  music_hours = create_music_hours()
  assert music_hours.get_duration_in_minutes_str() == "1:00:50"
  
  with pytest.raises(TypeError):  
    Music()
  
  with pytest.raises(TypeError):
    create_music_without_album()