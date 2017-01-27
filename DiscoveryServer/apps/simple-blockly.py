#-*- coding:utf-8 -*-
from __future__ import division

from discovery_bot import Ultrasound
from discovery_bot import Light
from discovery_bot import pins

usound = Ultrasound()

red = Light(pins.LED_RED)

blue = Light(pins.LED_BLUE)

green = Light(pins.LED_GREEN)


for count in range(int(usound.read_normalized())):
    red.on()
    red.off()
