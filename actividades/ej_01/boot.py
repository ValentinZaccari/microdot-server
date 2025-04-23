
import esp
esp.osdebug(None)     

import gc
gc.collect()          

import network
from time import sleep

def connect_to(ssid: str, passwd: str) -> str:
    """
    Conecta el ESP32 a la red Wi-Fi indicada y devuelve la IP asignada.
    """
    sta = network.WLAN(network.STA_IF)
    if not sta.active():
        sta.active(True)
    if not sta.isconnected():
        sta.connect(ssid, passwd)
        while not sta.isconnected():
            sleep(0.05)
    return sta.ifconfig()[0]
