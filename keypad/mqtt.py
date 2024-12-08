import paho.mqtt.client as mqtt

broker = "172.20.10.2"  # Replace with Raspberry Pi IP address
port = 1883
topic = "test/topic"

def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    client.subscribe(topic)

def on_message(client, userdata, msg):
    print(f"Message received: {msg.topic} {msg.payload.decode()}")

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

try:
    client.connect(broker, port)
    client.loop_forever()
except Exception as e:
    print(f"Failed to connect: {e}")
