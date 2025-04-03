def connect_to(ssid: str, passwd: str) -> str:
    """Conecta el microcontrolador a la red indicada y retorna la dirección IP asignada.
    
    Parameters
    ----------
    ssid : str
        Nombre de la red a conectarse
    passwd : str
        Contraseña de la red
        
    Returns
    -------
    str
        Dirección IP asignada al microcontrolador
    """
    
    import network
    from time import sleep
    
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        sta_if.active(True)
        sta_if.connect(ssid, passwd)
        while not sta_if.isconnected():
            sleep(.05)
    

    return sta_if.ifconfig()[0]

print(connect_to("Cooperadora Alumnos", ""))




from machine import Pin, I2C




import ssd1306
from time import sleep


i2c = I2C(0, scl=Pin(22), sda=Pin(21))
oled = ssd1306.SSD1306_I2C(128, 64, i2c)


ip = connect_to("Cooperadora Alumnos", "")


oled.fill(0)  
oled.text("hola mundo!", 0, 0)
oled.show()
sleep(2)  

oled.fill(0)  
oled.text("IP:", 0, 0)
oled.text(ip, 0, 15)  
oled.show()
