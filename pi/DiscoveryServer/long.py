from discovery_bot import Movement
import time

robot = Movement()

robot.forward()
time.sleep(20)
robot.stop()
time.sleep(20)

robot.turn_left()
time.sleep(20)
robot.stop()
time.sleep(20)

robot.turn_right()
time.sleep(20)
robot.stop()
time.sleep(20)

robot.backward()
time.sleep(20)
robot.stop()
time.sleep(20)

