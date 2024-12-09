import serial
import requests


pico_port = '/dev/cu.usbmodem101'  # Replace with your actual port
baud_rate = 115200

res = requests.get('https://api.radio.betich.me')
print("health check: ", res.status_code)

TOGGLE_PLAY = '33'
NEXT = '03'
VOLUME_UP = '01'
VOLUME_DOWN = '00'

def decode_command(key):
    if key == TOGGLE_PLAY:
        return 'TOGGLE_PLAY'
    elif key == NEXT:
        return 'NEXT'
    elif key == VOLUME_UP:
        return 'VOLUME_UP'
    elif key == VOLUME_DOWN:
        return 'VOLUME_DOWN'
    else:
        return 'UNKNOWN'

def execute_command(command: str):
    # POST https://api.radio.betich.me/sio/command
    res = requests.get(f'https://api.radio.betich.me/sio/command?c={command}')
    print(f"Command {command} executed with status code: {res.status_code}")
    print(f"Response: {res.text}")

try:
    with serial.Serial(pico_port, baud_rate, timeout=1) as ser:
        print(f"Connected to {pico_port}")
        while True:
            try:
                line = ser.readline()
                if line:
                    decoded = line.decode('utf-8', errors='ignore').strip()
                    
                    execute_command(decode_command(decoded))
                    
                    print(f"Received: {decoded}")
                else:
                    print("No data received")
            except serial.SerialException as e:
                print(f"Serial exception: {e}")
                break
            except UnicodeDecodeError as e:
                print(f"Decode error: {e}")
                continue
except serial.SerialException as e:
    print(f"Could not open port {pico_port}: {e}")
