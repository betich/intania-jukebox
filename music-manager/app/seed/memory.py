from app.core.mapper.song import Song
from app.core.usecase.crud_music_queue_item import CRUDMusicQueueItem
from app.core.usecase.music_queue import MusicQueueService
from app.infra.repository.memory.song import SongRepository
from app.infra.repository.memory.music_queue_item import MusicQueueItemRepository
import uuid

SONGS = [
    Song(
      id=uuid.uuid4().hex,
      title='song 1',
      artist='artist 1',
      duration=66000,
      cover='https://i.scdn.co/image/ab67616d0000b273528f5d5bc76597cd876e3cb2',
      album='album 1',
      popularity=100,
      release_date='2021-01-01',
      uri='spotify:track:4iV5W9uYEdYUVa79Axb7Rh'
    ),
    Song(
      id=uuid.uuid4().hex,
      title='song 2',
      artist='artist 2',
      duration=66000,
      cover='https://i.scdn.co/image/ab67616d0000b273528f5d5bc76597cd876e3cb2',
      album='album 2',
      popularity=100,
      release_date='2021-01-01',
      uri='spotify:track:4iV5W9uYEdYUVa79Axb7Rh'
    ),
    Song(
      id=uuid.uuid4().hex,
      title='song 3',
      artist='artist 3',
      duration=66000,
      cover='https://i.scdn.co/image/ab67616d0000b273528f5d5bc76597cd876e3cb2',
      album='album 3',
      popularity=100,
      release_date='2021-01-01',
      uri='spotify:track:4iV5W9uYEdYUVa79Axb7Rh'
    ),
    Song(
      id=uuid.uuid4().hex,
      title='song 4',
      artist='artist 4',
      duration=66000,
      cover='https://i.scdn.co/image/ab67616d0000b273528f5d5bc76597cd876e3cb2',
      album='album 4',
      popularity=100,
      release_date='2021-01-01',
      uri='spotify:track:4iV5W9uYEdYUVa79Axb7Rh'
    ),
    Song(
      id=uuid.uuid4().hex,
      title='song 5',
      artist='artist 1',
      duration=66000,
      cover='https://i.scdn.co/image/ab67616d0000b273528f5d5bc76597cd876e3cb2',
      album='album 5',
      popularity=100,
      release_date='2021-01-01',
      uri='spotify:track:4iV5W9uYEdYUVa79Axb7Rh'
    )
  ]

def seed_song():
  song_repository = SongRepository()
  for song in SONGS:
    song_repository.create(song)
    
def seed_music_queue_item():
  song_repository = SongRepository()
  music_queue_item_repository = MusicQueueItemRepository(song_repository)
  crud_music_queue_item = CRUDMusicQueueItem(music_queue_item_repository, song_repository)
  music_queue_service = MusicQueueService(music_queue_item_repository)
  
  for song in SONGS[:3]:
    crud_music_queue_item.create_by_id(song.id)
    
  # like the first song
  music_queue_service.like_song(SONGS[0].id)
  # like the third song twice
  music_queue_service.like_song(SONGS[2].id)
  music_queue_service.like_song(SONGS[2].id)
  