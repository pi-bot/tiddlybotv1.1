#!/usr/bin/python

import os, os.path
import glob
import random
import string
import json
from datetime import datetime

import cherrypy
import blockly_runner
#from camera_streamer import Camera
from discovery_bot import Movement

class IndexPage(object):
    @cherrypy.expose
    def index(self):
        return file('index.html')

class BlocklyPage(object):
    @cherrypy.expose
    def index(self):
        return file('blockly.html')

    @cherrypy.expose
    def start(self, code):
	app = open('program.py', 'rw+')
	code_write = """import discovery_bot
from discovery_bot import Movement
from discovery_bot import Servo
from discovery_bot import Ultrasound
from discovery_bot import Light
from discovery_bot import Infrared
from discovery_bot import Button
from discovery_bot import Buzzer
import time
robot = Movement()
red = Light(discovery_bot.pins.LED_RED)
blue = Light(discovery_bot.pins.LED_BLUE)
green = Light(discovery_bot.pins.LED_GREEN)
buzzer = Buzzer()
b = Button()
usound = Ultrasound()
"""
	code_write += code
	app.seek(0)
	app.write(code_write)
	app.truncate()
	app.close()
	blockly_runner.stop()
	blockly_runner.run('program.py')

    @cherrypy.expose
    def stop(self):
	blockly_runner.stop()

class ControllerPage(object):
    @cherrypy.expose
    def index(self):
	os.system('sudo ./camera.sh  > cam.log &')
        return file('controller.html')

if __name__ == '__main__':
     conf = {
         '/': {
             'tools.sessions.on': True,
             'tools.staticdir.root': os.path.abspath(os.getcwd())
         },
         '/generator': {
             'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
             'tools.response_headers.on': True,
             'tools.response_headers.headers': [('Content-Type', 'text/plain')],
         },
         '/static': {
             'tools.staticdir.on': True,
             'tools.staticdir.dir': './static'
         }
     }

     cherrypy.tree.mount(IndexPage(), '/', conf)
     cherrypy.tree.mount(BlocklyPage(), '/blockly', conf)
     cherrypy.tree.mount(ControllerPage(), '/controller', conf)

     cherrypy.server.socket_host = '0.0.0.0'
     cherrypy.server.socket_port = 80
     cherrypy.engine.start()
     cherrypy.engine.block()
