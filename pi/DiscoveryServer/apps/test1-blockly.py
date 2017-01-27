#-*- coding:utf-8 -*-
from __future__ import division

from discovery_bot import Movement
import time
from discovery_bot import Light
from discovery_bot import pins

robot = Movement()

red = Light(pins.LED_RED)

blue = Light(pins.LED_BLUE)

green = Light(pins.LED_GREEN)


robot.forward()
time.sleep(15)
blue.on()
time.sleep(3)
blue.off()
