#!/usr/bin/env python

import os

from tornado import web, ioloop
from sockjs.tornado import SockJSRouter, SockJSConnection
import time

from discovery_bot import pins
from discovery_bot import Movement
from discovery_bot import Servo

robot = Movement()
s1 = Servo(1)
#s2 = Servo(2)

class EchoConnection(SockJSConnection):

    angle = 50

    def on_message(self, msg):

	# Parse the data
    	data = str(msg)
    	data = data.split(" ")

    	#print "received command:", msg

    	if data[0] == 'Move':
	    x = float(data[1])
            y = float(data[2])
            print y,x
            if(y>0):
                robot.setMotorSpeed(pins.SERVO_LEFT_MOTOR,(y/2+x/2)*100)
                robot.setMotorSpeed(pins.SERVO_RIGHT_MOTOR,(y/2-x/2)*100)
            else:
                robot.setMotorSpeed(pins.SERVO_LEFT_MOTOR,(y/2-x/2)*100)
                robot.setMotorSpeed(pins.SERVO_RIGHT_MOTOR,(y/2+x/2)*100)
	    """x = round(float(data[1]))
            y = round(float(data[2]))
            if (x == 0 and y == 1):
                robot.forward(40)
            if (x == -1 and y == 0):
                robot.rotate_left()
            if (x == 1 and y == 0):
                robot.rotate_right()
            if (x == 0 and y == -1):
                robot.backward(40)"""
            if (x == 0 and y == 0):
                robot.stop()
    	elif data[0] == 'PanTilt':
	    y = round(float(data[2]))
	    #print("Panning with value: " + str(y) + "")
            
	    if y == 1:
		if self.angle > 0:
                    self.angle = self.angle - 5
		    s1.set(self.angle)
		    #s2.set(self.angle)
		    print("Event 1 was fired with angle " + str(self.angle))
            elif y == -1:
		if self.angle < 200:
                    self.angle = self.angle + 5
		    s1.set(self.angle)
		    #s2.set(self.angle)
		    print("Event -1 was fired with angle " + str(self.angle))

if __name__ == '__main__':
    EchoRouter = SockJSRouter(EchoConnection, '/control')
    
    app = web.Application(EchoRouter.urls)
    app.listen(5005)
    os.system('/home/pi/raspberry_pi_camera_streamer/build/raspberry_pi_camera_streamer&')
    ioloop.IOLoop.instance().start()
