from app.utils import format_time

def test_format_time():
  assert format_time.format_ms_to_time(90000) == "1:30"
  assert format_time.format_ms_to_time(3650000) == "1:00:50"
  assert format_time.format_ms_to_time(0) == "0:00"
  assert format_time.format_ms_to_time(60000) == "1:00"