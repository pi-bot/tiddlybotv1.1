#-*- coding:utf-8 -*-
from discovery_bot import Light
from discovery_bot import pins
import time
from discovery_bot import Ultrasound

red = Light(pins.LED_RED)

blue = Light(pins.LED_BLUE)

green = Light(pins.LED_GREEN)

usound = Ultrasound()


red.off()
blue.off()
green.off()

while True:
    time.sleep(0.5)
    if (usound.read_normalized() > 0.5): # will have a value between 0.0 and 1.0
        blue.off()
        red.on()
    else:
        red.off()
        blue.on()
