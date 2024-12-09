# from typing import List
# from typing import Optional
from typing import Any
from app.infra.db.init import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy import String, Numeric, DateTime, Column
from sqlalchemy.sql import func

class Song(db.Model):
  __tablename__ = 'songs'
  
  id: Mapped[str] = mapped_column(String, primary_key=True)
  title: Mapped[str] = mapped_column(String)
  artist: Mapped[str] = mapped_column(String)
  duration: Mapped[int] = mapped_column(Numeric)
  cover: Mapped[str] = mapped_column(String)
  album: Mapped[str] = mapped_column(String)
  uri: Mapped[str] = mapped_column(String)
  popularity: Mapped[int] = mapped_column(Numeric)
  release_date: Mapped[str] = mapped_column(String)
  created_at: Mapped[str] = mapped_column(DateTime)
  updated_at: Mapped[str] = mapped_column(DateTime)
  music_queue_items = relationship('MusicQueueItem', back_populates='song')
  
  def __repr__(self) -> str:
    return f'<Song {self.id}>'
  
class MusicQueueItem(db.Model):
  __tablename__ = 'music_queue_items'
  
  id: Mapped[str] = mapped_column(db.UUID, primary_key=True, unique=True)
  song_id: Mapped[str] = mapped_column(String, ForeignKey('songs.id'))
  likes: Mapped[int] = mapped_column(Numeric)
  song = relationship('Song', back_populates='music_queue_items')
  
  def __repr__(self) -> str:
    return f'<MusicQueueItem {self.id}>'
  
class PlayedSong(db.Model):
  __tablename__ = 'played_songs'
  
  id: Mapped[str] = mapped_column(db.UUID, primary_key=True, unique=True)
  likes: Mapped[int] = mapped_column(Numeric)
  song_id: Mapped[str] = mapped_column(String, ForeignKey('songs.id'))
  played_at: Mapped[str] = mapped_column(DateTime, default=func.now())
  song = relationship('Song')
  
  def __repr__(self) -> str:
    return f'<PlayedSongs {self.id}>'