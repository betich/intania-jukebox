from app.infra.http.flask import run
from app.seed.memory import seed_song, seed_music_queue_item
from app.config.env import load_env

def main():
  print('Starting app...')
  
  # seed_song()
  # seed_music_queue_item()
  load_env()
  run()

if __name__ == '__main__':
  main()