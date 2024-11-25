import math

def format_ms_to_time(ms: int) -> str:
  hours = math.floor(ms // 3.6e6)
  minutes = math.floor((ms % 3.6e6) // 60000)
  seconds = math.floor(((ms % 3.6e6) % 60000) // 1000)
    
  if hours > 0:
      return f"{hours}:{minutes:02}:{seconds:02}"
  else:
      return f"{minutes}:{seconds:02}"