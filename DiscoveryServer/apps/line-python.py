from discovery_bot import Movement
import RPi.GPIO as GPIO
from RPIO import PWM
import time

GPIO.setmode(GPIO.BCM)

line_sensor = 4

GPIO.setup(line_sensor, GPIO.IN)

robot = Movement()

while True:
    if GPIO.input(line_sensor) == GPIO.LOW: # Check if we are on the line
        robot.forward(10) # Move at 10% speed
        time.sleep(0.2) 
        robot.turn_left(10)
        time.sleep(0.2)
    else:
        robot.forward(10)
        time.sleep(0.2)
        robot.turn_right(10)
        time.sleep(0.2)