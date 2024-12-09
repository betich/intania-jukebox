from app.infra.http.flask import app, socketio
from app.seed.memory import seed_song, seed_music_queue_item
# from app.config.env import load_env

def main():
  print('Starting app...')
  
  # seed_song()
  # seed_music_queue_item()
  # load_env()
  # run()
  socketio.run(app, host='127.0.0.1', port=5002)

if __name__ == '__main__':
  main()