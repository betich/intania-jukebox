import math

class Music():
  def __init__(self, id: str, title: str, artist: str, album: str, release_date: str, popularity: int, duration: int, cover: str):
    self.id = id
    self.title = title
    self.artist = artist
    self.duration = duration
    self.cover = cover
    # optional - for analysis
    self.album = album
    self.popularity = popularity
    self.release_date = release_date
  
  def __str__(self) -> str:
    return f"{self.title} - {self.artist}"
  
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
  
  def get_duration(self) -> str:
    return self.duration
  
  def get_duration_in_minutes_str(self) -> str:
    ms = self.duration
    
    hours = math.floor(ms // 3.6e6)
    minutes = math.floor((ms % 3.6e6) // 60000)
    seconds = math.floor(((ms % 3.6e6) % 60000) // 1000)
    
    if hours > 0:
      return f"{hours}:{minutes:02}:{seconds:02}"
    else:
      return f"{minutes}:{seconds:02}"
  
  def get_cover(self) -> str:
    return self.cover
  
  def get_info(self) -> dict:
    return {
      "id": self.id,
      "title": self.title,
      "artist": self.artist,
      "album": self.album,
      "release_date": self.release_date,
      "popularity": self.popularity,
      "duration": self.duration,
      "cover": self.cover
    }
