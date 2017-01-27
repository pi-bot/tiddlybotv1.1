from discovery_bot import Movement
from discovery_bot import Ultrasound
import time

s = Ultrasound()
robot = Movement()

while True:
    if s.read() < 15:
	robot.turn_right()
	time.sleep(1.2)
    else:
	robot.forward()
