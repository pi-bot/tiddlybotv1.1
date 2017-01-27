import time
import RPi.GPIO as io
import pins

class Ultrasound(object):

    def __init__(self):
        self.trigger = pins.ULTRASOUND_TRIGGER_PIN
        self.echo = pins.ULTRASOUND_ECHO_PIN
        self.range = (0, 100)
        self.num_values = 1

        io.setmode(io.BCM)
        io.setup(self.trigger, io.OUT)
	io.output(self.trigger, False)
        io.setup(self.echo, io.IN)

    def read(self):
        # Send 10us pulse to trigger
        io.output(self.trigger, True)
        time.sleep(0.00001)
        io.output(self.trigger, False)

        start = time.time()
        while io.input(self.echo) == 0:
            # Wait for echo to go high
            stop = time.time()
            if (stop - start) > .1:
                break

        start = time.time()
        while io.input(self.echo) == 1:
            # wait for echo to go low
            stop = time.time()
            if (stop - start) > .1:
                break

        # Calculate pulse length
        elapsed = stop - start
	
        # Distance pulse travelled in that time is time
        # multiplied by the speed of sound (cm/s)
        distance = elapsed * 34300

        # That was the distance there and back so halve the value
        distance = distance / 2

        # Cap value at 100
        if distance > 100:
            distance = 100

        return distance

    def read_normalized(self):
        value = self.read() / float(self.range[1])
        return value

#s = Ultrasound()
#
#while True:
#    print(s.read())
