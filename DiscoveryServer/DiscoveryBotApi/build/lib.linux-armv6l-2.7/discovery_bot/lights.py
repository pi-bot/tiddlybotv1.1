import time
import RPi.GPIO as io
import pins

class Light(object):

    def __init__(self, colour):
	self.colour = colour

        io.setmode(io.BCM)
        io.setup(self.colour, io.OUT)
	
	io.output(self.colour, False)

    def cleanup(self):
	io.output(self.colour, False)

    def on(self, time_int = None):
	io.output(self.colour, True)
	if time_int != None:
	    time.sleep(time_int)
	    io.output(self.colour, False)

    def off(self):
	io.output(self.colour, False)

#red = Light(pins.LED_RED)
#blue = Light(pins.LED_BLUE)
#green = Light(pins.LED_GREEN)

#while True:
#    red.on()
#    blue.on()
#    green.on()
#    time.sleep(1)
#    red.off()
#    blue.off()
#    green.off()
#    time.sleep(1)


