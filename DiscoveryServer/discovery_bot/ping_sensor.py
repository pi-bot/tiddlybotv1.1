import time
import RPi.GPIO as GPIO
import sys

breaks = 0.1

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

class ultrasound:
	def __init__(self, trig, echo, time_break = breaks ):
	    self.last_distance = 0
	    self.current_distance = 0
			
	    self.trig   = trig
	    self.echo   = echo
	    self.time_break = time_break

	def get_distance(self):	
	    self.last_distance = self.current_distance
	    GPIO.setup(self.echo, GPIO.IN)
      	    GPIO.setup(self.trig, GPIO.OUT)
	    GPIO.output(self.trig, GPIO.HIGH)
	    time.sleep(0.00001)
	    GPIO.output(self.trig, GPIO.LOW)
	    start = time.time()
	    while GPIO.input(self.echo) == GPIO.LOW:
	        start = time.time()
	    while GPIO.input(self.echo) == GPIO.HIGH:
	      	pass
	    end = time.time()
	    self.current_distance = 17000 * ( end - start )
            return self.current_distance
	
	def get_speed(self,time_break):
	    return (self.get_distance() - self.last_distance) / time_break


def main():
    trig = 27
    echo = 17
    time_break = 0.2

    sensor =  ultrasound( trig, echo, time_break )
    print sensor.get_distance()
    i = 0
    while i < 50:
	print sensor.get_speed(0.2)
	time.sleep(0.2)

if __name__ == "__main__":
	main()
