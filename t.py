#-*- coding:utf-8 -*-
from __future__ import division

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
    print(usound.read_normalized())
    if (usound.read_normalized() > 50):
        blue.off()
        red.on()
    else:
        red.off()
        blue.on()
