from dataclasses import dataclass

@dataclass
class Song():
  def __init__(self, id: str, title: str, artist: str, album: str, release_date: str, popularity: int, duration: int, cover: str, uri: str):
    self.id = id
    self.title = title
    self.artist = artist
    self.duration = duration
    self.cover = cover
    # optional - for analysis
    self.album = album
    self.popularity = popularity
    self.release_date = release_date
    self.uri = uri
  
  def __str__(self) -> str:
    return f"{self.title} - {self.artist}"
  
  def __eq__(self, other) -> bool:
    if not isinstance(other, Song):
      return False
    
    return self.id == other.id
  
  def get_id(self) -> str:
    return self.id
  
  def get_title(self) -> str:
    return self.title
  
  def get_artist(self) -> str:
    return self.artist
  
  def get_album(self) -> str:
    return self.album
  
  def get_release_date(self) -> str:
    return self.release_date
  
  def get_popularity(self) -> int:
    return self.popularity
  
  def get_duration(self) -> int:
    return self.duration
  
  def get_cover(self) -> str:
    return self.cover
  
  def get_uri(self) -> str:
    return self.uri
  
  def set_title(self, title: str) -> None:
    self.title = title
    
  def set_artist(self, artist: str) -> None:
    self.artist = artist
    
  def set_album(self, album: str) -> None:
    self.album = album
    
  def set_release_date(self, release_date: str) -> None:
    self.release_date = release_date
    
  def set_popularity(self, popularity: int) -> None:
    self.popularity = popularity
    
  def set_duration(self, duration: int) -> None:
    self.duration = duration

  def set_cover(self, cover: str) -> None:
    self.cover = cover
    
  def set_uri(self, uri: str) -> None:
    self.uri = uri
    
  def to_dict(self) -> dict:
    return {
      'id': self.id,
      'title': self.title,
      'artist': self.artist,
      'album': self.album,
      'release_date': self.release_date,
      'popularity': self.popularity,
      'duration': self.duration,
      'cover': self.cover,
      'uri': self.uri
    }