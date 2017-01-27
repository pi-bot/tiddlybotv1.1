import time
import RPi.GPIO as io
import pins

class Buzzer(object):

    def __init__(self):
        self.buzzer = pins.BUZZER

        io.setmode(io.BCM)
        io.setup(self.buzzer, io.OUT)

    def on(self):
	io.output(self.buzzer, 1)

    def off(self):
	io.output(self.buzzer, 0)


