from discovery_bot import Movement
from discovery_bot import Ultrasound
import time

s = Ultrasound()
robot = Movement()

while True:
    robot.forward()
    time.sleep(1.5)
    robot.stop()
    time.sleep(1.5)
    robot.turn_left()
    time.sleep(1.5)
    robot.turn_right()
    time.sleep(1.5)
    robot.stop()

