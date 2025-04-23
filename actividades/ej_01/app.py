

import socket
from boot import connect_to
from machine import Pin, I2C
import ssd1306
from time import sleep


SSID = "Cooperadora Alumnos"
PASS = ""  
ip = connect_to(SSID, PASS)


print("Mi IP es:", ip)


i2c = I2C(0, scl=Pin(22), sda=Pin(21))
oled = ssd1306.SSD1306_I2C(128, 64, i2c)
oled.fill(0)
oled.text("IP:", 0, 0)
oled.text(ip, 0, 15)
oled.show()


addr = socket.getaddrinfo("0.0.0.0", 80)[0][-1]
s = socket.socket()
s.bind(addr)
s.listen(1)
print("Servidor HTTP en:", addr)


def serve_client(client):
    req = client.recv(1024).decode()
    
    path = req.split(" ")[1]
    if path == "/":
        path = "/index.html"
    
    if   path.endswith(".css"):   ctype = "text/css"
    elif path.endswith(".js"):    ctype = "application/javascript"
    else:                         ctype = "text/html"
    try:
        with open(path.lstrip("/"), "rb") as f:
            data = f.read()
        client.send("HTTP/1.0 200 OK\r\nContent-Type: {}\r\n\r\n".format(ctype))
        client.send(data)
    except Exception as e:
        
        client.send("HTTP/1.0 404 NOT FOUND\r\n\r\n")
    client.close()


while True:
    try:
        client, _ = s.accept()
        serve_client(client)
    except Exception as e:
        
        print("Error al aceptar cliente:", e)
        sleep(1)

