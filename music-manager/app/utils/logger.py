from app.utils.singleton import Singleton
from datetime import datetime
import sys, traceback

class Logger(Singleton):
  def __init__(self):
    self.logs = []
  
  def log(self, message):
    self.logs.append(message)
    print(message)
  
  def get_logs(self):
    return self.logs
  
  def save_logs(self):
    with open(f"logs/{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}.log", "w") as file:
      for log in self.logs:
        file.write(log + "\n")
    self.clear_logs()
    
  def clear_logs(self):
    self.logs = []
    
  def log_error(self, error: Exception):
    self.log(f"ERROR: {error}")
    # stack trace
    exc_type, exc_value, exc_tb = sys.exc_info()
    for tb in traceback.format_tb(exc_tb):
      self.log(tb)