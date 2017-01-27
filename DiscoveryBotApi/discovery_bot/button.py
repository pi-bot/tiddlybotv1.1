import time
import RPi.GPIO as io
import pins

class Button(object):

    def __init__(self):
        self.button = pins.BUTTON

        io.setmode(io.BCM)
        io.setup(self.button, io.IN)

    def button_pressed(self):
	for _ in range(100):
	    if io.input(self.button) == 0:
	       	state = True
	    else:
	        state = False
	
	    time.sleep(0.001)
	        
	return state




#robot = Button()
#
#while True:
#    if robot.button_pressed():
#	print("On!")
#    else:
#	print("Off!")
#
