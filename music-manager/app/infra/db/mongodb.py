from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/music_manager"

def create_connection():
  client = MongoClient(MONGO_URI)
  return client["music_manager"]  