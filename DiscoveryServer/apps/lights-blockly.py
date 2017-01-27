#-*- coding:utf-8 -*-
from __future__ import division

from discovery_bot import Light
from discovery_bot import pins
import time

red = Light(pins.LED_RED)

blue = Light(pins.LED_BLUE)

green = Light(pins.LED_GREEN)


for count in range(10):
    red.on()
    time.sleep(1)
    red.off()
    time.sleep(1)
    blue.on()
    time.sleep(1)
    red.off()
    time.sleep(1)
    green.off()
    time.sleep(1)
    blue.off()
    time.sleep(1)
