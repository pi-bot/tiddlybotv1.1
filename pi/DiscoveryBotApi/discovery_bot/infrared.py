import time
import RPi.GPIO as io
import pins

class Infrared(object):

    def __init__(self):
        self.sensor = pins.LINE_SENSOR

        io.setmode(io.BCM)
        io.setup(self.sensor, io.IN)

    def on_line(self):
	for _ in range(100):
	    if io.input(self.sensor):
	       	state = True
	    else:
	        state = False
	
	    time.sleep(0.001)
	        
	return state



#robot = Infrared()
#
#while True:
#    if robot.on_line():
#	print("On Line!")
#    else:
#	print("Off Line!")
#

