
from paho.mqtt import client as mqtt_client
from config.config import socket_config
import time

def connect_socket(user_id):
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(user_id)
    client.on_connect = on_connect
    client.connect(socket_config.get("broker"), socket_config.get("port"))
    return client

def publish(client, channel, data):
    time.sleep(1)
    client.publish(channel, data)