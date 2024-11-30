from app.core.entity.song import Song
from typing import Dict, List

SONG_KEYS = ["id", "title", "artist", "album", "release_date", "popularity", "duration", "cover"]

class SongMapper():
  def __init__(self):
    pass
  
  @staticmethod
  def to_entity(song: Dict) -> Song:
    # check if all keys are present
    for key in SONG_KEYS:
      if key not in song:
        raise Exception(f"Key {key} is missing in song")
    
    return Song(
      id=song['id'],
      title=song['title'],
      artist=song['artist'],
      album=song['album'],
      release_date=song['release_date'],
      popularity=song['popularity'],
      duration=song['duration'],
      cover=song['cover']
    )
  
  @staticmethod
  def to_dict(song: Song) -> Dict:
    return {
      "id": song.get_id(),
      "title": song.get_title(),
      "artist": song.get_artist(),
      "album": song.get_album(),
      "release_date": song.get_release_date(),
      "popularity": song.get_popularity(),
      "duration": song.get_duration(),
      "cover": song.get_cover()
    }
    
  @staticmethod
  def to_dict_list(songs: List[Song]) -> List[Dict]:
    return [SongMapper.to_dict(song) for song in songs]
  
  @staticmethod
  def from_request(song: Dict) -> Song:
    return SongMapper.to_entity(song)
  
  @staticmethod
  def from_response(song: Song) -> Dict:
    return SongMapper.to_dict(song)
