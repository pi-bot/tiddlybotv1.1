#-*- coding:utf-8 -*-
from __future__ import division

from discovery_bot import Movement
import time

robot = Movement()


robot.forward()
time.sleep(8)
robot.stop()
