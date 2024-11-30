from app.infra.http.flask import run
from app.seed.memory import seed_song, seed_music_queue_item

def main():
  print('Starting app...')
  
  seed_song()
  seed_music_queue_item()
  
  run()

if __name__ == '__main__':
  main()