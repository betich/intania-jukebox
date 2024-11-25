from app.core.entity.music import Music
from app.core.entity.queue import Queue

class QueueRepository:
    def __init__(self):
        self.queue = Queue()

    def add(self, music: Music):
        self.queue.add(music)

    def remove(self, music: Music):
        self.queue.remove(music)

    def get(self):
        return self.queue.get()