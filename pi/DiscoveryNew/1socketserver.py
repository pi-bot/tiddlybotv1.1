import os
import os.path
import math
import time
import tornado.httpserver
import tornado.ioloop
import tornado.web
import tornado.escape
import sockjs.tornado
import threading
import Queue
import json
import subprocess
import signal

from discovery_bot import pins
from discovery_bot import Movement
from discovery_bot import Servo

robot = Movement()
s1 = Servo(1)
s2 = Servo(2)

global angle
angle = 0

#--------------------------------------------------------------------------------------------------- 
class ConnectionHandler( sockjs.tornado.SockJSConnection ):
    
    #-----------------------------------------------------------------------------------------------
    def on_open( self, info ):
        
        pass
        
    #-----------------------------------------------------------------------------------------------
    def on_message( self, message ):
                
        try:
            message = str( message )
        except Exception:
            #logging.warning( "Got a message that couldn't be converted to a string" )
            return

        if isinstance( message, str ):
            
            lineData = message.split( " " )
            if len( lineData ) > 0:
                
                #if lineData[ 0 ] == "Centre":
                
                    #if servos != None:
			#cameraStreamer.stopStreaming()
                        #servos.setCameraAngle(50)
                
                if lineData[ 0 ] == "StartStreaming":
		    cameraStreamer.startStreaming()
                
                elif lineData[ 0 ] == "Move" and len( lineData ) >= 3:

                    motorJoystickX, motorJoystickY = \
                        self.extractJoystickData( lineData[ 1 ], lineData[ 2 ] )
                    
                    #robot.setMotorJoystickPos( motorJoystickX, motorJoystickY )
		    x = round(motorJoystickX)
		    y = round(motorJoystickY)

            	    if (x == 0 and y == 1):
                        robot.forward()

           	    if (x == -1 and y == 0):
               	        robot.turn_left()

           	    if (x == 1 and y == 0):
            		robot.turn_right()

           	    if (x == 0 and y == -1):
           		robot.backward()

          	    if (x == 0 and y == 0):
           		robot.stop()
                    
                elif lineData[ 0 ] == "PanTilt" and len( lineData ) >= 3:
                    
                    x, y = self.extractJoystickData( lineData[ 1 ], lineData[ 2 ] )

		    x = round(x)
		    y = round(y)

		    if y == 1:
			if angle >= 200:
		            angle = angle + 1
			    s1.set(angle)
			    s2.set(angle)

		    elif y == -1:
			if angle <= 0:
		            angle = angle - 1
			    s1.set(angle)
			    s2.set(angle)

    def extractJoystickData( self, dataX, dataY ):
        
        joystickX = 0.0
        joystickY = 0.0
        
        try:
            joystickX = float( dataX )
        except Exception:
            pass
        
        try:
            joystickY = float( dataY )
        except Exception:
            pass
            
        return ( joystickX, joystickY )

#--------------------------------------------------------------------------------------------------- 
class MainHandler( tornado.web.RequestHandler ):
    
    #------------------------------------------------------------------------------------------------
    def get( self ):
        self.render( webPath + "/index.html" )

#--------------------------------------------------------------------------------------------------- 
def signalHandler( signum, frame ):
    
    if signum in [ signal.SIGINT, signal.SIGTERM ]:
        global isClosing
        isClosing = True
        
#--------------------------------------------------------------------------------------------------- 
if __name__ == "__main__":
    
    signal.signal( signal.SIGINT, signalHandler )
    signal.signal( signal.SIGTERM, signalHandler )
    
    # Create the configuration for the web server
    router = sockjs.tornado.SockJSRouter( 
        ConnectionHandler, '/control' )
    application = tornado.web.Application( router.urls )
    
    
    # Now start the web server
    #logging.info( "Starting web server..." )
    http_server = tornado.httpserver.HTTPServer( application )
    http_server.listen( 5005 )
    
    tornado.ioloop.IOLoop.instance().start()
